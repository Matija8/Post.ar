/**
  * @api {get} /starred Starred
  * @apiName starred
  * @apiGroup StarredController
  *
  * @apiDescription Get all user's starred mail.
  * 
  * 
  * To access this route, user needs to have an active session.
  * 
  * 
  * Important note: all encrypted data is stringified.
  * 
  * @apiSuccess (200) {Number} 2008 Found starred messages
  * @apiSuccessExample {json} Success response
  *     {
  *         "status": 200,
  *         "statusCode": 2008,
  *         "message": "Found starred messages",
  *         "payload": {
  *             "data": "0456efd731...",
  *             "secret": "669e03b4b7...",
  *             "hash": "1c1a2ca539..."
  *         }
  *     }
  * 
  * @apiSuccessExample {json} Encrypted data
  *    { 
  *        "inbox": [
  *            {
  *                "messageId": "67c090c6-6d30-462a-bee1-57a6cd8b8066",
  *                "timestamp": "1590523227",
  *                "content": "a6cd8b8066...",
  *                "from": "jane.doe@post.ar",
  *                "isStarred": true,
  *                "isDeleted": false,
  *                "isRead": true,
  *             }
  *         ],
  *         "sent": [
  *             {
  *                 "messageId": "67c090c6-6d30-462a-bee1-57a6cd8b8066",
  *                 "timestamp": "1590523227",
  *                 "content": "a6cd8b8066...",
  *                 "to": "john.doe@post.ar",
  *                 "isStarred": true,
  *                 "isDeleted": false,
  *             }
  *         ]
  *    }
  * 
  * @apiError 1000 Unauthorized access
  * @apiError 1006 Failed to send email
  * @apiError 1010 Unexpected error, please try again later
  * @apiError 1012 Failed to get starred messages
  **/

/**
  * @api {post} /starred/save Star message
  * @apiName starMessages
  * @apiGroup StarredController
  *
  * @apiParam {String[]} messages List of message objects
  * @apiParamExample {json} messages
  *     [
  *         {
  *             "messageId": "567cf053-a302-4d61-b25a-e260d3736f40",
  *             "type": "inbox"
  *         },
  *         {
  *             "messageId": "67c090c6-6d30-462a-bee1-57a6cd8b8066",
  *             "type": "sent"
  *         }
  *     ]
  * 
  * @apiDescription Star message.
  * 
  * 
  * To access this route, user needs to have an active session.
  * 
  * @apiSuccess (200) {Number} 2009 Successfully saved starred message
  *
  * @apiError 1000 Unauthorized access
  * @apiError 1001 Invalid payload, field missing or invalid in request
  * @apiError 1013 Invalid message type
  * @apiError 1014 Failed to save starred message
  **/

/**
  * @api {post} /starred/remove Remove starred message
  * @apiName starMessages
  * @apiGroup StarredController
  *
  * @apiParam {String[]} messages List of message objects
  * @apiParamExample {json} messages
  *     [
  *         {
  *             "messageId": "567cf053-a302-4d61-b25a-e260d3736f40",
  *             "type": "inbox"
  *         },
  *         {
  *             "messageId": "67c090c6-6d30-462a-bee1-57a6cd8b8066",
  *             "type": "sent"
  *         }
  *     ]
  * 
  * @apiDescription Remove starred message.
  * 
  * 
  * To access this route, user needs to have an active session.
  * 
  * @apiSuccess (200) {Number} 2010 Successfully removed starred message
  *
  * @apiError 1000 Unauthorized access
  * @apiError 1001 Invalid payload, field missing or invalid in request
  * @apiError 1013 Invalid message type
  * @apiError 1015 Failed to remove starred message
  **/