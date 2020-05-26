/**
  * @api {post} /register Register
  * @apiName register
  * @apiGroup UserController
  *
  * @apiParam {String} name User name
  * @apiParam {String} surname User surname
  * @apiParam {String} username User username
  * @apiParam {String} password User password
  * 
  * @apiDescription Register user to postar mail. Username must be unique.
  * 
  * After successful registration, users register with <code>username@post.ar</code> username.
  * 
  * @apiSuccess (200) {Number} 2000 User registered successfully
  * @apiSuccessExample {json} Success response
  *     {
  *         "status": 200,
  *         "statusCode": 2000,
  *         "message": "User registered successfully",
  *         "payload": {}
  *     }
  *
  * @apiError 1001 Invalid payload, field missing or invalid in request
  * @apiError 1002 User failed to register, username exists
  **/

/**
  * @api {post} /login Login
  * @apiName login
  * @apiGroup UserController
  *
  * @apiParam {String} username User username
  * @apiParam {String} password User password
  * @apiParam {Boolean} keepMeLoggedIn Keep me logged in flag
  *
  * @apiDescription User login. After successful login, new user session is created.
  * <code>SESSIONID</code> cookie is set to browser that contains <code>sessionId</code> for user session.
  *
  *
  * Based on user <code>keepMeLoggedIn</code> flag, user session active time will be extend.
  * If flag is equal to true, user session time will be extended for 2 hours each request,
  * otherwise user session lasts only 2 hours.
  * 
  * 
  * In response, encrypted data contains user information: username, name, surname and theme.
  *
  *
  * Important note: all encrypted data is stringified.
  *
  * @apiSuccess (200) {String} 2001 User logged in successfully
  * @apiSuccessExample {json} Success response
  *     {
  *         "status": 200,
  *         "statusCode": 2001,
  *         "message": "User logged in successfully",
  *         "payload": {
  *             "data": "a767bb0b49...",
  *             "secret": "22ae09a39a...",
  *             "hash": "1c1a2ca539..."
  *         }
  *     }
  * 
  * @apiSuccessExample {json} Encrypted data
  *   { 
  *       "username": "jane.doe@post.ar",
  *       "name": "Jane",
  *       "surname": "Doe",
  *       "theme": "dark"
  *   }
  *
  * @apiError 1001 Invalid payload, field missing or invalid in request
  * @apiError 1003 User failed to login
  * @apiError 1010 Unexpected error, please try again later
  **/

/**
  * @api {get} /logout Logout
  * @apiName logout
  * @apiGroup UserController
  *
  * @apiParam {String} username User username
  * @apiParam {String} password User password
  * @apiParam {Boolean} keepMeLoggedIn Keep me logged in flag
  *
  * @apiDescription User logout.
  *
  * @apiSuccess (200) {String} 2018 User logged out successfully
  * @apiSuccessExample {json} Success response
  *     {
  *         "status": 200,
  *         "statusCode": 2018,
  *         "message": "User logged out successfully",
  *         "payload": {}
  *     }
  **/

/**
  * @api {get} /user/checkSession Check session
  * @apiName checkSession
  * @apiGroup UserController
  *
  * @apiParam {String} username User username
  * @apiParam {String} password User password
  * @apiParam {Boolean} keepMeLoggedIn Keep me logged in flag
  *
  * @apiDescription Check user session. If user session is found, encrypted
  * user data is returned. Encrypted user data contains username, name, surname and theme.
  * 
  * 
  * Important note: all encrypted data is stringified.
  * 
  * @apiSuccess (200) {String} 2016 Found user session
  * @apiSuccessExample {json} Success response
  *     {
  *         "status": 200,
  *         "statusCode": 2016,
  *         "message": "Found user session",
  *         "payload": {
  *             "data": "0456efd731...",
  *             "secret": "669e03b4b7...",
  *             "hash": "1c1a2ca539..."
  *         }
  *     }
  * 
  * @apiSuccessExample {json} Encrypted data
  *     { 
  *         "username": "jane.doe@post.ar",
  *         "name": "Jane",
  *         "surname": "Doe",
  *         "theme": "dark"
  *     }
  *
  * @apiError 1010 Unexpected error, please try again later
  * @apiError 1022 User session not found
  **/

/**
  * @api {post} /user/changeTheme Change theme
  * @apiName changeTheme
  * @apiGroup UserController
  *
  * @apiParam {String} theme Allowed values are "dark" and "default".
  *
  * @apiDescription Change user theme.
  * 
  * @apiSuccess (200) {String} 2017 Successfully changed user theme
  * @apiSuccessExample {json} Success response
  *     {
  *         "status": 200,
  *         "statusCode": 2017,
  *         "message": "Successfully changed user theme",
  *         "payload": {}
  *     }
  * 
  * @apiError 1000 Unauthorized access
  * @apiError 1001 Invalid payload, field missing or invalid in request
  * @apiError 1021 Failed to change user theme
  **/