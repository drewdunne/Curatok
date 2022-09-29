const express = require('express');
const cookieController = require('../controllers/cookieController');
const scraperController = require('../controllers/scraperController');

const router = express.Router();

router.post('/:username', scraperController.executeScrape, cookieController.setCookie, (req, res) => {
  res.status(200).json(res.locals.videos);
});

module.exports = router;
