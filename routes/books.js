const mongoose = require('mongoose');
var express = require("express");
var router = express.Router();
const Book = require('../models/books');

/* GET books listing. */
router.get("/", async function(req, res) {
  try {
    const books = await Book.find({}).exec();
    res.send(books);
  } catch (error) {
    res.send(error);
  }

});

router.get("/:id", async function(req, res) {
  try {
    const booksById = await Book.findById(req.params.id).exec();
    res.json(booksById);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async function(req, res) {
  try {
    const createdBook = Book({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      description: req.body.description
    });
    await createdBook.save()
    res.json(createdBook);
  } catch (error) {
    res.send(error)
  }
});

router.put("/:id", async function(req, res) {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body, {new:true}).exec();
    const updatedBook = await Book.findById(req.params.id).exec();
    res.json(updatedBook);
  } catch (error) {
    res.send(error);
  }

});

router.delete("/:id", async function(req, res) {
  try{
    await Book.findByIdAndRemove(req.params.id).exec();
    res.json({ message: `Book with the id ${req.params.id} has been deleted`});
  }catch(error){
    res.send(error);
  }

});

module.exports = router;
