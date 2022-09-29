const express = require('express');
const cookieParser = require('cookie-parser');
const scraperController = require('../controllers/scraperController');
const cookieController = require('../controllers/cookieController');

const router = express.Router();

router.post('/:username', scraperController.executeScrape, cookieController.setCookie, (req, res) => {
  console.log('sending response to client:');
  console.log(res.locals.videos);
  res.status(200).json(res.locals.videos);
});

module.exports = router;
