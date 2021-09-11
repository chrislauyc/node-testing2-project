const db = require("../../data/db-config");

const get=()=>{
    return db("sweeps");
};

const getById=(sweep_id:number):Promise<object>=>{
    return db("sweeps").where({sweep_id}).first();
};

const insert=async(exp:object):Promise<object>=>{
    const [sweep_id] = await db("sweeps").insert(exp);
    return getById(sweep_id);
};

const update=async(sweep_id:number,exp:object):Promise<object>=>{
    await db("sweeps").where({sweep_id}).update(exp);
    return getById(sweep_id);
};

const remove=async(sweep_id:number):Promise<object>=>{
    const row = await getById(sweep_id);
    await db("sweeps").where({sweep_id}).delete();
    return Promise.resolve(row);
};

export = {
    get,
    getById,
    insert,
    update,
    remove
}