import { Request, Response } from "express";
import { getRepository, getManager } from "typeorm";
import { v4 as uuidv4 } from "uuid";

// utils
import { PayloadValidator } from "../utils/payload-validator/payload-validator";
import { SessionManager } from "../utils/session-manager/session-manager";
import { createResponse } from "../utils/utils";
import { Logger } from "../utils/logger";
import { success, error } from "../status-codes.json";
import { secretar } from "../utils/secretar";

// entities
import { User } from "../entity/user";
import { Inbox } from "../entity/mail/inbox";
import { Sent } from "../entity/mail/sent";

export class InboxController {

    private logger = new Logger("inbox-controller");

    // repositories
    private userRepository = getRepository(User);

    async inbox(request: Request, response: Response) {
        this.logger.info("start", "/inbox");

        this.logger.debug("validate user", "/inbox");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, error[1000]);
            this.logger.info("done", "/inbox");
            return;
        }

        this.logger.debug("get user", "/inbox");
        let user = await this.userRepository.findOne({
            where: { username: session.user.username },
            relations: [ "inbox" ]
        });

        if (!user) {
            createResponse(response, 400, 1004, error[1004]);
            this.logger.info("done", "/inbox");
            return;
        }

        this.logger.debug("check user's inbox", "/inbox");
        if (!user.inbox || user.inbox.length == 0) {
            createResponse(response, 400, 1005, error[1005]);
            this.logger.info("done", "/inbox");
            return;
        }

        this.logger.debug("get user's inbox", "/inbox");
        let messages = [];
        for (const message of user.inbox) {
            messages.push({
                message_id: message.message_id,
                from: message.from,
                content: message.content,
                isRead: message.is_read,
                isStarred: message.is_starred,
                timestamp: message.timestamp
            });
        }

        this.logger.debug("encrypt mail list", "/inbox");
        const encrypted = secretar.encrypt({ total: messages.length, data: JSON.stringify(messages) });
        if (!encrypted) {
            createResponse(response, 400, 1010, error[1010]);
            this.logger.info("done", "/inbox");
            return;
        }

        createResponse(response, 200, 2002, success[2002], encrypted);
        this.logger.info("done", "/inbox");
    }

    async send(request: Request, response: Response) {
        this.logger.info("start", "/send");

        this.logger.debug("validate user", "/send");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, error[1000]);
            this.logger.info("done", "/send");
            return;
        }

        this.logger.debug("validate payload", "/send");
        const body = request.body;
        if (PayloadValidator.validate(body, ["recipient", "subject", "content"])) {
            createResponse(response, 400, 1001, error[1001]);
            this.logger.info("done", "/send");
            return;
        }

        // user cannot mail himself
        this.logger.debug("check if mail is valid", "/send");
        if (body.recipient == session.user.username) {
            createResponse(response, 400, 1006, error[1006]);
            this.logger.info("done", "/send");
            return;
        }

        this.logger.debug("get recipient", "/send");
        let recipient = await this.userRepository.findOne({ where: { username: body.recipient } });
        if (!recipient) {
            createResponse(response, 400, 1006, error[1006]);
            this.logger.info("done", "/send");
            return;
        }

        this.logger.debug("save message to inbox and sent mail box", "/send");
        await getManager().transaction(async entityManager => {
            await entityManager.insert(Inbox, {
                message_id: uuidv4(),
                from: session.user.username,
                content: body.content,
                is_read: false,
                is_starred: false,
                is_deleted: false,
                timestamp: new Date().getTime().toString(),
                user: recipient
            });

            await entityManager.insert(Sent, {
                message_id: uuidv4(),
                content: body.content,
                is_starred: false,
                is_deleted: false,
                timestamp: new Date().getTime().toString(),
                to: recipient.username,
                user: session.user
            });

            createResponse(response, 200, 2003, success[2003]);
            this.logger.info("done", "/send");
        }).catch(err => {
            this.logger.fatal(err, "/send");
            createResponse(response, 400, 1006, error[1006]);
        });
    }

    async markAsRead(request: Request, response: Response) {
        this.logger.info("start", "/markAsRead");

        this.logger.debug("validate user", "/markAsRead");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, error[1000]);
            this.logger.info("done", "/markAsRead");
            return;
        }

        this.logger.debug("validate payload", "/markAsRead");
        const body = request.body;
        if (PayloadValidator.validate(body, ["messageIds"])) {
            createResponse(response, 400, 1001, error[1001]);
            this.logger.info("done", "/markAsRead");
            return;
        }

        this.logger.debug("update read messages", "/markAsRead");
        await getManager().transaction(async entityManager => {
            for (const messageId of body.messageIds)
                await entityManager.update(Inbox,
                    { message_id: messageId },
                    { is_read: true }
                );

            createResponse(response, 200, 2007, success[2007]);
            this.logger.info("done", "/markAsRead");
        }).catch(err => {
            createResponse(response, 400, 1011, error[1011]);
            this.logger.fatal(err, "/markAsRead");
        });


    }

    async markAsUnread(request: Request, response: Response) {
        this.logger.info("start", "/markAsUnread");

        this.logger.debug("validate user", "/markAsUnread");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, error[1000]);
            this.logger.info("done", "/markAsUnread");
            return;
        }

        this.logger.debug("validate payload", "/markAsUnread");
        const body = request.body;
        if (PayloadValidator.validate(body, ["messageIds"])) {
            createResponse(response, 400, 1001, error[1001]);
            this.logger.info("done", "/markAsUnread");
            return;
        }

        this.logger.debug("update read messages", "/markAsUnread");
        await getManager().transaction(async entityManager => {
            for (const messageId of body.messageIds)
                await entityManager.update(Inbox,
                    { message_id: messageId },
                    { is_read: false }
                );

            createResponse(response, 200, 2012, success[2012]);
            this.logger.info("done", "/markAsUnread");
        }).catch(err => {
            createResponse(response, 400, 1017, error[1017]);
            this.logger.fatal(err, "/markAsUnread");
        });


    }

}
