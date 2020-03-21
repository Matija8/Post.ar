import { UserController } from "./controllers/UserController";
import { InboxController } from "./controllers/InboxController";

export const Routes = [
    // User Controller Routes
    {
        controller: UserController,
        method: "post",
        path: "/register",
        handler: "register"
    },
    {
        controller: UserController,
        method: "post",
        path: "/login",
        handler: "login"
    },
    // Inbox Controller Routes
    {
        controller: InboxController,
        method: "get",
        path: "/getMail",
        handler: "getMail"
    },
    {
        controller: InboxController,
        method: "get",
        path: "/getMail",
        handler: "getMail"
    }

]