import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const DataTable = ({ data }) => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pagedData, setPagedData] = useState([]);
  const limit = 10;
  const [basePrice, setBasePrice] = useState(0);
  const [pricePerCreditLine, setPricePerCreditLine] = useState(0);
  const [pricePerCreditScorePoint, setPricePerCreditScorePoint] = useState(0);
  const [subField, setSubField] = useState(false);

  const handleCalculate = async () => {
    console.log("hello");
    const response = await axios.post("http://localhost:3050/calculate", {
      BasePrice: parseFloat(basePrice),
      PricePerCreditLine: parseFloat(pricePerCreditLine),
      PricePerCreditScorePoint: parseFloat(pricePerCreditScorePoint),
    });
    console.log(response.data);
    // setResult(response.data.data);
    setPagedData(response.data.data);
    setTotal(response.data.total);
    setSubField(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3050/data", {
        params: { page, limit },
      });
      setPagedData(response.data.data);
      setTotal(response.data.total);
    };
    if (subField === "false") {
      fetchData();
    } else {
      handleCalculate();
    }
  }, [page,subField]);

  const totalPages = Math.ceil(total / limit);
  // let val = subField==='true'? result : pagedData;
  return (
    <div>
      <div>
        <input
          style={{ padding: "10px", margin: "10px" }}
          type="number"
          placeholder="Base Price"
          onChange={(e) => setBasePrice(e.target.value)}
        />
        <input
          style={{ padding: "10px", margin: "10px" }}
          type="number"
          placeholder="Price Per Credit Line"
          onChange={(e) => setPricePerCreditLine(e.target.value)}
        />
        <input
          style={{ padding: "10px", margin: "10px" }}
          type="number"
          placeholder="Price Per Credit Score Point"
          onChange={(e) => setPricePerCreditScorePoint(e.target.value)}
        />
        <button
          style={{ padding: "6px", margin: "10px" }}
          onClick={handleCalculate}
        >
          Calculate Subscription Prices
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Credit Score</th>
            <th>Credit Lines</th>
            <th>Masked Phone Number</th>
            {subField && <th>Subscription Price</th>}
          </tr>
        </thead>
        <tbody>
          {pagedData.map((row, index) => (
            <tr key={index}>
              <td>{row.Email}</td>
              <td>{row.Name}</td>
              <td>{row.CreditScore}</td>
              <td>{row.CreditLines}</td>
              <td>{row.MaskedPhoneNumber}</td>
              {subField && <td>{row.SubscriptionPrice}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          border: "dashed black",
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            style={{ padding: "8px", color: "black" }}
            key={i}
            onClick={() => setPage(i + 1)}
            disabled={page === i + 1}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
