const router = require("express").Router();
const hostingPlansController = require("../../../controllers/plans/hosting/controller")

router.post("/", hostingPlansController.addHostingPlans);
router.get("/", hostingPlansController.getHostingPlans);
router.get("/:id", hostingPlansController.getDetailHostingPlans);
router.delete("/:id", hostingPlansController.deleteHostingPlans);
router.put("/:id", hostingPlansController.updateHostingPlans);

module.exports = router;