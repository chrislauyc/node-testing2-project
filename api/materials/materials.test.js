const model = require("./materials-model");
const db = require("../../data/db-config");

const material1 = {
    material_name:"graphite"
};
const material2 = {
    material_name:"nanodiamond"
}

describe("material model",()=>{
    test("sanity check",()=>{
        expect(1).toBe(1);
    });
    beforeAll(async()=>{
        await db.migrate.rollback();
        await db.migrate.latest();
    });
    beforeEach(async()=>{
        await db("materials").truncate();
        await db("materials").insert(material1);
    });
    afterAll(async()=>{
        await db.destroy();
    });
    describe("get",()=>{ //get with query
        test("returns the correct number of materials",async()=>{
            await db("materials").insert(material1);
            const rows = await model.get();
            expect(rows).toHaveLength(2);
        }); 
    });
    describe("getById",()=>{
        test("returns the correct material",async()=>{
            const expected = await db("materials").where({material_id:1}).first();
            const actual = await model.getById(1);
            expect(expected).toMatchObject(actual);
        });
    });
    describe("insert",()=>{
        test("adds material to db",async()=>{
            await model.insert(material2);
            expect(await db("materials")).toHaveLength(2);
        });
        test("returns the inserted material",async()=>{
            const row = await model.insert(material2);
            expect(row).toMatchObject({...material2,material_id:2});
        });
    });
    describe("update",()=>{
        test("updates an material in db",async()=>{
            await model.update(1,{...material2,material_name:"GRAPHITE"});
            const row = await db("materials").where({material_id:1}).first();
            expect(row.material_name).toEqual("GRAPHITE");
        });
        test("returns the updated material",async()=>{
            const row = await model.update(1,{...material2,material_name:"GRAPHITE"});
            expect(row.material_name).toEqual("GRAPHITE");
        });
    });
    describe("delete",()=>{
        test("deletes an material from the db",async()=>{
            await model.remove(1);
            expect(await db("materials")).toHaveLength(0);
        });
        test("returns the deleted experiment from the db",async()=>{
            const row = await model.remove(1);
            expect(row).toMatchObject({...material1,material_id:1});
        });
    });
});