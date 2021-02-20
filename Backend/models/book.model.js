const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema(
  {
    _id:String,
    name: {
      type: String,
      required: true,
       unique: true
    },
  },
  {
    collection: "books",
  },
  { timestamps: true }
);

const Book = mongoose.model("books", bookSchema);

module.exports = Book;