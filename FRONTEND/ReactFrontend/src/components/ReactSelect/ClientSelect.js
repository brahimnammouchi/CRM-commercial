import React, { Component } from "react";
import AsyncSelect from "react-select/async";

class ClientSelect extends Component {
  fetchData = (inputValue, callback) => {
    fetch(`http://127.0.0.1:8000/api/Client/${inputValue}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        const tempArray = [];
        if (data) {
          // Check if data is an array
          if (Array.isArray(data)) {
            data.forEach((element) => {
              tempArray.push({
                label: `${element.nom} ${element.prenom}`, // Combine first name and surname
                value: element.id, // Keep ID as value for reference
                nom: element.nom, // Add nom for use in CustomModal
                prenom: element.prenom, // Add prenom for use in CustomModal
              });
              
            });
          } else {
            // If data is a single object
            tempArray.push({
              label: `${data.nom} ${data.prenom}`,
              value: data.id,
              nom: data.nom,
              prenom: data.prenom,
            });
          }
        }
        callback(tempArray);
      })
      .catch((error) => {
        console.log(error, "catch the hoop");
      });
  };

  onSearchChange = (selectedOption) => {
    if (selectedOption) {
      // Pass the selected client back to the parent
      this.props.onChange({
        id: selectedOption.value,
        nom: selectedOption.nom,
        prenom: selectedOption.prenom,
      });
      console.log(this.props);

    }
  };

  render() {
    return (
      <div style={{ marginLeft: "40%", width: "200px" }}>
        <AsyncSelect
          // The selected option is handled in the parent component, so no state is necessary here
          loadOptions={this.fetchData}
          placeholder="Sélectionner un client"
          onChange={this.onSearchChange}
          defaultOptions={true}
        />
      </div>
    );
  }
}

export default ClientSelect;
