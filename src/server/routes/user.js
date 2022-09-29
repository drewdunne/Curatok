

const express = require('express');
const db = require('../models/db');

const router = express.Router();

router.post('/login', (req, res, next) => {
  console.log('hello');
});

router.post('/create', (req, res, next) => {
  
  // Task: setup session and ssid cookies here, https://www.notion.so/drewdunne/Setup-Cookies-Session-Data-2eece3b4061f4d5da70813851338794b
  // Task: encrypt password, https://www.notion.so/drewdunne/Encrypt-Store-Passwords-8cb8e724abde46388a15628d79069661

  // forward to db

});

module.exports = router;
