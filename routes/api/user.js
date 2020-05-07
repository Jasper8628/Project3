const router = require("express").Router();
const userController = require("../../controllers/userController");
const {withJWTAuthMiddleware} = require("express-kun");
const config=require("config");
const protectedRouter = withJWTAuthMiddleware(router,config.get("jwtSecret"));
const auth = require("../../middleware/auth");

// Matches with "/api/books"
// router.get("/",(req,res)=>{
//     res.send("testing user.js")
// });
// router.post("/",(req,res)=>{
//     console.log(req.body)
//     const {name,email,password} =req.body;

//     res.send("posts");
// });



router
.route("/")
.get( userController.findAll)
.put(userController.delete)
.post(userController.register);
router
.route("/auth")
.post(userController.login);

router
.get("/lookup/:id",userController.findAll);
router
.get("/checkname/:id",userController.checkName);
router
.get("/checkemail/:id",userController.checkEmail);

// Matches with "/api/books/:id"


router
//.route("/:id")
//.get(userController.findById)
.get("/:id",auth,userController.get)
.put("/:id",auth, userController.update)
.post("/:id",auth, userController.create)
.delete("/:id",auth, userController.remove);



// protectedRouter.put("/:id",userController.update);
// protectedRouter.post("/:id",userController.create);
// protectedRouter.delete("/:id",userController.remove);


module.exports = router;


