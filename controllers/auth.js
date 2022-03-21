const path = require("path");

const authGetLogin = (req, res, next) => {
    res.render(path.join(__dirname, '../views/login.ejs'), {data: {}});
}

const authPostLogin = (req, res, next) => {
    const mail = req.body.mail;
    const pass = req.body.pass;

    let alert;
    if (mail == "" || pass == "") {
        alert = "Thông tin hông được để trống !";
    }
    else if (mail == "vietpro.edu.vn@gmail.com" && pass == "123456") {
        alert = "Đăng nhập thành công !";
    }
    else {
        alert = "Tài khoản không hợp lệ !"
    }
    res.render(path.join(__dirname, "../views/login"), { data: { alert: alert } });
}

module.exports = {
    authGetLogin,
    authPostLogin
}