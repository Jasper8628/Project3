const router = require("express").Router();
const firebaseController = require("../../controllers/firebaseController");

// Matches with "/api/books"
router
    .post("/", firebaseController.send)
    .post("/reply", firebaseController.reply)
    .post("/confirm", firebaseController.confirm)
    .post("/cancel", firebaseController.cancel);


module.exports = router;