var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
let { CreateSuccessRes } = require("../utils/responseHandler");
let authController = require("../controllers/authController");
const { CheckAuth, CheckRole } = require("../utils/check_auth");
require("dotenv").config();

router.post("/register", async function (req, res, next) {
  try {
    let body = req.body;
    let newUser = await authController.CreateAnUser(
      body.email,
      body.password,
      body.name,
      body.role
    );
    CreateSuccessRes(
      res,
      jwt.sign(
        {
          id: newUser.id,
          email: newUser.email,
          expire: new Date(Date.now() + 60 * 60 * 1000).getTime(),
        },
        process.env.JWT_SECRET
      ),
      200
    );
  } catch (error) {
    next(error);
  }
});

router.post("/login", async function (req, res, next) {
  try {
    let { email, password } = req.body;
    let user = await authController.CheckLogin(email, password);
    CreateSuccessRes(
      res,
      jwt.sign(
        {
          id: user.id,
          email: user.email,
          expire: new Date(Date.now() + 60 * 60 * 1000).getTime(),
        },
        process.env.JWT_SECRET
      ),
      200
    );
  } catch (error) {
    next(error);
  }
});

router.get("/me", CheckAuth, async function (req, res, next) {
  try {
    let user = await authController.Me(req.user.id);
    CreateSuccessRes(res, user, 200);
  } catch (error) {
    next(error);
  }
});

router.put("/change-password", CheckAuth, async function (req, res, next) {
  try {
    let user = await authController.ChangePassword(req, res);
    CreateSuccessRes(res, user, 200);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", CheckAuth, async function (req, res, next) {
  try {
    console.log("1");
    let user = await authController.Update(req);
    CreateSuccessRes(res, user, 200);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", CheckAuth, async function (req, res, next) {
  try {
    let user = await authController.Delete(req);
    CreateSuccessRes(res, user, 200);
  } catch (error) {
    next(error);
  }
});

router.get("/users", [CheckAuth, CheckRole], async function (req, res, next) {
  try {
    let users = await authController.GetAllUsers();
    CreateSuccessRes(res, users, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;