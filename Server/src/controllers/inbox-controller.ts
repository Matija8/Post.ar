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
import { Inbox } from "../entity/folders/inbox";
import { Sent } from "../entity/folders/sent";

export class InboxController {

    private logger = new Logger("inbox-controller");

    // repositories
    private userRepository = getRepository(User);

    async inbox(request: Request, response: Response) {
        this.logger.info("/inbox");

        this.logger.debug("validate user");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000);
            return;
        }

        this.logger.debug("get user");
        let user = await this.userRepository.findOne({
            where: { username: session.user.username },
            relations: [ "inbox" ]
        });

        if (!user) {
            createResponse(response, 400, 1004);
            return;
        }

        this.logger.debug("check user's inbox");
        if (!user.inbox || user.inbox.length == 0) {
            createResponse(response, 400, 1005);
            return;
        }

        // filter user inbox 
        user.inbox = user.inbox.filter(message => !message.isDeleted);

        this.logger.debug("get user's inbox");
        let messages = [];
        for (const message of user.inbox) {
            messages.push({
                messageId: message.messageId,
                from: message.from,
                content: secretar.decryptMessage(message.content),
                isRead: message.isRead,
                isStarred: message.isStarred,
                timestamp: message.timestamp
            });
        }

        this.logger.debug("encrypt mail list");
        const encrypted = secretar.encryptResponseData(messages);
        if (!encrypted) {
            createResponse(response, 400, 1010);
            return;
        }

        createResponse(response, 200, 2002, encrypted);
    }

    async send(request: Request, response: Response) {
        this.logger.info("/mail/send");

        this.logger.debug("validate user");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000);
            return;
        }

        this.logger.debug("validate payload");
        const body = request.body;
        if (PayloadValidator.validate(body, ["to", "content"])) {
            createResponse(response, 400, 1001);
            return;
        }

        // user cannot mail himself
        this.logger.debug("check if mail is valid");
        if (body.to == session.user.username) {
            createResponse(response, 400, 1006);
            return;
        }

        this.logger.debug("get recipient");
        let recipient = await this.userRepository.findOne({ where: { username: body.to } });
        if (!recipient) {
            createResponse(response, 400, 1006);
            return;
        }

        this.logger.debug("save message to inbox and sent mail box");
        await getManager().transaction(async entityManager => {
            const timestamp = new Date().getTime().toString();
            const messageId = uuidv4();

            const encryptedMessage = secretar.encryptMessage(body.content);

            await entityManager.insert(Inbox, {
                messageId: messageId,
                from: session.user.username,
                content: encryptedMessage,
                isRead: false,
                isStarred: false,
                isDeleted: false,
                timestamp: timestamp,
                user: recipient
            });

            await entityManager.insert(Sent, {
                messageId: messageId,
                to: recipient.username,
                content: encryptedMessage,
                isStarred: false,
                isDeleted: false,
                timestamp: timestamp,
                user: session.user
            });

            const encrypted = secretar.encryptResponseData({ messageId: messageId, timestamp: timestamp, ...body });
            if (!encrypted) {
                createResponse(response, 400, 1010);
                return;
            }
    
            createResponse(response, 200, 2003, encrypted);
        }).catch(err => {
            this.logger.fatal("failed to send multiple messages", err);
            createResponse(response, 400, 1006);
        });
    }

    async markAsRead(request: Request, response: Response) {
        this.logger.info("/mail/markAsRead");

        this.logger.debug("validate user");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000);
            return;
        }

        this.logger.debug("validate payload");
        const body = request.body;
        if (PayloadValidator.validate(body, ["messageIds"])) {
            createResponse(response, 400, 1001);
            return;
        }

        this.logger.debug("update read messages");
        await getManager().transaction(async entityManager => {
            for (const messageId of body.messageIds)
                await entityManager.update(Inbox,
                    { messageId: messageId },
                    { isRead: true }
                );

            createResponse(response, 200, 2007);
        }).catch(err => {
            createResponse(response, 400, 1011);
            this.logger.fatal("failed to mark messages as read", err);
        });
    }

    async markAsUnread(request: Request, response: Response) {
        this.logger.info("/mail/markAsUnread");

        this.logger.debug("validate user");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000);
            return;
        }

        this.logger.debug("validate payload");
        const body = request.body;
        if (PayloadValidator.validate(body, ["messageIds"])) {
            createResponse(response, 400, 1001);
            return;
        }

        this.logger.debug("update read messages");
        await getManager().transaction(async entityManager => {
            for (const messageId of body.messageIds)
                await entityManager.update(Inbox,
                    { messageId: messageId },
                    { isRead: false }
                );

            createResponse(response, 200, 2012);
        }).catch(err => {
            createResponse(response, 400, 1017);
            this.logger.fatal("failed to mark messages as unread", err);
        });
    }

}
