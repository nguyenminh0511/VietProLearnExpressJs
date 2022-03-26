const jwt = require("jsonwebtoken");
const JWTpass = process.env.JWT_PASS;

const checkLogin = (req, res, next) => {
    try {
        const token = req.cookies.token;
        let check = jwt.verify(token, JWTpass);
        if (check) {
            req.userId= check._id;
            next();
        }
    } catch(err) {
        res.redirect('/login');
    }
}

module.exports = {
    checkLogin
}