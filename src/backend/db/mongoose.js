const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/popular-books-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

console.log("DB Server up and running at mongodb://127.0.0.1:27017.");