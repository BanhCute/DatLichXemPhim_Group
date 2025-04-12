var express = require('express');
var router = express.Router();
let paymentController = require('../controllers/paymentController');
let { CreateSuccessRes } = require('../utils/responseHandler');
const { CheckAuth } = require('../utils/check_auth');
require('dotenv').config();

router.get('/', CheckAuth, async function (req, res, next) {
  try {
    let payments = await paymentController.GetAll(req.user.id);
    CreateSuccessRes(res, payments, 200);
  } catch (error) {
    next(error);
  }
});

router.post('/', CheckAuth, async function (req, res, next) {
  try {
    let body = req.body;
    let newPayment = await paymentController.Create(body);
    CreateSuccessRes(res, newPayment, 201);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', CheckAuth, async function (req, res, next) {
  try {
    let payment = await paymentController.Update(req);
    CreateSuccessRes(res, payment, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;