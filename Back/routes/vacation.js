var express = require('express');
const router = express.Router();
const {
  getAllVacations,
  getVacation,
  createVacation,
  deleteVacation,
  editVacation,
  onFollow,
  removeFollow,
} = require('../controllers/vacation');

router.get('/', getAllVacations);
// localhost:3002/vacations/61b87525a7d2a89f0a8afb22
router.get('/:vacationID', getVacation);
router.post('/', createVacation);
router.delete('/:vacationID', deleteVacation);
router.patch('/:vacationID', editVacation);
router.patch('/onFollow/:vacationID', onFollow);
router.patch('/removeFollow/:vacationID', removeFollow);


module.exports = router;
