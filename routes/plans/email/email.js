const router = require("express").Router();
const emailPlansController = require("../../../controllers/plans/email/controller")

router.post("/", emailPlansController.addEmailPlans);
router.get("/", emailPlansController.getEmailPlans);
router.get("/:id", emailPlansController.getDetailEmailPlans);
router.delete("/:id", emailPlansController.deleteEmailPlans);
router.put("/:id", emailPlansController.updateEmailPlans);

module.exports = router;