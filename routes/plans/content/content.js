const router = require("express").Router();
const contentPlansController = require("../../../controllers/plans/content/controller")

router.post("/", contentPlansController.addContentPlans);
router.get("/", contentPlansController.getContentPlans);
router.get("/:id", contentPlansController.getDetailContentPlans);
router.delete("/:id", contentPlansController.deleteContentPlans);
router.put("/:id", contentPlansController.updateContentPlans);

module.exports = router;