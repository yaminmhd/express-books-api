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

router.get("/:id", async (req, res, next) => {
  try {
    const result = await Book.findById(req.params.id);
    res.json({
      message: `get book with id ${req.params.id}`,
      ...result.toJSON()
    });
  } catch (error) {
    next(error);
  }
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

router.put("/:id", async (req, res, next) => {
  try {
    const updatedResult = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({
      ...updatedResult.toJSON(),
      message: `update book with id ${req.params.id}`
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    res.json({
      ...deletedBook.toJSON(),
      message: `delete book with id ${req.params.id}`
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
