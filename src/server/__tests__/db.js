const db = require('../models/db.js');
const request = require('supertest');

describe('db model tests', () => {
    const testTable = 'test_table_from_unittests';
    let result;
    
    beforeAll(async () => {
        const createTable = `CREATE TABLE ${testTable} (id bigint, name varchar);`;
        await db.query(createTable);
    })

    it('succesfully reads existing tables from database', async () => {
        let tableNames = await db.getTableNames();
        console.log(tableNames);
        expect(tableNames).toContain(testTable);
    });

    it('succesfully inserts a new entry into the database', async () => {
        const insertQuery = `INSERT INTO ${testTable} (id, name) VALUES ('1', 'test-entry');`;
        await db.query(insertQuery);
        let insertResponse = await db.query(`SELECT * FROM ${testTable};`)
        expect(insertResponse.rows[0].name).toBe('test-entry');
    });
    
    it('reads the inserted entry from the database', async () => {
        const readQuery = `SELECT * FROM ${testTable};`;
        const result = await db.query(readQuery);
        expect(result.rows[0].name).toEqual("test-entry");
    })
    
    afterAll(() => {
        const dropQuery = `DROP TABLE ${testTable};`
        db.query(dropQuery);
    })
});