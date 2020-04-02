import * as log4js from "log4js";

class Logger {
    
    private logger: log4js.Logger;

    constructor() {
        this.logger = log4js.getLogger();
        this.logger.level = "debug";
    }

    info(route: string, message: string): void {
        this.logger.info(`${route} - ${message}`);
    }

    debug(route: string, message: string): void {
        this.logger.debug(`${route} - ${message}`);
    }

    error(route: string, message): void {
        this.logger.error(`${route} - ${message}`);
    }

    fatal(route: string, message): void {
        this.logger.fatal(`${route} - ${message}`);
    }

}

export const logger = new Logger();
