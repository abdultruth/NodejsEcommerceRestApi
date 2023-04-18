const express = require('express');
const router = express.Router();
const {getAllActiveVariation, createOne, deleteOne, updateOne} = require('../controllers/variationController');



/* GET users listing. */
router.get('/', getAllActiveVariation);

router.post('/', createOne);

router.patch('/:id', updateOne);

router.delete('/:id', deleteOne);

module.exports = router;