const path = require("path");
const UserModel = require('../models/users');
const jwt = require("jsonwebtoken");
const JWTpass = process.env.JWT_PASS;

const authGetLogin = (req, res, next) => {
    res.render(path.join(__dirname, '../views/admin/login.ejs'), {data: {}});
}

const authPostLogin = async (req, res, next) => {
    const mail = req.body.mail;
    const pass = req.body.pass;
    

    let alert;
    if (mail == "" || pass == "") {
        alert = "Thông tin hông được để trống !";
    }
    try {
        let data = await UserModel.find({
            email: mail,
            password: pass
        })
        if (data.length > 0) {
            alert = "Đăng nhập thành công !";
            let token = jwt.sign({
                _id: data._id
            }, JWTpass)
            res.cookie('token', token, {maxAge: 2 * 1000 * 3600, httpOnly: true});
            res.redirect('/home');
        } else {
            alert = "Tài khoản không hợp lệ !";
            res.render(path.join(__dirname, "../views/admin/login"), { data: { alert: alert } });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json("Server error!");
    }
}

module.exports = {
    authGetLogin,
    authPostLogin
}