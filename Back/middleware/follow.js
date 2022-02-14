const Vacation = require('../models/vacation');
module.exports = {
  followPlus: (vacationID) => {
    Vacation.findByIdAndUpdate(
      vacationID,
      {
        $inc: { followers: 1 },
      },
      (err, res) => {
        if (err) console.log(err);
        console.log(res);
      }
    );
  },
  followMinus: (vacationID) => {
    Vacation.findByIdAndUpdate(
      vacationID,
      {
        $inc: { followers: -1 },
      },
      (err, res) => {
        if (err) console.log(err);
        console.log(res);
      }
    );
  },
};
