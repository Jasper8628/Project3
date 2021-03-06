const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const admin = require("firebase-admin");
var serviceAccount = require("./project3-6c48c-firebase-adminsdk-yr5ne-e7a105743c.json");
const db = require("./models");
const path=require("path");


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  // app.all('*',(req, res) => {
  //   res.sendFile(path.join(__dirname, 'client/build/index.html'));
  //   });
}
// Add routes, both API and view
app.use(routes);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project3-6c48c.firebaseio.com"
});


/////////////////////   testing FCM ////////////////////////
// app.post("/api/fire/reply", (req, res) => {
//   const {addressLine1,addressLine2,lat,lng}=req.body;
//   console.log(lat,lng);
//   console.log(addressLine1,addressLine2);
//   const requestID=req.body.request;
//   const sender = req.body.sender;
//   const userName=req.body.user;
//   console.log(userName);
//   const id = JSON.stringify(req.body.id);
//   console.log("json request list: ", sender, id);
//   db.User
//     .findOne({ name: sender })
//     .then(user => {
//       const token = user.fireToken;
//       const message = {
//         data: {
//           msg: "Your neighbor has replied with the shopping list",
//           request: requestID,
//           name: id,
//           user:userName,
//           line1:addressLine1,
//           line2:addressLine2,
//           lat:JSON.stringify(lat),
//           lng:JSON.stringify(lng)
//         },
//         token: token
//       }
//       admin.messaging().send(message)
//         .then((res) => {
//           console.log("fire reply: ", res)
//         })
//         .catch(err => console.log(err));
//     })
//     .catch(err => console.log(err));
// });

// app.post("/api/fire", (req, res) => {
//   const token = req.body.token;
//   const name = req.body.name;
//   const id = req.body.id;
//   const message = {
//     data: {
//       msg: `${name} from your neighborhood is going to the shops,\n \n any requests?`,
//       name: name,
//       request: "none"
//     },
//     token: token
//   }
//   console.log("fire:", name);
//   admin.messaging().send(message)
//     .then((res) => {
//       console.log("admin msg:", res)
//     })
//     .catch(err => console.log(err));

// })

// app.post("/api/fire/pause", (req, res) => {
//   const email = req.body.email;
//   const postCode = req.body.postCode;
//   const radius = req.body.radius;
//   const { lat, lng } = req.body;
//   const tokens = [];
//   db.User
//     .find({ email: email })
//     .then(users => {
//       tokens = users.map(user => {
//         if ((user.lat - lat) <= radius && (user.lng - lng) <= radius) {
//           return user.fireToken
//         }
//       })
//       res.json();
//       const message = {
//         data: {
//           msg: "hello big thanks to firebase",
//           email: email
//         },
//         token: tokens
//       }
//       admin.messaging().send(message)
//         .then((res) => {
//           console.log(res)
//         })
//         .catch(err => console.log(err));
//     })
//     .catch(err => res.status(422).json(err));
//   //const token=req.body.token;
// })

///////////////////////////////////////

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
