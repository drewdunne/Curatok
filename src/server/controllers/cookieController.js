const cookieParser = require('cookie-parser');

const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  if (!req.cookie) {
    res.cookie(req.params.username, Math.ceil(Math.random() * 99).toString(), {
      maxAge: 600000,
      httpOnly: false,
    });

    res.cookie('Curatok', req.params.username, {
      maxAge: 600000,
      httpOnly: false,
    });
  }

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
