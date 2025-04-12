const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { CheckAuth, CheckRole } = require("../utils/check_auth");
const { CreateSuccessRes } = require("../utils/responseHandler");

router.get("/my-bookings", CheckAuth, async function (req, res, next) {
  try {
    let bookings = await bookingController.GetMyBookings(req, res);
    CreateSuccessRes(res, bookings, 200);
  } catch (error) {
    next(error);
  }
});

router.get("/", [CheckAuth, CheckRole], async function (req, res, next) {
  try {
    let bookings = await bookingController.GetAll(req, res);
    CreateSuccessRes(res, bookings, 200);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", CheckAuth, async function (req, res, next) {
  try {
    let booking = await bookingController.GetById(req, res);
    CreateSuccessRes(res, booking, 200);
  } catch (error) {
    next(error);
  }
});

router.post("/create", [CheckAuth, CheckRole], async function (req, res, next) {
  try {
    let booking = await bookingController.Create(req, res);
    CreateSuccessRes(res, booking, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;