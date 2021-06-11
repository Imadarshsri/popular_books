const express = require('express');
const router = new express.Router();
const Book = require('../models/book');

/// Create Book [POST Request]
/*
Body: {
  title: "",
  author: "",
  rating: 2,
}
 */
router.post("/books", async (req, res) => {
  try {
    const book = await Book.findByTitleAndAuthor(req.body);
    if (!book) {
      const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        ratings: req.body.rating,
        avgRating: req.body.rating,
      });

      await newBook.save();
      console.log("New Book Added: ", newBook);
      res.status(201).send(newBook);
    }
    console.log("Book updated: ", book);
    res.send(book);
  } catch (e) {

    // console.log('Unable to create Book. ' + e.message);
    res.status(400).send({
      error: "Unable to create/update book.",
      details: e.message
    });
  }
});

/// Read/Fetch All books [GET Request]

// Filtering Data: GET /books?author=[author_name]
// Pagination: GET /books?limit=10&skip=0
// Sorting: GET /books?sortBy=createdAt_desc options: [createdAt, avgRatings]
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    res.send(books);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;