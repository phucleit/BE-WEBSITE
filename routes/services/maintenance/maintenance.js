const router = require("express").Router();
const maintenanceServicesController = require("../../../controllers/services/maintenance/controller")

router.post("/", maintenanceServicesController.addMaintenanceServices);
router.get("/", maintenanceServicesController.getMaintenanceServices);
router.get("/:id", maintenanceServicesController.getDetailMaintenanceServices);
router.delete("/:id", maintenanceServicesController.deleteMaintenanceServices);
router.put("/:id", maintenanceServicesController.updateMaintenanceServices);
router.get("/expired/all", maintenanceServicesController.getMaintenanceServicesExpired);
router.get("/expiring/all", maintenanceServicesController.getMaintenanceServicesExpiring);

module.exports = router;