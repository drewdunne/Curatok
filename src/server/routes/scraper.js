const express = require('express');
const scraperController = require('../controllers/scraperController');

const router = express.Router();

router.post('/:username', scraperController.executeScrape, (req, res) => {
  res.status(200).json(res.locals.videos);
});

module.exports = router;
