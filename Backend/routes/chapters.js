const express = require('express');
const router = express.Router({mergeParams: true});

const Book = require('../models/book.model');
const Chapter = require('../models/chapter.model');

router.get('/', async (req, res) => {
  try{
  const chapter = await await Chapter.aggregate()
  .project({ 'id':'$_id',book:1,chapterName:1,_id:0})
   return res.send(chapter);
  }
  catch(err){
    console.log(err);
  }
});
router.post('/', async (req, res) => {
  try{
    console.log(req.body);
    const chapter = new Chapter({
      _id:req.body.id.toString(),
      ...req.body
      // book:req.body.book,
      // chapterName: req.body.chapterName
     });
     console.log(chapter);
     const createdChapter = await chapter.save();
     return res.send({id:chapter._id,book:chapter.book,chapterName:chapter.chapterName});
  }
  catch(error){
    return res.send({error})
  }
});
   
    
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id.toString();
    const del_chapter = await Chapter.findOne({_id:id});
    const deleted = await Chapter.findByIdAndDelete(id)
    return res.send(del_chapter);
  }
  catch (error) {
    return res.send({ error })
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id.toString();
    const name = req.body.chapterName
    const edit = await Chapter.findByIdAndUpdate(id, {chapterName:name})
    const chapter = await Chapter.findById(id)
    return res.send({ chapterName: chapter.chapterName, book:chapter.book, id: chapter._id })
  }
  catch (error) {
    return res.send({ error })
  }
});
  



module.exports = router;
