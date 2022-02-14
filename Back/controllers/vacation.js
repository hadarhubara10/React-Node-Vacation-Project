const mongoose = require('mongoose');
// const vacation = require('../models/vacation');
// const product = require('../models/product');
const Vacation = require('../models/vacation');
// const Category = require('../models/category');
module.exports = {
  getAllVacations: (req, res) => {
    Vacation.find()
      // .populate('categoryID', 'title')
      .then((vacation) => {
        res.status(200).json(vacation);
      })
      .catch((err) =>
        res.status(500).json({
          err,
        })
      );
  },
  getVacation: (req, res) => {
    const vacationID = req.params.vacationID;
    Vacation.findById(vacationID)
      .then((vacation) => {
        console.log(vacation);
        res.status(200).json({ vacation });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  },
  createVacation: async (req, res) => {
    const { description, location, image, date, price } = req.body;

    const vacationDetails = new Vacation({
      _id: mongoose.Types.ObjectId(),
      description,
      location,
      image,
      date,
      price,
      followersID: [],
    });
    vacationDetails
      .save()
      .then(() => {
        req.io.emit('VacationsUpdate');
        return res.status(201).json(vacationDetails);
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });
  },
  deleteVacation: (req, res) => {
    // console.log(req.io);
    const { vacationID } = req.params;
    const validID = mongoose.Types.ObjectId.isValid(vacationID);
    if (!validID) return res.status(400).json('Vacation not found');
    Vacation.findByIdAndDelete(vacationID)
      .then(() => {
        req.io.emit('VacationsUpdate');
        return res.status(200).json('Vacation deleted');
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  },
  editVacation: (req, res) => {
    const vacationID = req.params.vacationID;
    const validID = mongoose.Types.ObjectId.isValid(vacationID);
    if (!validID) {
      return res.status(404).json({ message: 'Vacation not found' });
    }
    const bodyToChange = req.body;
    console.log(bodyToChange);
    Vacation.findByIdAndUpdate(
      vacationID,
      bodyToChange,
      { new: true },
      (err, doc) => {
        if (err) return res.status(400).json(err);
        req.io.emit('VacationsUpdate');
        return res.status(201).json(doc);
      }
    );
  },
  onFollow: async (req, res) => {
    const { vacationID } = req.params;
    const { userID } = req.body;

    Vacation.findByIdAndUpdate(
      vacationID,
      { $push: { followersID: userID } },
      { new: true },
      (err, document) => {
        if (err) return res.status(400).json('Error');
        return res.status(200).json(document);
      }
    );
  },
  removeFollow: (req, res) => {
    const { vacationID } = req.params;
    const { userID } = req.body;

    Vacation.findByIdAndUpdate(
      vacationID,
      { $pull: { followersID: userID } },
      { new: true },
      (err, document) => {
        if (err) return res.status(400).json('Error');
        return res.status(200).json(document);
      }
    );
  },
};
