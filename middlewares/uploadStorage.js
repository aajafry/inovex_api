const multer = require('multer');

// const DIR = './public';

const storage = multer.diskStorage({
  // static file public route for multer uses.
  // when hosting provaider given file r/w permission use this.
  // most of cases hosting provaider did not given this king of permission.
  // destination: function (req, file, cb) {
  //   cb(null, DIR) // Specify the directory where uploaded files should be stored
  // },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.toLowerCase().split(' ').join('-')) // Rename uploaded files if needed
  }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

module.exports = upload;