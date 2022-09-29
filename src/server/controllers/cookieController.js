const cookieParser = require('cookie-parser');

const cookieController = {};

cookieController.setCookie = (req, res, next) => {
  res.cookie('secret', Math.ceil(Math.random() * 99).toString());

  res.cookie('codesmith', 'hi', {
    maxAge: 600000,
    httpOnly: true,
  });

  console.log(res.cookies);

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
