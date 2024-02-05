const router = require("express").Router();
const domainServicesController = require("../../../controllers/services/domain/controller")

router.post("/", domainServicesController.addDomainServices);
router.get("/", domainServicesController.getDomainServices);
router.get("/:id", domainServicesController.getDetailDomainServices);
router.delete("/:id", domainServicesController.deleteDomainServices);
router.put("/:id", domainServicesController.updateDomainServices);
router.get("/expired/all", domainServicesController.getDomainServicesExpired);
router.get("/expiring/all", domainServicesController.getDomainServicesExpiring);
router.get("/before-payment/all", domainServicesController.getDomainServicesBeforePayment);

module.exports = router;