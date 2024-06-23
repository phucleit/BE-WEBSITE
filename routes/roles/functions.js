const router = require("express").Router();
const functionsController = require("../../controllers/roles/functions");

router.get("/", functionsController.getFunction);
router.post("/", functionsController.addRole);

module.exports = router;