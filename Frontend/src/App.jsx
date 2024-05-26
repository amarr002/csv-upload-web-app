import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import DataTable from "./components/DataTable";
// import SubscriptionCalculator from "./components/SubCalculator";

const App = () => {
  const [data, setData] = useState([]);
  return (
    <div>
      <div
        style={{
          backgroundColor: "grey",
          height: "70px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "55px",
        }}
      >
        <h1>CSV Upload and Subscription Pricing Calculator</h1>
      </div>
      <div
        style={{
          height: "80px",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "55px",
          border: "2px black solid",
          marginLeft: "180px",
          marginRight: "180px",
        }}
      >
        <FileUpload onUploadSuccess={setData}/>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "55px",
          marginLeft: "180px",
          marginRight: "180px",
        }}
      >
        {/* <SubscriptionCalculator onButtonSub={setResult} showSubField={setSubField} /> */}
      </div>
      <div
        style={{
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "55px",
          border: "2px blue solid",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default App;
