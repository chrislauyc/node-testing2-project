const model = require("./temperatures-model");
const db = require("../../data/db-config");
const material1 = {
    material_name:"graphite"
};

const experiment1 = {
    experiment_date: Date.now(),
    NP_id: 0,
    material_id: 1
}

const temperature1 = {
    "temperature scan #":1,
    "temperature_time":Date.now(),
    experiment_id:1
}
const temperature2 = {
    "temperature scan #":2,
    "temperature_time":Date.now(),
    experiment_id:1,
    temperature:1600
}
describe("temperatures model",()=>{
    test("sanity check",()=>{
        expect(1).toBe(1);
    });
    beforeAll(async()=>{
        await db.migrate.rollback();
        await db.migrate.latest();
    });
    beforeEach(async()=>{
        await db("temperatures").truncate();
        await db("experiments").truncate();
        await db("materials").truncate();
        await db("materials").insert(material1);
        await db("experiments").insert(experiment1);
        await db("temperatures").insert(temperature1);
    });
    afterAll(async()=>{
        await db.destroy();
    });
    describe("get",()=>{ //get with query
        test("returns the correct number of temperatures",async()=>{
            await db("temperatures").insert(temperature2);
            const rows = await model.get();
            expect(rows).toHaveLength(2);
        }); 
    });
    describe("getById",()=>{
        test("returns the correct temperatures",async()=>{
            const expected = await db("temperatures").where({temperature_id:1}).first();
            const actual = await model.getById(1);
            expect(expected).toMatchObject(actual);
        });
    });
    describe("insert",()=>{
        test("adds temperature to db",async()=>{
            await model.insert(temperature2);
            expect(await db("temperatures")).toHaveLength(2);
        });
        test("returns the inserted temperature",async()=>{
            const row = await model.insert(temperature2);
            expect(row).toMatchObject({...temperature2,temperature_id:2});
        });
    });
    describe("update",()=>{
        test("updates an temperature in db",async()=>{
            await model.update(1,{...temperature1,temperature:1400});
            const row = await db("temperatures").where({temperature_id:1}).first();
            expect(row["temperature"]).toBe(1400);
        });
        test("returns the updated temperature",async()=>{
            const row = await model.update(1,{...temperature1,temperature:1400});
            expect(row["temperature"]).toBe(1400);
        });
    });
    describe("delete",()=>{
        test("deletes an temperature from the db",async()=>{
            await model.remove(1);
            expect(await db("temperatures")).toHaveLength(0);
        });
        test("returns the deleted temperature from the db",async()=>{
            const row = await model.remove(1);
            expect(row).toMatchObject({...temperature1,temperature_id:1});
        });
    });
});