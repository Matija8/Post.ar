import { Response } from "express";

import { success, error } from "../status-codes.json";

export function createResponse(response: Response, status: number, statusCode: number, data: any = {}) {
    response.status(status);
    response.json({
        status: status,
        statusCode: statusCode,
        message: status == 200 ? success[statusCode] : error[statusCode],
        payload: data
    });
}
