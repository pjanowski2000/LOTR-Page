const express = require('express');
const router = express.Router({ mergeParams: true });


const Movie = require('../models/movie.model');
const Quotes = require('../models/quote.model');


router.get('/', async (req, res) => {
  const movie = await Movie.aggregate()
      .project({ 'id': '$_id', name: 1, _id: 0,runtimeInMinutes:1,budgetInMillions:1, boxOfficeRevenueInMillions:1,academyAwardNominations:1,academyAwardWins:1, rottenTomatesScore:1 })
      
  return res.send(movie);
});
router.post('/', async (req, res) => {
  try {
   const {name,id,runtimeInMinutes,budgetInMillions,boxOfficeRevenueInMillions,academyAwardNominations,academyAwardWins,rottenTomatesScore} = req.body
   
    const movie = new Movie({
      name,
      runtimeInMinutes,
      budgetInMillions,
      boxOfficeRevenueInMillions,
      academyAwardNominations,
      academyAwardWins,
      rottenTomatesScore,
      _id:id.toString()
    });
    const createdMovie = await movie.save();
    return res.send({ ...req.body });
  }
  catch (err) {
    return res.send(err)
  }
});
router.delete('/:id', async (req, res) => {
  try {
    
    const id = req.params.id.toString();
    const deleted = await Movie.findByIdAndDelete(id)
    return res.send(id);
  }
  catch (error) {
    return res.send({ error })
  }
});
router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id.toString();
    const {name,runtimeInMinutes,budgetInMillions,boxOfficeRevenueInMillions,academyAwardNominations,academyAwardWins,rottenTomatesScore} = req.body
    const edit = await Movie.findByIdAndUpdate(id, {name,runtimeInMinutes,budgetInMillions,boxOfficeRevenueInMillions,academyAwardNominations,academyAwardWins,rottenTomatesScore})
    const movie = await Movie.aggregate()
    .match({_id:id})
    .project({ 'id': '$_id', name: 1, _id: 0,runtimeInMinutes:1,budgetInMillions:1, boxOfficeRevenueInMillions:1,academyAwardNominations:1,academyAwardWins:1, rottenTomatesScore:1 })
    return res.send(...movie)
  }
  catch (error) {
    return res.send({ error })
  }
});




module.exports = router;
