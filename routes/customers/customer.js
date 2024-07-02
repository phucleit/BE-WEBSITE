const router = require("express").Router();
const upload = require('../../middleware/upload');
const customerController = require("../../controllers/customers/controller");
const { check_role } = require("../../middleware/middleware_role");

router.post('/', upload.fields([
  { name: 'image_front_view', maxCount: 1 },
  { name: 'image_back_view', maxCount: 1 },
]), customerController.addCustomer);
router.get("/",  customerController.getCustomer);
router.get("/:id", customerController.getDetailCustomer);
router.get("/domain-service/:id", customerController.getDomainServiceByCustomerId);
router.get("/hosting-service/:id", customerController.getHostingServiceByCustomerId);
router.get("/email-service/:id", customerController.getEmailServiceByCustomerId);
router.get("/ssl-service/:id", customerController.getSslServiceByCustomerId);
router.get("/website-service/:id", customerController.getWebsiteServiceByCustomerId);
router.get("/content-service/:id", customerController.getContentServiceByCustomerId);
router.get("/toplist-service/:id", customerController.getToplistServiceByCustomerId);
router.get("/maintenance-service/:id", customerController.getMaintenanceServiceByCustomerId);
router.delete("/:id", customerController.deleteCustomer);
router.put('/:id', upload.fields([
  { name: 'image_front_view', maxCount: 1 },
  { name: 'image_back_view', maxCount: 1 },
]), customerController.updateCustomer);

module.exports = router;