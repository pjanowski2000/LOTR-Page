const mongoose = require("mongoose");


const chapterSchema = new mongoose.Schema(
  {
    _id:String,
    chapterName: {
      type: String,
      required: true,
      unique: true
    },
    book: {
      type: String,
      ref: "book",
      required: true
    },
    
  
  },
  {
    collection: "chapters",
  }
);


const Chapter = mongoose.model("chapters", chapterSchema);

module.exports = Chapter;