const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const { CheckAuth, CheckRole } = require("../utils/check_auth");
const { CreateSuccessRes } = require("../utils/responseHandler");

router.get("/", async function (req, res, next) {
  try {
    const movies = await movieController.GetAll();
    CreateSuccessRes(res, movies, 200);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const movie = await movieController.GetById(req, res);
    res.json({ data: movie });
  } catch (error) {
    next(error);
  }
});

router.post("/", [CheckAuth, CheckRole], async function (req, res, next) {
  try {
    const movie = await movieController.Create(req);
    res.status(201).json({ data: movie });
  } catch (error) {
    next(error);
  }
});
router.put("/:id", [CheckAuth, CheckRole], async function (req, res, next) {
  try {
    const movie = await movieController.Update(req);
    res.json({ data: movie });
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", [CheckAuth, CheckRole], async function (req, res, next) {
  try {
    const movie = await movieController.Delete(req);
    res.json({ data: movie });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
