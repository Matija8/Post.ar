import { Request, Response } from "express";
import { getRepository } from "typeorm";

// utils
import { SessionManager } from "../utils/session-manager/session-manager";
import { createResponse } from "../utils/utils";
import { Logger } from "../utils/logger";
import { success, error } from "../status-codes.json";
import { secretar } from "../utils/secretar";

// entities
import { User } from "../entity/user";

export class SentController {

    private logger = new Logger("sent-controller");
    
    // repositories
    private userRepository  = getRepository(User);

    async sentMail(request: Request, response: Response) {
        this.logger.info("start", "/sentMail");

        this.logger.debug("validate user", "/sentMail");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, error[1000]);
            this.logger.info("done", "/sentMail");
            return;
        }

        this.logger.debug("get user", "/sentMail");
        let user = await this.userRepository.findOne({
            where: { username: session.user.username },
            relations: [ "sent" ]
        });
        if (!user) {
            createResponse(response, 400, 1004, error[1004]);
            this.logger.info("done", "/sentMail");
            return;
        }

        this.logger.debug("check sent mail", "/sentMail");
        if (!user.sent || user.sent.length == 0) {
            createResponse(response, 400, 1009, error[1009]);
            this.logger.info("done", "/sentMail");
            return;
        }

        this.logger.debug("get user sent mail", "/sentMail");
        let sentMail = [];
        for (const message of user.sent) {
            sentMail.push({
                message_id: message.message_id,
                to: message.to,
                text: message.text,
                timestamp: message.timestamp,
            });
        }
        
        this.logger.debug("encrypt user's sent mail", "/sentMail");
        const encrypted = secretar.encrypt({ total: sentMail.length, data: JSON.stringify(sentMail) });
        if (!encrypted) {
            createResponse(response, 400, 1010, error[1010]);
            this.logger.info("done", "/sentMail");
            return;
        }
        
        createResponse(response, 200, 2005, success[2005], encrypted);
        this.logger.info("done", "/sentMail");
    }

}