const router = require("express").Router();
const bookRoutes = require("./books");
const userRoutes=require("./user");
const orderRoutes=require("./order");

// Book routes
router.use("/books", bookRoutes);
router.use("/user",userRoutes);
router.use("/order",orderRoutes);

module.exports = router;
