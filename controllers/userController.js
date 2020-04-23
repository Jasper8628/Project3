const db = require("../models");
const bcrypt = require("bcrypt");
const config = require("config");
const auth = require("../middleware/auth");

const jwt = require("jsonwebtoken");
// Defining methods for the booksController
module.exports = {
    findAll: function (req, res) {
        db.User
            .findOne(req.query)
            .then(dbModel => {

                res.json(dbModel)
            })
            .catch(err => res.status(422).json(err));
    },

    login: function (req, res) {
        const { email,password } = req.body;
        console.log(req.body);
        db.User
            .findOne({ email: email })
            .then(user => {
                if (!user)  return res.status(400).json({ msg: "User does not exit" });
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
                                    msg:`${user.name},Welcome!`,
                                    user,
                                    token
                                });
                            }
                        );
                    })
            })
            .catch(err => res.status(422).json(err));
    },


    register: function (req, res) {
        console.log("register:",req.body);
        const { name, email, password } = req.body;
        const newUser = {
            name: name,
            email: email,
            password: password
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
    get:function(req,res){
        console.log("user ID:", req.params.id);
        db.User
        .findById({_id:req.params.id})
        .then(user=>res.json(user))
        .catch(err=> res.status(422).json(err));
    },
    
    update: function (req, res) {
        
        db.User
            .findOneAndUpdate({ _id: req.params.id }, req.body)
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
    create:function(req,res){
        db.User
        .findOneAndUpdate({ _id: req.params.id },req.body,{new:true})
        .then(dbModel => {
            res.json(dbModel)
        })
        .catch(err => res.status(422).json(err));
    }
};