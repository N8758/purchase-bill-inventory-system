const router = require("express").Router();
const controller = require("../controllers/productController");

router.get("/", controller.getProducts);
router.post("/save", controller.saveProducts);
router.put("/:id", controller.updateProduct);
router.delete("/clear", controller.clearProducts);

module.exports = router;