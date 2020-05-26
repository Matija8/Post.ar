import { UserController } from "./controllers/user-controller";
import { InboxController } from "./controllers/inbox-controller";
import { SentController } from "./controllers/sent-controller";
import { DraftController } from "./controllers/draft-controller";
import { StarredController } from "./controllers/starred-controler";
import { TrashController } from "./controllers/trash-controller";

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
    {
        controller: UserController,
        method: "get",
        path: "/logout",
        handler: "logout"
    },
    {
        controller: UserController,
        method: "get",
        path: "/user/checkSession",
        handler: "checkSession"
    },
    {
        controller: UserController,
        method: "post",
        path: "/user/changeTheme",
        handler: "changeTheme"
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
        path: "/inbox/markAsRead",
        handler: "markAsRead"
    },
    {
        controller: InboxController,
        method: "post",
        path: "/inbox/markAsUnread",
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
        path: "/drafts/save",
        handler: "saveDraft"
    },
    {
        controller: DraftController,
        method: "post",
        path: "/drafts/discard",
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
        path: "/starred/save",
        handler: "starMessage"
    },
    {
        controller: StarredController,
        method: "post",
        path: "/starred/remove",
        handler: "removeStarredMessage"
    },
    // trash controller routes
    {
        controller: TrashController,
        method: "get",
        path: "/trash",
        handler: "trash"
    },
    {
        controller: TrashController,
        method: "post",
        path: "/trash/delete",
        handler: "deleteMessages"
    },
    {
        controller: TrashController,
        method: "post",
        path: "/trash/undoDelete",
        handler: "undoDeletedMessages"
    },
    {
        controller: TrashController,
        method: "post",
        path: "/trash/deleteForever",
        handler: "deleteForever"
    }
]