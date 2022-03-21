const express = require("express");
const router = express.Router();

router.route('/login')
    .get((req, res, next) => {
        res.json("Login");
    })

router.route('/logout')
    .get((req, res, next) => {
        res.json("Logout");
    })

router.route('/dashboard')
    .get((req, res, next) => {
        res.json("Dashboard");
    })

router.route('/users')
    .get((req, res, next) => {
        res.json("users");
    })

router.route('/categories')
    .get((req, res, next) => {
        res.json("Categories");
    })

router.route('/products')
    .get((req, res, next) => {
        res.json('Products');
    })

module.exports = router;
