const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const helmet = require("helmet");
const morgan = require("morgan");

const logger = require("./logger");
const authentication = require("./auth");

app.use(logger);
app.use(authentication);
app.use(helmet);
app.use(morgan);

const books = [
  { id: 1, name: "rich dad poor dad" },
  { id: 2, name: "good for great" },
  { id: 3, name: "rework" },
];

app.get("/", (req, res) => {
  res.send("Salom");
});

app.get("/api/books", (req, res) => {
  res.send(books);
});

app.post("/api/books", (req, res) => {
  res.send(books);
});

app.post("/api/books", (req, res) => {
  const { error } = validateBook(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const book = [];
});
