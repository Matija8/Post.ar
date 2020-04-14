import * as log4js from "log4js";

export class Logger {
    
    private logger: log4js.Logger;

    constructor(component: string) {
        this.logger = log4js.getLogger(component);
        this.logger.level = "debug";
    }

    info(message: any, route: string = null): void {
        if (route == null) {
            this.logger.info(message);
        } else {
            message = typeof message === "object" ? JSON.stringify(message, null, 2) : message;
            this.logger.info(`${route} - ${message}`);
        }
    }

    debug(message: any, route: string = null): void {
        if (route == null) {
            this.logger.info(message);
        } else {
            message = typeof message === "object" ? JSON.stringify(message, null, 2) : message;
            this.logger.info(`${route} - ${message}`);
        }
    }

    error(message: any, route: string = null): void {
        if (route == null) {
            this.logger.info(message);
        } else {
            message = typeof message === "object" ? JSON.stringify(message, null, 2) : message;
            this.logger.info(`${route} - ${message}`);
        }
    }

    fatal(message: any, route: string = null): void {
        if (route == null) {
            this.logger.info(message);
        } else {
            message = typeof message === "object" ? JSON.stringify(message, null, 2) : message;
            this.logger.info(`${route} - ${message}`);
        }
    }

}
