require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// const variable declaretion.
const PORT = process.env.PORT || 5000;
const URI =  process.env.DB_URI;

// import middlewares
const errorGuard = require('./middlewares/errorGuard');

// import routes
const homeRoute = require('./routes/home/route');
const serviceRoute = require('./routes/service/route'); 
const clientRoute = require('./routes/client/route');
const userRoute = require('./routes/team/route');
const quotationRoute = require('./routes/quotation/route');
const orderRoute = require('./routes/order/route');
const ticketRoute = require('./routes/ticket/route');

// express app init
const app = express();

// middleware init
app.use(express.json());
app.use(cors())
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
app.use("/api", homeRoute);

app.use("/api/services", serviceRoute);
app.use("/api/clients", clientRoute);
app.use("/api/users", userRoute);
app.use("/api/quotations", quotationRoute);
app.use("/api/orders", orderRoute);
app.use("/api/tickets", ticketRoute);

// app listening port init.
app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
})

module.exports = app