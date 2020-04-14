import { UserController } from "./controllers/user-controller";
import { InboxController } from "./controllers/inbox-controller";
import { SentController } from "./controllers/sent-controller";
import { DraftController } from "./controllers/draft-controller";

export const Routes = [
    // user controller routes
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
    // inbox controller routes
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
    // sent controller routes
    {
        controller: SentController,
        method: "get",
        path: "/sentMail",
        handler: "sentMail"
    },
    // drafts controller routes
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