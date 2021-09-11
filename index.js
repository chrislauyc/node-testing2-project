"use strict";
require("dotenv").config();
var server = require("./api/server");
var port = process.env.PORT || "5000";
server.listen(port, function () { return console.log("server is listening at port " + port); });
