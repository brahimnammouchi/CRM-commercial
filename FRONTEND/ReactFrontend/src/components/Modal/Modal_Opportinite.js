import React, { Component } from "react";
import ClientSelect from "../ReactSelect/ClientSelect";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  validateForm = () => {
    const { nom_opportunite, reference } = this.state.activeItem;

    if (!nom_opportunite || !reference ) {
      return false;
    }
    return true;
  };

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };

  
  

  handleSubmit = () => {
    if (!this.validateForm()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const formData = new FormData();
    Object.keys(this.state.activeItem).forEach((key) => {
      formData.append(key, this.state.activeItem[key]);
    });

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

  render() {
    const { toggle } = this.props;
    const { activeItem } = this.state;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Ajouter une Opportinité </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="nom_opportunite">Nom d'opportunité</Label>
              <Input
                type="text"
                name="nom_opportunite"
                value={activeItem.nom_opportunite || ""}
                onChange={this.handleChange}
                placeholder="Nom d'opportunité"
              />
            </FormGroup>
            <FormGroup>
              <Label for="reference">Référence</Label>
              <Input
                type="text"
                name="reference"
                value={activeItem.reference || ""}
                onChange={this.handleChange}
                placeholder="Référence"
              />
            </FormGroup>
            <FormGroup>
              <Label for="ca_estime">Chiffre d'affaire estimé</Label>
              <Input
                type="text"
                name="ca_estime"
                value={activeItem.ca_estime || ""}
                onChange={this.handleChange}
                placeholder="Montant en DT"
              />
            </FormGroup>
            <FormGroup>
              <Label for="ca_final">Chiffre d'affaire final</Label>
              <Input
                type="text"
                name="ca_final"
                value={activeItem.ca_final || ""}
                onChange={this.handleChange}
                placeholder="Montant en DT"
              />
            </FormGroup>
            <FormGroup>
              <Label for="devise">Devise</Label>
              <Input
                type="select"
                name="devise"
                value={activeItem.devise || ""}
                onChange={this.handleChange}
              >
                <option value="">Sélectionnez une devise</option>
                <option value="dollar">Dollar</option>
                <option value="dinar">Dinar</option>
                <option value="euro">Euro</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="phase_de_vente">Phase de Vente</Label>
              <Input
                type="select"
                name="phase_de_vente"
                value={activeItem.phase_de_vente || ""}
                onChange={this.handleChange}
              >
                <option value="">Sélectionnez une phase</option>
                <option value="en cours">En cours</option>
                <option value="a venir">À venir</option>
                <option value="en négociation">En négociation</option>
                <option value="abandonnée">Abandonnée</option>
                <option value="gagnée">Gagnée</option>
                <option value="perdue">Perdue</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="date_signature">Date de signature</Label>
              <Input
                type="date"
                name="date_signature"
                value={activeItem.date_signature || ""}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="document_concernee">Document Référence</Label>
              <Input
                type="file"
                name="document_concernee"
                onChange={(e) =>
                  this.setState({
                    activeItem: { ...activeItem, document_concernee: e.target.files[0] },
                  })
                }
              />
            </FormGroup>
            
            
            <FormGroup check>
              <Label for="completed">
                <Input
                  type="checkbox"
                  name="completed"
                  checked={activeItem.completed || false}
                  onChange={this.handleChange}
                />
                Terminé
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={this.handleSubmit}>
            Enregistrer
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CustomModal;
