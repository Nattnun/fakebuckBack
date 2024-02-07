require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/not-found");
const authRoute = require("./routes/auth-route");
const userRoute = require("./routes/user-route");

const limiter = require("./middlewares/rate-limit");
const authenticate = require("./middlewares/authenticate");

const app = express();

app.use(cors());
app.use(express.json()); //convert data to json object
app.use(limiter); // limit amount of request
app.use(morgan("dev")); //morgan will log time and method of request and response
app.use("/public", express.static("public"));

app.use("/auth", authRoute);
app.use("/users", authenticate, userRoute);

// notfound and error handler
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
