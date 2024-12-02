import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ClientSelect from "../components/ReactSelect/ClientSelect"; // Assurez-vous d'importer ClientSelect

class GetActivite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        client: "",
        datetime: "",
        completed: false
      },
      appelList: [],
      clients: [], // Liste des clients à récupérer
      modal: false
    };
    this.base = "http://localhost:8000/api";
  }

  componentDidMount() {
    this.refreshList();
    this.fetchClients(); // Récupérer la liste des clients
  }

  fetchClients = () => {
    axios
      .get(`${this.base}/clients/`)  // Modifiez l'URL pour récupérer les clients
      .then((res) => {
        console.log("Clients:", res.data); // Vérifier les données des clients
        this.setState({ clients: res.data });
      })
      .catch((err) => console.log(err));
  };

  refreshList = () => {
    axios
      .get(`${this.base}/AppelTel/`)
      .then((res) => this.setState({ appelList: res.data }))
      .catch((err) => console.log(err));
  };

  displayCompleted = (status) => {
    this.setState({ viewCompleted: status });
  };

  renderTabList = () => {
    return (
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
  };
  renderItems = () => {
    const { appelList, clients } = this.state;
  
    appelList.forEach((item) => {
      console.log("Item :", item);
      const client = clients.find(
        (client) => parseInt(client.id, 10) === parseInt(item.client, 10)
      );
      console.log("Client trouvé :", client);
    });
  };
  
  renderItems = () => {
  const { viewCompleted, appelList, clients } = this.state;
  const newItems = appelList.filter((item) => item.completed === viewCompleted);

  return newItems.map((item) => {
    console.log("Item :", item);
    const client = clients.find(
      (client) => parseInt(client.id, 10) === parseInt(item.client, 10)
    );
    console.log("Client correspondant :", client);
    return (
      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
        <div className="d-flex w-100">
          <span className="col font-weight-bold">Client :</span>
          <span className="col">
            {client ? `${client.nom} ${client.prenom}` : "Client non trouvé"}
          </span>
        </div>
        <div className="d-flex w-100">
          <span className="col font-weight-bold">Date :</span>
          <span className="col">
            {new Date(item.datetime).toLocaleString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <span>
          <button onClick={() => this.editItem(item)} className="btn btn-secondary mr-2">
            Modifier
          </button>
          <button onClick={() => this.handleDelete(item)} className="btn btn-danger">
            Supprimer
          </button>
        </span>
      </li>
    );
  });
};


  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleDelete = (item) => {
    if (confirm("voulez-vous supprimer cet appel?")) {
      axios
        .delete(`${this.base}/AppelTel/${item.id}/`)
        .then((res) => {
          Swal.fire("Succès", "Supprimé avec succès");
          this.setState({
            appelList: this.state.appelList.filter((i) => i.id !== item.id),
          });
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <main className="content">
        <h1 className="text-success text-uppercase text-center my-4">
          Liste des Appels à faire
        </h1>
        <div className="row">
          <div className="col-md-12 col-sm-12 mx-auto p-0">
            <div className="card p-3">
              <div>
                <button onClick={this.createItem} className="btn btn-info">
                  Ajouter un appel
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default GetActivite;
