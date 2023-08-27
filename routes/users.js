const express = require('express');
const router = express.Router();


const userController = require('../controllers/userController');
const Home = require('../controllers/homeController');
const { protect } = require('../controllers/authController')


/* users router listing. */
router
.route('/')
.get(protect, userController.getAllUsers)
.post(protect, userController.createOneUser)

router
.route('/:id')
.get(protect, userController.getOne)
.patch(protect, userController.updateOne)
.delete(protect, userController.deleteOne)

router
.route('/')
.get(Home)

module.exports = router;
