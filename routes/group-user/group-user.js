const router = require("express").Router();
const groupUserController = require("../../controllers/group-user/controller");
const { check_role } = require("../../middleware/middleware_role");

// router.get("/", check_role('66714309285e17cd42562bdc'), groupUserController.getGroupUser);
router.get("/", groupUserController.getGroupUser);
router.post("/", groupUserController.addGroupUser);
router.get("/:id", groupUserController.getDetailGroupUser);
router.put("/:id", groupUserController.updateGroupUser);
router.delete("/:id", groupUserController.deleteGroupUser);

module.exports = router;