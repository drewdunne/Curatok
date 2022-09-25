const credentials = require('../../../credentials/creds').postgres;
const postgres = require('pg');
const express = require('express');

const router = express.Router();

const pool = new postgres.Pool({
    connectionString: credentials.url,
});

async function getTableNames() {
    try{
        // \d was throwing an error. Using the below instead, determined the public and BASE TABLE mean that they are tables we created.
        const queryTables = 'SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE table_schema=\'public\' AND table_type=\'BASE TABLE\';';
        const dbTables = await pool.query(queryTables);

        if (dbTables != null)
        {
            const tableNames = dbTables.rows.map((e) => e.table_name);
            // console.log('Received following tables received from database:');
            // console.log(tableNames);
            return tableNames;
        }
        else console.log('No tables found');
    }
    catch (error) {
        console.error('Error fetching tables:' + error);
    }
}

router.get('/:id', (req, res) => {
    return res.status(200);
})

router.post('/')
{

}

module.exports = {
    query: (text, params, callback) => {
        // console.log('executed query', text);
        return pool.query(text, params, callback);
    },
    getTableNames: () => { return getTableNames(); }
}