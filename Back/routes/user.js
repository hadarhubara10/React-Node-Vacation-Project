const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createUser,
  verifyTokenGoogle,
  signIn,
  checkToken,
  changeName,
  deleteUser,
  editUser,
} = require('../controllers/user');
const verifyToken = require('../middleware/verifyToken');

router.get('/', getAllUsers);
router.post('/', createUser);
router.delete('/:userID', deleteUser);
router.patch('/:userID', editUser);
// Auth
router.post('/signUp', createUser);
router.get('/verifyTokenGoogle', verifyTokenGoogle);
router.post('/signin', signIn);
router.post('/checkToken', verifyToken, checkToken);
router.post('/:id/changeName', changeName);

module.exports = router;
