const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());

const books = [
  { id: 1, name: "rich dad poor dad" },
  { id: 2, name: "good to great" },
  { id: 3, name: "rework" },
];

app.get("/", (req, res) => {
  res.send("Salom");
});

app.get("/api/books", (req, res) => {
  res.send(books);
});

app.post("/api/books", (req, res) => {
  const bookSchema = {
    name: Joi.string().required().min(3),
  };

  const result = Joi.validate(req.body, bookSchema);

  const book = {
    id: books.length + 1,
    name: req.body.name,
  };
  books.push(book);
  res.status(201).send(book);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) res.status(404).send("Berilgan IDga teng bo'lgan kitob topilmadi");

  res.send(books);
});

app.get("/api/articles/:year/:month", (req, res) => {
  res.send(req.query);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`${port}chi portni eshitishni boshladim... `);
});
