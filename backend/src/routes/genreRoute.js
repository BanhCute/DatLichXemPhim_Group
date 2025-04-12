var express = require('express');
var router = express.Router();
let genreController = require('../controllers/genreController');
let { CreateSuccessRes } = require('../utils/responseHandler');
const { CheckAuth, CheckRole } = require('../utils/check_auth');
require("dotenv").config();

router.get('/', async function (req, res, next) {
  try {
    let genres = await genreController.GetAll();
    CreateSuccessRes(res, genres, 200);
  } catch (error) {
    next(error);
  }
});

router.post('/', [CheckAuth, CheckRole], async function (req, res, next) {
  try {
    let body = req.body;
    let newGenre = await genreController.Create(body.name);
    CreateSuccessRes(res, newGenre, 201);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', [CheckAuth, CheckRole], async function (req, res, next) {
  try {
    let genre = await genreController.Update(req);
    CreateSuccessRes(res, genre, 200);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', [CheckAuth, CheckRole], async function (req, res, next) {
  try {
    let genre = await genreController.Delete(req);
    CreateSuccessRes(res, genre, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;