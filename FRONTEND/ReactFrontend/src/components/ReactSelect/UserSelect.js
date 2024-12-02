import React, { Component } from "react";
import AsyncSelect from "react-select/async";

class UserSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    };
  }

  fetchData = (inputValue, callback) => {
    setTimeout(() => {
      fetch(`http://127.0.0.1:8000/admin/auth/user/?search=${inputValue}`, {
        method: "GET",
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error(`Erreur du serveur: ${resp.statusText}`);
          }
          return resp.json(); // Tente de convertir uniquement si `resp.ok` est vrai
        })
        .then((data) => {
          const options = data.map((element) => ({
            label: element.username, // Assurez-vous d'utiliser la clé correcte
            value: element.id,
          }));
          callback(options);
        })
        .catch((error) => console.error("Erreur lors de l'appel API:", error));
    }, 1000);
  };
  

  onSearchChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.onSelectUser && this.props.onSelectUser(selectedOption);
  };

  render() {
    return (
      <div style={{ marginLeft: "40%", width: "200px" }}>
        <AsyncSelect
          value={this.state.selectedOption}
          loadOptions={this.fetchData}
          placeholder="Admin Name"
          onChange={this.onSearchChange}
          defaultOptions
        />
      </div>
    );
  }
}

export default UserSelect;
