"use strict";
var express = require("express");
var server = express();
var experimentRouter = require("./experiments/experiment-router");
var gasesRouter = require("./gases/gases-router");
var materialsRouter = require("./experiments/experiment-router");
var mfcsRouter = require("./experiments/experiment-router");
var sweepsRouter = require("./experiments/experiment-router");
var temperaturesRouter = require("./experiments/experiment-router");
server.use(express.json());
server.use("/api/experiments", experimentRouter);
// server.use("/api/gases",gasesRouter);
// server.use("/api/materials",materialsRouter);
// server.use("/api/mfcs",mfcsRouter);
// server.use("/api/sweeps",sweepsRouter);
// server.use("/api/temperatures",temperaturesRouter);
server.use(function (err, req, res, next) {
    return res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    });
});
module.exports = server;
