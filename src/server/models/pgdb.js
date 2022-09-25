const credentials = require('../../../credentials/creds').postgres;
const postgres = require('pg');

const pool = new postgres.Pool({
    connectionString: credentials.url,
});

module.exports = {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback);
    }
}