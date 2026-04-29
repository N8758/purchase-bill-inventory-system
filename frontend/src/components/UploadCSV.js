import { useState } from "react";
import Papa from "papaparse";
import API from "../api";
import "./UploadCSV.css";

export default function UploadCSV() {
  const [data, setData] = useState([]);

  const handleFile = (e) => {
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (res) => setData(res.data)
    });
  };

  const handleEdit = (i, key, value) => {
    const newData = [...data];
    newData[i][key] = value;
    setData(newData);
  };

  const save = async () => {
    await API.post("/products/save", data);
    alert("Saved");
    setData([]);
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">Upload CSV</h2>

      <input
        type="file"
        onChange={handleFile}
        className="file-input"
      />

      {data.length > 0 && (
        <table className="upload-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td><input className="input-field" value={row.name || ""} onChange={(e) => handleEdit(i, "name", e.target.value)} /></td>
                <td><input className="input-field" value={row.sku || ""} onChange={(e) => handleEdit(i, "sku", e.target.value)} /></td>
                <td><input className="input-field" value={row.quantity || ""} onChange={(e) => handleEdit(i, "quantity", e.target.value)} /></td>
                <td><input className="input-field" value={row.price || ""} onChange={(e) => handleEdit(i, "price", e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {data.length > 0 && (
        <button className="upload-btn" onClick={save}>
          Save to DB
        </button>
      )}
    </div>
  );
}