const model = require("./experiment-model");
const db = require("../../data/db-config");

const graphite = {
    material_name:"graphite"
};
const nanodiamond = {
    material_name:"nanodiamond"
}
const experiment1 = {
    experiment_date: Date.now(),
    NP_id: 0
}
const experiment2 = {
    experiment_date: Date.now(),
    NP_id: 2
}

describe("experiment model",()=>{
    test("sanity check",()=>{
        expect(1).toBe(1);
    });
    beforeAll(async()=>{
        await db.migrate.rollback();
        await db.migrate.latest();
    });
    beforeEach(async()=>{
        await db("experiments").truncate();
        await db("materials").truncate();
        const [material_id] = await db("materials").insert(graphite);
        await db("experiments").insert({...experiment1,material_id});
    });
    afterAll(async()=>{
        await db.destroy();
    });
    describe("get",()=>{ //get with query
        test("returns the correct number of experiments",async()=>{
            await db("materials").insert(nanodiamond);
            await db("experiments").insert({...experiment2,material_id});
            const exps = await model.get();
            expect(exps).toHaveLength(2);
        }); 
    });
    describe("getById",()=>{
        test("returns the correct experiment",async()=>{
            const expected = await db("experiments").where({experiment_id:1}).first();
            const actual = await model.getById(1);
            expect(expected).toMatchObject(actual);
        });
    });
    describe("insert",()=>{
        test("adds experiment to db",async()=>{
            await model.insert({experiment2,material_id:1});
            expect(await db("experiments")).toHaveLength(2);
        });
        test("returns the inserted experiment",async()=>{
            const exp = await model.insert({experiment2,material_id:1});
            expect(exp).toMatchObject({...experiment2,material_id:1,experiment_id:2});
        });
    });
    describe("update",()=>{
        test("updates an experiment in db",async()=>{
            await model.update(1,{...experiment2,material_id:1,NP_id:10});
            const updatedExp = await db("experiments").where({experiment_id:2}).first();
            expect(updatedExp.NP_id).toBe(10);
        });
        test("returns the updated experiment",async()=>{
            const updatedExp = await model.update(1,{...experiment2,material_id:1,NP_id:10});
            expect(updatedExp.NP_id).toBe(10);
        });
    });
    describe("delete",()=>{
        test("deletes an experiment from the db",async()=>{
            await model.delete(1);
            expect(await db("experiments")).toHaveLength(0);
        });
        test("returns the deleted experiment from the db",async()=>{
            const deletedExp = await model.delete(1);
            expect(deletedExp).toMatchObject({...experiment1,material_id:1});
        });
    });
});