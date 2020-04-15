import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

// utils
import { PayloadValidator } from "../utils/payload-validator/payload-validator";
import { createResponse } from "../utils/utils";
import { Logger } from "../utils/logger";
import { SessionManager } from "../utils/session-manager/session-manager";
import { secretar } from "../utils/secretar";
import { success, error } from "../status-codes.json";

// entities
import { User } from "../entity/user";

const bcrypt = require("bcrypt");

export class UserController {

    private logger = new Logger("user-controller");

    // repositories
    private userRepository = getRepository(User);

    async register(request: Request, response: Response) {
        this.logger.info("start", "/register");
      
        let body = request.body;

        this.logger.debug("validate payload", "/register");
        let required = [ "name", "surname", "username", "password" ];
        if (PayloadValidator.validate(body, required)) {
            createResponse(response, 400, 1001, error[1001]);
            this.logger.info("done", "/register");
            return;
        }

        // hash user password
        this.logger.debug("hash user password", "/register");
        const hash = await bcrypt.hash(body.password, bcrypt.genSaltSync(10));

        try {
            await this.userRepository.insert({
                username: body.username,
                password: hash,
                name: body.name,
                surname: body.surname,
            });
        } catch (err) {
            createResponse(response, 400, 1002, error[1002]);
            this.logger.fatal(err, "/register");
            return;
        }

        createResponse(response, 200, 2000, success[2000]);
        this.logger.info("done", "/register");
    }

    async login(request: Request, response: Response) {
        this.logger.info("start", "/register");
        
        let body = request.body;
        
        this.logger.debug("validate payload", "/login");
        if (PayloadValidator.validate(body, [ "username", "password" ])) {
            createResponse(response, 400, 1001, error[1001]);
            this.logger.info("done", "/login");
            return;
        }

        // get user data from db
        this.logger.debug("get user data from db", "/login");
        
        const user = await this.userRepository.findOne({ where: { username: body.username } });
        if (!user) {
            createResponse(response, 400, 1003, error[1003]);
            this.logger.info("done", "/login");
            return;
        }
        
        // check user password
        this.logger.debug("check user password", "/login");

        const match = await bcrypt.compare(body.password, user.password);
        if (!match) {
            createResponse(response, 400, 1003, error[1003]);
            this.logger.info("done", "/login");
            return;
        }

        // generate user session
        this.logger.debug("generate user session", "/login");

        const sessionId = uuidv4();
        user.password = null;

        SessionManager.add(sessionId, user);
        response.cookie("SESSIONID", sessionId);

        // create response
        this.logger.debug("encrypt and send user data", "/login");
        
        const userData = { username: user.username, name: user.name, surname: user.surname };
        
        // encrypt user data
        const encrypted = secretar.encrypt(userData);
        if (!encrypted) {
            createResponse(response, 400, 1010, error[1010]);
            this.logger.info("done", "/login");
            return;
        }

        createResponse(response, 200, 2001, success[2001], encrypted);
        this.logger.info("done", "/login");
    }

}
