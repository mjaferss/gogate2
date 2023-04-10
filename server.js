const path = require("path");
const express = require("express");
const bodyparser = require("body-parser");
//عشان الصل لملف الكنفج env لاذم اثبت npm i dotenv
var multer = require("multer");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

//const mongoose = require('mongoose');
dotenv.config({ path: "config.env" });
//عشان انا مسي الفايل config.env
//لاذم اعرف الباس
const ApiError = require("./utills/apiError");
const gloobalError = require("./middlewares/errorMiddleware");

const dbConnection = require("./config/database");
//////

const mountRoutes = require("./routes");

// connect to db
dbConnection();
// end
//epress
const app = express();
// app.use(express.bodyParser());

// app.use(bodyParser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
// app.use(express.json());
// // app.use.express.urlencoded();
// // app.use(express.bodyParser({ extended: true }));
// // app.use(bodyParser.urlencoded({}));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "uploads")));
// app.use(express.bodyParser());
// app.post(
//   "/webhook-checkout",
//   express.raw({ type: "application/json" }),
//   webhookCheckout
// );
// app.use(cors());
// app.options("*", cors());
// app.use(multer());
// عشان نستخدم المدل وير دي في الدفلبمنت بنختها في  اف
// compress all responses
// app.use(compression());
// middelware
// app.use(express.json({ limit: "100kb" }));
app.use(express.static(path.join(__dirname, "uploads")));

//تحويل الرسبونس الي جيسون
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log("mode :" + process.env.NODE_ENV);
}

// limiter each IP to 100 requests per `window` (here, per 15 minutes)
const limiter = rateLimit({
  windowMs: 15 * 60 * 100000, // 15 minutes
  max: 1000000,
  message:
    "Too many accounts created from this IP, please try again after an hour",
});

// Apply the rate limiting middleware to all requests
app.use("/api",limiter);
// mount rout

app.use(hpp());
mountRoutes(app);

app.all(`*`, (req, res, next) => {
  /* const err = new Error('can not fount this route'+ req.originalUrl);
next(err.message); */
  next(new ApiError(`can not fount this route: ${req.originalUrl}`, 400));
});

//اجراء الاخطا العامة
app.use(gloobalError);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("app running  at  " + PORT);
});

//اي خطا خارج الاكسبريس بيتوقف هنا
process.on(`unhandledRejection`, (err) => {
  console.error(`unhandeledRejextion Errors :${err} | ${err.massage}`);
  server.close(() => {
    console.error(`close`);
    process.exit(1);
  });
});
