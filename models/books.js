const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  created: {
    type: Date,
    default: Date.now
  }
});

const Book = mongoose.model('Book', bookSchema)

module.exports = Book;