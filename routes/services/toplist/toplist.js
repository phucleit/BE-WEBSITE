const router = require("express").Router();
const toplistServicesController = require("../../../controllers/services/toplist/controller")

router.post("/", toplistServicesController.addToplistService);
router.get("/", toplistServicesController.getToplistService);
router.get("/:id", toplistServicesController.getDetailToplistService);
router.delete("/:id", toplistServicesController.deleteToplistService);
router.put("/:id", toplistServicesController.updateToplistService);
router.get("/expired/all", toplistServicesController.getToplistServiceExpired);
router.get("/expiring/all", toplistServicesController.getToplistServiceExpiring);

module.exports = router;