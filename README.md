# 🧾 Inventory + Purchase Billing Module

A mini full-stack application to manage inventory and generate purchase bills for an eCommerce SaaS system.

---

## 🚀 Features

* 📂 Upload CSV purchase bill
* 🔍 Parse and preview data before saving
* ✏️ Edit rows before importing
* 💾 Save data to PostgreSQL database
* 📊 Inventory dashboard
* ⚠️ Low stock indicator (stock < 50)
* 🔎 Search products by name/SKU
* 🧾 Generate PDF invoice (with invoice number)

---

## 🛠 Tech Stack

**Frontend**

* React.js
* Axios
* PapaParse (CSV parsing)
* jsPDF + jspdf-autotable (PDF generation)

**Backend**

* Node.js
* Express.js

**Database**

* PostgreSQL

---

## 📁 Project Structure

```
inventory-app/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── productController.js
│   ├── routes/
│   │   └── productRoutes.js
│   └── app.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadCSV.js
│   │   │   ├── InventoryTable.js
│   │   │   ├── UploadCSV.css
│   │   │   └── InventoryTable.css
│   │   ├── pages/
│   │   │   └── Dashboard.js
│   │   └── api.js
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```
git clone <your-repo-link>
cd inventory-app
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/inventory
```

Run server:

```
node app.js
```

---

### 3️⃣ Database Setup (PostgreSQL)

Open PostgreSQL and run:

```
CREATE DATABASE inventory;

\c inventory;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  sku TEXT UNIQUE,
  quantity INT DEFAULT 0,
  price NUMERIC DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 4️⃣ Frontend Setup

```
cd frontend
npm install
npm start
```

---

## 📌 API Endpoints

| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| GET    | /api/products      | Get all products |
| POST   | /api/products/save | Save CSV data    |
| PUT    | /api/products/:id  | Update product   |

---

## 📂 CSV Format

Example:

```
name,sku,quantity,price
Shampoo,SKU001,10,100
Soap,SKU002,20,50
```

---

## 🧠 Key Functionalities

### ✔ CSV Upload Flow

* User uploads CSV
* Data is parsed using PapaParse
* Preview shown in UI
* Editable before saving

### ✔ Inventory Management

* Data stored in PostgreSQL
* Low stock detection (<50)

### ✔ Billing Module

* Calculates total = quantity × price
* Displays total bill
* Generates PDF invoice with:

  * Invoice number
  * Date
  * Product table
  * Total amount

### ✔ Duplicate Handling

* Uses PostgreSQL constraint on SKU
* Skips duplicate entries using:

```
ON CONFLICT (sku) DO NOTHING
```

---

## 📸 Screenshots

(Add screenshots here if needed)

---

## 🚀 Future Improvements

* Deployment (Vercel + Render + Supabase)
* Advanced invoice design
* Customer details in billing
* Pagination and filters
* Authentication system

---

## 👨‍💻 Author

Developed by [Your Name]

---

## ⭐ Notes

* Designed with clean architecture
* Focus on real-world SaaS use case
* No ORM used (pure SQL queries)
* Simple and scalable structure

---
