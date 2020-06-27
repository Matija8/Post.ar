import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { v4 as uuidv4 } from "uuid";

// Utils
import { SessionManager } from "../utils/session-manager/session-manager";
import { createResponse } from "../utils/utils";
import { Logger } from "../utils/logger";
import { secretar } from "../utils/secretar";
import { PayloadValidator } from "../utils/payload-validator/payload-validator";

// entities
import { User } from "../entity/user";
import { Drafts } from "../entity/folders/drafts";

export class DraftController {

    private logger = new Logger("draft-controller");

    // repositories
    private userRepository = getRepository(User);
    private draftsRepository = getRepository(Drafts)

    async drafts(request: Request, response: Response) {
        this.logger.info("/drafts");

        this.logger.debug("validate user");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000);
            return;
        }

        this.logger.debug("get user");
        let user = await this.userRepository.findOne({
            where: { username: session.user.username },
            relations: [ "drafts" ]
        });
        if (!user) {
            createResponse(response, 400, 1004);
            return;
        }

        this.logger.debug("check user's drafts");
        if (!user.drafts || user.drafts.length == 0) {
            createResponse(response, 400, 1007);
            return;
        }

        this.logger.debug("get user's drafts");
        let drafts = [];
        for (const draft of user.drafts) {
            drafts.push({
                messageId: draft.messageId,
                to: draft.to,
                content: secretar.decryptMessage(draft.content),
                timestamp: draft.timestamp
            });
        }

        this.logger.debug("encrypt drafts");
        const encrypted = secretar.encryptResponseData({ total: drafts.length, data: JSON.stringify(drafts) });
        if (!encrypted) {
            createResponse(response, 400, 1010);
            return;
        }

        createResponse(response, 200, 2004, encrypted);
    }

    async saveDraft(request: Request, response: Response) {
        this.logger.info("/draft/save");

        this.logger.debug("validate user");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000);
            return;
        }

        const body = request.body;

        this.logger.debug("validate payload");
        if (PayloadValidator.validate(body, ["content"])) {
            createResponse(response, 400, 1001);
            return;
        }

        let messageTo: string = null; 
        if (body.to !== undefined && body.to !== null && typeof body.to === "string")
            messageTo = body.to;

        this.logger.debug("get user");
        let user = await this.userRepository.findOne({
            where: { username: session.user.username },
            relations: [ "drafts" ]
        });
        if (!user) {
            createResponse(response, 400, 1004);
            return;
        }

        this.logger.debug("save draft");
        try {
            await this.draftsRepository.insert({
                messageId: uuidv4(),
                to: messageTo,
                content: secretar.encryptMessage(body.content),
                timestamp: new Date().getTime().toString(),
                user: user
            });
        } catch (err) {
            createResponse(response, 400, 1008);
            this.logger.fatal("failed to save message as draft", err);
            return;
        }

        createResponse(response, 200, 2006);
    }

    async discardDraft(request: Request, response: Response) {
        this.logger.info("/draft/discard");

        this.logger.debug("validate user");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000);
            return;
        }

        const body = request.body;

        this.logger.debug("validate payload");
        if (PayloadValidator.validate(body, ["messageId"])) {
            createResponse(response, 400, 1001);
            return;
        }

        this.logger.debug("get user");
        let user = await this.userRepository.findOne({
            where: { username: session.user.username },
            relations: [ "drafts" ]
        });
        if (!user) {
            createResponse(response, 400, 1004);
            return;
        }

        this.logger.debug("discard draft");
        try {
            await this.draftsRepository.delete({ messageId: body.messageId });
        } catch (err) {
            createResponse(response, 400, 1016);
            this.logger.fatal("failed to discard draft", err);
            return;
        }

        createResponse(response, 200, 2011);
    }

}
