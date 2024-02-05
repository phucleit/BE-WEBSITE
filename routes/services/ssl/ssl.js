const router = require("express").Router();
const sslServicesController = require("../../../controllers/services/ssl/controller")

router.post("/", sslServicesController.addSslServices);
router.get("/", sslServicesController.getSslServices);
router.get("/:id", sslServicesController.getDetailSslServices);
router.delete("/:id", sslServicesController.deleteSslServices);
router.put("/:id", sslServicesController.updateSslServices);
router.get("/expired/all", sslServicesController.getSslServicesExpired);
router.get("/expiring/all", sslServicesController.getSslServicesExpiring);
router.get("/before-payment/all", sslServicesController.getSslServicesBeforePayment);

module.exports = router;