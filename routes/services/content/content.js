const router = require("express").Router();
const contentServicesController = require("../../../controllers/services/content/controller")

router.post("/", contentServicesController.addContentServices);
router.get("/", contentServicesController.getContentServices);
router.get("/:id", contentServicesController.getDetailContentServices);
router.delete("/:id", contentServicesController.deleteContentServices);
router.put("/:id", contentServicesController.updateContentServices);
router.get("/expired/all", contentServicesController.getContentServicesExpired);
router.get("/expiring/all", contentServicesController.getContentServicesExpiring);

module.exports = router;