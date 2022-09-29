const credentials = require('../../../credentials/creds').postgres;
const postgres = require('pg');
const express = require('express');
const AlterationTypes = require('./AlterationTypes');

const router = express.Router();

const pool = new postgres.Pool({
  connectionString: credentials.url,
});

router.get('/:id', (req, res) => res.status(200));

module.exports = {
  // eslint-disable-next-line arrow-body-style
  query: (text, params, callback) => {
    // console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
