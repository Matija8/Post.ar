import { Request, Response } from "express";
import { getRepository, getManager } from "typeorm";

// Utils
import { SessionManager } from "../utils/session-manager/session-manager";
import { createResponse } from "../utils/utils";
import { Logger } from "../utils/logger";
import { secretar } from "../utils/secretar";
import { PayloadValidator } from "../utils/payload-validator/payload-validator";

// entities
import { Inbox } from "../entity/folders/inbox";
import { Sent } from "../entity/folders/sent";
import { User } from "../entity/user";

export class StarredController {

    private logger = new Logger("starred-controller");

    // repositories
    private userRepository = getRepository(User);

    async starred(request: Request, response: Response) {
        this.logger.info("/starred");
        
        this.logger.debug("validate user");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000);
            return;
        }

        this.logger.debug("get user mesages");
        let user = await this.userRepository.findOne({
            where: { username: session.user.username },
            relations: [ "inbox", "sent" ]
        });
        
        if (!user) {
            createResponse(response, 401, 1012);
            return;
        }

        this.logger.debug("filter messages");
        const inboxMessages = user.inbox.filter(message => message.isStarred)
                                        .map(message => { message["type"] = "inbox"; return message; });
        
        const sentMessages = user.sent.filter(message => message.isStarred)
                                      .map(message => { message["type"] = "sent"; return message; });

        this.logger.debug("encrypt messages");
        const encrypted = secretar.encrypt({ inbox: inboxMessages, sent: sentMessages });
        if (!encrypted) {
            createResponse(response, 400, 1010);
            return;
        }
  
        createResponse(response, 200, 2008, encrypted);
    }

    async starMessages(request: Request, response: Response) {
        this.logger.info("/starred/save");
        
        this.logger.debug("validate user");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000);
            return;
        }

        this.logger.debug("validate payload");
        const body = request.body;
        if (PayloadValidator.validate(body, ["messages"])) {
            createResponse(response, 400, 1001);
            return;
        }
        
        this.logger.debug("save starred messages");
        await getManager().transaction(async entityManager => {
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
                        throw Error("invalid message type");
                }
            }
                
            createResponse(response, 200, 2009);
        }).catch(err => {
            createResponse(response, 400, 1014);
            this.logger.fatal("failed to star messages", err);
        });
    }

    async removeStarredMessages(request: Request, response: Response) {
        this.logger.info("/starred/remove");
        
        this.logger.debug("validate user");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000);
            return;
        }

        this.logger.debug("validate payload");
        const body = request.body;
        if (PayloadValidator.validate(body, ["messages"])) {
            createResponse(response, 400, 1001);
            return;
        }

        this.logger.debug("remove starred message");
        await getManager().transaction(async entityManager => {
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
                        throw Error("invalid message type");
                }
            }
            
            createResponse(response, 200, 2010);
        }).catch(err => {
            createResponse(response, 400, 1015);
            this.logger.fatal("failed to remove starred messages", err);
        });
    }

}
