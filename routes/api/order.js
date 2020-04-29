const router = require("express").Router();
const orderController = require("../../controllers/orderController");

// Matches with "/api/books"
router.route("/")
  .get(orderController.findAll)
  .post(orderController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(orderController.findById)
  .put(orderController.update)
  .delete(orderController.remove);

module.exports = router;