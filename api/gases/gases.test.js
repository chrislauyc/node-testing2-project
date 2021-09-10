const model = require("./gases-model");
const db = require("../../data/db-config");

const gas1 = {
    gas_name:"argon"
}
const gas2 = {
    gas_name: "oxygen"
}

describe("gases model",()=>{
    test("sanity check",()=>{
        expect(1).toBe(1);
    });
    beforeAll(async()=>{
        await db.migrate.rollback();
        await db.migrate.latest();
    });
    beforeEach(async()=>{
        await db("gases").truncate();
        await db("gases").insert(gas1);
    });
    afterAll(async()=>{
        await db.destroy();
    });
    describe("get",()=>{ //get with query
        test("returns the correct number of gases",async()=>{
            await db("gases").insert(gas2);
            const rows = await model.get();
            expect(rows).toHaveLength(2);
        }); 
    });
    describe("getById",()=>{
        test("returns the correct gas",async()=>{
            const expected = await db("gases").where({gas_id:1}).first();
            const actual = await model.getById(1);
            expect(expected).toMatchObject(actual);
        });
    });
    describe("insert",()=>{
        test("adds gas to db",async()=>{
            await model.insert(gas2);
            expect(await db("gases")).toHaveLength(2);
        });
        test("returns the inserted gas",async()=>{
            const row = await model.insert(gas2);
            expect(row).toMatchObject({...gas2,gas_id:2});
        });
    });
    describe("update",()=>{
        test("updates a gas in db",async()=>{
            await model.update(1,{...gas1,gas_name:"ARGON"});
            const row = await db("gases").where({gas_id:1}).first();
            expect(row.gas_name).toEqual("ARGON");
        });
        test("returns the updated gas",async()=>{
            const row = await model.update(1,{...gas1,gas_name:"ARGON"});
            expect(row.gas_name).toEqual("ARGON");
        });
    });
    describe("delete",()=>{
        test("deletes a gas from the db",async()=>{
            await model.remove(1);
            expect(await db("gases")).toHaveLength(0);
        });
        test("returns the deleted experiment from the db",async()=>{
            const row = await model.remove(1);
            expect(row).toMatchObject({...gas1,gas_id:1});
        });
    });
});