const router = require("express").Router();
const customerController = require("../../controllers/customers/controller");

router.post("/", customerController.addCustomer);
router.get("/", customerController.getCustomer);
router.get("/:id", customerController.getDetailCustomer);
router.delete("/:id", customerController.deleteCustomer);
router.put("/:id", customerController.updateCustomer);

module.exports = router;