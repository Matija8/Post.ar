import { Request, Response } from "express";
import { getRepository, getManager } from "typeorm";

// utils
import { PayloadValidator } from "../utils/payload-validator/payload-validator";
import { SessionManager } from "../utils/session-manager/session-manager";
import { createResponse } from "../utils/utils";
import { Logger } from "../utils/logger";
import { secretar } from "../utils/secretar";

// entities
import { Inbox } from "../entity/folders/inbox";
import { Sent } from "../entity/folders/sent";
import { User } from "../entity/user";

export class TrashController {

    private logger = new Logger("trash-controller");

    private userRepository = getRepository(User);

    async trash(request: Request, response: Response) {
        this.logger.info("/trash");

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
            createResponse(response, 401, 1018);
            return;
        }

        this.logger.debug("filter messages");
        const inboxMessages = user.inbox.filter(message => message.isDeleted)
                                        .map(message => {
                                            message["type"] = "inbox";
                                            message.content = secretar.decryptMessage(message.content);
                                            return message;
                                        });

        const sentMessages = user.sent.filter(message => message.isDeleted)
                                      .map(message => {
                                          message["type"] = "sent";
                                          message.content = secretar.decryptMessage(message.content);
                                          return message;
                                      });

        this.logger.debug("encrypt messages");
        const encrypted = secretar.encryptResponseData({ inbox: inboxMessages, sent: sentMessages });
        if (!encrypted) {
            createResponse(response, 400, 1010);
            return;
        }

        createResponse(response, 200, 2013, encrypted);
    }

    async deleteMessages(request: Request, response: Response) {
        this.logger.info("/trash/delete");

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

        this.logger.debug("save trashed message");
        await getManager().transaction(async entityManager => {
            for (const message of body.messages) {
                switch (message.type) {
                    case "inbox":
                        await entityManager.update(Inbox,
                            { messageId: message.messageId },
                            { isDeleted: true }
                        );
                        break;
                    case "sent":
                        await entityManager.update(Sent,
                            { messageId: message.messageId },
                            { isDeleted: true }
                        );
                        break;

                    default:
                        throw Error("invalid message type");
                }
            }

            createResponse(response, 200, 2014);
        }).catch(err => {
            createResponse(response, 400, 1019);
            this.logger.fatal("failed to delete messages", err);
        });
    }

    async undoDeletedMessages(request: Request, response: Response) {
        this.logger.info("/trash/undoDelete");

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

        this.logger.debug("remove messages from trash");
        await getManager().transaction(async entityManager => {
            for (const message of body.messages) {
                switch (message.type) {
                    case "inbox":
                        await entityManager.update(Inbox,
                            { messageId: message.messageId },
                            { isDeleted: false }
                        );
                        break;
                    case "sent":
                        await entityManager.update(Sent,
                            { messageId: message.messageId },
                            { isDeleted: false }
                        );
                        break;

                    default:
                        throw Error("invalid message type");
                }
            }
            
            createResponse(response, 200, 2015);
        }).catch(err => {
            createResponse(response, 400, 1019);
            this.logger.fatal("failed to remove messages from trash", err);
        });
    }

    async deleteForever(request: Request, response: Response) {
        this.logger.info("/trash/deleteForever");

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

        this.logger.debug("delete messages forever");
        await getManager().transaction(async entityManager => {
            for (const message of body.messages) {
                switch (message.type) {
                    case "inbox":
                        await entityManager.delete(Inbox,
                            { messageId: message.messageId }
                        );
                        break;
                    case "sent":
                        await entityManager.delete(Sent,
                            { messageId: message.messageId }
                        );
                        break;

                    default:
                        throw Error("invalid message type");
                }
            }

            createResponse(response, 200, 2019);
        }).catch(err => {
            createResponse(response, 400, 1023);
            this.logger.fatal("failed to delete messages forever", err);
        });
    }

}