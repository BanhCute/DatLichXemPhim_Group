const express = require("express");
const router = express.Router();
const showTimeController = require("../controllers/showTimeController");
const { CheckAuth, CheckRole } = require("../utils/check_auth");
const { CreateSuccessRes } = require("../utils/responseHandler");

router.get("/", async function (req, res, next) {
  try {
    const showTimes = await showTimeController.GetAll();
    CreateSuccessRes(res, showTimes, 200);
  } catch (error) {
    next(error);
  }
});

router.get("/movie/:movieId", async function (req, res, next) {
  try {
    const showTimes = await showTimeController.GetByMovie(req, res);
    CreateSuccessRes(res, showTimes, 200);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const showTime = await showTimeController.GetById(req, res);
    CreateSuccessRes(res, showTime, 200);
  } catch (error) {
    next(error);
  }
});

router.post("/", [CheckAuth, CheckRole], async function (req, res, next) {
  try {
    const body = req.body;
    const newShowTime = await showTimeController.Create(body);
    CreateSuccessRes(res, newShowTime, 201);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", [CheckAuth, CheckRole], async function (req, res, next) {
  try {
    const updatedShowTime = await showTimeController.Update(req);
    CreateSuccessRes(res, updatedShowTime, 200);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", [CheckAuth, CheckRole], async function (req, res, next) {
  try {
    const deletedShowTime = await showTimeController.Delete(req);
    CreateSuccessRes(res, deletedShowTime, 200);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/seats", async function (req, res, next) {
  try {
    const seats = await showTimeController.GetSeats(req, res);
    CreateSuccessRes(res, seats, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
