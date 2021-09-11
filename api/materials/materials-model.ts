const db = require("../../data/db-config");

const get=()=>{
    return db("materials");
};

const getById=(material_id:number):Promise<object>=>{
    return db("materials").where({material_id}).first();
};

const insert=async(exp:object):Promise<object>=>{
    const [material_id] = await db("materials").insert(exp);
    return getById(material_id);
};

const update=async(material_id:number,exp:object):Promise<object>=>{
    await db("materials").where({material_id}).update(exp);
    return getById(material_id);
};

const remove=async(material_id:number):Promise<object>=>{
    const row = await getById(material_id);
    await db("materials").where({material_id}).delete();
    return Promise.resolve(row);
};

export = {
    get,
    getById,
    insert,
    update,
    remove
}