const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/MoviesController');
const auth = require('../middleware/Movies');

router.post('/movies', moviesController.postMovies);
router.get('/movies',auth, moviesController.getMovies);

module.exports = router;