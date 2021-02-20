const express = require('express');
const router = express.Router({ mergeParams: true });

const Book = require('../models/book.model');
// const User = require('../models/User');

router.get('/', async (req, res) => {
  const book = await Book.aggregate()
    .project({ 'id': '$_id', name: 1, _id: 0 })
  return res.send(book);
});
router.post('/', async (req, res) => {
  try {
    const book = new Book({
      _id:req.body.id.toString(),
      name: req.body.name
    });
    console.log(book);
    const createdBook = await book.save();
    return res.send({ name: book.name, id: book._id });
  }
  catch (err) {
    return res.send(err)
  }
});
router.delete('/:id', async (req, res) => {
  try {
    
    const id = req.params.id.toString();

    const del_book = await Book.findOne({_id:id});
    const deleted = await Book.findByIdAndDelete(id)
    return res.send(del_book);
  }
  catch (error) {
    return res.send({ error })
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id.toString();
    const name = req.body.name
    const edit = await Book.findByIdAndUpdate(id, {name:name})
    const book = await Book.findById(id)
    
    return res.send({ name: book.name, id: book._id })
  }
  catch (error) {
    return res.send({ error })
  }
});




module.exports = router;
