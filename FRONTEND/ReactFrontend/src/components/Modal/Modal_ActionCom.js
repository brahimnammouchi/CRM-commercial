import React, { Component } from "react";
import UserSelect from "components/ReactSelect/UserSelect";
// importing all of these classes from reactstrap module
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

// build a class base component
class CustomModal extends Component {
constructor(props) {
	super(props);
	this.state = {
	activeItem: this.props.activeItem
	};
    
}
// changes handler to check if a checkbox is checed or not
handleChange = e => {
	let { name, value } = e.target;
	if (e.target.type === "checkbox") {
	value = e.target.checked;
	}
	const activeItem = { ...this.state.activeItem, [name]: value };
	this.setState({ activeItem });
};

// rendering modal in the custommodal class received toggle and on save as props,
render() {
	const { toggle, onSave } = this.props;
	return (
	<Modal isOpen={true} toggle={toggle}>
		<ModalHeader toggle={toggle}> Ajouter une action commerciale </ModalHeader>
		<ModalBody>
		
		<Form>

			{/* 3 formgroups
			1 title label */}
			<FormGroup>
			<Label for="nom_action">Nom d'action Commerciale</Label>
			<Input
				type="text"
				name="nom_action"
				value={this.state.activeItem.nom_action}
				onChange={this.handleChange}
				placeholder="Nom d'action commerciale"
			/>
			</FormGroup>
            <FormGroup>
			<Label for="CA_esperer">Chiffre d'affaire espéré</Label>
			<Input
				type="text"
				name="CA_esperer"
				value={this.state.activeItem.CA_esperer}
				onChange={this.handleChange}
				placeholder=" 0 DT"
			/>
			</FormGroup>
            <FormGroup>
			<Label for="Cout_action">Cout d'action</Label>
			<Input
				type="text"
				name="Cout_action"
				value={this.state.activeItem.Cout_action}
				onChange={this.handleChange}
				placeholder=" 0 DT"
			/>
			</FormGroup>
            <FormGroup>
			<Label for="But_action">But d'action</Label>
			<Input
				type="text"
				name="But_action"
				value={this.state.activeItem.But_action}
				onChange={this.handleChange}
				placeholder=" 0 DT"
			/>
			</FormGroup>
            <FormGroup>
			<Label for="debut_action">date début</Label>
			<Input
				type="date"
				name="debut_action"
				value={this.state.activeItem.debut_action}
				onChange={this.handleChange}
				placeholder="Enter la date"
			/>
			</FormGroup>
			{/* 2 description label */}
			<FormGroup>
			<Label for="echeance">Date echéance</Label>
			<Input
				type="date"
				name="echeance"
				value={this.state.activeItem.echeance}
				onChange={this.handleChange}
				placeholder="Enter la date"
			/>
			</FormGroup>
            
			<FormGroup>
			<Label for="commercial">Commercial responsable</Label>
			
                <select>
                <option value = "Colonel Nizar">Colonel Nizar </ option>
				<option value = "Ikram">Adm/Chef Ikram </ option>
				<option value = "Cne Radhouen">Cne Radhouen </ option>
				<option value = "Lt Sofienne" selected>Lt Sofienne </ option> 
				<option value = "Adj/C Brahim">Adj/C Brahim </ option>
				<option value = "Adj/M Chabchoub">Adj/M Chabchoub </ option>
				<option value = "Chef Imed">Sgt/C Imed </ option>   
                </select>
			</FormGroup>

			{/* 3 completed label */}
			<FormGroup check>
			<Label for="completed">
				<Input
				type="checkbox"
				name="completed"
				checked={this.state.activeItem.completed}
				onChange={this.handleChange}
				/>
				Completed
			</Label>
			</FormGroup>
		</Form>
		</ModalBody>
		{/* create a modal footer */}
		<ModalFooter>
		<Button color="success" onClick={() => onSave(this.state.activeItem)}>
			Enregistrer
		</Button>
		</ModalFooter>
	</Modal>
	);
}
}
export default CustomModal
