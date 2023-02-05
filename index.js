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
  const { error } = validateBook(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const book = {
    id: books.length + 1,
    name: req.body.name,
  };
  books.push(book);
  res.status(201).send(book);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));

  if (!book)
    return res.status(404).send("Berilgan IDga teng bo'lgan kitob topilmadi");

  res.send(book);
});

app.put("/api/books/:id", (req, res) => {
  // kitobni  bazadan izlab topish
  // agarada kitob mavjud bo'lmasa, 404 qaytarish
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book)
    return res.status(404).send("Berilgan IDga teng bo'lgan kitob topilmadi");

  // agar kitob topilsa, so'rovni validatsiya qilish
  // agar so'rov validatsiyada o'tmasa, 400 qaytarish

  const { error } = validateBook(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // kitobni yangilash
  book.name = req.body.name;
  // yangilangan kitobni qaytarish
  res.send(book);
});

app.delete("/api/books/:id", (req, res) => {
  // kitobni idsi bo'yicha izlab topamiz
  // agar topilmasa 404 qaytaramiz
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book)
    return res.status(404).send("Berilgan IDga teng bo'lgan kitob topilmadi ");

  // topilsa uni o'chirib tashlaymiz
  const bookIndex = books.indexOf(book);
  books.splice(bookIndex, 1);
  // topilgan kitobni qaytarib beramiz
  res.send(book);
});

function validateBook(book) {
  const bookSchema = {
    name: Joi.string().required().min(3),
  };

  return Joi.validate(book, bookSchema);
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`${port}chi portni eshitishni boshladim... `);
});
