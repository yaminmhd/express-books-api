const express = require("express");
const router = express.Router();
const Book = require("../models/book");

/* GET books listing. */
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.find().populate("author");
    res.json(books);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", (req, res, next) => {
  res.json({ message: `get book with id ${req.params.id}` });
});

router.post("/", async (req, res, next) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author
    });

    await newBook.save();

    res.status(201).json({ message: `created a new book successfully` });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", (req, res, next) => {
  try{
    const updatedResult = await Book.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.json({
      result: updatedResult,
      message: `update book with id ${req.params.id}`
    });
  }catch(error){
    next(error);
  }
});

router.delete("/:id", (req, res, next) => {
  try{
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: `delete book with id ${req.params.id}` });
  }catch(error){
    next(error);
  }
});

module.exports = router;
