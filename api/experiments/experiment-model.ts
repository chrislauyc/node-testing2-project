const db = require("../../data/db-config");

const get=()=>{
    return db("experiments");
};

const getById=(experiment_id:number):Promise<object>=>{
    return db("experiments").where({experiment_id}).first();
};

const insert=async(exp:object):Promise<object>=>{
    const [experiment_id] = await db("experiments").insert(exp);
    return getById(experiment_id);
};

const update=async(experiment_id:number,exp:object):Promise<object>=>{
    await db("experiments").where({experiment_id}).update(exp);
    return getById(experiment_id);
};

const remove=async(experiment_id:number):Promise<object>=>{
    const row = await getById(experiment_id);
    await db("experiments").where({experiment_id}).delete();
    return Promise.resolve(row);
};

export = {
    get,
    getById,
    insert,
    update,
    remove
}