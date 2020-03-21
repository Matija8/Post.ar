import { createConnection } from "typeorm";
import * as dotenv from "dotenv";

import { Routes } from "./routes";
import { logger } from "./utils/Utils";

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

createConnection().then(connection => {
    // Load .env config
    dotenv.config();

    // Create express app
    const app = express();

    // Setup express app
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(cors({ origin: [ "http://localhost:4200" ], credentials: true }));

    // Register express routes
    Routes.forEach(route => {
        (app as any)[route.method](route.path, (req: Request, res: Response) =>
            (new (route.controller as any))[route.handler](req, res))
    });

    // Start express server
    app.listen(process.env.PORT);
    logger.info(`Express server started at ${ process.env.PORT }`);
}).catch(err => {
    logger.fatal(err);
});
