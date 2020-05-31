import { Request, Response } from "express";
import { getRepository, getManager } from "typeorm";

// utils
import { PayloadValidator } from "../utils/payload-validator/payload-validator";
import { SessionManager } from "../utils/session-manager/session-manager";
import { createResponse } from "../utils/utils";
import { Logger } from "../utils/logger";
import { secretar } from "../utils/secretar";

// entities
import { Inbox } from "../entity/mail/inbox";
import { Sent } from "../entity/mail/sent";
import { User } from "../entity/user";

export class TrashController {

    private logger = new Logger("trash-controller");

    private userRepository = getRepository(User);
    private inboxRepository = getRepository(Inbox);
    private sentRepository = getRepository(Sent);

    async trash(request: Request, response: Response) {
        this.logger.info("start", "/trash");

        this.logger.debug("validate user", "/trash");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000);
            this.logger.info("done", "/trash");
            return;
        }

        this.logger.debug("get user mesages", "/trash");
        let user = await this.userRepository.findOne({
            where: { username: session.user.username },
            relations: [ "inbox", "sent" ]
        });

        if (!user) {
            createResponse(response, 401, 1018);
            this.logger.info("done", "/trash");
            return;
        }

        this.logger.debug("filter messages", "/trash");
        const inboxMessages = user.inbox.filter(message => message.isDeleted)
                                        .map(message => { message["type"] = "inbox"; return message; });

        const sentMessages = user.sent.filter(message => message.isDeleted)
                                      .map(message => { message["type"] = "sent"; return message; });

        this.logger.debug("encrypt messages", "/trash");
        const encrypted = secretar.encrypt({ inbox: inboxMessages, sent: sentMessages });
        if (!encrypted) {
            createResponse(response, 400, 1010);
            this.logger.info("done", "/trash");
            return;
        }

        createResponse(response, 200, 2013, encrypted);
        this.logger.info("done", "/trash");
    }

    async deleteMessages(request: Request, response: Response) {
        this.logger.info("start", "/trash/delete");

        this.logger.debug("validate user", "/trash/delete");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000);
            this.logger.info("done", "/trash/delete");
            return;
        }

        this.logger.debug("validate payload", "/trash/delete");
        const body = request.body;
        if (PayloadValidator.validate(body, ["messages"])) {
            createResponse(response, 400, 1001);
            this.logger.info("done", "/trash/delete");
            return;
        }

        this.logger.debug("save trashed message", "/trash/delete");
        await getManager().transaction(async entityManager =>{
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
                        createResponse(response, 400, 1013);
                        this.logger.info("done", "/trash/delete");
                        return;
                }
                createResponse(response, 200, 2014);
                this.logger.info("done", "/trashMtrash/deleteessage");
            }
        }).catch(err => {
            createResponse(response, 400, 1019);
            this.logger.fatal(err, "/trash/delete");
        });
    }

    async undoDeletedMessages(request: Request, response: Response) {
        this.logger.info("start", "/trash/undoDelete");

        this.logger.debug("validate user", "/trash/undoDelete");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000);
            this.logger.info("done", "/trash/undoDelete");
            return;
        }

        this.logger.debug("validate payload", "/trash/undoDelete");
        const body = request.body;
        if (PayloadValidator.validate(body, ["messages"])) {
            createResponse(response, 400, 1001);
            this.logger.info("done", "/trash/undoDelete");
            return;
        }

        this.logger.debug("remove trashed message", "/trash/undoDelete");
        await getManager().transaction(async entityManager =>{
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
                        createResponse(response, 400, 1013);
                        this.logger.info("done", "/trash/undoDelete");
                        return;
                }
                createResponse(response, 200, 2015);
                this.logger.info("done", "/trash/undoDelete");
            }
        }).catch(err => {
            createResponse(response, 400, 1019);
            this.logger.fatal(err, "/trash/undoDelete");
        });
    }

    async deleteForever(request: Request, response: Response) {
        this.logger.info("start", "/trash/deleteForever");

        this.logger.debug("validate user", "/trash/deleteForever");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000);
            this.logger.info("done", "/trash/deleteForever");
            return;
        }

        this.logger.debug("validate payload", "/trash/deleteForever");
        const body = request.body;
        if (PayloadValidator.validate(body, ["messages"])) {
            createResponse(response, 400, 1001);
            this.logger.info("done", "/trash/deleteForever");
            return;
        }

        this.logger.debug("delete messages forever", "/trash/deleteForever");
        await getManager().transaction(async entityManager =>{
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
                        createResponse(response, 400, 1013);
                        this.logger.info("done", "/trash/deleteForever");
                        return;
                }
            }

            createResponse(response, 200, 2019);
            this.logger.info("done", "/trash/deleteForever");
        }).catch(err => {
            createResponse(response, 400, 1023);
            this.logger.fatal(err, "/trash/deleteForever");
        });

    }


}