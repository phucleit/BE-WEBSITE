const router = require("express").Router();
const maintenancePlansController = require("../../../controllers/plans/maintenance/controller")

router.post("/", maintenancePlansController.addMaintenancePlans);
router.get("/", maintenancePlansController.getMaintenancePlans);
router.get("/:id", maintenancePlansController.getDetailMaintenancePlans);
router.delete("/:id", maintenancePlansController.deleteMaintenancePlans);
router.put("/:id", maintenancePlansController.updateMaintenancePlans);

module.exports = router;