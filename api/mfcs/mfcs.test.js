const model = require("./mfcs-model");
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
const gas1 = {
    gas_name:"argon"
}
const mfc1 = {
    sweep_id:1,
    gas_id:1,
}
const mfc2 = {
    sweep_id:1,
    gas_id:1,
    "mfc_%":50
}
describe("mfcs model",()=>{
    test("sanity check",()=>{
        expect(1).toBe(1);
    });
    beforeAll(async()=>{
        await db.migrate.rollback();
        await db.migrate.latest();
    });
    beforeEach(async()=>{
        await db("mfcs").truncate();
        await db("sweeps").truncate();
        await db("experiments").truncate();
        await db("materials").truncate();
        await db("gases").truncate();
        await db("gases").insert(gas1);
        await db("materials").insert(material1);
        await db("experiments").insert(experiment1);
        await db("sweeps").insert(sweep1);
        await db("mfcs").insert(mfc1);
    });
    afterAll(async()=>{
        await db.destroy();
    });
    describe("get",()=>{ //get with query
        test("returns the correct number of mfcs",async()=>{
            await db("mfcs").insert(mfc2);
            const rows = await model.get();
            expect(rows).toHaveLength(2);
        }); 
    });
    describe("getById",()=>{
        test("returns the correct mfcs",async()=>{
            const expected = await db("mfcs").where({mfc_id:1}).first();
            const actual = await model.getById(1);
            expect(actual).toMatchObject(expected);
        });
    });
    describe("insert",()=>{
        test("adds mfc to db",async()=>{
            await model.insert(mfc2);
            expect(await db("mfcs")).toHaveLength(2);
        });
        test("returns the inserted mfc",async()=>{
            const row = await model.insert(mfc2);
            expect(row).toMatchObject({...mfc2,mfc_id:2});
        });
    });
    describe("update",()=>{
        test("updates an mfc in db",async()=>{
            await model.update(1,{...mfc1,"mfc_%":20});
            const row = await db("mfcs").where({mfc_id:1}).first();
            expect(row["mfc_%"]).toBe(20);
        });
        test("returns the updated mfc",async()=>{
            const row = await model.update(1,{...mfc1,"mfc_%":20});
            expect(row["mfc_%"]).toBe(20);
        });
    });
    describe("delete",()=>{
        test("deletes an mfc from the db",async()=>{
            await model.remove(1);
            expect(await db("mfcs")).toHaveLength(0);
        });
        test("returns the deleted mfc from the db",async()=>{
            const row = await model.remove(1);
            expect(row).toMatchObject({...mfc1,mfc_id:1});
        });
    });
});