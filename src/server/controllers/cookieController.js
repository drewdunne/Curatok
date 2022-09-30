const cookieParser = require('cookie-parser');

const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  res.cookie('curatok', req.params.username, {
    maxAge: 600000,
    httpOnly: false,
  });

  next();
};

cookieController.setSSIDCookie = (req, res, next) => {
  if (!req.query.userId) {
    next('cookieController.setSSIDCookie: No userID specified');
  }
  res.cookie('ssid', req.query.userId, { httpOnly: true });
  next();
};

module.exports = cookieController;
