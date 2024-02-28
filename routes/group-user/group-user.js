const router = require("express").Router();
const groupUserController = require("../../controllers/group-user/controller");

router.get("/", groupUserController.getGroupUser);
router.post("/", groupUserController.addGroupUser);
router.get("/:id", groupUserController.getDetailGroupUser);
router.put("/:id", groupUserController.updateGroupUser);
router.delete("/:id", groupUserController.deleteGroupUser);

module.exports = router;