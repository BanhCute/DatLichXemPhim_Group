import { Router } from "express";
const router = Router();
import bookingController from "../controllers/bookingController";
import { CheckAuth, CheckRole } from "../utils/check_auth";
import { CreateSuccessRes } from "../utils/responseHandler";

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

export default router;