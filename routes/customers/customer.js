const router = require("express").Router();
const upload = require('../../middleware/upload');
const customerController = require("../../controllers/customers/controller");

router.post('/', upload.fields([
  { name: 'image_front_view', maxCount: 1 },
  { name: 'image_back_view', maxCount: 1 },
]), customerController.addCustomer);
router.get("/", customerController.getCustomer);
router.get("/:id", customerController.getDetailCustomer);
router.delete("/:id", customerController.deleteCustomer);
router.put('/:id', upload.fields([
  { name: 'image_front_view', maxCount: 1 },
  { name: 'image_back_view', maxCount: 1 },
]), customerController.updateCustomer);

module.exports = router;