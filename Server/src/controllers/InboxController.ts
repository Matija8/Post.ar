import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { readFileSync } from "fs";

import { UserManager } from "../utils/user-manager/UserManager";
import { createResponse, logger } from "../utils/Utils";

import { Inbox } from "../entity/Inbox";
import { User } from "../entity/User";

import { Success, Error } from "../StatusCodes.json";

const crypto = require("crypto");

export class InboxController {

    // Repositories
    private inboxRepository = getRepository(Inbox);
    private userRepository = getRepository(User);

    async getMail(request: Request, response: Response) {
        logger.info("/getMail");

        logger.debug("/getMail - validate user");
        if ( UserManager.check(request.headers.authorization)) {
            createResponse(response, 401, 1000, Error[1000]);
            return;
        }

        logger.debug("/getMail - get user");
        let userData = UserManager.getUserData(request.headers.authorization);
        if (!userData) {
            createResponse(response, 400, 1004, Error[1004]);
            return;
        }

        let user = await this.userRepository.findOne({ where: { username: userData.username } });
        if (!user) {
            createResponse(response, 400, 1004, Error[1004]);
            return;
        }

        logger.debug("/getMail - fetch user inbox");
        let mail = await this.inboxRepository.find({ where: { user: user }});
        if (!mail) {
            createResponse(response, 400, 1005, Error[1005]);
            return;
        }

        logger.debug("/getMail - encrypt data");
        const privateKey = readFileSync("./src/keys/private.pem").toString();
        const encrypted = crypto.privateEncrypt(privateKey, Buffer.from(mail.toString()));

        createResponse(response, 200, 2002, Success[2002],{ data: encrypted.toString("hex") });
    }
    
    async sendMessage(request: Request, response: Response) {
        
    }

}
