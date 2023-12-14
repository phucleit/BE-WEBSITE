const router = require("express").Router();
const domainServicesController = require("../../../controllers/services/domain/controller")

router.post("/", domainServicesController.addDomainServices);
router.get("/", domainServicesController.getDomainServices);
router.get("/:id", domainServicesController.getDetailDomainServices);
router.delete("/:id", domainServicesController.deleteDomainServices);
router.put("/:id", domainServicesController.updateDomainServices);

module.exports = router;