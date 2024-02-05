const router = require("express").Router();
const hostingServicesController = require("../../../controllers/services/hosting/controller")

router.post("/", hostingServicesController.addHostingServices);
router.get("/", hostingServicesController.getHostingServices);
router.get("/:id", hostingServicesController.getDetailHostingServices);
router.delete("/:id", hostingServicesController.deleteHostingServices);
router.put("/:id", hostingServicesController.updateHostingServices);
router.get("/expired/all", hostingServicesController.getHostingServicesExpired);
router.get("/expiring/all", hostingServicesController.getHostingServicesExpiring);
router.get("/before-payment/all", hostingServicesController.getHostingServicesBeforePayment);

module.exports = router;