var express = require("express");
var router = express.Router();
let promotionController = require("../controllers/promotionController");
let { CreateSuccessRes } = require("../utils/responseHandler");
const { CheckAuth, CheckRole } = require("../utils/check_auth");
require("dotenv").config();

router.get("/", async function (req, res, next) {
  try {
    let promotions = await promotionController.GetAll();
    CreateSuccessRes(res, promotions, 200);
  } catch (error) {
    next(error);
  }
});

router.post("/", [CheckAuth, CheckRole], async function (req, res, next) {
  try {
    let body = req.body;
    let newPromotion = await promotionController.Create(body);
    CreateSuccessRes(res, newPromotion, 201);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", [CheckAuth, CheckRole], async function (req, res, next) {
  try {
    let promotion = await promotionController.Update(req);
    CreateSuccessRes(res, promotion, 200);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", [CheckAuth, CheckRole], async function (req, res, next) {
  try {
    let promotion = await promotionController.Delete(req);
    CreateSuccessRes(res, promotion, 200);
  } catch (error) {
    next(error);
  }
});

router.get("/check/:code", CheckAuth, async function (req, res, next) {
  try {
    let promotion = await promotionController.CheckCode(req, res);
    CreateSuccessRes(res, promotion, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;