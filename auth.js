function auth(req, res, next) {
  console.log("Authentifikatsiya qilish...");
  next();
}

module.exports = auth;
