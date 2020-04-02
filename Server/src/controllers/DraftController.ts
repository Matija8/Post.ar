import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

// Utils
import { SessionManager } from "../utils/session-manager/SessionManager";
import { createResponse } from "../utils/Utils";
import { logger } from "../utils/Logger";
import { Success, Error } from "../StatusCodes.json";
import { secretar } from "../utils/Secretar";
import { PayloadValidator } from "../utils/payload-validator/PayloadValidator";

// Entities
import { User } from "../entity/User";
import { Drafts } from "../entity/mail/Drafts";


export class DraftController {

    // Repositories
    private userRepository  = getRepository(User);
    private draftsRepository = getRepository(Drafts)
    
    async drafts(request: Request, response: Response) {
        logger.info("/drafts", "start");

        logger.debug("/drafts", "validate user");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, Error[1000]);
            logger.info("/drafts", "done");
            return;
        }

        logger.debug("/drafts", "get user");
        let user = await this.userRepository.findOne({ where: { username: session.user.username }, relations: [ "drafts" ] });
        if (!user) {
            createResponse(response, 400, 1004, Error[1004]);
            logger.info("/drafts", "done");
            return;
        }

        logger.debug("/drafts", "check user's drafts");
        if (!user.drafts || user.drafts.length == 0) {
            createResponse(response, 400, 1007, Error[1007]);
            logger.info("/drafts", "done");
            return;
        }

        logger.debug("/drafts", "get user's drafts");
        let drafts = [];
        for (const draft of user.drafts) {
            drafts.push({
                message_id: draft.message_id,
                text: draft.text,
                from: draft.timestamp
            });
        }
        
        logger.debug("/drafts", "encrypt drafts");
        const encrypted = secretar.crypt({ total: drafts.length, data: JSON.stringify(drafts) });
        createResponse(response, 200, 2004, Success[2004], encrypted);
        logger.info("/drafts", "done");
    }

    async saveDraft(request: Request, response: Response) {
        logger.info("/saveDraft", "start");

        logger.debug("/saveDraft", "validate user");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, Error[1000]);
            logger.info("/saveDraft", "done");
            return;
        }

        const body = request.body;

        logger.debug("/saveDraft", "validate payload");
        if (PayloadValidator.validate(body, [ "text" ])) {
            createResponse(response, 400, 1001, Error[1001]);
            logger.info("/saveDraft", "done");
            return;
        }

        logger.debug("/saveDraft", "get user");
        let user = await this.userRepository.findOne({ where: { username: session.user.username }, relations: [ "drafts" ]  });
        if (!user) {
            createResponse(response, 400, 1004, Error[1004]);
            logger.info("/saveDraft", "done");
            return;
        }

        logger.debug("/saveDraft", "save draft");
        try {
            await this.draftsRepository.insert({
                message_id: uuidv4(),
                text: body.text,
                timestamp: new Date().getTime().toString(),
                user: user
            });
        } catch (err) {
            createResponse(response, 400, 1002, Error[1008]);
            logger.fatal("/saveDraft", err);
            return;
        }
        
        createResponse(response, 200, 2006, Success[2006]);
        logger.info("/saveDraft", "done");
    }


}
