const express = require('express');
const router = express.Router();
const {getAllActiveCategory, createOne, deleteOne, updateOne} = require('../controllers/categoryController');



/* GET users listing. */
router.get('/', getAllActiveCategory);

router.post('/', createOne);

router.patch('/:id', updateOne);

router.delete('/:id', deleteOne);

module.exports = router;