import { UserController } from "./controllers/UserController";
import { InboxController } from "./controllers/InboxController";
import { SentController } from "./controllers/SentController";
import { DraftController } from "./controllers/DraftController";

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
    },
    // Sent Controller Routes
    {
        controller: SentController,
        method: "get",
        path: "/sentMail",
        handler: "sentMail"
    },
    // Drafts Controller Routes
    {
        controller: DraftController,
        method: "get",
        path: "/drafts",
        handler: "drafts"
    },
    {
        controller: DraftController,
        method: "post",
        path: "/saveDraft",
        handler: "saveDraft"
    }
]