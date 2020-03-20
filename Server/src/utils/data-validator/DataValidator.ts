import { Properties } from "./Properties";
import { logger } from "../Utils";
import Schema from "validate";

export class DataValidator {

    validate(data: any, requestedProperties: any): boolean {
        const schemaObject = {};
        for (const property of requestedProperties) {
            schemaObject[property] = Properties[property];
        }
        
        const schema = new Schema(schemaObject);
        const errors = schema.validate({ ...data });
        
        if (errors.length != 0) {
            logger.error("Invalid data errors");
            for (const error of errors)
                logger.error(`Property '${ error.path }' is required`);

            return true;
        }
        
        return false;
    }

} 