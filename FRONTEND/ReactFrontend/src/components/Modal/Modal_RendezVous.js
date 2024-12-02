import React, { Component } from "react";
import ClientSelect from "../ReactSelect/ClientSelect"; // Adjust the import path if needed
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from "reactstrap";

class Modal_RendezVous extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  // Handle input change for fields within the modal
  handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  // Handle change for ClientSelect component
  handleClientChange = (selectedClient) => {
    this.setState({
      activeItem: {
        ...this.state.activeItem,
        client: selectedClient, // Update client in activeItem
      },
    });
  };

  // Call the onSave function passed as prop from RendezvousCom
  handleSubmit = (e) => {
    e.preventDefault();
    const { onSave } = this.props;

    // Validation check: ensure required fields are filled
    if (!this.state.activeItem.client || !this.state.activeItem.date_RendezVous) {
      alert("Veuillez remplir tous les champs requis.");
      return;
    }

    // Call the parent component's onSave function
    onSave(this.state.activeItem);
  };

  render() {
    const { toggle } = this.props; // toggle function to open/close modal
    const { activeItem } = this.state;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Ajouter un rendez-vous</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="object">Objet de la réunion</Label>
              <Input
                type="text"
                name="object"
                value={activeItem.object || ""}
                onChange={this.handleChange}
                placeholder="Objet de la réunion"
              />
            </FormGroup>
            <FormGroup>
              <Label for="client">Client</Label>
              <ClientSelect
                onChange={this.handleClientChange}
                value={activeItem.client}
              />
            </FormGroup>
            <FormGroup>
              <Label for="date_RendezVous">Date de rendez-vous</Label>
              <Input
                type="date"
                name="date_RendezVous"
                value={activeItem.date_RendezVous || ""}
                onChange={this.handleChange}
                placeholder="Enter la date et l'heure de la réunion"
              />
            </FormGroup>
            <FormGroup>
              <Button
                color={activeItem.completed ? "success" : "secondary"}
                onClick={() =>
                  this.handleChange({
                    target: {
                      name: "completed",
                      value: !activeItem.completed,
                    },
                  })
                }
              >
                {activeItem.completed ? "Terminé" : "Marquer comme terminé"}
              </Button>
            </FormGroup>
            <Button color="success" type="submit">
              Enregistrer
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default Modal_RendezVous;
