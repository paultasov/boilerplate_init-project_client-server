const express = require('express')
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());

// Парсинг тела HTTP-запросов с типом application/x-www-form-urlencoded
// Опция extended: true позволяет парсить значения как объекты и массивы
app.use(express.urlencoded({ extended: true }));

// После подключения можно читать cookies из запроса через req.cookies
app.use(cookieParser());

module.exports = app;
