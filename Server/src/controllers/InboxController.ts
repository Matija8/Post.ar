import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { v4 as uuidv4 } from "uuid";

// Utils
import { PayloadValidator } from "../utils/payload-validator/PayloadValidator";
import { SessionManager } from "../utils/session-manager/SessionManager";
import { createResponse } from "../utils/Utils";
import { logger } from "../utils/Logger";
import { Success, Error } from "../StatusCodes.json";
import { secretar } from "../utils/Secretar";

// Entities
import { User } from "../entity/User";
import { Inbox } from "../entity/mail/Inbox";
import { Sent } from "../entity/mail/Sent";

export class InboxController {

    // Repositories
    private userRepository  = getRepository(User);
    private inboxRepository = getRepository(Inbox)
    private sentRepository  = getRepository(Sent)

    async inbox(request: Request, response: Response) {
        logger.info("/inbox", "start");

        logger.debug("/inbox", "validate user");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, Error[1000]);
            logger.info("/inbox", "done");
            return;
        }

        logger.debug("/inbox", "get user");
        let user = await this.userRepository.findOne({ where: { username: session.user.username }, relations: [ "inbox" ] });
        if (!user) {
            createResponse(response, 400, 1004, Error[1004]);
            logger.info("/inbox", "done");
            return;
        }

        logger.debug("/inbox", "check user's inbox");
        if (!user.inbox || user.inbox.length == 0) {
            createResponse(response, 400, 1005, Error[1005]);
            logger.info("/inbox", "done");
            return;
        }

        logger.debug("/inbox", "get user's inbox");
        let messages = [];
        for (const message of user.inbox) {
            messages.push({
                message_id: message.message_id,
                from: message.from,
                text: message.text,
                isRead: message.isRead,
                timestamp: message.timestamp
            });
        }
        
        logger.debug("/inbox", "encrypt mail list");
        const encrypted = secretar.crypt({ total: messages.length, data: JSON.stringify(messages) });
        createResponse(response, 200, 2002, Success[2002], encrypted);
        logger.info("/inbox", "done");
    }
    
    async send(request: Request, response: Response) {
        logger.info("/send", "start");
        
        logger.debug("/send", " validate user");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, Error[1000]);
            logger.info("/send", "done");
            return;
        }

        logger.debug("/send", "validate payload");
        const body = request.body;
        if (PayloadValidator.validate(body, [ "recipient", "text" ])) {
            createResponse(response, 400, 1001, Error[1001]);
            logger.info("/send", "done");
            return;
        }

        // User cannot mail himself
        logger.debug("/send", "check if mail is valid");
        if (body.recipient == session.user.username) {
            createResponse(response, 400, 1006, Error[1006]);
            logger.info("/send", "done");
            return;
        }

        logger.debug("/send", "get recipient");
        let recipient = await this.userRepository.findOne({ where: { username: body.recipient }});
        if (!recipient) {
            createResponse(response, 400, 1006, Error[1006]);
            logger.info("/send", "done");
            return;
        }

        logger.debug("/send", "update inbox and sent mail");
        try {
            await this.inboxRepository.insert({
                message_id: uuidv4(),
                from: session.user.username,
                text: body.text,
                isRead: false,
                timestamp: new Date().getTime().toString(),
                user: recipient
            });
            await this.sentRepository.insert({
                message_id: uuidv4(),
                text: body.text,
                timestamp: new Date().getTime().toString(),
                to: recipient.username,
                user: session.user
            });
        } catch (err) {
            logger.fatal("/send", err);
            createResponse(response, 400, 1006, Error[1006]);
            return;
        }

        createResponse(response, 200, 2003, Success[2003]);
        logger.info("/send", "done");
    }

}
