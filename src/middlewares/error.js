module.exports = (err, re, res, next) => {
  console.log("errorMiddleware", err);
  res.status(500).json({ message: err.message });
};
