const hbs = require("hbs");
const path = require("path");
const express = require("express");
require("./db/mongoose");
const bookRouter = require('./routers/book');

const app = express();
const port = process.env.PORT || 5000;

/// Adds json decoding
app.use(express.json());


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../frontend/public");
const viewsPath = path.join(__dirname, "../frontend/templates/views");
const partialsPath = path.join(__dirname, "../frontend/templates/partials");

// Setup handlebars engine & views Location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Books Recommendation App",
    name: "Adarsh Srivastava",
  });
});


/// Adds Book routers to express app
app.use(bookRouter);

// Listen to `port` for API Endpoints tasks
app.listen(port, () => {
  console.log("Application Server running is up on http://192.168.225.102:" + port);
});