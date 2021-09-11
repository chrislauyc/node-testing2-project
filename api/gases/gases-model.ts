const db = require("../../data/db-config");

const get=()=>{
    return db("gases");
};

const getById=(gas_id:number):Promise<object>=>{
    return db("gases").where({gas_id}).first();
};

const insert=async(exp:object):Promise<object>=>{
    const [gas_id] = await db("gases").insert(exp);
    return getById(gas_id);
};

const update=async(gas_id:number,exp:object):Promise<object>=>{
    await db("gases").where({gas_id}).update(exp);
    return getById(gas_id);
};

const remove=async(gas_id:number):Promise<object>=>{
    const row = await getById(gas_id);
    await db("gases").where({gas_id}).delete();
    return Promise.resolve(row);
};

export = {
    get,
    getById,
    insert,
    update,
    remove
}