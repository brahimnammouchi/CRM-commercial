import React, { useState, useEffect } from "react";
import ModalReclamation from "../components/Modal/ModalReclamation";
import axios from "axios";
import Swal from "sweetalert2";

const Reclamation = () => {
  const [reclamationList, setReclamationList] = useState([]);
  const [modal, setModal] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    axios
      .get("http://localhost:8000/api/Reclamation/")
      .then((res) => setReclamationList(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (item) => {
    axios
      .delete(`http://localhost:8000/api/reclamation/${item.id}/`)
      .then(() => {
        Swal.fire("Deleted!", "Reclamation has been deleted.", "success");
        setReclamationList(reclamationList.filter((i) => i.id !== item.id));
      })
      .catch((err) => console.log(err));
  };

  const toggle = () => setModal(!modal);

  const handleSubmit = (item) => {
    toggle();
    if (item.id) {
      axios.put(`http://localhost:8000/api/reclamation/${item.id}/`, item)
        .then(refreshList)
        .catch(err => console.log(err));
      return;
    }
    axios.post("http://localhost:8000/api/reclamation/", item)
      .then(refreshList)
      .catch(err => console.log(err));
  };

  const createItem = () => {
    setActiveItem({
      titre: "",
      description: "",
      statut: "en_attente",
      priorite: "moyenne",
    });
    toggle();
  };

  const editItem = (item) => {
    setActiveItem(item);
    toggle();
  };

  return (
    <div className="container">
      <h3 className="text-center my-4">Gestion des Réclamations</h3>
      <button onClick={createItem} className="btn btn-primary mb-3">
        Ajouter Réclamation
      </button>
      <ul className="list-group">
        {reclamationList.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <strong>{item.titre}</strong> - {item.priorite} - {item.statut}
            </span>
            <div>
              <button onClick={() => editItem(item)} className="btn btn-secondary mr-2">
                Modifier
              </button>
              <button onClick={() => handleDelete(item)} className="btn btn-danger">
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
      {modal && <ModalReclamation activeItem={activeItem} toggle={toggle} onSave={handleSubmit} />}
    </div>
  );
};

export default Reclamation;
