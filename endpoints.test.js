const request = require("supertest");
const server = require("./api/server");
const db = require("./data/db-config");
const material1 = {
    material_name:"graphite"
};
const material2 = {
    material_name:"graphene"
};
const experiment1 = {
    experiment_date: Date.now(),
    NP_id: 0,
    material_id: 1
};
const experiment2 = {
    experiment_date: Date.now(),
    NP_id: 2,
    material_id:1
}
const sweep1 = {
    experiment_id:1,
    "sweep scan #":1
};
const sweep2 = {
    experiment_id:1,
    "sweep scan #":2
};
const gas1 = {
    gas_name:"argon"
};
const gas2 = {
    gas_name:"oxygen"
};
const mfc1 = {
    sweep_id:1,
    gas_id:1,
};
const mfc2 = {
    sweep_id:1,
    gas_id:1,
    "mfc_%":50
};
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
describe("endpoint tests",()=>{

    beforeAll(async()=>{
        await db.migrate.rollback();
        await db.migrate.latest();
    });
    beforeEach(async()=>{
        await db("mfcs").truncate();
        await db("sweeps").truncate();
        await db("temperatures").truncate();
        await db("experiments").truncate();
        await db("materials").truncate();
        await db("gases").truncate();
        await db("gases").insert(gas1);
        await db("materials").insert(material1);
        await db("experiments").insert(experiment1);
        await db("temperatures").insert(temperature1);
        await db("sweeps").insert(sweep1);
        await db("mfcs").insert(mfc1);
    });
    afterAll(async()=>{
        await db.destroy();
    });
    
    describe("[GET] /api/sweeps",()=>{
        test("responds with 200",async()=>{
            const res = await request(server).get("/api/sweeps");
            expect(res.status).toBe(200);
        });
        test("responds with the right number of records",async()=>{
            await db("sweeps").insert(sweep2);
            const res = await request(server).get("/api/sweeps");
            expect(res.body).toHaveLength(2);
        });
        test("responds with the right format",async()=>{
            const res = await request(server).get("/api/sweeps");
            expect(res.body[0]).toMatchObject({...sweep1,sweep_id:1});
        });
    });
    describe("[GET] /api/sweeps/:sweep_id",()=>{
        test("responds with 200",async()=>{
            const res = await request(server).get("/api/sweeps/1");
            expect(res.status).toBe(200);
        });
        test("responds with the right format",async()=>{
            const res = await request(server).get("/api/sweeps/1");
            expect(res.body).toMatchObject({...sweep1,sweep_id:1});
        });
        test("responds with 404 if id doesn't exist",async()=>{
            const res = await request(server).get("/api/sweeps/100");
            expect(res.status).toBe(404);
        });
    });
    describe("[POST] /api/sweeps",()=>{
        test("added to db",async()=>{
            await request(server).post("/api/sweeps").send(sweep2);
            expect(await db("sweeps")).toHaveLength(2);
        });
        test("responds with 201",async()=>{
            const res = await request(server).post("/api/sweeps").send(sweep2);
            expect(res.status).toBe(201);
        });
        test("responds with the inserted object",async()=>{
            const res = await request(server).post("/api/sweeps").send(sweep2);
            expect(res.body).toMatchObject({...sweep2,sweep_id:2});
        });
    });
    describe("[PUT] /api/sweeps/:sweep_id",()=>{
        test("responds with 200",async()=>{
            const res = await request(server).put("/api/sweeps/1").send({...sweep1,"total pressure":20});
            expect(res.status).toBe(200);
        });
        test("updated record in db",async()=>{
            await request(server).put("/api/sweeps/1").send({...sweep1,"total pressure":20});
            const row = await db("sweeps").where({sweep_id:1}).first();
            expect(row["total pressure"]).toBe(20);
        });
        test("responds with the correct object",async()=>{
            const res = await request(server).put("/api/sweeps/1").send({...sweep1,"total pressure":20});
            expect(res.body).toMatchObject({...sweep1,"total pressure":20,sweep_id:1});
        });
    });
    describe("[DELETE] /api/sweeps/:sweep_id",()=>{
        test("responds with 200",async()=>{
            const res = await request(server).delete("/api/sweeps/1");
            expect(res.status).toBe(200);
        });
        test("deleted record from db",async()=>{
            await request(server).delete("/api/sweeps/1");
            const rows = await db("sweeps").where({sweep_id:1});
            expect(rows).toHaveLength(0);
        });
        test("responds with the deleted record",async()=>{
            const res = await request(server).delete("/api/sweeps/1");
            expect(res.body).toMatchObject({...sweep1,sweep_id:1});
        });
    });
    // describe("[GET] /api/temperatures",()=>{
    //     test("responds with 200",async()=>{

    //     });
    //     test("responds with the right number of records",async()=>{

    //     });
    //     test("responds with the right shape",async()=>{

    //     });
    // });
    // describe("[GET] /api/temperatures/:temperature_id",()=>{
    //     test("responds with 200",async()=>{

    //     });
    //     test("responds with the right number of records",async()=>{

    //     });
    //     test("responds with the right shape",async()=>{

    //     });
    // });
    // describe("[PUT] /api/temperatures/:temperature_id",()=>{
    //     test("responds with 200",async()=>{

    //     });
    //     test("responds with the right number of records",async()=>{

    //     });
    //     test("responds with the right shape",async()=>{

    //     });
    // });
    // describe("[POST] /api/temperatures",()=>{
    //     test("responds with 200",async()=>{

    //     });
    //     test("responds with the right number of records",async()=>{

    //     });
    //     test("responds with the right shape",async()=>{

    //     });
    // });
    // describe("[DELETE] /api/temperatures/:temperature_id",()=>{
    //     test("responds with 200",async()=>{

    //     });
    //     test("responds with the right number of records",async()=>{

    //     });
    //     test("responds with the right shape",async()=>{

    //     });
    // });
    // describe("[GET] /api/gases",()=>{
    //     test("responds with 200",async()=>{

    //     });
    //     test("responds with the right number of records",async()=>{

    //     });
    //     test("responds with the right shape",async()=>{

    //     });
    // });
    // describe("[GET] /api/gases/:gas_id",()=>{
    //     test("responds with 200",async()=>{

    //     });
    //     test("responds with the right number of records",async()=>{

    //     });
    //     test("responds with the right shape",async()=>{

    //     });
    // });
    // describe("[GET] /api/mfcs",()=>{
    //     test("responds with 200",async()=>{

    //     });
    //     test("responds with the right number of records",async()=>{

    //     });
    //     test("responds with the right shape",async()=>{

    //     });
    // });
    // describe("[GET] /api/mfcs/:mfc_id",()=>{
    //     test("responds with 200",async()=>{

    //     });
    //     test("responds with the right number of records",async()=>{

    //     });
    //     test("responds with the right shape",async()=>{

    //     });
    // });
    // describe("[GET] /api/experiments",()=>{
    //     test("responds with 200",async()=>{

    //     });
    //     test("responds with the right number of records",async()=>{

    //     });
    //     test("responds with the right shape",async()=>{

    //     });
    // });
    // describe("[GET] /api/experiments/:experiment_id",()=>{
    //     test("responds with 200",async()=>{

    //     });
    //     test("responds with the right number of records",async()=>{

    //     });
    //     test("responds with the right shape",async()=>{

    //     });
    // });
});