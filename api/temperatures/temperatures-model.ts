const db = require("../../data/db-config");

const get=()=>{
    return db("temperatures");
};

const getById=(temperature_id:number):Promise<object>=>{
    return db("temperatures").where({temperature_id}).first();
};

const insert=async(exp:object):Promise<object>=>{
    const [temperature_id] = await db("temperatures").insert(exp);
    return getById(temperature_id);
};

const update=async(temperature_id:number,exp:object):Promise<object>=>{
    await db("temperatures").where({temperature_id}).update(exp);
    return getById(temperature_id);
};

const remove=async(temperature_id:number):Promise<object>=>{
    const row = await getById(temperature_id);
    await db("temperatures").where({temperature_id}).delete();
    return Promise.resolve(row);
};

export = {
    get,
    getById,
    insert,
    update,
    remove
}