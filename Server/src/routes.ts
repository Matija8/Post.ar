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
        path: "/inbox",
        handler: "inbox"
    },
    {
        controller: InboxController,
        method: "post",
        path: "/send",
        handler: "send"
    }

]