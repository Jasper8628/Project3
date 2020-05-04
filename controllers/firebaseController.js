const db = require("../models");
const admin = require("firebase-admin");
module.exports = {


    send: function (req, res) {
        const { name, lat, lng, postcode, radius, token } = req.body;
        let tokens = [];
        const line1s = [];
        // console.log("logging postcode:", postcode)
        db.User
            .find({ postcode: 2016 })
            .then(users => {
                // console.log("logging all users by postcode:", users);
                users.filter(user => {
                    const a = (user.lat - lat) * 111263.0566;
                    const b = (user.lng - lng) * 111263.0566;
                    if (0 < (a * a + b * b) <= radius * radius &&user.name!==name) {
                        tokens.push(user.fireToken);
                    }
                });
                console.log("logging all tokens:", tokens);
                console.log("logging all line1s:", line1s);
                const message = {
                    data: {
                        msg: `${name} from your neighborhood is going to the shops,\n \n any requests?`,
                        name: name,
                        request: "none",
                        type:"send"
                    },
                    tokens: tokens
                }
                admin.messaging().sendMulticast(message)
                    .then((res) => {
                        console.log("admin msg:", res)
                    })
                    .catch(err => console.log(err));
            })
    },

    reply: function (req, res) {
        const { addressLine1, addressLine2, lat, lng, sender } = req.body;
        const requestID = req.body.request;
        const userName = req.body.user;
        console.log("logging requestID: ", requestID);
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
                        type: "reply"
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
    confirm: function (req, res) {
        const { name, to } = req.body;
        db.User
            .findOne({ name: to })
            .then(user => {
                const token = user.fireToken;
                const message = {
                    data: {
                        msg: `${name} has confirmed your request`,
                        type: "confirm"
                    },
                    token: token
                }
                admin.messaging().send(message)
                    .then(res => {
                        console.log("confirm msg: ", res)
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));

    }
}