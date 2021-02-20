const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    _id:String,
    name: {
        type: String,
        required: true,
        unique: true
      },
      runtimeInMinutes: {
        type: Number,
        required: true
      },
      budgetInMillions: {
        type: Number,
        required: true
      },
      boxOfficeRevenueInMillions: {
        type: Number,
        required: true
      },
      academyAwardNominations: {
        type: Number,
        required: true
      },
      academyAwardWins: {
        type: Number,
        required: true
      },
      rottenTomatesScore: {
        type: Number,
        required: true
      }
  },
  {
    collection: "movies",
  }
);



const Movie = mongoose.model("movies", movieSchema);

module.exports = Movie;