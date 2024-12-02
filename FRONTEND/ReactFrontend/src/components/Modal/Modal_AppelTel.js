import React, { Component } from "react";
import ClientSelect from "../ReactSelect/ClientSelect";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }

  handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Appel Item </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="client">Client</Label>
              <ClientSelect
  onChange={(selectedClient) => 
    this.setState({ 
      activeItem: { 
        ...this.state.activeItem, 
        client: selectedClient  // Store the entire selected client object
      } 
    })
  }
  value={this.state.activeItem.client}
/>
            </FormGroup>
            <FormGroup>
              <Label for="datetime">Date de l'appel</Label>
              <Input
                type="date"
                name="datetime"
                value={this.state.activeItem.datetime}
                onChange={this.handleChange}
                placeholder="Enter la date"
              />
            </FormGroup>
			<FormGroup>
              <Button 
                color={this.state.activeItem.completed ? "success" : "secondary"}
                onClick={() => this.handleChange({
                  target: {
                    name: 'completed',
                    value: !this.state.activeItem.completed
                  }
                })}
              >
                {this.state.activeItem.completed ? "Completed" : "Mark as Completed"}
              </Button>
            </FormGroup>
            <Button color="success" onClick={() => {
              // Logique de validation ou transformation des données ici
              if (!this.state.activeItem.client || !this.state.activeItem.datetime) {
                alert("Veuillez remplir tous les champs requis.");
                return;
              }
              onSave(this.state.activeItem);
            }}>
              Enregistrer
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          {/* Vous pouvez ajouter d'autres éléments ici si nécessaire */}
        </ModalFooter>
      </Modal>
    );
  }
}

export default CustomModal;
