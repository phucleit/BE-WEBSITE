const router = require("express").Router();
const sslPlansController = require("../../../controllers/plans/ssl/controller")

router.post("/", sslPlansController.addSslPlans);
router.get("/", sslPlansController.getSslPlans);
router.get("/:id", sslPlansController.getDetailSslPlans);
router.delete("/:id", sslPlansController.deleteSslPlans);
router.put("/:id", sslPlansController.updateSslPlans);

module.exports = router;