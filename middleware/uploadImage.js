const multer = require("multer");

const uploadProductImageStore = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/products');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const uploadProductImage = multer({storage: uploadProductImageStore});

module.exports = {
    uploadProductImage
}