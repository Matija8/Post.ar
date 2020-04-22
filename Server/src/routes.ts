import { UserController } from "./controllers/user-controller";
import { InboxController } from "./controllers/inbox-controller";
import { SentController } from "./controllers/sent-controller";
import { DraftController } from "./controllers/draft-controller";
import { StarredController } from "./controllers/starred-controler";

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
    {
        controller: InboxController,
        method: "post",
        path: "/markAsRead",
        handler: "markAsRead"
    },
    {
        controller: InboxController,
        method: "post",
        path: "/markAsUnread",
        handler: "markAsUnread"
    },
    // sent controller routes
    {
        controller: SentController,
        method: "get",
        path: "/sent",
        handler: "sent"
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
    },
    {
        controller: DraftController,
        method: "post",
        path: "/discardDraft",
        handler: "discardDraft"
    },
    // starred controller routes
    {
        controller: StarredController,
        method: "get",
        path: "/starred",
        handler: "starred"
    },
    {
        controller: StarredController,
        method: "post",
        path: "/starMessage",
        handler: "starMessage"
    },
    {
        controller: StarredController,
        method: "post",
        path: "/removeStarredMessage",
        handler: "removeStarredMessage"
    }
]