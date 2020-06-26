/**
  * @api {get} /drafts Drafts
  * @apiName drafts
  * @apiGroup DraftController
  *
  * @apiDescription Get all user's draft mail.
  * 
  * 
  * To access this route, user needs to have an active session.
  * 
  * 
  * Important note: all encrypted data is stringified.
  * 
  * @apiSuccess (200) {Number} 2004 Found user's drafts
  * @apiSuccessExample {json} Success response
  *     {
  *         "status": 200,
  *         "statusCode": 2004,
  *         "message": "Found user's drafts",
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
  *             "timestamp": "1590523227"
  *         }
  *     ]
  * 
  * @apiError 1000 Unauthorized access
  * @apiError 1004 User verification failed
  * @apiError 1007 Failed to get list of contents of user's drafts
  * @apiError 1010 Unexpected error, please try again later
  **/

/**
  * @api {post} /drafts/save Save draft
  * @apiName saveDraft
  * @apiGroup DraftController
  *
  * @apiDescription Save message as draft.
  * 
  * To access this route, user needs to have an active session.
  * 
  * @apiParam {String[]} to Email address of message recipient
  * @apiParam {String[]} content Encrypted draft content
  * 
  * @apiSuccess (200) {Number} 2006 Successfully saved message as draft
  * @apiSuccessExample {json} Success response
  *     {
  *         "status": 200,
  *         "statusCode": 2006,
  *         "message": "Successfully saved message as draft",
  *         "payload": {}
  *     }
  * 
  * @apiError 1000 Unauthorized access
  * @apiError 1001 Invalid payload, field missing or invalid in request
  * @apiError 1004 User verification failed
  * @apiError 1008 Failed to save draft
  **/

/**
  * @api {get} /drafts/discard Discard draft
  * @apiName discardDraft
  * @apiGroup DraftController
  *
  * @apiDescription Discard draft.
  * 
  * 
  * To access this route, user needs to have an active session.
  * 
  * @apiParam {String[]} messageId Unique message id
  * 
  * @apiSuccess (200) {Number} 2011 Successfully saved message as draft
  * @apiSuccessExample {json} Success response
  *     {
  *         "status": 200,
  *         "statusCode": 2011,
  *         "message": "User logged out successfully",
  *         "payload": {}
  *     }
  * 
  * @apiError 1000 Unauthorized access
  * @apiError 1001 Invalid payload, field missing or invalid in request
  * @apiError 1004 User verification failed
  * @apiError 1016 Failed to discard message as draft
  **/