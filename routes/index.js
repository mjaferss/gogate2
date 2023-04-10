const companyRoute = require("./companyRoute");
const gateRoute = require("./gateRoute");
const usereRoute = require("./userRoute");
const authRoute = require("./authRoute");

const orderRoute = require("./orderRoute");
const reviewRoute = require("./reviewRoute");

const mountRoutes = (app) => {
  app.use("/api/v1/companies", companyRoute);
  app.use("/api/v1/gates", gateRoute);
  app.use("/api/v1/users", usereRoute);
  app.use("/api/v1/auth", authRoute);
 
  app.use("/api/v1/orders", orderRoute);
  app.use("/api/v1/reviews", reviewRoute);
};

module.exports = mountRoutes;
