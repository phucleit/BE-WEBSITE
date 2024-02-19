const router = require("express").Router();
const mobileNetworkController = require("../../controllers/suppliers/mobile-network/controller");

router.get("/", mobileNetworkController.getMobileNetwork);
router.post("/", mobileNetworkController.addMobileNetwork);
router.get("/:id", mobileNetworkController.getDetailMobileNetwork);
router.put("/:id", mobileNetworkController.updateMobileNetwork);
router.delete("/:id", mobileNetworkController.deleteMobileNetwork);

module.exports = router;