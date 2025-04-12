var express = require("express");
var router = express.Router();
const { CreateSuccessRes } = require("../utils/responseHandler");
const { CheckAuth } = require("../utils/check_auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");


const uploadDir = path.join(
  __dirname,
  "../../../frontend/public/images/movies"
);

if (!fs.existsSync(uploadDir)) {
  try {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("Created directory:", uploadDir);
  } catch (error) {
    console.error("Error creating directory:", error);
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Chỉ chấp nhận file ảnh!"));
    }
  },
});

router.post("/", CheckAuth, (req, res, next) => {
  upload.single("image")(req, res, function (err) {
    if (err) {
      return next(err);
    }

    try {
      if (!req.file) {
        throw new Error("Không có file được upload");
      }

      const filePath = path.join(uploadDir, req.file.filename);
      if (!fs.existsSync(filePath)) {
        throw new Error("File không được tạo thành công");
      }

      console.log("File uploaded successfully:", filePath);

      CreateSuccessRes(
        res,
        {
          path: `/images/movies/${req.file.filename}`,
        },
        201
      );
    } catch (error) {
      console.error("Upload error:", error);
      next(error);
    }
  });
});

module.exports = router;
