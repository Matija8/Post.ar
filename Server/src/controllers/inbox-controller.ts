import { Request, Response } from "express";
import { getRepository, getManager } from "typeorm";
import { v4 as uuidv4 } from "uuid";

// utils
import { PayloadValidator } from "../utils/payload-validator/payload-validator";
import { SessionManager } from "../utils/session-manager/session-manager";
import { createResponse } from "../utils/utils";
import { Logger } from "../utils/logger";
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
            createResponse(response, 401, 1000);
            this.logger.info("done", "/inbox");
            return;
        }

        this.logger.debug("get user", "/inbox");
        let user = await this.userRepository.findOne({
            where: { username: session.user.username },
            relations: [ "inbox" ]
        });

        if (!user) {
            createResponse(response, 400, 1004);
            this.logger.info("done", "/inbox");
            return;
        }

        this.logger.debug("check user's inbox", "/inbox");
        if (!user.inbox || user.inbox.length == 0) {
            createResponse(response, 400, 1005);
            this.logger.info("done", "/inbox");
            return;
        }

        // filter user inbox 
        user.inbox = user.inbox.filter(message => !message.isDeleted);

        this.logger.debug("get user's inbox", "/inbox");
        let messages = [];
        for (const message of user.inbox) {
            messages.push({
                messageId: message.messageId,
                from: message.from,
                content: message.content,
                isRead: message.isRead,
                isStarred: message.isStarred,
                timestamp: message.timestamp
            });
        }

        this.logger.debug("encrypt mail list", "/inbox");
        const encrypted = secretar.encrypt(messages);
        if (!encrypted) {
            createResponse(response, 400, 1010);
            this.logger.info("done", "/inbox");
            return;
        }

        createResponse(response, 200, 2002, encrypted);
        this.logger.info("done", "/inbox");
    }

    async send(request: Request, response: Response) {
        this.logger.info("start", "/mail/send");

        this.logger.debug("validate user", "/mail/send");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000);
            this.logger.info("done", "/mail/send");
            return;
        }

        this.logger.debug("validate payload", "/mail/send");
        const body = request.body;
        if (PayloadValidator.validate(body, ["to", "content"])) {
            createResponse(response, 400, 1001);
            this.logger.info("done", "/mail/send");
            return;
        }

        // user cannot mail himself
        this.logger.debug("check if mail is valid", "/mail/send");
        if (body.to == session.user.username) {
            createResponse(response, 400, 1006);
            this.logger.info("done", "/mail/send");
            return;
        }

        this.logger.debug("get recipient", "/mail/send");
        let recipient = await this.userRepository.findOne({ where: { username: body.to } });
        if (!recipient) {
            createResponse(response, 400, 1006);
            this.logger.info("done", "/mail/send");
            return;
        }

        this.logger.debug("save message to inbox and sent mail box", "/mail/send");
        await getManager().transaction(async entityManager => {
            const timestamp = new Date().getTime().toString();
            const messageId = uuidv4();

            await entityManager.insert(Inbox, {
                messageId: messageId,
                from: session.user.username,
                content: body.content,
                isRead: false,
                isStarred: false,
                isDeleted: false,
                timestamp: timestamp,
                user: recipient
            });

            await entityManager.insert(Sent, {
                messageId: messageId,
                to: recipient.username,
                content: body.content,
                isStarred: false,
                isDeleted: false,
                timestamp: timestamp,
                user: session.user
            });

            const encrypted = secretar.encrypt({ messageId: messageId, timestamp: timestamp, ...body });
            if (!encrypted) {
                createResponse(response, 400, 1010);
                this.logger.info("done", "/mail/send");
                return;
            }
    
            createResponse(response, 200, 2003, encrypted);
            this.logger.info("done", "/mail/send");
        }).catch(err => {
            this.logger.fatal(err, "/mail/send");
            createResponse(response, 400, 1006);
        });
    }

    async markAsRead(request: Request, response: Response) {
        this.logger.info("start", "/mail/markAsRead");

        this.logger.debug("validate user", "/mail/markAsRead");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000);
            this.logger.info("done", "/mail/markAsRead");
            return;
        }

        this.logger.debug("validate payload", "/mail/markAsRead");
        const body = request.body;
        if (PayloadValidator.validate(body, ["messageIds"])) {
            createResponse(response, 400, 1001);
            this.logger.info("done", "/mail/markAsRead");
            return;
        }

        this.logger.debug("update read messages", "/mail/markAsRead");
        await getManager().transaction(async entityManager => {
            for (const messageId of body.messageIds)
                await entityManager.update(Inbox,
                    { messageId: messageId },
                    { isRead: true }
                );

            createResponse(response, 200, 2007);
            this.logger.info("done", "/mail/markAsRead");
        }).catch(err => {
            createResponse(response, 400, 1011);
            this.logger.fatal(err, "/mail/markAsRead");
        });
    }

    async markAsUnread(request: Request, response: Response) {
        this.logger.info("start", "/mail/markAsUnread");

        this.logger.debug("validate user", "/mail/markAsUnread");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000);
            this.logger.info("done", "/mail/markAsUnread");
            return;
        }

        this.logger.debug("validate payload", "/mail/markAsUnread");
        const body = request.body;
        if (PayloadValidator.validate(body, ["messageIds"])) {
            createResponse(response, 400, 1001);
            this.logger.info("done", "/markAsUnread");
            return;
        }

        this.logger.debug("update read messages", "/mail/markAsUnread");
        await getManager().transaction(async entityManager => {
            for (const messageId of body.messageIds)
                await entityManager.update(Inbox,
                    { messageId: messageId },
                    { isRead: false }
                );

            createResponse(response, 200, 2012);
            this.logger.info("done", "/mail/markAsUnread");
        }).catch(err => {
            createResponse(response, 400, 1017);
            this.logger.fatal(err, "/mail/markAsUnread");
        });
    }

}
