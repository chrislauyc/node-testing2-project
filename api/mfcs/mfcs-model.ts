const db = require("../../data/db-config");

const get=()=>{
    return db("mfcs");
};

const getById=(mfc_id:number):Promise<object>=>{
    return db("mfcs").where({mfc_id}).first();
};

const insert=async(exp:object):Promise<object>=>{
    const [mfc_id] = await db("mfcs").insert(exp);
    return getById(mfc_id);
};

const update=async(mfc_id:number,exp:object):Promise<object>=>{
    await db("mfcs").where({mfc_id}).update(exp);
    return getById(mfc_id);
};

const remove=async(mfc_id:number):Promise<object>=>{
    const row = await getById(mfc_id);
    await db("mfcs").where({mfc_id}).delete();
    return Promise.resolve(row);
};

export = {
    get,
    getById,
    insert,
    update,
    remove
}