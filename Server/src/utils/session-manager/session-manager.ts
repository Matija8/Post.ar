import { Session } from "./session";
import { User } from "../../entity/user";

class SessionManagerModel {

    private sessions: {[key: string]: Session} = {};

    add(sessionId: string, user: User) {
        this.sessions[sessionId] = new Session(sessionId, user);
    }

    find(sessionId: string): Session | undefined {
        const session = this.sessions[sessionId];

        if (!(session && session.isValid())) {
            this.delete(sessionId);
            return undefined;
        }

        if (session.user.keepMeLoggedIn) 
            session.refreshSession();

        return session;
    }

    delete(sessionId: string) {
        delete this.sessions[sessionId];
    }

}

export const SessionManager = new SessionManagerModel();
