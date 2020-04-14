import { Moment } from "moment";
const moment = require("moment");

import { User } from "../../entity/user";

export class Session {

    static readonly VALID_HOURS = 2;

    private validUntil: Moment

    constructor(public sessionId: string, public user: User) {
        this.validUntil = moment().add(Session.VALID_HOURS, "hours");
    }

    isValid(): boolean {
        return moment().diff(this.validUntil) <= 0; 
    }

    refreshSession() {
        this.validUntil = moment().add(Session.VALID_HOURS, "hours");
    }

}