const express = require('express');
const router = express.Router();
const {
       getAllActiveCategory,
       getOne,
       createOne,
       deleteOne,
       updateOne
      } = require('../controllers/categoryController');

const authController = require('../controllers/authController')



/* GET users listing. */
router
.route('/')
.get(getAllActiveCategory)
.post(createOne);

router
.route('/:id')
.get(
      getOne
    )
.patch(
      authController.protect,
      authController.restrictTo(['admin','staff']), 
      updateOne
      )
.delete(
      authController.protect,
      authController.restrictTo(['admin','staff']), 
      deleteOne
      );

module.exports = router;
