const router = require("express").Router();
const serverController = require("../../controllers/suppliers/server/controller");

router.get("/", serverController.getServer);
router.post("/", serverController.addServer);
router.get("/:id", serverController.getDetailServer);
router.put("/:id", serverController.updateServer);
router.delete("/:id", serverController.deleteServer);

module.exports = router;