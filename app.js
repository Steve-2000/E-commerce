const express = require('express');
const ErrorMiddleware = require('./utils/ErrorMiddleware');
// const authenticateduser=require('./middleware/autheticateduser');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');

const cors = require('cors');
app.use(
  cors({
    origin: "https://e-commer-e5f95.web.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
)

app.use(
  "/Data/uploads",
  express.static(path.join(__dirname, "public/Data/uploads"))
);

app.use(express.json());
app.use(cookieParser())
app.use('/api/v1', require('./route/route'));
app.use('/api/v1/auth', require('./route/auth'));
app.use('/api/v1', require('./route/order'));

app.use(ErrorMiddleware);


module.exports = app