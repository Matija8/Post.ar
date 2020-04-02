import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

// Utils
import { PayloadValidator } from "../utils/payload-validator/PayloadValidator";
import { createResponse } from "../utils/Utils";
import { logger } from "../utils/Logger";
import { SessionManager } from "../utils/session-manager/SessionManager";
import { secretar } from "../utils/Secretar";
import { Error, Success } from "../StatusCodes.json";

// Entities
import { User } from "../entity/User";

const bcrypt = require("bcrypt");

export class UserController {

    // Repositories
    private userRepository = getRepository(User);

    async register(request: Request, response: Response) {
        logger.info("/register", "start");
      
        let body = request.body;

        logger.debug("/register", "validate payload");
        let required = [ "name", "surname", "username", "password" ];
        if (PayloadValidator.validate(body, required)) {
            createResponse(response, 400, 1001, Error[1001]);
            logger.info("/register", "done");
            return;
        }

        // Hash user password
        logger.debug("/register", "hash user password");
        const hash = await bcrypt.hash(body.password, bcrypt.genSaltSync(10));

        try {
            await this.userRepository.insert({
                username: body.username,
                password: hash,
                name: body.name,
                surname: body.surname,
            });
        } catch (err) {
            createResponse(response, 400, 1002, Error[1002]);
            logger.fatal("/register", err);
            return;
        }

        createResponse(response, 200, 2000, Success[2000]);
        logger.info("/register", "done");
    }

    async login(request: Request, response: Response) {
        logger.info("/login", "start");
        
        let body = request.body;
        
        logger.debug("/login", "validate payload");
        if (PayloadValidator.validate(body, [ "username", "password" ])) {
            createResponse(response, 400, 1001, Error[1001]);
            logger.info("/login", "done");
            return;
        }

        // Get user data from db
        logger.debug("/login", "get user data from db");
        
        const user = await this.userRepository.findOne({ where: { username: body.username } });
        if (!user) {
            createResponse(response, 400, 1003, Error[1003]);
            logger.info("/login", "done");
            return;
        }
        
        // Check user password
        logger.debug("/login", "check user password");

        const match = await bcrypt.compare(body.password, user.password);
        if (!match) {
            createResponse(response, 400, 1003, Error[1003]);
            logger.info("/login", "done");
            return;
        }

        // Generate user session
        logger.debug("/login", "generate user session");

        const sessionId = uuidv4();
        user.password = null;

        SessionManager.add(sessionId, user);
        response.cookie("SESSIONID", sessionId);

        // Create response
        logger.debug("/login", "encrypt and send user data");
        
        const userData = { username: user.username, name: user.name, surname: user.surname };
        
        // Encrypt user data
        const encrypted = secretar.crypt(userData);

        createResponse(response, 200, 2001, Success[2001], encrypted);
        logger.info("/login", "done");
    }

}
