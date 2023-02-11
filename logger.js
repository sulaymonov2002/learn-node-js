function log(req, res, next) {
  console.log("log yozish...");
  next();
}

module.exports = log;
