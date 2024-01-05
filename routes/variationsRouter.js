const express = require('express');
const router = express.Router();
const {getAllActiveVariation, getOne, createOne, deleteOne, updateOne} = require('../controllers/variationController');



/* GET users listing. */
router
.route('/')
.get(getAllActiveVariation)
.post(createOne)

router
.route('/id')
// .get(getOne)
.patch(updateOne)
.delete(deleteOne)

module.exports = router;
