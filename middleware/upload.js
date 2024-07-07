const path = require('path');
const multer = require("multer");
const fs = require('fs');

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
  fs.mkdirSync(uploadDir);
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/JPG" || file.mimetype === "image/JPEG" || file.mimetype === "image/PNG") {
      callback(null, true);
    } else {
      console.log('Chỉ hỗ trợ png, jpg, jpeg!');
      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 4 // 4 MB
  }
});

module.exports = upload;