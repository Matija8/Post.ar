import { Response } from "express";

export function createResponse(response: Response, status: number, statusCode: number, message: string, data: any = null) {
    response.status(status);
    response.json({
        status: status,
        statusCode: statusCode,
        message: message,
        data: data
    });
}

// Logger
const log4js = require("log4js").getLogger();
log4js.level = "debug";

export const logger = log4js; 
