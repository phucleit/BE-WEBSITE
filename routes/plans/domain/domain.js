const router = require("express").Router();
const domainPlansController = require("../../../controllers/plans/domain/controller")

router.post("/", domainPlansController.addDomainPlans);
router.get("/", domainPlansController.getDomainPlans);
router.get("/:id", domainPlansController.getDetailDomainPlans);
router.delete("/:id", domainPlansController.deleteDomainPlans);
router.put("/:id", domainPlansController.updateDomainPlans);

module.exports = router;