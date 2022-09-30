/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const cookieParser = require('cookie-parser');
const Mode = require('../../Mode');
const RequestType = require('../../scraper/RequestTypes');
const ScrapeRequest = require('../../scraper/ScrapeRequest');
const { insertRecord, getVideos } = require('./dbController');
const db = require('./dbController');
const dbRouter = require('../routes/db');

const scraperController = {};

scraperController.executeScrape = async (req, res, next) => {
//   console.log(req.params.username);
//   console.log('made it to controller test passed');
  if (req.cookies) {
    if (req.cookies.curatok) {
      res.locals.videos = await db.getVideos(req.cookies.curatok);
      return next();
    }
  }

  const scrape = new ScrapeRequest(Mode.Dev, RequestType.UserLikedVideos);
  await scrape.open(req.params.username);
  const videos = await scrape.send();

  // Hack for presentation, drop videos table every time
  try {
    await db.dropTable('videos');
  } catch {
    console.log('scraperController.executeScrape: table did not exist');
  }

  await db.createTable('videos', false, 'username', 'url');

  for (const key in videos) {
    await insertRecord('videos', {
      username: req.params.username,
      url: videos[key].Url,
    });
  }

  res.locals.videos = await getVideos(req.params.username);
  next();
};

module.exports = scraperController;
