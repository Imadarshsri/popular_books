const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  ratings: [{
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0 || value > 10) throw new Error("Rating must be a between 0-10.");
    },
  }],
  avgRating: {
    type: Number,
    required: true,
    default: 0,
    validate(value) {
      if (value < 0 || value > 10) throw new Error("Average Rating must be a between 0-10.");
    },
  }
}, {
  timestamps: true,
});

/// Static Method for finding book by credentials {title, author,  rating}
bookSchema.statics.findByTitleAndAuthor = async ({
  title,
  author,
  rating
}) => {
  try {
    const book = await Book.findOne({
      title,
      author
    });

    if (!book) {
      return undefined;
    }
    // Update rating 
    await book.updateRatings(rating);

    return book;
  } catch (e) {
    // console.log('Unable to Add Book', e.message);
    throw new Error(e.message);
  }
}

/// Method to update Ratings for the book
bookSchema.methods.updateRatings = async function (rating) {
  const book = this;
  try {

    book.ratings.push(rating);

    const sum = book.ratings.reduce((a, b) => a + b, 0);
    const avg = (sum / book.ratings.length) || 0;
    book.avgRating = avg;

    await book.save();

  } catch (e) {
    // console.log('Unable to upd Book', e.message);
    throw new Error(e.message);
  }
}

/// Method to hide private data
/// filter the book data to reveal only public or non-confidential data to user
bookSchema.methods.toJSON = function () {
  const book = this;
  const bookObject = book.toObject();
  delete bookObject.ratings

  return bookObject;
}

/// Create a Mongoose Book Model
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;