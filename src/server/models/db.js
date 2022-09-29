const credentials = require('../../../credentials/creds').postgres;
const postgres = require('pg');
const express = require('express');

const router = express.Router();

const pool = new postgres.Pool({
  connectionString: credentials.url,
});

async function getTableNames() {
  try {
    // \d was throwing an error. Using the below instead, determined the public
    // and BASE TABLE mean that they are tables we created.
    const queryTables = 'SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE table_schema=\'public\' AND table_type=\'BASE TABLE\';';
    const dbTables = await pool.query(queryTables);

    if (dbTables != null) {
      const tableNames = dbTables.rows.map((e) => e.table_name);
      return tableNames;
    }
    console.log('No tables found');
  } catch (error) {
    console.error(`Error fetching tables:${error}`);
  }
}
async function createTable(name, ...attributes) {
  const tables = await getTableNames();
  if (tables.includes(name)) {
    throw new Error('Table already Exists');
  }
  let query = `CREATE TABLE ${name}`;
  if (attributes.length !== 0) {
    query = query.concat('( ', attributes.toString(), ' );');
  } else {
    query = query.concat('();');
  }
  await pool.query(query);
}

router.get('/:id', (req, res) => res.status(200));

module.exports = {
  query: (text, params, callback) =>
  // console.log('executed query', text);
  {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
  getTableNames: async () => getTableNames(),
  createTable: (name, ...attributes) => createTable(name, ...attributes),
};
