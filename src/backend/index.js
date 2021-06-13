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

// Display the server URL
const {
  networkInterfaces
} = require('os');

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    if (net.family === 'IPv4' && !net.internal) {
      if (!results[name]) {
        results[name] = [];
      }
      results[name].push(net.address);
    }
  }
}
console.log(results['wlp3s0'])

// Listen to `port` for API Endpoints tasks
app.listen(port, () => {
  console.log("Application Server running is up on http://" + results['wlp3s0'] + ":" + port);
});