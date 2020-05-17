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
        let required = ["name", "surname", "username", "password"];
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
                username: `${body.username}@post.ar`,
                password: hash,
                name: body.name,
                surname: body.surname,
                theme: "default"
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
        if (PayloadValidator.validate(body, ["username", "password"])) {
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
        
        const userData = { 
            username: user.username,
            name: user.name,
            surname: user.surname,
            theme: user.theme
        };
        
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

    async checkSession(request: Request, response: Response) {
        this.logger.info("start", "/checkSession");
        
        this.logger.debug("check if session exists", "/checkSession");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, error[1000]);
            this.logger.info("done", "/checkSession");
            return;
        }

        // user session is already active
        this.logger.debug("prepare and send user data", "/checkSession");
        const userData = { 
            username: session.user.username,
            name: session.user.name,
            surname: session.user.surname,
            theme: session.user.theme
        };
        
       // encrypt user data
       const encrypted = secretar.encrypt(userData);
       if (!encrypted) {
           createResponse(response, 400, 1010, error[1010]);
           this.logger.info("done", "/checkSession");
           return;
       }

       createResponse(response, 200, 2016, success[2016], encrypted);
       this.logger.info("done", "/checkSession");
    }

    async setTheme(request: Request, response: Response) {
        this.logger.info("start", "/setTheme");
        
        this.logger.debug("check if session exists", "/setTheme");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000, error[1000]);
            this.logger.info("done", "/setTheme");
            return;
        }

        this.logger.debug("validate payload", "/setTheme");
        const body = request.body;
        if (PayloadValidator.validate(body, ["theme"])) {
            createResponse(response, 400, 1001, error[1001]);
            this.logger.info("done", "/setTheme");
            return;
        }

        if (!["default", "dark"].includes(body.theme)) {
            createResponse(response, 400, 1021, error[1021]);
            this.logger.info("done", "/setTheme");
            return;
        }

        try {
            this.logger.debug("update user theme settings", "/setTheme");
            await this.userRepository.update({ username: session.user.username }, { theme: body.theme });
            
            createResponse(response, 200, 2017, success[2017]);
            this.logger.info("done", "/setTheme");
        } catch(err) {
            createResponse(response, 400, 1021, error[1021]);
            this.logger.info("done", "/setTheme");
        }
     
    }

}
