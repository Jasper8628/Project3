const router = require("express").Router();
const orderController = require("../../controllers/orderController");

router.route("/")
  .get(orderController.findAll)
  .post(orderController.create);
router.route("/accept")
  .post(orderController.accept);

router
  .route("/:id")
  .get(orderController.findById)
  .put(orderController.update)
  .delete(orderController.remove);

module.exports = router;