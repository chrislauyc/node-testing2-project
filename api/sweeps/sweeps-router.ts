const router = require("express").Router();
import model = require("./sweeps-model");
import middlewares = require("./sweeps-middlewares");
const {checkBodyShape,sweepIdMustExist} = middlewares;
router.get("/",async(req:any,res:any,next:any)=>{
    try{
        res.status(200).json(await model.get());
    }
    catch(e){
        next(e);
    }
});
router.get("/:sweep_id",sweepIdMustExist,async(req:any,res:any,next:any)=>{
    try{
        res.status(200).json(await model.getById(req.params.sweep_id));
    }
    catch(e){
        next(e);
    }
});
router.post("/",checkBodyShape,async(req:any,res:any,next:any)=>{
    try{
        res.status(201).json(await model.insert(req.body));
    }
    catch(e){
        next(e);
    }
});
router.put("/:sweep_id",checkBodyShape,sweepIdMustExist,async(req:any,res:any,next:any)=>{
    try{
        res.status(200).json(await model.update(req.params.sweep_id,req.body));
    }
    catch(e){
        next(e);
    }
});
router.delete("/:sweep_id",sweepIdMustExist,async(req:any,res:any,next:any)=>{
    try{
        res.status(200).json(await model.remove(req.params.sweep_id));
    }
    catch(e){
        next(e);
    }
});

export = router;