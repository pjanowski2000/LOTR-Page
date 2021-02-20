const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    _id:String,
    dialog: {
        type: String,
        required: true
      },
      movie: {
        type: String,
        ref: "movie",
        required: true
      },
      character: {
        type: mongoose.Types.ObjectId,
        ref: "character",
        required: false
      }
  },
  {
    collection: "quotes",
  }
);



const Quote = mongoose.model("quotes", quoteSchema);

module.exports = Quote;