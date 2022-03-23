const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT;
const loginRouter = require('./router/login');
const productRouter = require('./router/products');
const userRouter = require('./router/users');
const categoryRouter = require('./router/categories');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use('/public', express.static(path.join(__dirname, './public')));

app.get('/', (req, res, next) => {
    res.json("Hello world");
})

app.use('/login', loginRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/categories', categoryRouter);

app.listen(PORT, () => {
    console.log(`Server is listenning at http://localhost:${PORT}`);
})