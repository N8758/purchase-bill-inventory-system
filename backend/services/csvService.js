exports.cleanData = (row) => ({
  name: row.name || "",
  sku: row.sku || "",
  quantity: Number(row.quantity) || 0,
  price: Number(row.price) || 0
});