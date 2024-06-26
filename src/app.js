const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { getSystemErrorName } = require("util");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const app = express();
// const port = process.env.PORT || 3000;
//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static ddirectory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ankit Mallik",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Ankit Mallik",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "I will help you",
    name: "Ankit Mallik",
  });
});

// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send([
//     {
//       name: "Andrew",
//       age: 27,
//     },
//     {
//       name: "Sarah",
//     },
//   ]);
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About the page</h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided",
    });
  }
  geocode(req.query.address, (error, { latitude, longitude } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});
//app.com
//app.com/hello
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ankit Mallik",
    errorMessage: "Hepl artice not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ankit Mallik",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log(`Server is up on port 3000.`);
});
