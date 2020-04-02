import { Properties } from "./Properties";
import { logger } from "../Logger";
import Schema from "validate";

class PayloadValidatorModel {

    validate(data: any, requestedProperties: any): boolean {
        const schemaObject = {};
        for (const property of requestedProperties)
            schemaObject[property] = Properties[property];
        
        const schema = new Schema(schemaObject);
        const errors = schema.validate({ ...data });
        
        if (errors.length != 0) {
            logger.fatal("PayloadValidator", "inavlid payload errors" );
            for (const error of errors)
                logger.error("PayloadValidator", `property '${ error.path }' is required`);

            return true;
        }
        return false;
    }

}

export const PayloadValidator = new PayloadValidatorModel();
