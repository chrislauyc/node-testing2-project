const express = require("express");

const server = express();
const experimentRouter = require("./experiments/experiment-router");
const gasesRouter = require("./gases/gases-router");
const materialsRouter = require("./experiments/experiment-router");
const mfcsRouter = require("./experiments/experiment-router");
import sweepsRouter = require("./sweeps/sweeps-router");
const temperaturesRouter = require("./experiments/experiment-router");

server.use(express.json());
server.use("/api/experiments",experimentRouter);
// server.use("/api/gases",gasesRouter);
// server.use("/api/materials",materialsRouter);
// server.use("/api/mfcs",mfcsRouter);
server.use("/api/sweeps",sweepsRouter);
// server.use("/api/temperatures",temperaturesRouter);

server.use((err:any, req:any, res:any, next:any) => {
    return res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack,
    })
})
export = server;