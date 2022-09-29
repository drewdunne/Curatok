const db = require('../models/db');

async function getTableNames() {
  try {
    // \d was throwing an error. Using the below instead, determined the public
    // and BASE TABLE mean that they are tables we created.
    const queryTables = 'SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE table_schema=\'public\' AND table_type=\'BASE TABLE\';';
    const dbTables = await db.query(queryTables);

    if (dbTables != null) {
      const tableNames = dbTables.rows.map((e) => e.table_name);
      return tableNames;
    }
    console.log('No tables found');
  } catch (error) {
    console.error(`Error fetching tables:${error}`);
  }
}

async function insertRecord(table, data) {
  // data is expected to be an object with keys for the attributes and values for the values
  // ideally this function would also match data vs a schema.
  
  let query = `INSERT INTO ${table}`;
  let attributesString = '';
  let valuesString = '';

  const keys = Object.keys(data);
  const values = Object.values(data);
  for (let i = 0; i < keys.length; i += 1) {
    attributesString += `${keys[i]},`;
    if (typeof values[i] === 'string') valuesString += `'${values[i]}',`;
    else if (typeof values[i] === 'number') valuesString += `${values[i]},`;
    else { throw new Error('Type not supported. Only numbers and strings currently supported'); }
  }

  // remove trailing commas
  attributesString = attributesString.slice(0, -1);
  valuesString = valuesString.slice(0, -1);

  query = query.concat(` (${attributesString}) `, ' VALUES ', `(${valuesString});`);
  console.log(query);
  return await db.query(query);
}

async function alterTable(alterationType) {
  throw new Error('Not Yet Implemented');
}

async function createTable(name, autoPopulatePkey, ...attributes) {
  const tables = await getTableNames();
  if (tables.includes(name)) {
    throw new Error('Table already Exists');
  }
  if (attributes.includes('id') || attributes.includes('_id')) {
    throw new Error('Do not include id field, this is automtically generated and populated');
  }
  let query = `CREATE TABLE ${name} (`;
  if (autoPopulatePkey) {
    query = query.concat('id INT GENERATED ALWAYS AS IDENTITY');
  }
  if (attributes.length !== 0 && autoPopulatePkey) {
    query = query.concat(',');
  }
  if (attributes.length !== 0) {
    query = query.concat(attributes.toString());
  }
  query = query.concat(' );');
  await db.query(query);
}

module.exports = {
  query: db.query,
  getTableNames: async () => getTableNames(),
  createTable: (name, ...attributes) => createTable(name, ...attributes),
  insertRecord,
};
