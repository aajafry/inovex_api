require('dotenv').config();
const express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require("body-parser");

// const variable declaretion.
const URI = process.env.DB_URI;
const PORT = process.env.PORT || 5000;

// import middlewares
const callbackGuard = require('./middlewares/callbackGuard');
const errorGuard = require('./middlewares/errorGuard');

// import routes
const authRoute = require('./routes/auth/route');
const companyRoute = require('./routes/company/route');
const serviceRoute = require('./routes/service/route'); 
const userRoute = require('./routes/user/route');
const quotationRoute = require('./routes/quotation/route');
const orderRoute = require('./routes/order/route');
const ticketRoute = require('./routes/ticket/route');
const invoiceRoute = require('./routes/invoice/route');

// express app init
const app = express();

// middleware init
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(cors());

// database connection with mongoose.
mongoose
  .connect(URI,{})
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err))

// application test route.
app.get("/", (req, res) => res.send("Get Req From Home Route"));
// static file public route for multer uses.
// when hosting provaider given file r/w permission use this.
// most of cases hosting provaider did not given this king of permission.
app.use("/public", express.static("public"));
// jwt token genaretor route.
app.use("/api/auth", authRoute);
// singular because per apps dedicated for each company.
app.use("/api/company", companyRoute); 
app.use("/api/services", serviceRoute);
app.use("/api/users", userRoute);
app.use("/api/quotations", quotationRoute);
app.use("/api/orders", orderRoute);
app.use("/api/tickets", ticketRoute);
app.use("/api/invoices", invoiceRoute);

// app listening port init.
app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`))

// error middleware init
app.use(callbackGuard);
app.use(errorGuard);
app.use(function (err, req, res, next) {
  console.error(err.message);
 if (!err.statusCode) err.statusCode = 501;
 res.status(err.statusCode).send(err.message);
});

module.exports = app