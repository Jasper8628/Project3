const router = require("express").Router();
const bookRoutes = require("./books");
const userRoutes=require("./user");
const orderRoutes=require("./order");
const firebaseRoutes=require("./fire");

// Book routes
router.use("/books", bookRoutes);
router.use("/user",userRoutes);
router.use("/order",orderRoutes);
router.use("/fire",firebaseRoutes);
module.exports = router;
