const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT;
const loginRouter = require('./router/login');
const productRouter = require('./router/products');
const userRouter = require('./router/users');
const categoryRouter = require('./router/categories');
const dashboardRouter = require('./router/dashboard');

const { checkLogin } = require('./middleware/checkLogin');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use(checkLogin);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use('/public', express.static(path.join(__dirname, './public')));

app.use('/login', loginRouter);
app.use(checkLogin);

app.get('/', (req, res, next) => {
    res.json("Hello world");
})

app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/dashboard', dashboardRouter);

app.listen(PORT, () => {
    console.log(`Server is listenning at http://localhost:${PORT}`);
})