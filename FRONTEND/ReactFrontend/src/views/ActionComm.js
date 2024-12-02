import React, {Component} from "react";
import Modal from "../components/Modal/Modal_ActionCom";
import axios from 'axios';
import { NavLink as RouteNavLink } from "react-router-dom";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Swal from "sweetalert2";
class ActionCom extends Component {
 // add a constructor to take props
 constructor(props) {
   super(props);
   this.state={
     //the viewCompleted prop represents the status
     // of the task.Set it to false by default
     viewCompleted: false,
     activeItem:{
      nom_action:"",
      CA_esperer:"",
      Cout_action:"",
      But_action:"",
      debut_action:"",
      echeance:"",
      commercial:""
     },
     actionList: []
   };
   this.base = "http://localhost:8000/api";
 }
 // add compounentDidMount
 componentDidMount() {
   this.refreshList();
 }
 refreshList = () => {
   axios // to send and receive HTTP request
   .get(`${this.base}/Action`) 
   .then(res => this.setState({actionList: res.data}))
   .catch(err => console.log(err)); 
 };
 //this arrow function takes status as a parameter
//and changes the status of viewCompleted to true
//if the status is true, else changes it to false
displayCompleted = status => {
  if (status) {
    return this.setState({viewCompleted: true});
  }
  return this.setState({viewCompleted: false});
};
//this array function renders two spans that help control
//the set of items to be displayed(ie, completed or incomplete)
renderTabList = () => {
  return (
    <div className="my-5 tab-list">
    <span
     onClick={() => this.displayCompleted(true)}
     className={this.state.viewCompleted ? "active" : ""}
     >
       completed
     </span>
     <span
     on onClick={() => this.displayCompleted(false)}
     className={this.state.viewCompleted ? "" : "active"}
     >
       incompleted
     </span>
  </div>
  );
};
//Main variable to render items on the screen
renderItems = () => {
  const {viewCompleted} =this.state;
  const newItems = this.state.actionList.filter(
    (item) => item.completed === viewCompleted
  );
  return newItems.map((item) => (
    <li
     key={item.id}
     className="List-group-item d-flex justify-content-between align-items-center"
    >
       <span
          className={`todo-title mr-2`}
      >
      {item.nom_action}
      </span>
      <span
          className={`todo-title mr-2`}
      >
      {item.debut_action}
      </span>
      <span
          className={`todo-title mr-2`}
      >
      {item.echeance}
      </span>
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
toggle = () => {
  //add this after modal creation
  this.setState({ modal: !this.state.modal});
};
handleSubmit = (item) => {
  this.toggle();
  alert("save" + JSON.stringify(item));
};
//submit an item
 // Submit an item
 handleSubmit = (item) => {
  this.toggle();
  if (item.id) {
    // if old post to edit and submit
    axios
      .put(`/api/Action/${item.id}/`, item)
      .then((res) => {
       
          Swal.fire(
            'succéss',
            'mis ajour appliqué avec succéss'
          )
       
        
        this.refreshList()
      });
    return;
  }
  // if new post to submit
  axios
    .post("/api/Action/", item)
    .then((res) => this.refreshList());
};
//delete item
handleDelete = (item) => {
  if(confirm("voulez vous supprimé cet appel?")){
    axios
    // eslint-disable-next-line no-template-curly-in-string
    .delete(`http://localhost:8000/api/Action/${item.id}/`)
        .then((res) =>{
          
            Swal.fire(
              'succéss',
              'supprimé avec succéss'
            )
        this.setState({appelList: this.state.appelList.filter(i => i.id != item.id)})
        }
        
        
  )}
};

// Create item
  createItem = () => {
    const item = { nom_action: "", CA_esperer: "", Cout_action: "", But_action:"", debut_action: "",echeance:"",commercial:"" };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  //Edit item
  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  // Start by visual effects to viewer
render () {
  return (
    <main className="content">
        <h1 className="text-success text-uppercase text-center my-4">
          Gestion des Actions Commerciales à faire
        </h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-info">
                  Ajouter une action commerciale
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
export default ActionCom;

// import React from "react";

// // react-bootstrap components
// import {
//   Badge,
//   Button,
//   Card,
//   Navbar,
//   Nav,
//   Container,
//   Row,
//   Col,
// } from "react-bootstrap";

// function Typography() {
//   return (
//     <>
//       <Container fluid>
//         <Row>
//           <Col md="12">
//             <Card>
//               <Card.Header>
//                 <Card.Title as="h4">Light Bootstrap Table Heading</Card.Title>
//                 <p className="card-category">
//                   Created using Montserrat Font Family
//                 </p>
//               </Card.Header>
//               <Card.Body>
//                 <div className="typography-line">
//                   <h1>
//                     <span>Header 1</span>
//                     The Life of Light Bootstrap Dashboard React
//                   </h1>
//                 </div>
//                 <div className="typography-line">
//                   <h2>
//                     <span>Header 2</span>
//                     The Life of Light Bootstrap Dashboard React
//                   </h2>
//                 </div>
//                 <div className="typography-line">
//                   <h3>
//                     <span>Header 3</span>
//                     The Life of Light Bootstrap Dashboard React
//                   </h3>
//                 </div>
//                 <div className="typography-line">
//                   <h4>
//                     <span>Header 4</span>
//                     The Life of Light Bootstrap Dashboard React
//                   </h4>
//                 </div>
//                 <div className="typography-line">
//                   <h5>
//                     <span>Header 5</span>
//                     The Life of Light Bootstrap Dashboard React
//                   </h5>
//                 </div>
//                 <div className="typography-line">
//                   <h6>
//                     <span>Header 6</span>
//                     The Life of Light Bootstrap Dashboard React
//                   </h6>
//                 </div>
//                 <div className="typography-line">
//                   <p>
//                     <span>Paragraph</span>I will be the leader of a company that
//                     ends up being worth billions of dollars, because I got the
//                     answers. I understand culture. I am the nucleus. I think
//                     that’s a responsibility that I have, to push possibilities,
//                     to show people, this is the level that things could be at.
//                   </p>
//                 </div>
//                 <div className="typography-line">
//                   <span>Quote</span>
//                   <blockquote>
//                     <p className="blockquote blockquote-primary">
//                       "I will be the leader of a company that ends up being
//                       worth billions of dollars, because I got the answers. I
//                       understand culture. I am the nucleus. I think that’s a
//                       responsibility that I have, to push possibilities, to show
//                       people, this is the level that things could be at."{" "}
//                       <br></br>
//                       <br></br>
//                       <small>- Noaa</small>
//                     </p>
//                   </blockquote>
//                 </div>
//                 <div className="typography-line">
//                   <span>Muted Text</span>
//                   <p className="text-muted">
//                     I will be the leader of a company that ends up being worth
//                     billions of dollars, because I got the answers...
//                   </p>
//                 </div>
//                 <div className="typography-line">
//                   <span>Primary Text</span>
//                   <p className="text-primary">
//                     I will be the leader of a company that ends up being worth
//                     billions of dollars, because I got the answers...
//                   </p>
//                 </div>
//                 <div className="typography-line">
//                   <span>Info Text</span>
//                   <p className="text-info">
//                     I will be the leader of a company that ends up being worth
//                     billions of dollars, because I got the answers...
//                   </p>
//                 </div>
//                 <div className="typography-line">
//                   <span>Success Text</span>
//                   <p className="text-success">
//                     I will be the leader of a company that ends up being worth
//                     billions of dollars, because I got the answers...
//                   </p>
//                 </div>
//                 <div className="typography-line">
//                   <span>Warning Text</span>
//                   <p className="text-warning">
//                     I will be the leader of a company that ends up being worth
//                     billions of dollars, because I got the answers...
//                   </p>
//                 </div>
//                 <div className="typography-line">
//                   <span>Danger Text</span>
//                   <p className="text-danger">
//                     I will be the leader of a company that ends up being worth
//                     billions of dollars, because I got the answers...
//                   </p>
//                 </div>
//                 <div className="typography-line">
//                   <h2>
//                     <span>Small Tag</span>
//                     Header with small subtitle <br></br>
//                     <small>Use "small" tag for the headers</small>
//                   </h2>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// }

// export default Typography;
