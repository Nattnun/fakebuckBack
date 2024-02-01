require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/not-found");

const limiter = require("./middlewares/rate-limit");

const app = express();

app.use(cors());
app.use(express.json()); //convert data to json object
app.use(limiter); // limit amount of request
app.use(morgan("combined")); //morgan will log time and method of request and response

// notfound and error handler
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
