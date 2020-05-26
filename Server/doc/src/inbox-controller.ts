/**
  * @api {get} /inbox Inbox
  * @apiName inbox
  * @apiGroup InboxController
  *
  * @apiParam {String} name User name
  * @apiParam {String} surname User surname
  * @apiParam {String} username User username
  * @apiParam {String} password User password
  * 
  * @apiDescription Get all mail from user's inbox.
  * 
  * 
  * To access this route, user needs to have an active session.
  * 
  * 
  * Important note: all encrypted data is stringified.
  * 
  * @apiSuccess (200) {Number} 2002 Found user's inbox mail
  * @apiSuccessExample {json} Success response
  *     {
  *         "status": 200,
  *         "statusCode": 2002,
  *         "message": "Found user's inbox mail",
  *         "payload": {
  *             "data": "a767bb0b49...",
  *             "secret": "22ae09a39a...",
  *             "hash": "1c1a2ca539..."
  *         }
  *     }
  * @apiSuccessExample {json} Encrypted data
  *     [
  *         {
  *             "messageId": "67c090c6-6d30-462a-bee1-57a6cd8b8066",
  *             "from": "jane.doe@post.ar",
  *             "content": "31af09c39a...",
  *             "isRead": false,
  *             "isStarred": false,
  *             "timestamp": "1590523227"
  *         }
  *     ]
  * 
  * @apiError 1000 Unauthorized access
  * @apiError 1004 User verification failed
  * @apiError 1005 Failed to get list of contents of user's inbox
  * @apiError 1010 Unexpected error, please try again later
  **/

/**
  * @api {post} /send Send
  * @apiName send
  * @apiGroup InboxController
  *
  * @apiParam {String} content Encrypted mail content
  * @apiParam {String} to Email recipient address
  * 
  * @apiDescription Send email to other user.
  * 
  * 
  * To access this route, user needs to have an active session.
  * 
  * 
  * Important note: all encrypted data is stringified.
  * 
  * @apiSuccess (200) {Number} 2003 Email sent successfully
  * @apiSuccessExample {json} Success response
  *     {
  *         "status": 200,
  *         "statusCode": 2003,
  *         "message": "Email sent successfully",
  *         "payload": {
  *             "data": "0456efd731...",
  *             "secret": "669e03b4b7...",
  *             "hash": "1c1a2ca539..."
  *         }
  *     }
  * 
  * @apiSuccessExample {json} Encrypted data
  *    { 
  *        "messageId": "67c090c6-6d30-462a-bee1-57a6cd8b8066",
  *        "timestamp": "1590523227",
  *        "content": "a6cd8b8066...",
  *        "to": "john.doe@post.ar"
  *    }
  * 
  * @apiError 1000 Unauthorized access
  * @apiError 1001 Invalid payload, field missing or invalid in request
  * @apiError 1006 Failed to send email
  * @apiError 1010 Unexpected error, please try again later
  **/

/**
  * @api {post} /inbox/markAsRead Mark mail as read
  * @apiName markAsRead
  * @apiGroup InboxController
  *
  * @apiParam {String[]} messageIds List of message ids
  * @apiParamExample {json} messageIds
  *     [
  *         "567cf053-a302-4d61-b25a-e260d3736f40",
  *         "72990663-5131-4f36-ad8b-ddb7b54428be"     
  *     ]
  * 
  * @apiDescription Mark list of emails as read.
  * 
  * 
  * To access this route, user needs to have an active session.
  * 
  * @apiSuccess (200) {Number} 2007 Successfully updated messages as read
  *
  * @apiError 1000 Unauthorized access
  * @apiError 1001 Invalid payload, field missing or invalid in request
  * @apiError 1011 Failed to update messages as read
  **/

/**
  * @api {post} /inbox/markAsUnread Mark mail as unread
  * @apiName markAsUnread
  * @apiGroup InboxController
  *
  * @apiParam {String[]} messageIds List of message ids
  * @apiParamExample {json} messageIds
  *     [
  *         "567cf053-a302-4d61-b25a-e260d3736f40",
  *         "72990663-5131-4f36-ad8b-ddb7b54428be"     
  *     ]
  * 
  * @apiDescription Mark list of emails as unread.
  * 
  * 
  * To access this route, user needs to have an active session.
  * 
  * @apiSuccess (200) {Number} 2007 Successfully updated messages as read
  *
  * @apiError 1000 Unauthorized access
  * @apiError 1001 Invalid payload, field missing or invalid in request
  * @apiError 1017 Failed to update messages as unread
  **/