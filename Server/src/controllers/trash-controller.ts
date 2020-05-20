import { Request, Response } from "express";
import { getRepository, getManager } from "typeorm";

// utils
import { PayloadValidator } from "../utils/payload-validator/payload-validator";
import { SessionManager } from "../utils/session-manager/session-manager";
import { createResponse } from "../utils/utils";
import { Logger } from "../utils/logger";
import { success, error } from "../status-codes.json";
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
            createResponse(response, 401, 1000, error[1000]);
            this.logger.info("done", "/trash");
            return;
        }

        this.logger.debug("get user mesages", "/trash");
        let user = await this.userRepository.findOne({
            where: { username: session.user.username },
            relations: [ "inbox", "sent" ]
        });

        if (!user) {
            createResponse(response, 401, 1018, error[1018]);
            this.logger.info("done", "/trash");
            return;
        }

        this.logger.debug("filter messages", "/trash");
        const inboxMessages = user.inbox.filter(message => message.is_deleted)
                                        .map(message => { message["type"] = "inbox"; return message; });

        const sentMessages = user.sent.filter(message => message.is_deleted)
                                      .map(message => { message["type"] = "sent"; return message; });

        this.logger.debug("encrypt messages", "/trash");
        const encrypted = secretar.encrypt(JSON.stringify({
            inbox: inboxMessages,
            sentMessages: sentMessages
        }));
        if (!encrypted) {
            createResponse(response, 400, 1010, error[1010]);
            this.logger.info("done", "/trash");
            return;
        }

        createResponse(response, 200, 2013, success[2013], encrypted);
        this.logger.info("done", "/trash");
    }

    async trashMessage(request: Request, response: Response) {
        this.logger.info("start", "/trashMessage");

        this.logger.debug("validate user", "/trashMessage");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, error[1000]);
            this.logger.info("done", "/trashMessage");
            return;
        }

        this.logger.debug("validate payload", "/trashMessage");
        const body = request.body;
        if (PayloadValidator.validate(body, ["messages"])) {
            createResponse(response, 400, 1001, error[1001]);
            this.logger.info("done", "/trashMessage");
            return;
        }

        this.logger.debug("save trashed message", "/trashMessage");
        await getManager().transaction(async entityManager =>{
            for (const message of body.messages){
                switch (message.type){
                    case "inbox":
                        await entityManager.update(Inbox,
                            { message_id: message.messageId },
                            { is_deleted: true }
                        );
                        break;
                    case "sent":
                        await entityManager.update(Sent,
                            { message_id: message.messageId },
                            { is_deleted: true }
                        );
                        break;

                    default:
                        createResponse(response, 400, 1013, error[1013]);
                        this.logger.info("done", "/trashMessage");
                        return;
                }
                createResponse(response, 200, 2014, success[2014]);
                this.logger.info("done", "/trashMessage");
            }
        }).catch(err => {
            createResponse(response, 400, 1019, error[1019]);
            this.logger.fatal(err, "/trashMessage");
        });
    }

    async removeTrashMessage(request: Request, response: Response) {
        this.logger.info("start", "/removeTrashMessage");

        this.logger.debug("validate user", "/removeTrashMessage");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, error[1000]);
            this.logger.info("done", "/removeTrashMessage");
            return;
        }

        this.logger.debug("validate payload", "/removeTrashMessage");
        const body = request.body;
        if (PayloadValidator.validate(body, ["messages"])) {
            createResponse(response, 400, 1001, error[1001]);
            this.logger.info("done", "/removeTrashMessage");
            return;
        }

        this.logger.debug("remove trashed message", "/removeTrashMessage");
        await getManager().transaction(async entityManager =>{
            for (const message of body.messages){
                switch (message.type){
                    case "inbox":
                        await entityManager.update(Inbox,
                            { message_id: message.messageId },
                            { is_deleted: false }
                        );
                        break;
                    case "sent":
                        await entityManager.update(Sent,
                            { message_id: message.messageId },
                            { is_deleted: false }
                        );
                        break;

                    default:
                        createResponse(response, 400, 1013, error[1013]);
                        this.logger.info("done", "/removeTrashMessage");
                        return;
                }
                createResponse(response, 200, 2015, success[2015]);
                this.logger.info("done", "/removeTrashMessage");
            }
        }).catch(err => {
            createResponse(response, 400, 1020, error[1020]);
            this.logger.fatal(err, "/removeTrashMessage");
        });
    }

    async deleteMessage(request: Request, response: Response) {
        this.logger.info("start", "/deleteMessage");

        this.logger.debug("validate user", "/deleteMessage");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, error[1000]);
            this.logger.info("done", "/deleteMessage");
            return;
        }

        this.logger.debug("validate payload", "/deleteMessage");
        const body = request.body;
        if (PayloadValidator.validate(body, ["messageId", "type"])) {
            createResponse(response, 400, 1001, error[1001]);
            this.logger.info("done", "/deleteMessage");
            return;
        }

        this.logger.debug("delete message", "/deleteMessage");
        try {
            switch (body.type) {
                case "inbox":
                    await this.inboxRepository.delete({ message_id: body.messageId });
                    break;

                case "sent":
                    await this.sentRepository.delete({ message_id: body.messageId });
                    break;

                default:
                    createResponse(response, 400, 1013, error[1013]);
                    this.logger.info("done", "/deleteMessage");
                    return;
            }
        } catch (err) {
            createResponse(response, 400, 1020, error[1020]);
            this.logger.fatal(err, "/deleteMessage");
            this.logger.info("done", "/deleteMessage");
            return;
        }

        createResponse(response, 200, 2015, success[2015]);
        this.logger.info("done", "/deleteMessage");
    }


}