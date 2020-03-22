import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import * as fs from "fs";

// Utils
import { PayloadValidator } from "../utils/payload-validator/PayloadValidator";
import { logger, createResponse } from "../utils/Utils";
import { User } from "../entity/User";
import { SessionManager } from "../utils/session-manager/SessionManager";
import { Error, Success } from "../StatusCodes.json";

const bcrypt = require("bcrypt");
const crypto = require("crypto");
require("dotenv").config();

export class UserController {

    // Repositories
    private userRepository = getRepository(User);

    async register(request: Request, response: Response) {
        logger.info("/register");
      
        let body = request.body;

        logger.debug("/register - validate payload");
        let required = [ "name", "surname", "username", "password" ]
        if (PayloadValidator.validate(body, required)) {
            createResponse(response, 400, 1001, Error[1001]);
            return;
        }

        // Hash user password
        logger.debug("/register - hash user password");
        const hash = await bcrypt.hash(body.password, bcrypt.genSaltSync(10));

        try {
            await this.userRepository.insert({
                username: body.username,
                password: hash,
                name: body.name,
                surname: body.surname,
            });
        } catch (err) {
            logger.fatal(err);
            createResponse(response, 400, 1002, Error[1002]);
            return;
        }

        createResponse(response, 200, 2000, Success[2000]);
    }

    async login(request: Request, response: Response) {
        logger.info("/login");
        
        let body = request.body;
        
        logger.debug("/login - validate payload");

        if (PayloadValidator.validate(body, [ "username", "password" ])) {
            createResponse(response, 400, 1001, Error[1001]);
            return;
        }

        // Get user data from db
        logger.debug("/login - get user data from db");
        
        const user = await this.userRepository.findOne({ where: { username: body.username } });
        if (!user) {
            createResponse(response, 400, 1003, Error[1003]);
            return;
        }
        
        // Check user password
        logger.debug("/login - check user password");

        const match = await bcrypt.compare(body.password, user.password);
        if (!match) {
            createResponse(response, 400, 1003, Error[1003]);
            return;
        }

        // Generate user session
        logger.debug("/login - generate user session");

        const sessionId = uuidv4();
        user.password = null;

        SessionManager.add(sessionId, user);
        response.cookie("SESSIONID", sessionId);

        // Encrypt and send user data
        logger.debug("/login - encrypt and send user data");
        const privateKey = fs.readFileSync("./src/keys/private.pem").toString();
        const key = { key: privateKey, passphrase: process.env.SECRET }; 
        const encrypted = crypto.privateEncrypt(key, Buffer.from(user.toString()));
        
        createResponse(response, 200, 2001, Success[2001], encrypted.toString("hex"));
    }

}