import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from "reactstrap";

const ModalReclamation = ({ activeItem, toggle, onSave }) => {
  const [item, setItem] = useState(activeItem);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>Réclamation</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="titre">Titre</Label>
            <Input
              type="text"
              name="titre"
              value={item.titre}
              onChange={handleChange}
              placeholder="Titre de la réclamation"
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              value={item.description}
              onChange={handleChange}
              placeholder="Description détaillée"
            />
          </FormGroup>
          <FormGroup>
            <Label for="statut">Statut</Label>
            <Input type="select" name="statut" value={item.statut} onChange={handleChange}>
              <option value="en_attente">En attente</option>
              <option value="en_cours">En cours</option>
              <option value="resolue">Résolue</option>
              <option value="fermee">Fermée</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="priorite">Priorité</Label>
            <Input type="select" name="priorite" value={item.priorite} onChange={handleChange}>
              <option value="basse">Basse</option>
              <option value="moyenne">Moyenne</option>
              <option value="haute">Haute</option>
            </Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => onSave(item)}>Enregistrer</Button>
        <Button color="secondary" onClick={toggle}>Annuler</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalReclamation;
