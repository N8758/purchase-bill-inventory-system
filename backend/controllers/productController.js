const pool = require("../config/db");

exports.getProducts = async (req, res) => {
  const result = await pool.query("SELECT * FROM products ORDER BY id DESC");
  res.json(result.rows);
};

exports.saveProducts = async (req, res) => {
  try {
    const data = req.body;

    for (let p of data) {
      if (!p.name || p.name.trim() === "") continue;

      await pool.query(
  "INSERT INTO products(name, sku, quantity, price) VALUES($1,$2,$3,$4) ON CONFLICT (sku) DO NOTHING",
  [
    p.name,
    p.sku || "",
    Number(p.quantity) || 0,
    Number(p.price) || 0
  ]
);
    }

    res.json({ message: "Saved Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Insert failed" });
  }
};



exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Name required" });
    }

    await pool.query(
      "UPDATE products SET name=$1, quantity=$2 WHERE id=$3",
      [name, Number(quantity) || 0, id]
    );

    res.json({ message: "Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Update failed" });
  }
};



exports.clearProducts = async (req, res) => {
  try {
    await pool.query("DELETE FROM products");
    res.json({ message: "All products deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Delete failed" });
  }
};