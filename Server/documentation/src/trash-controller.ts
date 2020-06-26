/**
  * @api {get} /trash Trash
  * @apiName trash
  * @apiGroup TrashController
  *
  * @apiDescription Get all user's deleted emails.
  * 
  * 
  * To access this route, user needs to have an active session.
  * 
  * 
  * Important note: all encrypted data is stringified.
  * 
  * @apiSuccess (200) {Number} 2014 Found starred messages
  * @apiSuccessExample {json} Success response
  *     {
  *         "status": 200,
  *         "statusCode": 2013,
  *         "message": "Found messages in trash",
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
  *                "isDeleted": true,
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
  *                 "isDeleted": true,
  *             }
  *         ]
  *    }
  * 
  * @apiError 1000 Unauthorized access
  * @apiError 1010 Unexpected error, please try again later
  * @apiError 1018 Failed to get messages from trash
  **/

/**
  * @api {post} /trash/delete Delete messages
  * @apiName deleteMessages
  * @apiGroup TrashController
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
  * @apiDescription Delete messages.
  * 
  * 
  * To access this route, user needs to have an active session.
  * 
  * @apiSuccess (200) {Number} 2014 Successfully moved messages to trash
  *
  * @apiError 1000 Unauthorized access
  * @apiError 1001 Invalid payload, field missing or invalid in request
  * @apiError 1013 Invalid message type
  * @apiError 1019 Failed to move message to trash
  **/

/**
  * @api {post} /trash/undoDelete Move messages from trash
  * @apiName undoDelete
  * @apiGroup TrashController
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
  * @apiDescription Move messages from trash. Undo delete.
  * 
  * 
  * To access this route, user needs to have an active session.
  * 
  * @apiSuccess (200) {Number} 2015 Messages moved from trash successfully
  *
  * @apiError 1000 Unauthorized access
  * @apiError 1001 Invalid payload, field missing or invalid in request
  * @apiError 1013 Invalid message type
  * @apiError 1019 Failed to move message to trash
  **/

/**
  * @api {post} /trash/deleteForever Delete message forever
  * @apiName deleteForever
  * @apiGroup TrashController
  *
  *  @apiParam {String[]} messages List of message objects
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
  * @apiDescription Delete message forever.
  * 
  * To access this route, user needs to have an active session.
  * 
  * @apiSuccess (200) {Number} 2019 Successfully deleted message forever
  *
  * @apiError 1000 Unauthorized access
  * @apiError 1001 Invalid payload,lid message ty field missing or invalid in request
  * @apiError 1013 Invape
  * @apiError 1023 Failed to delete messages forever
  **/