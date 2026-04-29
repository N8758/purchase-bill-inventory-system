import UploadCSV from "../components/UploadCSV";
import InventoryTable from "../components/InventoryTable";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Inventory Management</h1>

      <div className="dashboard-section">
        <UploadCSV />
      </div>

      <div className="dashboard-section">
        <InventoryTable />
      </div>
    </div>
  );
}