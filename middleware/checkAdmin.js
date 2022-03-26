const checkAdmin = (req, res, next) => {
    res.json("Fail, do not have enough permittion!");
}

module.exports = {
    checkAdmin
}