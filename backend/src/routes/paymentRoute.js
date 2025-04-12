import { Router } from 'express';
var router = Router();
import { GetAll, Create, Update } from '../controllers/paymentController';
import { CreateSuccessRes } from '../utils/responseHandler';
import { CheckAuth } from '../utils/check_auth';
require('dotenv').config();

router.get('/', CheckAuth, async function (req, res, next) {
  try {
    let payments = await GetAll(req.user.id);
    CreateSuccessRes(res, payments, 200);
  } catch (error) {
    next(error);
  }
});

router.post('/', CheckAuth, async function (req, res, next) {
  try {
    let body = req.body;
    let newPayment = await Create(body);
    CreateSuccessRes(res, newPayment, 201);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', CheckAuth, async function (req, res, next) {
  try {
    let payment = await Update(req);
    CreateSuccessRes(res, payment, 200);
  } catch (error) {
    next(error);
  }
});

export default router;