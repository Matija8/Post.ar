import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { readFileSync } from "fs";

import { SessionManager } from "../utils/session-manager/SessionManager";
import { createResponse, logger } from "../utils/Utils";

import { User } from "../entity/User";

import { Success, Error } from "../StatusCodes.json";

const crypto = require("crypto");

export class InboxController {

    // Repositories
    private userRepository = getRepository(User);

    async getMail(request: Request, response: Response) {
        logger.info("/getMail");

        logger.debug("/getMail - validate user");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, Error[1000]);
            return;
        }

        logger.debug("/getMail - get user");
        let user = await this.userRepository.findOne({ where: { username: session.user.username } });
        if (!user) {
            createResponse(response, 400, 1004, Error[1004]);
            return;
        }

        logger.debug("/getMail - check user inbox");
        if (!user.inbox || !user.inbox.messages || user.inbox.messages.length == 0) {
            createResponse(response, 400, 1005, Error[1005]);
            return;
        }

        logger.debug("/getMail - encrypt data");
        const privateKey = readFileSync("./src/keys/private.pem").toString();
        const key = { key: privateKey, passphrase: process.env.SECRET }; 
        const encrypted = crypto.privateEncrypt(key, Buffer.from(user.inbox.messages.toString()));

        createResponse(response, 200, 2002, Success[2002],{ data: encrypted.toString("hex") });
    }
    
    async sendMessage(request: Request, response: Response) {
        
    }

}
