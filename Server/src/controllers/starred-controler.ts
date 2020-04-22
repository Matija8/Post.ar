import { Request, Response } from "express";
import { getRepository } from "typeorm";

// Utils
import { SessionManager } from "../utils/session-manager/session-manager";
import { createResponse } from "../utils/utils";
import { Logger } from "../utils/logger";
import { success, error } from "../status-codes.json";
import { secretar } from "../utils/secretar";
import { PayloadValidator } from "../utils/payload-validator/payload-validator";

// entities
import { Inbox } from "../entity/mail/inbox";
import { Sent } from "../entity/mail/sent";
import { User } from "../entity/user";

export class StarredController {

    private logger = new Logger("starred-controller");

    // repositories
    private userRepository = getRepository(User);
    private inboxRepository = getRepository(Inbox);
    private sentRepository = getRepository(Sent);

    async starred(request: Request, response: Response) {
        this.logger.info("start", "/starred");
        
        this.logger.debug("validate user", "/starred");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, error[1000]);
            this.logger.info("done", "/starred");
            return;
        }

        this.logger.debug("get user mesages", "/starred");
        let user = await this.userRepository.findOne({
            where: { username: session.user.username },
            relations: [ "inbox", "sent" ]
        });
        
        if (!user) {
            createResponse(response, 401, 1012, error[1012]);
            this.logger.info("done", "/starred");
            return;
        }

        this.logger.debug("filter read messages", "/starred");
        const inboxMessages = user.inbox.filter(message => message.is_starred)
                                        .map(message => { message["type"] = "inbox"; return message; });
        
        const sentMessages = user.sent.filter(message => message.is_starred)
                                      .map(message => { message["type"] = "sent"; return message; });

        this.logger.debug("encrypt messages", "/starred");
        const encrypted = secretar.encrypt(JSON.stringify({
            inbox: inboxMessages,
            sentMessages: sentMessages
        }));
        if (!encrypted) {
            createResponse(response, 400, 1010, error[1010]);
            this.logger.info("done", "/starred");
            return;
        }
  
        createResponse(response, 200, 2008, success[2008], encrypted);
        this.logger.info("done", "/starred");
    }

    async starMessage(request: Request, response: Response) {
        this.logger.info("start", "/starMessage");
        
        this.logger.debug("validate user", "/starMessage");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, error[1000]);
            this.logger.info("done", "/starMessage");
            return;
        }

        this.logger.debug("validate payload", "/starMessage");
        const body = request.body;
        if (PayloadValidator.validate(body, ["messageId", "type"])) {
            createResponse(response, 400, 1001, error[1001]);
            this.logger.info("done", "/starMessage");
            return;
        }

        this.logger.debug("save starred message", "/starMessage");
        try {
            switch (body.type) {
                case "inbox":
                    await this.inboxRepository.update(
                        { message_id: body.messageId },
                        { is_starred: true }
                    );
                    break;
                case "sent":
                    await this.sentRepository.update(
                        { message_id: body.messageId },
                        { is_starred: true }
                    );
                    break;
    
                default:
                    createResponse(response, 400, 1013, error[1013]);
                    this.logger.info("done", "/starMessage");
                    return;
            }
        } catch (err) {
            createResponse(response, 400, 1014, error[1014]);
            this.logger.fatal(err, "/starMessage");
            this.logger.info("done", "/starMessage");
            return;
        }

        createResponse(response, 200, 2009, success[2009]);
    }

    async removeStarredMessage(request: Request, response: Response) {
        this.logger.info("start", "/removeStarredMessage");
        
        this.logger.debug("validate user", "/removeStarredMessage");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, error[1000]);
            this.logger.info("done", "/removeStarredMessage");
            return;
        }

        this.logger.debug("validate payload", "/removeStarredMessage");
        const body = request.body;
        if (PayloadValidator.validate(body, ["messageId", "type"])) {
            createResponse(response, 400, 1001, error[1001]);
            this.logger.info("done", "/removeStarredMessage");
            return;
        }

        this.logger.debug("remove starred message", "/removeStarredMessage");
        try {
            switch (body.type) {
                case "inbox":
                    await this.inboxRepository.update(
                        { message_id: body.messageId },
                        { is_starred: false }
                    );
                    break;
                case "sent":
                    await this.sentRepository.update(
                        { message_id: body.messageId },
                        { is_starred: false }
                    );
                    break;
    
                default:
                    createResponse(response, 400, 1013, error[1013]);
                    this.logger.info("done", "/removeStarredMessage");
                    return;
            }
        } catch (err) {
            createResponse(response, 400, 1015, error[1015]);
            this.logger.fatal(err, "/removeStarredMessage");
            this.logger.info("done", "/removeStarredMessage");
            return;
        }

        createResponse(response, 200, 2010, success[2010]);
    }

}
