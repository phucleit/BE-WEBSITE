const router = require("express").Router();
const contractController = require("../../controllers/contracts/controller");

router.post("/", contractController.addContract);
router.get("/", contractController.getContract);
router.get("/:id", contractController.getDetailContract);
router.delete("/:id", contractController.deleteContract);
router.put("/:id", contractController.updateContract);

module.exports = router;