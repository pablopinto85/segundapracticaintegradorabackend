const express = require('express');
const { messagesModel } = require('../models/messages.model.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let messages = await messagesModel.find();
    res.send({ result: 'success', payload: messages });
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res) => {
  let { user, message } = req.body;
  if (!user || !message) {
    res.send({ status: 'error', error: 'Faltan Parametros' });
  }
  let result = await messagesModel.create({ user, message });
  res.send({ result: 'success', payload: result });
});

router.put('/:id_msg', async (req, res) => {
  let { id_msg } = req.params;

  let messagesToReplace = req.body;
  if (!messagesToReplace.user || !messagesToReplace.message) {
    res.send({ status: 'error', error: 'Faltan Parametros' });
  }
  let result = await messagesModel.updateOne({ _id: id_msg }, messagesToReplace);
  res.send({ result: 'success', payload: result });
});

router.delete('/:id_msg', async (req, res) => {
  let { id_msg } = req.params;
  let result = await messagesModel.deleteOne({ _id: id_msg });
  res.send({ result: 'success', payload: result });
});

module.exports = router;
