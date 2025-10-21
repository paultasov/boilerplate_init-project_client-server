const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

const authRouter = require('./routers/auth.router');

app.use(morgan('dev'));
app.use(express.json());

// Парсинг тела HTTP-запросов с типом application/x-www-form-urlencoded
// Опция extended: true позволяет парсить значения как объекты и массивы
app.use(express.urlencoded({ extended: true }));

// После подключения можно читать cookies из запроса через req.cookies
app.use(cookieParser());

// routes go here...
app.use('/api/auth', authRouter);

module.exports = app;
