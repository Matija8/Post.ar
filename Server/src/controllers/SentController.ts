import { Request, Response } from "express";
import { getRepository } from "typeorm";

// Utils
import { PayloadValidator } from "../utils/payload-validator/PayloadValidator";
import { SessionManager } from "../utils/session-manager/SessionManager";
import { createResponse } from "../utils/Utils";
import { logger } from "../utils/Logger";
import { Success, Error } from "../StatusCodes.json";
import { secretar } from "../utils/Secretar";

// Entities
import { User } from "../entity/User";

export class SentController {

    // Repositories
    private userRepository  = getRepository(User);

    async sentMail(request: Request, response: Response) {
        logger.info("/sentMail", "start");

        logger.debug("/sentMail", "validate user");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, Error[1000]);
            logger.info("/sentMail", "done");
            return;
        }

        logger.debug("/sentMail", "get user");
        let user = await this.userRepository.findOne({ where: { username: session.user.username }, relations: [ "sent" ] });
        if (!user) {
            createResponse(response, 400, 1004, Error[1004]);
            logger.info("/sentMail", "done");
            return;
        }

        logger.debug("/sentMail", "check sent mail");
        if (!user.sent || user.sent.length == 0) {
            createResponse(response, 400, 1009, Error[1009]);
            logger.info("/sentMail", "done");
            return;
        }

        logger.debug("/sentMail", "get user sent mail");
        let sentMail = [];
        for (const message of user.sent) {
            sentMail.push({
                message_id: message.message_id,
                to: message.to,
                text: message.text,
                timestamp: message.timestamp,
            });
        }
        
        logger.debug("/sentMail", "encrypt user's sent mail");
        const encrypted = secretar.crypt({ total: sentMail.length, data: JSON.stringify(sentMail) });
        createResponse(response, 200, 2005, Success[2005], encrypted);
        logger.info("/sentMail", "done");
    }

}
