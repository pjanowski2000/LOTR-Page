const express = require('express');
const router = express.Router({ mergeParams: true });


const Quote = require('../models/quote.model');




router.get('/', async (req, res) => {
  const quote = await Quote.aggregate()
  .project({ 'id': '$_id', dialog: 1, _id: 0,movie:1 })

    
  return res.send(quote);
});
router.post('/', async (req, res) => {
  try {
    const {id,dialog,movie}=req.body
    const quote = new Quote({
      movie,
      dialog,
      _id:id.toString()
      
    });
   
    const createdQuote = await quote.save();
    return res.send({...req.body });
  }
  catch (err) {
    return res.send(err)
  }
});
router.delete('/:id', async (req, res) => {
  try {
    
    const id = req.params.id.toString();
    const deleted = await Quote.findByIdAndDelete(id)
    return res.send(id);
  }
  catch (error) {
    return res.send({ error })
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id.toString();
    const {dialog}=req.body
    const edit = await Quote.findByIdAndUpdate(id, {dialog})
    
    const quote = await Quote.aggregate()
    .match({_id:id})
    .project({ 'id': '$_id', dialog: 1, _id: 0,movie:1 })
    return res.send( ...quote)
  }
  catch (error) {
    return res.send({ error })
  }
});




module.exports = router;
