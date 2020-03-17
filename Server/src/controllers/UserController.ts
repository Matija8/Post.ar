import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

import { DataValidator } from "../helpers/data-validator/DataValidator";
import { logger, createResponse } from "../helpers/Helpers";
import { User } from "../entity/User";

import { Error, Success } from "../StatusCodes.json";

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export class UserController {

    private dataValidator = new DataValidator();

    // Repositories
    private userRepository = getRepository(User);

    async register(request: Request, response: Response) {
        logger.info("/register");
      
        let body = request.body;

        // Validate data
        logger.debug("/register - validate data");

        if (this.dataValidator.validate(body, [ "username", "password" ])) {
            createResponse(response, 400, 1000, Error[1000]);
            return;
        }

        // Hash user password
        logger.debug("/register - hash user password");
        const hash = await bcrypt.hash(body.password, bcrypt.genSaltSync(10));

        try {
            await this.userRepository.insert({
                username: body.username,
                password: hash
            });
        } catch (err) {
            createResponse(response, 400, 1001, Error[1001]);
            return;
        }

        createResponse(response, 200, 2000, Success[2000]);
    }

    async login(request: Request, response: Response) {
        logger.info("/login");
        
        let body = request.body;
        
        // Validate data
        logger.debug("/login - validate data");

        if (this.dataValidator.validate(body, [ "username", "password" ])) {
            createResponse(response, 400, 1000, Error[1000]);
            return;
        }

        // Get user data from db
        logger.debug("/login - get user data from db");
        
        const user = await this.userRepository.findOne({ where: { username: body.username } });
        if (!user) {
            createResponse(response, 400, 1002, Error[1002]);
            return;
        }
        
        // Check user password
        logger.debug("/login - check user password");

        const match = await bcrypt.compare(body.password, user.password);
        if (!match) {
            createResponse(response, 400, 1002, Error[1002]);
            return;
        }

        // Generate user token
        logger.debug("/login - generate user token");
        const secret = uuidv4();
        const token = jwt.sign({ username: body.username }, secret, { expiresIn: "2h" });

        createResponse(response, 200, 2001, Success[2001], { token: token });
    }

}