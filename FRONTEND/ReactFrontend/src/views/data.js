import React, { Component } from "react";
import * as XLSX from "xlsx";

class ExcelToJson extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
    };
  }

  handleFileChange = (e) => {
    const file = e.target.files[0];
    this.setState({ file });
  };

  readFile = () => {
    const { file } = this.state;

    if (!file) {
      console.error("No file selected.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const csvData = XLSX.utils.sheet_to_csv(sheet, { header: 1 });
      const jsonData = this.convertToJson(csvData);

      console.log("CSV Data: ", csvData); // Raw CSV data
      console.log("JSON Data: ", jsonData); // Converted JSON data
    };
    reader.readAsBinaryString(file);
  };

  convertToJson = (csv) => {
    const lines = csv.split("\n").filter((line) => line.trim()); // Remove empty lines
    const headers = lines[0].split(",").map((header) => header.trim());
    const data = lines.slice(1).map((line) => {
      const values = line.split(",");
      return headers.reduce((acc, header, index) => {
        acc[header] = values[index]?.trim();
        return acc;
      }, {});
    });

    return data; // JSON data as a JavaScript array of objects
  };

  render() {
    return (
      <div>
        <input
          type="file"
          accept=".xlsx, .xls, .csv"
          onChange={this.handleFileChange}
        />
        <button onClick={this.readFile} disabled={!this.state.file}>
          Read File
        </button>
      </div>
    );
  }
}

export default ExcelToJson;
