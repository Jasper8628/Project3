const db = require("../models");
const admin = require("firebase-admin");
module.exports = {
    send: function (req,res) {
        const token = req.body.token;
        const name = req.body.name;
        const id = req.body.id;
        const message = {
          data: {
            msg: `${name} from your neighborhood is going to the shops,\n \n any requests?`,
            name: name,
            request: "none"
          },
          token: token
        }
        console.log("fire:", name);
        admin.messaging().send(message)
          .then((res) => {
            console.log("admin msg:", res)
          })
          .catch(err => console.log(err));

    },
    reply: function (req,res) {
        const { addressLine1, addressLine2, lat, lng,sender} = req.body;
        const requestID = req.body.request;
        const userName = req.body.user;
        console.log("logging requestID: ",requestID);
        db.User
            .findOne({ name: sender })
            .then(user => {
                const token = user.fireToken;
                const message = {
                    data: {
                        msg: `Your neighbor ${userName} has replied with a request`,
                        request: requestID,
                        user: userName,
                        line1: addressLine1,
                        line2: addressLine2,
                        lat: JSON.stringify(lat),
                        lng: JSON.stringify(lng),
                        type:"reply"
                    },
                    token: token
                }
                admin.messaging().send(message)
                    .then((res) => {
                        console.log("fire reply: ", res)
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));

    },
    confirm: function (req,res) {
        const {name,to}=req.body;
        db.User
        .findOne({name:to})
        .then(user=>{
            const token=user.fireToken;
            const message={
                data:{
                    msg:`${name} has confirmed your request`,
                    type:"confirm"
                },
                token:token
            }
            admin.messaging().send(message)
            .then(res=>{
                console.log("confirm msg: ",res)
            })
            .catch(err=>console.log(err));
        })
        .catch(err=>console.log(err));

    }
}