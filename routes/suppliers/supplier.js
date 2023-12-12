const router = require("express").Router();
const supplierController = require("../../controllers/suppliers/controller");

router.post("/", supplierController.addSupplier);
router.get("/", supplierController.getSupplier);
router.get("/:id", supplierController.getDetailSupplier);
router.delete("/:id", supplierController.deleteSupplier);
router.put("/:id", supplierController.updateSupplier);

module.exports = router;