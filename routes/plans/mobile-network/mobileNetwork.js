const router = require("express").Router();
const mobileNetworkPlansController = require("../../../controllers/plans/mobile-network/controller")

router.get("/", mobileNetworkPlansController.getMobileNetworkPlans);
router.post("/", mobileNetworkPlansController.addMobileNetworkPlans);
router.get("/:id", mobileNetworkPlansController.getDetailMobileNetworkPlans);
router.put("/:id", mobileNetworkPlansController.updateMobileNetworkPlans);
router.delete("/:id", mobileNetworkPlansController.deleteMobileNetworkPlans);

module.exports = router;