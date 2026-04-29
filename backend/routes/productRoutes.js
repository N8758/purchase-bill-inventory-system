const router = require("express").Router();
const controller = require("../controllers/productController");

router.get("/", controller.getProducts);
router.post("/save", controller.saveProducts);
router.put("/:id", controller.updateProduct);

module.exports = router;