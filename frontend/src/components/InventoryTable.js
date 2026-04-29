import { useEffect, useState } from "react";
import API from "../api";
import "./InventoryTable.css";


import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function InventoryTable() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [originalProducts, setOriginalProducts] = useState([]);

  const load = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
    setOriginalProducts(res.data); 
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (id, field, value) => {
    const updated = products.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    );
    setProducts(updated);
  };

  const updateProduct = async (p) => {
    await API.put(`/products/${p.id}`, p);
    alert("Updated");
    load();
  };

  const totalAmount = products.reduce(
    (sum, p) => sum + (p.quantity * p.price),
    0
  );

  const downloadPDF = async () => {
  const doc = new jsPDF();

  const invoiceNo = "INV-" + String(products[0]?.id || Date.now()).padStart(5, "0");

  doc.setFontSize(18);
  doc.text("My Company Pvt Ltd", 14, 10);

  doc.setFontSize(12);
  doc.text("Invoice", 160, 10);

  const date = new Date().toLocaleDateString();
  doc.text(`Date: ${date}`, 14, 20);
  doc.text(`Invoice No: ${invoiceNo}`, 14, 26);

  const tableColumn = ["Product", "SKU", "Qty", "Price", "Total"];

  const tableRows = originalProducts.map(p => [
    p.name,
    p.sku,
    p.quantity,
    p.price,
    p.quantity * p.price
  ]);

  autoTable(doc, {
    startY: 35,
    head: [tableColumn],
    body: tableRows
  });

  const finalY = doc.lastAutoTable.finalY || 100;

  doc.setFontSize(14);
  const total = originalProducts.reduce(
  (sum, p) => sum + (p.quantity * p.price),
  0
);

doc.text(`Total Amount: Rs ${total.toLocaleString()}`, 14, finalY + 10);
  doc.setFontSize(10);
  doc.text("Thank you for your business!", 14, finalY + 20);

  doc.save("invoice.pdf");
  await API.delete("/products/clear");   // clear DB
  setProducts([]);                       
};

  return (
    <div>
      <h2>Inventory</h2>

      <h3>Total Bill: ₹{totalAmount}</h3>
      <div className="toolbar">
  <input
    type="text"
    placeholder="Search product..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="search-input"
  />

  
</div>
      <button onClick={downloadPDF}>Download PDF</button>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products
  .filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )
  .map((p) => (
            <tr key={p.id}>
              <td>
                <input
                  value={p.name}
                  onChange={(e) => handleChange(p.id, "name", e.target.value)}
                />
              </td>

              <td>{p.sku}</td>

              <td>
                <input
                  value={p.quantity}
                  onChange={(e) => handleChange(p.id, "quantity", e.target.value)}
                />
              </td>

              <td>{p.quantity * p.price}</td>

              <td>
                {p.quantity < 50 ? (
                  <span className="low">Low Stock</span>
                ) : (
                  <span className="ok">OK</span>
                )}
              </td>

              <td>
                <button onClick={() => updateProduct(p)}>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}