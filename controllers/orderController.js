const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function (req, res) {
    db.Order
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Order
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    const userID = req.body.userID;
    console.log("order creat:", req.body);
    db.Order
      .create(req.body)
      .then(({ _id }) => db.User.findOneAndUpdate({ _id: userID }, { $push: { shoppingList: _id } }, { new: true }))
      .then(dbModel => {
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  accept: function (req, res) {
    const userID = req.body.userID;
    const requestID=req.body.requestID;
    console.log("order accept:", req.body.userID);
    db.User
      .findOneAndUpdate({ _id: userID }, { $push: { acceptedList: requestID } }, { new: true })
      .then(dbModel => {
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    console.log("logging status: ", req.body);
    db.Order
      .findOneAndUpdate({ _id: req.params.id }, { status: req.body.status })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Order
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};