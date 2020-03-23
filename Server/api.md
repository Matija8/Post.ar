# postar server api


## User Controller Routes

> ``/register``
>+ **Description:** Register a new user
>+ **Method**: *post*
>+ **Required fields**: *name*, *surname*, *username*, *password* 
>+ **Response fields**: ``{ }``
>+ **Error codes**: ``1001, 1002``


> ``/login``
>+ **Description:** Login an existing user
>+ **Method**: *post*
>+ **Required fields**: *username*, *password*
>+ **Response fields**: *data*: encrypted data, *hash*: signature, *secret*: encrypted secret
>+ **Error codes**: ``1001, 1003``


## Inbox Controller Routes

> ``/inbox``
>+ **Description:** Get list of contents of user's inbox
>+ **Method**: *get*
>+ **Response fields**: *data*: encrypted data, *hash*: signature, *secret*: encrypted secret
>+ **Error codes**: ``1000, 1004, 1005``


> ``/send``
>+ **Description:** Sends mail to other registered user
>+ **Method**: *post*
>+ **Required fields**: *recipient*, *text*
>+ **Response fields**: ``{ }``
>+ **Error codes**: ``1000, 1001, 1006``

### Important note, for error codes, see ***src/StatusCodes.json***
