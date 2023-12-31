const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// body parser
app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => (req.rawBody = buf.toString()), // getting raw body for stripe webhook
  })
);

//cookie parser
app.use(cookieParser());

// Api Logging Middleware
if (process.env.NODE_ENV !== "PRODUCTION") app.use(morgan("tiny"));

// Routers
app.use("/api/products", require("./routers/productRouter"));
app.use("/api/users", require("./routers/userRouter"));
app.use("/api/orders", require("./routers/orderRouter"));
app.use("/api/reviews", require("./routers/reviewRouter"));
app.use("/api/payments", require("./routers/paymentRouter"));

//Error Handler Middleware
app.use(require("./middlewares/error"));

module.exports = app;
