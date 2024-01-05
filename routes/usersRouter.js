const express = require('express');


const router = express.Router();


const userController = require('../controllers/userController');
const Home = require('../controllers/homeController');
const { protect } = require('../controllers/authController')
const userUpload = require('../utils/userUpload')


/* users router listing. */
router
.route('/')
.get(protect, userController.getAllUsers)
.post(protect, userController.createOneUser)

router
.route('/:id')
.get(protect, userController.getOne)
.patch(
    protect, 
    userUpload.userUploadImage,
    userUpload.resizeUserImage,
    userController.updateMe
    )
.delete(
    protect, 
    userController.deleteOne
    )


router
.route('/')
.get(Home)

module.exports = router;
