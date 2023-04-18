const express = require('express');
const router = express.Router();
const {createUser, getAllUsers, deleteOne, updateOne} = require('../controllers/userController');
const Home = require('../controllers/homeController');




/* GET users listing. */
router.get('/', getAllUsers);

router.post('/', createUser);

router.patch('/:id', updateOne);

router.delete('/:id', deleteOne);

router.get('/cool', Home);

module.exports = router;
