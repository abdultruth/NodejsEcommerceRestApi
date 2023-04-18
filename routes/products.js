const express = require('express');
const router = express.Router();
const {getAllActiveProduct, createOne, deleteOne, updateOne, getOne} = require('../controllers/productController');
const Home = require('../controllers/homeController');




/* GET users listing. */
router.get('/', getAllActiveProduct);
router.get('/:id', getOne);

router.post('/', createOne);

router.patch('/:id', updateOne);

router.delete('/:id', deleteOne);

module.exports = router;