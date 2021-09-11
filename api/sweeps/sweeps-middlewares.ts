import { body, validationResult } from "express-validator";
import expModel = require("../experiments/experiment-model");
import sweepModel = require("./sweeps-model");
const checkBodyShape = [
    body("experiment_id").isInt().custom((value:number,{req}:any)=>expModel.getById(value)),
    body("sweep scan #").isInt(),
    body("total pressure").optional().isNumeric(),
    body("high frequency").optional().isNumeric(),
    body("low frequency").optional().isNumeric(),
    body("drive amplitude").optional().isNumeric(),
    body("dwell time").optional().isNumeric(),
    body("sweep time").optional().isNumeric(),
    body("RF Vo A").optional().isNumeric(),
    body("RF Vo B").optional().isNumeric(),
    body("RF frequency").optional().isNumeric(),
    body("green laser mW").optional().isNumeric(),

    (req:any,res:any,next:any)=>{
        const err = validationResult(req);
        if(err.isEmpty()){
            next();
        }
        else{
            const {msg} = err.array()[0];
            res.status(msg.status||400).json({message:msg.message||msg});
        }
    }

];
const sweepIdMustExist = async(req:any,res:any,next:any) =>{
    if(await sweepModel.getById(req.params.sweep_id)){
        next();
    }
    else{
        res.status(404).json({message:"not found"});
    }
}
export = {
    checkBodyShape,
    sweepIdMustExist
};