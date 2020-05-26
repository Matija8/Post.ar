/**
  * @api {get} /sent Sent
  * @apiName sent
  * @apiGroup SentController
  *
  * @apiDescription Get all user's sent mail.
  * 
  * 
  * To access this route, user needs to have an active session.
  * 
  * 
  * Important note: all encrypted data is stringified.
  * 
  * @apiSuccess (200) {Number} 2005 Found user's sent mail
  * @apiSuccessExample {json} Success response
  *     {
  *         "status": 200,
  *         "statusCode": 2005,
  *         "message": "Found user's sent mail",
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
  *             "to": "john.doe@post.ar",
  *             "content": "31af09c39a...",
  *             "isStarred": true,
  *             "timestamp": "1590523227"
  *         }
  *     ]
  * 
  * @apiError 1000 Unauthorized access
  * @apiError 1004 User verification failed
  * @apiError 1009 Failed to get list of contents of user's sent mail
  * @apiError 1010 Unexpected error, please try again later
  **/