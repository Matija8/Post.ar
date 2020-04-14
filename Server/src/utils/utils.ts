import { Response } from "express";

export function 
createResponse(response: Response, status: number, statusCode: number, message: string, data: any = {}) {
    response.status(status);
    response.json({
        status: status,
        statusCode: statusCode,
        message: message,
        payload: data
    });
}
