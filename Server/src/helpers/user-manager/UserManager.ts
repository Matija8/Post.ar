const jwt = require("jsonwebtoken");

class UserManagerService {

    private activeUsers: any = {};

    check(userToken: string): boolean {
        const tokens = userToken.split(" ");
        
        if (tokens.length != 3 && tokens[0] != "Bearer")
            return true;
        
        if (!this.activeUsers[tokens[1]])
            return true;

        try {
            jwt.verify(tokens[2], this.activeUsers[tokens[1]].secret);
        } catch(err) {
            return true;
        }
        
        return false;
    }

    add(userId: string, token: string, secret: string) {
        this.activeUsers[userId] = { 
            token: token,
            secret: secret
        }
    }

    delete(userId: string) {
        delete this.activeUsers[userId];
    }

}

export const UserManager = new UserManagerService();
