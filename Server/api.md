# postar server API

## User Controller Routes

> ``/register``
>+ **Description:** Register a new user
>+ **Method**: *post*
>+ **Required fields**: *name*: ``string``, *surname*: ``string``, *username*: ``string``, *password*: ``string``
>+ **Response fields**: ``{ }``
>+ **Error codes**: ``1001, 1002``


> ``/login``
>+ **Description:** Login an existing user
>+ **Note:** Login username example **username**: *user.name@post.ar*
>+ **Method**: *post*
>+ **Required fields**: *username*: ``string``, *password*: ``string``
>+ **Response fields**: *data*: encrypted data, *hash*: signature, *secret*: encrypted secret
>+ **Error codes**: ``1001, 1003, 1010``


## Inbox Controller Routes

> ``/inbox``
>+ **Description:** Get list of contents of user's inbox
>+ **Method**: *get*
>+ **Response fields**: *data*: encrypted data, *hash*: signature, *secret*: encrypted secret
>+ **Error codes**: ``1000, 1004, 1005, 1010``


> ``/send``
>+ **Description:** Sends mail to other registered user
>+ **Method**: *post*
>+ **Required fields**: *recipient*: ``string``, *subject*: ``string``, *content*: ``string``
>+ **Response fields**: ``{ }``
>+ **Error codes**: ``1000, 1001, 1006``


> ``/readMessage``
>+ **Description:** Update message read field
>+ **Method**: *post*
>+ **Required fields**: *messageIds*: ``array<string>``
>+ **Response fields**: ``{ }``
>+ **Error codes**: ``1000, 1001, 1011``


## Sent Controller Routes

> ``/sent``
>+ **Description:** Get list of contents of user's sent mail
>+ **Method**: *get*
>+ **Response fields**: *data*: encrypted data, *hash*: signature, *secret*: encrypted secret
>+ **Error codes**: ``1000, 1004, 1009, 1010``


## Draft Controller Routes

> ``/drafts``
>+ **Description:** Get list of contents of user's drafts
>+ **Method**: *get*
>+ **Response fields**: *data*: encrypted data, *hash*: signature, *secret*: encrypted secret
>+ **Error codes**: ``1000, 1004, 1007, 1010``


> ``/saveDraft``
>+ **Description:** Save message as a draft
>+ **Method**: *post*
>+ **Required fields**: *subject*: ``string``, *content*: ``string``
>+ **Response fields**: ``{ }``
>+ **Error codes**: ``1000, 1001, 1004, 1007, 1010``


> ``/discardDraft``
>+ **Description:** Discard draft message
>+ **Method**: *post*
>+ **Required fields**: *messageId*: ``string``
>+ **Response fields**: ``{ }``
>+ **Error codes**: ``1000, 1001, 1004, 1016``

## Starred Controller Routes

> ``/starred``
>+ **Description:** Get list of contents of user's starred messages
>+ **Method**: *get*
>+ **Response fields**: *data*: encrypted data, *hash*: signature, *secret*: encrypted secret
>+ **Error codes**: ``1000, 1010, 1012``


> ``/starMessage``
>+ **Description:** Save message as a starred message
>+ **Method**: *post*
>+ **Required fields**: *messageId*: ``string``, *type*: ``string``
>+ **Available types**: *inbox*, *sent*
>+ **Response fields**: ``{ }``
>+ **Error codes**: ``1000, 1001, 1013, 1014``


> ``/removeStarredMessage``
>+ **Description:** Remove message as starred
>+ **Method**: *post*
>+ **Required fields**: *messageId*: ``string``, *type*: ``string``
>+ **Response fields**: ``{ }``
>+ **Error codes**: ``1000, 1001, 1013, 1015``


### Important note, for error codes, see ``src/status-codes.json``
