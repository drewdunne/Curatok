const Mode = require('../../Mode');
const RequestType = require('../../scraper/RequestTypes');
const ScrapeRequest = require('../../scraper/ScrapeRequest');
const db = require('./dbController');

const scraperController = {};

scraperController.executeScrape = async (req, res, next) => {
//   console.log(req.params.username);
//   console.log('made it to controller test passed');
  const scrape = new ScrapeRequest(Mode.Dev, RequestType.UserLikedVideos);
  await scrape.open(req.params.username);
  const videos = await scrape.send();

  // Hack for presentation
  try {
    await db.dropTable('videos');
  } catch {
    console.log('scraperController.executeScrape: table did not exist');
  }

  console.log(videos);
  db.createTable('videos', false, 'username', 'url');

  next();
};

module.exports = scraperController;
