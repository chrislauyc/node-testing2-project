const request = require("supertest");
const server = require("./api/server");
const db = require("./data/db-config");

describe("endpoint tests",()=>{

    beforeEach(async()=>{
        await db.migrate.rollback();
        await db.migrate.latest();
    });
    afterAll(async()=>{
        await db.destroy();
    });
    
    describe("[GET] /api/sweeps",()=>{
        test("responds with 200",async()=>{

        });
        test("responds with the right number of records",()=>{});
        test("responds with the right shape",async()=>{});
    });
    describe("[GET] /api/temperatures",()=>{
        test("responds with 200",async()=>{});
        test("responds with the right number of records",()=>{});
        test("responds with the right shape",async()=>{});
    });
    describe("[GET] /api/sweeps",()=>{
        test("responds with 200",async()=>{});
        test("responds with the right number of records",async()=>{});
        test("responds with the right shape",async()=>{});
    });
    describe("[GET] /api/gases",()=>{
        test("responds with 200",async()=>{});
        test("responds with the right number of records",async()=>{});
        test("responds with the right shape",async()=>{});
    });
    describe("[GET] /api/mfcs",()=>{
        test("responds with 200",async()=>{});
        test("responds with the right number of records",async()=>{});
        test("responds with the right shape",async()=>{});
    });
    describe("[GET] /api/experiments",()=>{
        test("responds with 200",async()=>{});
        test("responds with the right number of records",async()=>{});
        test("responds with the right shape",async()=>{});
    });
});