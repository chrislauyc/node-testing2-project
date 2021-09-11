"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var express_validator_1 = require("express-validator");
var expModel = require("../experiments/experiment-model");
var sweepModel = require("./sweeps-model");
var checkBodyShape = [
    (0, express_validator_1.body)("experiment_id").isInt().custom(function (value, _a) {
        var req = _a.req;
        return expModel.getById(value);
    }),
    (0, express_validator_1.body)("sweep scan #").isInt(),
    (0, express_validator_1.body)("total pressure").optional().isNumeric(),
    (0, express_validator_1.body)("high frequency").optional().isNumeric(),
    (0, express_validator_1.body)("low frequency").optional().isNumeric(),
    (0, express_validator_1.body)("drive amplitude").optional().isNumeric(),
    (0, express_validator_1.body)("dwell time").optional().isNumeric(),
    (0, express_validator_1.body)("sweep time").optional().isNumeric(),
    (0, express_validator_1.body)("RF Vo A").optional().isNumeric(),
    (0, express_validator_1.body)("RF Vo B").optional().isNumeric(),
    (0, express_validator_1.body)("RF frequency").optional().isNumeric(),
    (0, express_validator_1.body)("green laser mW").optional().isNumeric(),
    function (req, res, next) {
        var err = (0, express_validator_1.validationResult)(req);
        if (err.isEmpty()) {
            next();
        }
        else {
            var msg = err.array()[0].msg;
            res.status(msg.status || 400).json({ message: msg.message || msg });
        }
    }
];
var sweepIdMustExist = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sweepModel.getById(req.params.sweep_id)];
            case 1:
                if (_a.sent()) {
                    next();
                }
                else {
                    res.status(404).json({ message: "not found" });
                }
                return [2 /*return*/];
        }
    });
}); };
module.exports = {
    checkBodyShape: checkBodyShape,
    sweepIdMustExist: sweepIdMustExist
};
