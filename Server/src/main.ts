import { createConnection } from "typeorm";
import * as dotenv from "dotenv";

import { Routes } from "./routes";
import { Logger } from "./utils/logger";

const cors = require("cors");
const http = require("http");
const express = require("express");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const logger = new Logger("express");

createConnection().then(connection => {
    // load .env config
    dotenv.config();

    // create express app
    const app = express();

    // setup express app
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(cors({ origin: ["http://localhost:4200"], credentials: true }));

    // register express routes
    Routes.forEach(route => {
        (app)[route.method](route.path, (req: Request, res: Response) =>
            (new (route.controller))[route.handler](req, res))
    });

    // start express server
    http.createServer(app)
        .listen(process.env.PORT);
        
    logger.info(`server started at ${process.env.PORT} port`);
}).catch(err => {
    logger.fatal("fatal error", err);
});
