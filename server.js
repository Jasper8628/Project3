const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const admin =require("firebase-admin") ;
var serviceAccount = require("./project3-6c48c-firebase-adminsdk-yr5ne-e7a105743c.json");


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project3-6c48c.firebaseio.com"
});


/////////////////////////////////////////////


app.post("/api/fire",(req,res)=>{
  const token=req.body.token;
  const message={
    data:{
      msg:"hello big thanks to firebase"},
    token:token
  }
  admin.messaging().send(message)
   .then((res)=>{
     console.log(res)
   })
   .catch(err=>console.log(err));
})


///////////////
app.get("/testjwt",(req,res)=>{
  res.json({
    message:"this a jwt text"
  })
});
app.post("/testjwt/posts",verifyToken,(req,res)=>{
  jwt.verify(req.token,'secretkey',(err,authData)=>{
    if(err){
      res.sendStatus(403)
    } else { 
       res.json({
      message:"post created",
      authData
    });
    }
  });
});
app.post("/testjwt/login",(req,res)=>{
  const user={
    id:1,
    username:"jd",
    email:"jd@gmail.com"
  }
  jwt.sign({user:user},"secretkey",{expiresIn:'30s'},(err,token)=>{
    console.log(err);
    res.json({
      token:token
    });
  });
});
function verifyToken(req,res,next){
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !=="undefined"){
    const bearer = bearerHeader.split(" ");
    const bearerToken=bearer[1];
    req.token = bearerToken;
    next();

  } else {
    res.sendStatus(403);
  }

}
///////////////////////////////////////

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
