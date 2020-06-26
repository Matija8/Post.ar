import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { v4 as uuidv4 } from "uuid";

// utils
import { PayloadValidator } from "../utils/payload-validator/payload-validator";
import { createResponse } from "../utils/utils";
import { Logger } from "../utils/logger";
import { SessionManager } from "../utils/session-manager/session-manager";
import { secretar } from "../utils/secretar";

// entities
import { User, UserTheme } from "../entity/user";

const bcrypt = require("bcrypt");

export class UserController {

    private logger = new Logger("user-controller");

    // repositories
    private userRepository = getRepository(User);

    async register(request: Request, response: Response) {
        this.logger.info("/register");
      
        let body = request.body;

        this.logger.debug("validate payload");
        let required = ["name", "surname", "username", "password"];
        if (PayloadValidator.validate(body, required)) {
            createResponse(response, 400, 1001);
            return;
        }

        // hash user password
        this.logger.debug("hash user password");
        const hash = await bcrypt.hash(body.password, bcrypt.genSaltSync(10));

        try {
            await this.userRepository.insert({
                username: `${body.username}@post.ar`,
                password: hash,
                name: body.name,
                surname: body.surname,
                theme: UserTheme.LIGHT
            });
        } catch (err) {
            createResponse(response, 400, 1002);
            this.logger.fatal("failed register user", err);
            return;
        }

        createResponse(response, 200, 2000);
    }

    async login(request: Request, response: Response) {
        this.logger.info("/login");
        
        let body = request.body;
        
        this.logger.debug("validate payload");
        if (PayloadValidator.validate(body, ["username", "password", "keepMeLoggedIn"])) {
            createResponse(response, 400, 1001);
            return;
        }

        // get user data from db
        this.logger.debug("get user data from db");
        
        const user = await this.userRepository.findOne({ where: { username: body.username } });
        if (!user) {
            createResponse(response, 400, 1003);
            return;
        }

        // update user keepMeLoggedIn feature
        this.logger.debug("update user keepMeLoggedIn feature");
        const update = await this.userRepository.update({ username: body.username }, { keepMeLoggedIn: body.keepMeLoggedIn })
                                                .catch(err => { this.logger.fatal(err); return undefined; });
        if (!update) {
            createResponse(response, 400, 1010);
            return;
        }
        
        // check user password
        this.logger.debug("check user password");

        const match = await bcrypt.compare(body.password, user.password);
        if (!match) {
            createResponse(response, 400, 1003);
            return;
        }

        // generate user session
        this.logger.debug("generate user session");

        const sessionId = uuidv4();
        user.password = null;

        SessionManager.add(sessionId, user);
        response.cookie("SESSIONID", sessionId);

        // create response
        this.logger.debug("encrypt and send user data");
        
        const userData = { 
            username: user.username,
            name: user.name,
            surname: user.surname,
            theme: user.theme
        };
        
        // encrypt user data
        const encrypted = secretar.encrypt(userData);
        if (!encrypted) {
            createResponse(response, 400, 1010);
            return;
        }

        createResponse(response, 200, 2001, encrypted);
    }

    async logout(request: Request, response: Response) {
        this.logger.info("/logout");
        
        this.logger.debug("remove session");
        SessionManager.delete(request.cookies["SESSIONID"]);
        
        createResponse(response, 200, 2018);
    }

    async checkSession(request: Request, response: Response) {
        this.logger.info("/user/checkSession");
        
        this.logger.debug("check if session exists");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 400, 1022);
            return;
        }

        // user session is already active
        this.logger.debug("prepare and send user data");
        const userData = { 
            username: session.user.username,
            name: session.user.name,
            surname: session.user.surname,
            theme: session.user.theme
        };
        
       // encrypt user data
       const encrypted = secretar.encrypt(userData);
       if (!encrypted) {
           createResponse(response, 400, 1010);
           return;
       }

       createResponse(response, 200, 2016, encrypted);
    }

    async changeTheme(request: Request, response: Response) {
        this.logger.info("/user/changeTheme");
        
        this.logger.debug("check if session exists");
        const session = SessionManager.find(request.cookies["SESSIONID"]);
        if (!session) {
            createResponse(response, 401, 1000);
            return;
        }

        this.logger.debug("validate payload");
        const body = request.body;
        if (PayloadValidator.validate(body, ["theme"])) {
            createResponse(response, 400, 1001);
            return;
        }

        if (![UserTheme.LIGHT, UserTheme.DARK].includes(body.theme)) {
            createResponse(response, 400, 1021);
            return;
        }

        try {
            this.logger.debug("update user theme settings");
            await this.userRepository.update({ username: session.user.username }, { theme: body.theme });
            createResponse(response, 200, 2017);
        } catch(err) {
            createResponse(response, 400, 1021);
        }
    }

}
