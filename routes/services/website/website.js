const router = require("express").Router();
const websiteServicesController = require("../../../controllers/services/website/controller")

router.post("/", websiteServicesController.addWebsiteServices);
router.get("/", websiteServicesController.getWebsiteServices);
router.get("/:id", websiteServicesController.getDetailWebsiteServices);
router.delete("/:id", websiteServicesController.deleteWebsiteServices);
router.put("/:id", websiteServicesController.updateWebsiteServices);
router.get("/closed/all", websiteServicesController.getWebsiteServicesClosed);

module.exports = router;