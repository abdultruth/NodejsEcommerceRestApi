const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Home = require('../controllers/homeController');


/* users router listing. */
router
.route('/')
.get(userController.getAllUsers)
.post(userController.createOneUser)

router
.route('/:id')
.get(userController.getOne)
.patch(userController.updateOne)
.delete(userController.deleteOne)

router.get('/cool', Home);

module.exports = router;
