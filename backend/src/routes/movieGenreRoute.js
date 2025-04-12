var express = require('express');
var router = express.Router();
let movieGenreController = require('../controllers/movieGenreController');
let { CreateSuccessRes } = require('../utils/responseHandler');
const { CheckAuth, CheckRole } = require('../utils/check_auth');
require('dotenv').config();

router.get('/', async function (req, res, next) {
  try {
    let movieGenres = await movieGenreController.GetAll();
    CreateSuccessRes(res, movieGenres, 200);
  } catch (error) {
    next(error);
  }
});

router.post('/', [CheckAuth, CheckRole], async function (req, res, next) {
  try {
    let body = req.body;
    let newMovieGenre = await movieGenreController.Create(body);
    CreateSuccessRes(res, newMovieGenre, 201);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', [CheckAuth, CheckRole], async function (req, res, next) {
  try {
    let movieGenre = await movieGenreController.Update(req);
    CreateSuccessRes(res, movieGenre, 200);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', [CheckAuth, CheckRole], async function (req, res, next) {
  try {
    let movieGenre = await movieGenreController.Delete(req);
    CreateSuccessRes(res, movieGenre, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;