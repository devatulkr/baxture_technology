const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

/*------------------*/
const wordFilex = multer.diskStorage({
  destination: (req, file, callback) => {
    const path = "./uploads/";
    callback(null, path);
  },
  filename: (req, file, callback) => {
    if (!file.originalname.toLowerCase().match(/\.(txt)$/)) {
      const err = new Error();
      err.code = "filetype";
      return callback(err);
    } else {
      const uuidValue = uuidv4();
      callback(
        null,
        `file_${uuidValue}${path.extname(file.originalname).toLowerCase()}`
      );
    }
  },
});
const wordFilexUp = multer({
  storage: wordFilex,
  limits: { fileSize: 10000000 },
}).single("text_file");
const multerPromise = (req, res) => {
  return new Promise((resolve, reject) => {
    wordFilexUp(req, res, (err) => {
      if (!err) resolve();
      reject(err);
    });
  });
};
const uploadTextFile = async (req, res, next) => {
  try {
    await multerPromise(req, res);
    next();
  } catch (e) {
    next(e);
  }
};

const multerErrorHandler = (err, req, res, next) => {
  if (err) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        statusText: "Failed",
        statusValue: 400,
        message: "File is too large",
        description: err,
      });
    } else if (err.code === "filetype") {
      return res.status(400).json({
        statusText: "Failed",
        statusValue: 400,
        message: "Invalid file Type",
        description: err,
      });
    } else {
      return res.status(400).json({
        statusText: "Failed",
        statusValue: 400,
        message: "Unable to upload file",
        description: err,
      });
    }
  } else {
    next();
  }
};
/*
 *-----------------------------------------------------------------
 */
module.exports = {
  multerErrorHandler,
  uploadTextFile,
};
