import React, { Component } from "react";
import Modal from "../components/Modal/Modal_Opportinite";
import axios from 'axios';
import Swal from "sweetalert2";

class Opportinite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        nom_opportunite: "",
        reference: "",
        ca_estime: "",
        ca_final: "",
        devise: "",
        phase_de_vente: "",
        date_signature: "",
        document_concernee: "",
        completed: false,
      },
      OpportiniteList: [],
      modal: false,
    };
    this.base = "http://localhost:8000/api";
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get(`${this.base}/Opportinite/`)
      .then(res => this.setState({ OpportiniteList: res.data }))
      .catch(err => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = () => {
  const validationError = this.validateForm();
  if (validationError) {
    alert(validationError);
    return;
  }

  const formData = new FormData();
  Object.keys(this.state.activeItem).forEach((key) => {
    formData.append(key, this.state.activeItem[key]);
  });

  console.log("Données soumises :", Object.fromEntries(formData.entries())); // Debugging

  axios
    .post("http://localhost:8000/api/Opportinite/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("Data submitted successfully", response);
      this.props.toggle(); // Fermer le modal après succès
    })
    .catch((error) => {
      console.error("Erreur lors de la soumission des données", error.response.data);
      alert("Une erreur s'est produite : " + JSON.stringify(error.response.data));
    });
};

  createItem = () => {
    const item = {
      nom_opportunite: "",
      reference: "",
      ca_estime: "",
      ca_final: "",
      devise: "",
      phase_de_vente: "",
      date_signature: "",
      document_concernee: "",
      completed: false,
    };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  renderItems = () => {
    const { viewCompleted, OpportiniteList } = this.state;
    const filteredItems = OpportiniteList.filter(
      (item) => item.completed === viewCompleted
    );

    return filteredItems.map((item) => (
      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
        <span className="todo-title mr-2">{item.nom_opportunite}</span>
        <span className="todo-title mr-2">{item.phase_de_vente}</span>
        <span className="todo-title mr-2">{item.date_signature}</span>
        <span>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="content">
        <h1 className="text-success text-uppercase text-center my-4">
          Gestion des opportunités
        </h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <button onClick={this.createItem} className="btn btn-info">
                Ajouter une opportunité
              </button>
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

export default Opportinite;
