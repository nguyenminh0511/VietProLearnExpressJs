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
const site = require('./router/home');

const { checkLogin } = require('./middleware/checkLogin');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

// app.use(checkLogin);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use('/public', express.static(path.join(__dirname, './public')));

app.use('/admin/login', loginRouter);
app.use(checkLogin);

app.get('/', (req, res, next) => {
    res.redirect('/home');
})
app.use('/', site);

app.get('/admin', (req, res, next) => {
    res.redirect('/admin/dashboard');
})
app.use('/admin/products', productRouter);
app.use('/admin/users', userRouter);
app.use('/admin/categories', categoryRouter);
app.use('/admin/dashboard', dashboardRouter);

app.listen(PORT, () => {
    console.log(`Server is listenning at http://localhost:${PORT}`);
})