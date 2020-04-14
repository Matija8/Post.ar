import { Properties } from "./properties";
import { Logger } from "../logger";
import Schema from "validate";

class PayloadValidatorModel {

    private logger = new Logger("payload-validator");

    validate(data: any, requestedProperties: any): boolean {
        const schemaObject = {};
        for (const property of requestedProperties)
            schemaObject[property] = Properties[property];
        
        const schema = new Schema(schemaObject);
        const errors = schema.validate({ ...data });
        
        if (errors.length != 0) {
            this.logger.fatal("inavlid payload errors" );
            for (const error of errors)
                this.logger.error(`property '${ error.path }' is required`);

            return true;
        }
        return false;
    }

}

export const PayloadValidator = new PayloadValidatorModel();
