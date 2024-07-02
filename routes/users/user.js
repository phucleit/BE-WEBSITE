const router = require("express").Router();
const userController = require("../../controllers/users/controller");

router.post("/", userController.addUser);
router.get("/", userController.getUser);
router.get("/:id", userController.getDetailUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);

module.exports = router;