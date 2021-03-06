import { Request, Response } from "express";
import { getRepository } from "typeorm";

// utils
import { SessionManager } from "../utils/session-manager/session-manager";
import { createResponse } from "../utils/utils";
import { Logger } from "../utils/logger";
import { secretar } from "../utils/secretar";

// entities
import { User } from "../entity/user";

export class SentController {

    private logger = new Logger("sent-controller");

    // repositories
    private userRepository  = getRepository(User);

    async sent(request: Request, response: Response) {
        this.logger.info("/sent");

        this.logger.debug("validate user");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000);
            return;
        }

        this.logger.debug("get user");
        let user = await this.userRepository.findOne({
            where: { username: session.user.username },
            relations: [ "sent" ]
        });
        if (!user) {
            createResponse(response, 400, 1004);
            return;
        }

        this.logger.debug("check sent mail");
        if (!user.sent || user.sent.length == 0) {
            createResponse(response, 400, 1009);
            return;
        }

        // filter user inbox
        user.sent = user.sent.filter(message => !message.isDeleted);

        this.logger.debug("get user sent mail");
        let sentMail = [];
        for (const message of user.sent)
            sentMail.push({
                messageId: message.messageId,
                to: message.to,
                content: secretar.decryptMessage(message.content),
                isStarred: message.isStarred,
                timestamp: message.timestamp,
            });

        this.logger.debug("encrypt user's sent mail");
        const encrypted = secretar.encryptResponseData({ total: sentMail.length, data: JSON.stringify(sentMail) });
        if (!encrypted) {
            createResponse(response, 400, 1010);
            return;
        }

        createResponse(response, 200, 2005, encrypted);
    }

}
