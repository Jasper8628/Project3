const db = require("../models");
const bcrypt = require("bcrypt");
const config = require("config");

const jwt = require("jsonwebtoken");
// Defining methods for the booksController
module.exports = {
    findAll: function (req, res) {
        db.User
            .find()
            .then(user => res.json(user))
            .catch(err => res.status(422).json(err));
    },
    checkEmail: function (req, res) {
        console.log(req.params);
        db.User
            .findOne({ email: req.params.id })
            .then(user => {
                if (!user) return res.json({ type: "email", msg: "Valid user email", code: 200 })
                return res.json({ type: "email", msg: "Invalid, user email already registered", code: 400 })
            })
    },
    checkName: function (req, res) {
        console.log(req.params);
        db.User
            .findOne({ name: req.params.id })
            .then(user => {
                if (!user) return res.json({ type: "name", msg: "Valid user name", code: 200 })
                return res.json({ type: "name", msg: "Invalid, user name already in use", code: 400 })
            })
    },



    delete: function (req, res) {
        console.log("wierd:", req.body.name);
        db.User
            .findOne({ name: req.body.name })
            .then(dbModel => {
                console.log(dbModel);
                dbModel.remove()

            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    login: function (req, res) {
        const { email, password } = req.body;
        console.log(req.body);
        db.User
            .findOne({ email: email })
            .then(user => {
                if (!user) return res.status(400).json({ msg: "User does not exit" });
                console.log(user.password);
                console.log(password);
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        console.log(1);
                        if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });
                        jwt.sign(
                            { id: user.id },
                            config.get("jwtSecret"),
                            { expiresIn: 1800 },
                            (err, token) => {
                                console.log(token);
                                res.json({
                                    msg: `${user.name},Welcome!`,
                                    user,
                                    token
                                });
                            }
                        );
                    })
            })
            .catch(err => res.status(422).json(err));
    },
    passwordChange: function (req, res) {
        console.log("logging password change body:",req.body);
        const { id, password, newPassword } = req.body;
        const newUser = {
            password: newPassword
        }
        db.User
            .findOne({ _id: id })
            .then(user => {
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) return res.json({msg: "Incorrect Password, please try again", code: 401 })
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                db.User
                                    .findOneAndUpdate({ _id: id }, newUser, { new: true })
                                    .then(dbModel => res.json(dbModel))
                                    .catch(err => res.status(422).json(err));
                            })
                        })
                    })
                    .catch(err => console.log(err))
            })
    },


    register: function (req, res) {
        console.log("register:", req.body);
        const { name, email, password, fireToken } = req.body;
        const newUser = {
            name: name,
            email: email,
            password: password,
            fireToken: fireToken
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                console.log(hash);
                newUser.password = hash;
                db.User
                    .create(newUser)
                    .then(user => {
                        jwt.sign(
                            { id: user.id },
                            config.get("jwtSecret"),
                            { expiresIn: 1800 },
                            (err, token) => {
                                res.json({
                                    user,
                                    token
                                });
                            }
                        );
                    })
                    .catch(err => res.status(422).json(err));
            });
        })

    },
    get: function (req, res) {
        console.log("user ID:", req.params.id);
        db.User
            .findById({ _id: req.params.id })
            .populate("acceptedList")
            .populate("shoppingList")
            .then(user => res.json(user))
            .catch(err => res.status(422).json(err));
    },

    update: function (req, res) {
        console.log("updating: ",  req.params.id);
        db.User
            .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.User
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.User
            .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .then(dbModel => {
                res.json(dbModel)
            })
            .catch(err => res.status(422).json(err));
    }
};
