var express = require("express");
var router = express.Router();
let reviewController = require("../controllers/reviewController");
let { CreateSuccessRes } = require("../utils/responseHandler");
const { CheckAuth } = require("../utils/check_auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", CheckAuth, async function (req, res, next) {
  try {
    let reviews = await reviewController.GetAll();
    CreateSuccessRes(res, reviews, 200);
  } catch (error) {
    next(error);
  }
});

router.post("/", CheckAuth, async function (req, res, next) {
  try {
    let newReview = await reviewController.Create(req);
    CreateSuccessRes(res, newReview, 201);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", CheckAuth, async function (req, res, next) {
  try {
    let review = await reviewController.Update(req);
    CreateSuccessRes(res, review, 200);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", CheckAuth, async function (req, res, next) {
  try {
    let review = await reviewController.Delete(req);
    CreateSuccessRes(res, review, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
