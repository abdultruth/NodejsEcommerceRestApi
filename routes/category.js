const express = require('express');
const router = express.Router();
const {
       getAllActiveCategory,
       getOne,
       createOne,
       deleteOne,
       updateOne
      } = require('../controllers/categoryController');



/* GET users listing. */
router
.route('/')
.get(getAllActiveCategory)
.post(createOne);

router
.route('/:id')
// .get(getOne)
.patch(updateOne)
.delete(deleteOne);

module.exports = router;
