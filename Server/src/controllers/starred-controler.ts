import { Request, Response } from "express";
import { getRepository, getManager } from "typeorm";

// Utils
import { SessionManager } from "../utils/session-manager/session-manager";
import { createResponse } from "../utils/utils";
import { Logger } from "../utils/logger";
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

    async starred(request: Request, response: Response) {
        this.logger.info("start", "/starred");
        
        this.logger.debug("validate user", "/starred");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000);
            this.logger.info("done", "/starred");
            return;
        }

        this.logger.debug("get user mesages", "/starred");
        let user = await this.userRepository.findOne({
            where: { username: session.user.username },
            relations: [ "inbox", "sent" ]
        });
        
        if (!user) {
            createResponse(response, 401, 1012);
            this.logger.info("done", "/starred");
            return;
        }

        this.logger.debug("filter messages", "/starred");
        const inboxMessages = user.inbox.filter(message => message.isStarred)
                                        .map(message => { message["type"] = "inbox"; return message; });
        
        const sentMessages = user.sent.filter(message => message.isStarred)
                                      .map(message => { message["type"] = "sent"; return message; });

        this.logger.debug("encrypt messages", "/starred");
        const encrypted = secretar.encrypt({ inbox: inboxMessages, sent: sentMessages });
        if (!encrypted) {
            createResponse(response, 400, 1010);
            this.logger.info("done", "/starred");
            return;
        }
  
        createResponse(response, 200, 2008, encrypted);
        this.logger.info("done", "/starred");
    }

    async starMessages(request: Request, response: Response) {
        this.logger.info("start", "/starred/save");
        
        this.logger.debug("validate user", "/starred/save");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000);
            this.logger.info("done", "/starred/save");
            return;
        }

        this.logger.debug("validate payload", "/starred/save");
        const body = request.body;
        if (PayloadValidator.validate(body, ["messages"])) {
            createResponse(response, 400, 1001);
            this.logger.info("done", "/starred/save");
            return;
        }

        this.logger.debug("save starred message", "/starred/save");
        await getManager().transaction(async entityManager =>{
            for (const message of body.messages) {
                switch (message.type) {
                    case "inbox":
                        await entityManager.update(Inbox,
                            { messageId: message.messageId },
                            { isStarred: true }
                        );
                        break;
                    case "sent":
                        await entityManager.update(Sent,
                            { messageId: message.messageId },
                            { isStarred: true }
                        );
                        break;

                    default:
                        createResponse(response, 400, 1013);
                        this.logger.info("done", "/starred/save");
                        return;
                }
                createResponse(response, 200, 2009);
                this.logger.info("done", "/starred/save");
            }
        }).catch(err => {
            createResponse(response, 400, 1014);
            this.logger.fatal(err, "/starred/save");
        });
    }

    async removeStarredMessages(request: Request, response: Response) {
        this.logger.info("start", "/starred/remove");
        
        this.logger.debug("validate user", "/starred/remove");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000);
            this.logger.info("done", "/starred/remove");
            return;
        }

        this.logger.debug("validate payload", "/starred/remove");
        const body = request.body;
        if (PayloadValidator.validate(body, ["messages"])) {
            createResponse(response, 400, 1001);
            this.logger.info("done", "/starred/remove");
            return;
        }

        this.logger.debug("remove starred message", "/starred/remove");
        await getManager().transaction(async entityManager =>{
            for (const message of body.messages) {
                switch (message.type) {
                    case "inbox":
                        await entityManager.update(Inbox,
                            { messageId: message.messageId },
                            { isStarred: false }
                        );
                        break;
                    case "sent":
                        await entityManager.update(Sent,
                            { messageId: message.messageId },
                            { isStarred: false }
                        );
                        break;

                    default:
                        createResponse(response, 400, 1013);
                        this.logger.info("done", "/starred/remove");
                        return;
                }
                createResponse(response, 200, 2010);
                this.logger.info("done", "/starred/remove");
            }
        }).catch(err => {
            createResponse(response, 400, 1015);
            this.logger.fatal(err, "/starred/remove");
        });
    }

}
