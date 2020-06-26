import * as log4js from "log4js";
const chalk = require("chalk");

export class Logger {
    
    private logger: log4js.Logger;

    constructor(component: string) {
        this.logger = log4js.getLogger(component);
        this.logger.level = "debug";
    }

    info(message: string, data?: any): void {
        this.logger.info(chalk.yellowBright(message));
        if (data)
            console.log(data);
    }

    debug(message: string, data?: any): void {
        this.logger.debug(chalk.greenBright(message));
        if (data)
            console.log(data);
    }

    error(message: string, data?: any): void {
        this.logger.error(chalk.redBright(message));
        if (data)
            console.log(data);
    }

    fatal(message: string, data?: any): void {
        this.logger.fatal(chalk.magentaBright(message));
        if (data)
            console.log(data);
    }

}
