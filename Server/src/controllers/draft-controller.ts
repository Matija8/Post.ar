import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { v4 as uuidv4 } from "uuid";

// Utils
import { SessionManager } from "../utils/session-manager/session-manager";
import { createResponse } from "../utils/utils";
import { Logger } from "../utils/logger";
import { success, error } from "../status-codes.json";
import { secretar } from "../utils/secretar";
import { PayloadValidator } from "../utils/payload-validator/payload-validator";

// entities
import { User } from "../entity/user";
import { Drafts } from "../entity/mail/drafts";

export class DraftController {

    private logger = new Logger("draft-controller");

    // repositories
    private userRepository = getRepository(User);
    private draftsRepository = getRepository(Drafts)
    
    async drafts(request: Request, response: Response) {
        this.logger.info("start", "/drafts");

        this.logger.debug("validate user", "/drafts");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, error[1000]);
            this.logger.info("done", "/drafts");
            return;
        }

        this.logger.debug("get user", "/drafts");
        let user = await this.userRepository.findOne({
            where: { username: session.user.username },
            relations: [ "drafts" ] 
        });
        if (!user) {
            createResponse(response, 400, 1004, error[1004]);
            this.logger.info("done", "/drafts");
            return;
        }

        this.logger.debug("check user's drafts", "/drafts");
        if (!user.drafts || user.drafts.length == 0) {
            createResponse(response, 400, 1007, error[1007]);
            this.logger.info("done", "/drafts");
            return;
        }

        this.logger.debug("get user's drafts", "/drafts");
        let drafts = [];
        for (const draft of user.drafts) {
            drafts.push({
                message_id: draft.message_id,
                subject: draft.subject,
                content: draft.content,
                from: draft.timestamp
            });
        }
        
        this.logger.debug("encrypt drafts", "/drafts");
        const encrypted = secretar.encrypt({ total: drafts.length, data: JSON.stringify(drafts) });
        if (!encrypted) {
            createResponse(response, 400, 1010, error[1010]);
            this.logger.info("done", "/drafts");
            return;
        }

        createResponse(response, 200, 2004, success[2004], encrypted);
        this.logger.info("done", "/drafts");
    }

    async saveDraft(request: Request, response: Response) {
        this.logger.info("start", "/saveDraft");

        this.logger.debug("validate user", "/saveDraft");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, error[1000]);
            this.logger.info("done", "/saveDraft");
            return;
        }

        const body = request.body;

        this.logger.debug("validate payload", "/saveDraft");
        if (PayloadValidator.validate(body, ["content"])) {
            createResponse(response, 400, 1001, error[1001]);
            this.logger.info("done", "/saveDraft");
            return;
        }

        this.logger.debug("get user", "/saveDraft");
        let user = await this.userRepository.findOne({ 
            where: { username: session.user.username },
            relations: [ "drafts" ] 
        });
        if (!user) {
            createResponse(response, 400, 1004, error[1004]);
            this.logger.info("done", "/saveDraft");
            return;
        }

        this.logger.debug("save draft", "/saveDraft");
        try {
            await this.draftsRepository.insert({
                message_id: uuidv4(),
                subject: body.subject,
                content: body.content,
                timestamp: new Date().getTime().toString(),
                user: user
            });
        } catch (err) {
            createResponse(response, 400, 1002, error[1008]);
            this.logger.fatal(err, "/saveDraft");
            return;
        }
        
        createResponse(response, 200, 2006, success[2006]);
        this.logger.info("done", "/saveDraft");
    }

    async discardDraft(request: Request, response: Response) {
        this.logger.info("start", "/discardDraft");

        this.logger.debug("validate user", "/discardDraft");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, error[1000]);
            this.logger.info("done", "/discardDraft");
            return;
        }

        const body = request.body;

        this.logger.debug("validate payload", "/discardDraft");
        if (PayloadValidator.validate(body, ["messageId"])) {
            createResponse(response, 400, 1001, error[1001]);
            this.logger.info("done", "/discardDraft");
            return;
        }

        this.logger.debug("get user", "/discardDraft");
        let user = await this.userRepository.findOne({
            where: { username: session.user.username },
            relations: [ "drafts" ] 
        });
        if (!user) {
            createResponse(response, 400, 1004, error[1004]);
            this.logger.info("done", "/discardDraft");
            return;
        }

        this.logger.debug("discard draft", "/discardDraft");
        try {
            await this.draftsRepository.delete({ message_id: body.messageId });
        } catch (err) {
            createResponse(response, 400, 1016, error[1016]);
            this.logger.fatal(err, "/discardDraft");
            return;
        }
        
        createResponse(response, 200, 2011, success[2011]);
        this.logger.info("done", "/discardDraft");
    }

}
