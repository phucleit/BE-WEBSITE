const router = require("express").Router();
const serverPlansController = require("../../../controllers/plans/server/controller")

router.post("/", serverPlansController.addServerPlans);
router.get("/", serverPlansController.getServerPlans);
router.get("/:id", serverPlansController.getDetailServerPlans);
router.delete("/:id", serverPlansController.deleteServerPlans);
router.put("/:id", serverPlansController.updateServerPlans);

module.exports = router;