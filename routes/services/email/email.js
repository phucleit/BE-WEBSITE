const router = require("express").Router();
const emailServicesController = require("../../../controllers/services/email/controller")

router.post("/", emailServicesController.addEmailServices);
router.get("/", emailServicesController.getEmailServices);
router.get("/:id", emailServicesController.getDetailEmailServices);
router.delete("/:id", emailServicesController.deleteEmailServices);
router.put("/:id", emailServicesController.updateEmailServices);
router.get("/expired/all", emailServicesController.getEmailServicesExpired);
router.get("/expiring/all", emailServicesController.getEmailServicesExpiring);

module.exports = router;