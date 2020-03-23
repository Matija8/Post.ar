import { Request, Response } from "express";
import { getRepository } from "typeorm";

// Utils
import { PayloadValidator } from "../utils/payload-validator/PayloadValidator";
import { SessionManager } from "../utils/session-manager/SessionManager";
import { createResponse, logger } from "../utils/Utils";
import { Success, Error } from "../StatusCodes.json";

// Entities
import { User } from "../entity/User";
import { InboxMail } from "../entity/InboxMail";
import { KeyStore } from "../utils/KeyStore";

const crypto = require("crypto");

export class InboxController {

    // Repositories
    private userRepository = getRepository(User);
    private inboxRepository = getRepository(InboxMail)

    async inbox(request: Request, response: Response) {
        logger.info("/inbox");

        logger.debug("/inbox - validate user");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, Error[1000]);
            return;
        }

        logger.debug("/inbox - get user");
        let user = await this.userRepository.findOne({ where: { username: session.user.username }, relations: [ "inbox" ]  });
        if (!user) {
            createResponse(response, 400, 1004, Error[1004]);
            return;
        }

        logger.debug("/inbox - check user's inbox");
        if (!user.inbox || user.inbox.length == 0) {
            createResponse(response, 400, 1005, Error[1005]);
            return;
        }

        logger.debug("/inbox - encrypt user data");
        let messages = [];
        for (const message of user.inbox) {
            messages.push({ 
                from: message.from,
                isRead: message.isRead,
                timestamp: message.timestamp
            });
        }
        
        // Encrypt  data
        const secret = crypto.randomBytes(16).toString("hex");
        
        const cipher = crypto.createCipher("aes256", secret);
        let encrypted = cipher.update(JSON.stringify(messages), "utf8", "hex");
        encrypted += cipher.final("hex");

        // Encrypt secret
        const superSecret = crypto.publicEncrypt(KeyStore.publicKey, Buffer.from(secret))
                                  .toString("hex");
        
        // Create signature
        const sign = crypto.createSign("RSA-SHA256");
        sign.update(JSON.stringify(messages));
        const signature = sign.sign(KeyStore.privateKey, "hex");

        createResponse(response, 200, 2002, Success[2002],{ data: encrypted, hash: signature, secret: superSecret });
    }
    
    // TODO: update user's sent mail, encrypt messages
    async send(request: Request, response: Response) {
        logger.info("/send");
        
        logger.debug("/send - validate user");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, Error[1000]);
            return;
        }

        logger.debug("/send - validate payload");
        const body = request.body;
        if (PayloadValidator.validate(body, [ "recipient", "text" ])) {
            createResponse(response, 400, 1001, Error[1001]);
            return;
        }

        // User cannot send mail to himself
        if (body.recipient == session.user.username) {
            createResponse(response, 400, 1006, Error[1006]);
            return;
        }

        logger.debug("/send - get recipient");
        let recipient = await this.userRepository.findOne({ where: { username: body.recipient }});
        if (!recipient) {
            createResponse(response, 400, 1006, Error[1006]);
            return;
        }
        
        logger.debug("/send - encrypt message");
        // ...

        logger.debug("/send - save email to recipient inbox");
        try {
            await this.inboxRepository.insert({
                from: session.user.username,
                text: body.text,
                isRead: false,
                timestamp: new Date().getTime().toString(),
                user: recipient
            });
        } catch (err) {
            logger.fatal(err);
            createResponse(response, 400, 1006, Error[1006]);
            return;
        }

        createResponse(response, 200, 2003, Success[2003]);
    }

}
