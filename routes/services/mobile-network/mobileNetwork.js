const router = require("express").Router();
const mobileNetworkServicesController = require("../../../controllers/services/mobile-network/controller")

router.get("/", mobileNetworkServicesController.getMobileNetworkServices);
router.post("/", mobileNetworkServicesController.addMobileNetworkServices);
router.get("/:id", mobileNetworkServicesController.getDetailMobileNetworkServices);
router.put("/:id", mobileNetworkServicesController.updateMobileNetworkServices);
router.delete("/:id", mobileNetworkServicesController.deleteMobileNetworkServices);
router.get("/expired/all", mobileNetworkServicesController.getMobileNetworkServicesExpired);
router.get("/expiring/all", mobileNetworkServicesController.getMobileNetworkServicesExpiring);

module.exports = router;