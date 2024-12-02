import React, { Component } from "react";
import ClientSelect from "../components/ReactSelect/ClientSelect";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      activeItem: { ...this.state.activeItem, [name]: value },
    });
  };

  handleClientChange = (client) => {
    this.setState({
      activeItem: { ...this.state.activeItem, client: client.id },
    });
  };

  render() {
    const { client, datetime } = this.state.activeItem;
    const { clients, toggle, onSave } = this.props;

    return (
      <div className="modal">
        <div className="modal-content">
          <h4>Ajouter / Modifier un Appel</h4>
          <div className="form-group">
            <label>Client</label>
            <ClientSelect
              clients={clients}
              value={client}
              onChange={this.handleClientChange}
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="datetime-local"
              name="datetime"
              value={datetime}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <button
            onClick={() => onSave(this.state.activeItem)}
            className="btn btn-success"
          >
            Sauvegarder
          </button>
          <button onClick={toggle} className="btn btn-danger">
            Annuler
          </button>
        </div>
      </div>
    );
  }
}

export default Modal;
