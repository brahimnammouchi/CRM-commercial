import React, { Component } from "react";
import Modal from "../components/Modal/Modal_RendezVous";
import axios from 'axios';
import Swal from "sweetalert2";

class RendezvousCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        object: "",
        date_RendezVous: "",
        client: "",
        completed: false,
      },
      RdvList: [],
      modal: false,
    };
    this.base = "http://localhost:8000/api";
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get(`${this.base}/RendezVous/`)
      .then((res) => this.setState({ RdvList: res.data }))
      .catch((err) => console.error("Failed to fetch rendezvous list:", err));
  };

  displayCompleted = (status) => {
    this.setState({ viewCompleted: status });
  };

  renderTabList = () => (
    <div className="my-5 tab-list">
      <span
        onClick={() => this.displayCompleted(true)}
        className={this.state.viewCompleted ? "active" : ""}
      >
        Terminé
      </span>
      <span
        onClick={() => this.displayCompleted(false)}
        className={this.state.viewCompleted ? "" : "active"}
      >
        En cours
      </span>
    </div>
  );

  renderItems = () => {
    const { viewCompleted, RdvList } = this.state;
    const filteredItems = RdvList.filter(item => item.completed === viewCompleted);
    
    return filteredItems.map((item) => (
      <li
  key={item.id}
  className="list-group-item d-flex justify-content-between align-items-center"
>
  <div className="d-flex w-100">
    <span className="col font-weight-bold">Object:</span>
    <span className="col">{item.object}</span>
  </div>
  <div className="d-flex w-100">
    <span className="col font-weight-bold">Date:</span>
    <span className="col">
      {new Date(item.date_RendezVous).toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}
    </span>
  </div>
  <div className="col-auto">
    <button onClick={() => this.editItem(item)} className="btn btn-secondary mr-2">
      Modifier
    </button>
    <button onClick={() => this.handleDelete(item)} className="btn btn-danger">
      Supprimer
    </button>
  </div>
</li>

    ));
  };

  toggle = () => this.setState({ modal: !this.state.modal });

  handleSubmit = (item) => {
    this.toggle();
    const activeItem = {
      object: item.object,
      date_RendezVous: item.date_RendezVous,
      client: item.client.id,  // Use client ID
      completed: item.completed,
    };

    if (!activeItem.client || !activeItem.date_RendezVous) {
      Swal.fire("Erreur", "Veuillez remplir tous les champs requis.");
      return;
    }

    const request = item.id 
      ? axios.put(`${this.base}/RendezVous/${item.id}/`, activeItem)
      : axios.post(`${this.base}/RendezVous/`, activeItem);

    request
      .then(() => {
        Swal.fire("Succès", item.id ? "Mise à jour réussie" : "Ajout réussi");
        this.refreshList();
      })
      .catch((err) => {
        console.error("Erreur:", err.response?.data || err);
        Swal.fire("Erreur", item.id ? "Erreur lors de la mise à jour" : "Erreur lors de l'ajout");
      });
  };

  handleDelete = (item) => {
    if (window.confirm("Voulez-vous supprimer ce rendez-vous ?")) {
      axios
        .delete(`${this.base}/RendezVous/${item.id}/`)
        .then(() => {
          Swal.fire("Succès", "Supprimé avec succès");
          this.setState({ RdvList: this.state.RdvList.filter(i => i.id !== item.id) });
        })
        .catch((err) => Swal.fire("Erreur", "Erreur lors de la suppression"));
    }
  };

  createItem = () => this.setState({
    activeItem: { object: "", date_RendezVous: "", client: "", completed: false },
    modal: true,
  });

  editItem = (item) => this.setState({ activeItem: item, modal: true });

  render() {
    return (
      <main className="content">
        <h1 className="text-success text-uppercase text-center my-4">Gestion des rendez-vous</h1>
        <div className="row">
  <div className="col-md-12 col-sm-12 mx-auto p-0">
    <div className="card p-3" style={{ backgroundColor: "#fff", width: "100%" }}>
      <button onClick={this.createItem} className="btn btn-info mb-3">
        Ajouter un rendez-vous
      </button>
      {this.renderTabList()}
      <ul className="list-group list-group-flush">
        {this.renderItems()}
      </ul>
    </div>
  </div>
</div>

        {this.state.modal && (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        )}
      </main>
    );
  }
}

export default RendezvousCom;
