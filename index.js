require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// const variable declaretion.
const PORT = process.env.PORT || 5000;
// const URI =  process.env.DB_URI;

const URI =process.env.DB_URI;

// import middlewares
const errorGuard = require('./middlewares/errorGuard');

// import routes
const loginRoute = require('./routes/login/route');
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
app.use(cors());
app.use(errorGuard);

// database connection with mongoose.
mongoose
  .connect(URI,{})
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.log(err))

// application test routes
app.get("/", (req, res) => {
    res.send("Get Req From Home Route")
});

// jwt token genaretor route.
app.use("/api/", loginRoute);
app.use("/api/company", companyRoute); // singular because per apps dedicated for each company.
app.use("/api/services", serviceRoute);
app.use("/api/users", userRoute);
app.use("/api/quotations", quotationRoute);
app.use("/api/orders", orderRoute);
app.use("/api/tickets", ticketRoute);
app.use("/api/invoices", invoiceRoute);

// app listening port init.
app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
})

module.exports = app