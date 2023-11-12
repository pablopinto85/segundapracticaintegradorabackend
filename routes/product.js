const express = require('express');
const { productsModel } = require('../models/products.model.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let products = await productsModel.find();
    res.send({ result: 'success', payload: products });
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res) => {
  let { description, image, price, stock } = req.body;
  if (!description || !image || !price || !stock) {
    res.send({ status: 'error', error: 'Missing body params' });
  }
  let result = await productsModel.create({ description, image, price, stock });
  res.send({ result: 'success', payload: result });
});

router.put('/:id_prod', async (req, res) => {
  let { id_prod } = req.params;

  let productsToReplace = req.body;
  if (!productsToReplace.description || !productsToReplace.image || !productsToReplace.price || !productsToReplace.stock) {
    res.send({ status: 'error', error: 'Missing body params' });
  }
  let result = await productsModel.updateOne({ _id: id_prod }, productsToReplace);
  res.send({ result: 'success', payload: result });
});

router.delete('/:id_prod', async (req, res) => {
  let { id_prod } = req.params;
  let result = await productsModel.deleteOne({ _id: id_prod });
  res.send({ result: 'success', payload: result });
});

module.exports = router;
