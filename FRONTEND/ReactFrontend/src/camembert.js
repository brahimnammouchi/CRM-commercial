import React, { useState } from "react";
import data from "./views/data";
import Dashboard from "./Dashboard";

function App() {
  const [data, setData] = useState({ invoiceTotal: 0, complaintsTotal: 0 });

  const handleDataExtract = (extractedData) => {
    setData(extractedData);
  };

  return (
    <div>
      <ExcelToJson onDataExtract={handleDataExtract} />
      <Dashboard invoiceTotal={data.invoiceTotal} complaintsTotal={data.complaintsTotal} />
    </div>
  );
}

export default App;
