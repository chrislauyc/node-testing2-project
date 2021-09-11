const model = require("./sweeps-model");
const db = require("../../data/db-config");

const material1 = {
    material_name:"graphite"
};

const experiment1 = {
    experiment_date: Date.now(),
    NP_id: 0,
    material_id: 1
}

const sweep1 = {
    experiment_id:1,
    "sweep scan #":1
}
const sweep2 = {
    experiment_id:1,
    "sweep scan #":2
}


describe("sweeps model",()=>{
    test("sanity check",()=>{
        expect(1).toBe(1);
    });
    beforeAll(async()=>{
        await db.migrate.rollback();
        await db.migrate.latest();
    });
    beforeEach(async()=>{
        await db("sweeps").truncate();
        await db("experiments").truncate();
        await db("materials").truncate();
        await db("materials").insert(material1);
        await db("experiments").insert(experiment1);
        await db("sweeps").insert(sweep1);
    });
    afterAll(async()=>{
        await db.destroy();
    });
    describe("get",()=>{ //get with query
        test("returns the correct number of sweeps",async()=>{
            await db("sweeps").insert(sweep2);
            const rows = await model.get();
            expect(rows).toHaveLength(2);
        }); 
    });
    describe("getById",()=>{
        test("returns the correct sweeps",async()=>{
            const expected = await db("sweeps").where({sweep_id:1}).first();
            const actual = await model.getById(1);
            expect(expected).toMatchObject(actual);
        });
    });
    describe("insert",()=>{
        test("adds sweeps to db",async()=>{
            await model.insert(sweep2);
            expect(await db("sweeps")).toHaveLength(2);
        });
        test("returns the inserted sweep",async()=>{
            const row = await model.insert({...sweep2,sweep_id:2});
            expect(row).toMatchObject({...sweep2,sweep_id:2});
        });
    });
    describe("update",()=>{
        test("updates a sweep in db",async()=>{
            await model.update(1,{...sweep1,"total pressure":10});
            const row = await db("sweeps").where({sweep_id:1}).first();
            expect(row["total pressure"]).toBe(10);
        });
        test("returns the updated sweep",async()=>{
            const row = await model.update(1,{...sweep1,"total pressure":10});
            expect(row["total pressure"]).toBe(10);
        });
    });
    describe("delete",()=>{
        test("deletes an sweep from the db",async()=>{
            await model.remove(1);
            expect(await db("sweeps")).toHaveLength(0);
        });
        test("returns the deleted experiment from the db",async()=>{
            const row = await model.remove(1);
            expect(row).toMatchObject({...sweep1,sweep_id:1});
        });
    });
});