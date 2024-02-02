const { ValidationError } = require("joi");

module.exports = (err, re, res, next) => {
  console.log("errorMiddleware", err);
  // if (err.name === "validationError") {
  //   err.statusCode = 400;
  // }
  if (err instanceof ValidationError)
    res.status(err.statusCode || 500).json({ message: err.message });
};
