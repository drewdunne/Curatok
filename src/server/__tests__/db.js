/* eslint-disable no-undef */
const { insertRecord } = require('../controllers/dbController');
const db = require('../controllers/dbController');

describe('db model tests', () => {
  const testTable = 'test_table_from_unittests';
  let result;
  const timeoutDuration = 10000;

  beforeAll(async () => {
    const createTable = `CREATE TABLE ${testTable} (id bigint, name varchar);`;
    await db.query(createTable);
  });

  it('succesfully reads existing tables from database', async () => {
    const tableNames = await db.getTableNames();
    expect(tableNames).toContain(testTable);
  });

  describe('createTable function', () => {
    const tableName = 'test_table_createtable_function';

    it('succesfully creates a table', async () => {
      await db.createTable(tableName);
      const tableNames = await db.getTableNames();
      expect(tableNames).toContain(tableName);
    });

    it('throws an error if table already exists', async () => {
      const tableName = 'test_table_createtable_function';
      await db.createTable(tableName);
      expect(db.createTable(tableName)).rejects.toEqual(new Error('Table already Exists'));
    });

    afterEach(async () => {
      try {
        await db.query(`DROP TABLE ${tableName}`);
      } catch {
        console.log('Database did not exist');
      }
    });
  });

  describe('inserRecord function', () => {
    it('correctly inserts records into tester table', async () => {
      const record = {
        name: 'andrew',
        description: 'coding like a mofo',
        number: 9001,
      };

      const response = await insertRecord('tester', record);
      expect(response).toBeDefined();
    });
  }, timeoutDuration);

  it('succesfully inserts a new entry into the database', async () => {
    const insertQuery = `INSERT INTO ${testTable} (id, name) VALUES ('2', 'test-entry');`;
    await db.query(insertQuery);
    const insertResponse = await db.query(`SELECT * FROM ${testTable};`);
    expect(insertResponse.rows[0].name).toBe('test-entry');
  });

  it('reads the inserted entry from the database', async () => {
    const readQuery = `SELECT * FROM ${testTable};`;
    const result = await db.query(readQuery);
    expect(result.rows[0].name).toEqual('test-entry');
  });

  afterAll(() => {
    const dropQuery = `DROP TABLE ${testTable};`;
    db.query(dropQuery);
  });
});
