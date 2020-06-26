define({ "api": [
  {
    "type": "get",
    "url": "/drafts/discard",
    "title": "Discard draft",
    "name": "discardDraft",
    "group": "DraftController",
    "description": "<p>Discard draft.</p> <p>To access this route, user needs to have an active session.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "messageId",
            "description": "<p>Unique message id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "2011",
            "description": "<p>Successfully saved message as draft</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response",
          "content": "{\n    \"status\": 200,\n    \"statusCode\": 2011,\n    \"message\": \"User logged out successfully\",\n    \"payload\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1000",
            "description": "<p>Unauthorized access</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1001",
            "description": "<p>Invalid payload, field missing or invalid in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1004",
            "description": "<p>User verification failed</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1016",
            "description": "<p>Failed to discard message as draft</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/src/draft-controller.ts",
    "groupTitle": "DraftController"
  },
  {
    "type": "get",
    "url": "/drafts",
    "title": "Drafts",
    "name": "drafts",
    "group": "DraftController",
    "description": "<p>Get all user's draft mail.</p> <p>To access this route, user needs to have an active session.</p> <p>Important note: all encrypted data is stringified.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "2004",
            "description": "<p>Found user's drafts</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response",
          "content": "{\n    \"status\": 200,\n    \"statusCode\": 2004,\n    \"message\": \"Found user's drafts\",\n    \"payload\": {\n        \"data\": \"a767bb0b49...\",\n        \"secret\": \"22ae09a39a...\",\n        \"hash\": \"1c1a2ca539...\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Encrypted data",
          "content": "[\n    {\n        \"messageId\": \"67c090c6-6d30-462a-bee1-57a6cd8b8066\",\n        \"to\": \"john.doe@post.ar\",\n        \"content\": \"31af09c39a...\",\n        \"timestamp\": \"1590523227\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1000",
            "description": "<p>Unauthorized access</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1004",
            "description": "<p>User verification failed</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1007",
            "description": "<p>Failed to get list of contents of user's drafts</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1010",
            "description": "<p>Unexpected error, please try again later</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/src/draft-controller.ts",
    "groupTitle": "DraftController"
  },
  {
    "type": "post",
    "url": "/drafts/save",
    "title": "Save draft",
    "name": "saveDraft",
    "group": "DraftController",
    "description": "<p>Save message as draft.</p> <p>To access this route, user needs to have an active session.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "to",
            "description": "<p>Email address of message recipient</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "content",
            "description": "<p>Encrypted draft content</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "2006",
            "description": "<p>Successfully saved message as draft</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response",
          "content": "{\n    \"status\": 200,\n    \"statusCode\": 2006,\n    \"message\": \"Successfully saved message as draft\",\n    \"payload\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1000",
            "description": "<p>Unauthorized access</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1001",
            "description": "<p>Invalid payload, field missing or invalid in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1004",
            "description": "<p>User verification failed</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1008",
            "description": "<p>Failed to save draft</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/src/draft-controller.ts",
    "groupTitle": "DraftController"
  },
  {
    "type": "get",
    "url": "/inbox",
    "title": "Inbox",
    "name": "inbox",
    "group": "InboxController",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "surname",
            "description": "<p>User surname</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          }
        ]
      }
    },
    "description": "<p>Get all mail from user's inbox.</p> <p>To access this route, user needs to have an active session.</p> <p>Important note: all encrypted data is stringified.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "2002",
            "description": "<p>Found user's inbox mail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response",
          "content": "{\n    \"status\": 200,\n    \"statusCode\": 2002,\n    \"message\": \"Found user's inbox mail\",\n    \"payload\": {\n        \"data\": \"a767bb0b49...\",\n        \"secret\": \"22ae09a39a...\",\n        \"hash\": \"1c1a2ca539...\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Encrypted data",
          "content": "[\n    {\n        \"messageId\": \"67c090c6-6d30-462a-bee1-57a6cd8b8066\",\n        \"from\": \"jane.doe@post.ar\",\n        \"content\": \"31af09c39a...\",\n        \"isRead\": false,\n        \"isStarred\": false,\n        \"timestamp\": \"1590523227\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1000",
            "description": "<p>Unauthorized access</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1004",
            "description": "<p>User verification failed</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1005",
            "description": "<p>Failed to get list of contents of user's inbox</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1010",
            "description": "<p>Unexpected error, please try again later</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/src/inbox-controller.ts",
    "groupTitle": "InboxController"
  },
  {
    "type": "post",
    "url": "/inbox/markAsRead",
    "title": "Mark mail as read",
    "name": "markAsRead",
    "group": "InboxController",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "messageIds",
            "description": "<p>List of message ids</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "messageIds",
          "content": "[\n    \"567cf053-a302-4d61-b25a-e260d3736f40\",\n    \"72990663-5131-4f36-ad8b-ddb7b54428be\"     \n]",
          "type": "json"
        }
      ]
    },
    "description": "<p>Mark list of emails as read.</p> <p>To access this route, user needs to have an active session.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "2007",
            "description": "<p>Successfully updated messages as read</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1000",
            "description": "<p>Unauthorized access</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1001",
            "description": "<p>Invalid payload, field missing or invalid in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1011",
            "description": "<p>Failed to update messages as read</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/src/inbox-controller.ts",
    "groupTitle": "InboxController"
  },
  {
    "type": "post",
    "url": "/inbox/markAsUnread",
    "title": "Mark mail as unread",
    "name": "markAsUnread",
    "group": "InboxController",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "messageIds",
            "description": "<p>List of message ids</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "messageIds",
          "content": "[\n    \"567cf053-a302-4d61-b25a-e260d3736f40\",\n    \"72990663-5131-4f36-ad8b-ddb7b54428be\"     \n]",
          "type": "json"
        }
      ]
    },
    "description": "<p>Mark list of emails as unread.</p> <p>To access this route, user needs to have an active session.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "2007",
            "description": "<p>Successfully updated messages as read</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1000",
            "description": "<p>Unauthorized access</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1001",
            "description": "<p>Invalid payload, field missing or invalid in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1017",
            "description": "<p>Failed to update messages as unread</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/src/inbox-controller.ts",
    "groupTitle": "InboxController"
  },
  {
    "type": "post",
    "url": "/send",
    "title": "Send",
    "name": "send",
    "group": "InboxController",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Encrypted mail content</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "to",
            "description": "<p>Email recipient address</p>"
          }
        ]
      }
    },
    "description": "<p>Send email to other user.</p> <p>To access this route, user needs to have an active session.</p> <p>Important note: all encrypted data is stringified.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "2003",
            "description": "<p>Email sent successfully</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response",
          "content": "{\n    \"status\": 200,\n    \"statusCode\": 2003,\n    \"message\": \"Email sent successfully\",\n    \"payload\": {\n        \"data\": \"0456efd731...\",\n        \"secret\": \"669e03b4b7...\",\n        \"hash\": \"1c1a2ca539...\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Encrypted data",
          "content": "{ \n    \"messageId\": \"67c090c6-6d30-462a-bee1-57a6cd8b8066\",\n    \"timestamp\": \"1590523227\",\n    \"content\": \"a6cd8b8066...\",\n    \"to\": \"john.doe@post.ar\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1000",
            "description": "<p>Unauthorized access</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1001",
            "description": "<p>Invalid payload, field missing or invalid in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1006",
            "description": "<p>Failed to send email</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1010",
            "description": "<p>Unexpected error, please try again later</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/src/inbox-controller.ts",
    "groupTitle": "InboxController"
  },
  {
    "type": "get",
    "url": "/sent",
    "title": "Sent",
    "name": "sent",
    "group": "SentController",
    "description": "<p>Get all user's sent mail.</p> <p>To access this route, user needs to have an active session.</p> <p>Important note: all encrypted data is stringified.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "2005",
            "description": "<p>Found user's sent mail</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response",
          "content": "{\n    \"status\": 200,\n    \"statusCode\": 2005,\n    \"message\": \"Found user's sent mail\",\n    \"payload\": {\n        \"data\": \"a767bb0b49...\",\n        \"secret\": \"22ae09a39a...\",\n        \"hash\": \"1c1a2ca539...\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Encrypted data",
          "content": "[\n    {\n        \"messageId\": \"67c090c6-6d30-462a-bee1-57a6cd8b8066\",\n        \"to\": \"john.doe@post.ar\",\n        \"content\": \"31af09c39a...\",\n        \"isStarred\": true,\n        \"timestamp\": \"1590523227\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1000",
            "description": "<p>Unauthorized access</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1004",
            "description": "<p>User verification failed</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1009",
            "description": "<p>Failed to get list of contents of user's sent mail</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1010",
            "description": "<p>Unexpected error, please try again later</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/src/sent-controller.ts",
    "groupTitle": "SentController"
  },
  {
    "type": "post",
    "url": "/starred/remove",
    "title": "Remove starred message",
    "name": "starMessages",
    "group": "StarredController",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "messages",
            "description": "<p>List of message objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "messages",
          "content": "[\n    {\n        \"messageId\": \"567cf053-a302-4d61-b25a-e260d3736f40\",\n        \"type\": \"inbox\"\n    },\n    {\n        \"messageId\": \"67c090c6-6d30-462a-bee1-57a6cd8b8066\",\n        \"type\": \"sent\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "description": "<p>Remove starred message.</p> <p>To access this route, user needs to have an active session.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "2010",
            "description": "<p>Successfully removed starred message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1000",
            "description": "<p>Unauthorized access</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1001",
            "description": "<p>Invalid payload, field missing or invalid in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1013",
            "description": "<p>Invalid message type</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1015",
            "description": "<p>Failed to remove starred message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/src/starred-controler.ts",
    "groupTitle": "StarredController"
  },
  {
    "type": "post",
    "url": "/starred/save",
    "title": "Star message",
    "name": "starMessages",
    "group": "StarredController",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "messages",
            "description": "<p>List of message objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "messages",
          "content": "[\n    {\n        \"messageId\": \"567cf053-a302-4d61-b25a-e260d3736f40\",\n        \"type\": \"inbox\"\n    },\n    {\n        \"messageId\": \"67c090c6-6d30-462a-bee1-57a6cd8b8066\",\n        \"type\": \"sent\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "description": "<p>Star message.</p> <p>To access this route, user needs to have an active session.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "2009",
            "description": "<p>Successfully saved starred message</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1000",
            "description": "<p>Unauthorized access</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1001",
            "description": "<p>Invalid payload, field missing or invalid in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1013",
            "description": "<p>Invalid message type</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1014",
            "description": "<p>Failed to save starred message</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/src/starred-controler.ts",
    "groupTitle": "StarredController"
  },
  {
    "type": "get",
    "url": "/starred",
    "title": "Starred",
    "name": "starred",
    "group": "StarredController",
    "description": "<p>Get all user's starred mail.</p> <p>To access this route, user needs to have an active session.</p> <p>Important note: all encrypted data is stringified.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "2008",
            "description": "<p>Found starred messages</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response",
          "content": "{\n    \"status\": 200,\n    \"statusCode\": 2008,\n    \"message\": \"Found starred messages\",\n    \"payload\": {\n        \"data\": \"0456efd731...\",\n        \"secret\": \"669e03b4b7...\",\n        \"hash\": \"1c1a2ca539...\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Encrypted data",
          "content": "{ \n    \"inbox\": [\n        {\n            \"messageId\": \"67c090c6-6d30-462a-bee1-57a6cd8b8066\",\n            \"timestamp\": \"1590523227\",\n            \"content\": \"a6cd8b8066...\",\n            \"from\": \"jane.doe@post.ar\",\n            \"isStarred\": true,\n            \"isDeleted\": false,\n            \"isRead\": true,\n         }\n     ],\n     \"sent\": [\n         {\n             \"messageId\": \"67c090c6-6d30-462a-bee1-57a6cd8b8066\",\n             \"timestamp\": \"1590523227\",\n             \"content\": \"a6cd8b8066...\",\n             \"to\": \"john.doe@post.ar\",\n             \"isStarred\": true,\n             \"isDeleted\": false,\n         }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1000",
            "description": "<p>Unauthorized access</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1006",
            "description": "<p>Failed to send email</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1010",
            "description": "<p>Unexpected error, please try again later</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1012",
            "description": "<p>Failed to get starred messages</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/src/starred-controler.ts",
    "groupTitle": "StarredController"
  },
  {
    "type": "post",
    "url": "/trash/deleteForever",
    "title": "Delete message forever",
    "name": "deleteForever",
    "group": "TrashController",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "messages",
            "description": "<p>List of message objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "messages",
          "content": "[\n    {\n        \"messageId\": \"567cf053-a302-4d61-b25a-e260d3736f40\",\n        \"type\": \"inbox\"\n    },\n    {\n        \"messageId\": \"67c090c6-6d30-462a-bee1-57a6cd8b8066\",\n        \"type\": \"sent\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "description": "<p>Delete message forever.</p> <p>To access this route, user needs to have an active session.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "2019",
            "description": "<p>Successfully deleted message forever</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1000",
            "description": "<p>Unauthorized access</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1001",
            "description": "<p>Invalid payload,lid message ty field missing or invalid in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1013",
            "description": "<p>Invape</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1023",
            "description": "<p>Failed to delete messages forever</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/src/trash-controller.ts",
    "groupTitle": "TrashController"
  },
  {
    "type": "post",
    "url": "/trash/delete",
    "title": "Delete messages",
    "name": "deleteMessages",
    "group": "TrashController",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "messages",
            "description": "<p>List of message objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "messages",
          "content": "[\n    {\n        \"messageId\": \"567cf053-a302-4d61-b25a-e260d3736f40\",\n        \"type\": \"inbox\"\n    },\n    {\n        \"messageId\": \"67c090c6-6d30-462a-bee1-57a6cd8b8066\",\n        \"type\": \"sent\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "description": "<p>Delete messages.</p> <p>To access this route, user needs to have an active session.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "2014",
            "description": "<p>Successfully moved messages to trash</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1000",
            "description": "<p>Unauthorized access</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1001",
            "description": "<p>Invalid payload, field missing or invalid in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1013",
            "description": "<p>Invalid message type</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1019",
            "description": "<p>Failed to move message to trash</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/src/trash-controller.ts",
    "groupTitle": "TrashController"
  },
  {
    "type": "get",
    "url": "/trash",
    "title": "Trash",
    "name": "trash",
    "group": "TrashController",
    "description": "<p>Get all user's deleted emails.</p> <p>To access this route, user needs to have an active session.</p> <p>Important note: all encrypted data is stringified.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "2014",
            "description": "<p>Found starred messages</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response",
          "content": "{\n    \"status\": 200,\n    \"statusCode\": 2013,\n    \"message\": \"Found messages in trash\",\n    \"payload\": {\n        \"data\": \"0456efd731...\",\n        \"secret\": \"669e03b4b7...\",\n        \"hash\": \"1c1a2ca539...\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Encrypted data",
          "content": "{ \n    \"inbox\": [\n        {\n            \"messageId\": \"67c090c6-6d30-462a-bee1-57a6cd8b8066\",\n            \"timestamp\": \"1590523227\",\n            \"content\": \"a6cd8b8066...\",\n            \"from\": \"jane.doe@post.ar\",\n            \"isStarred\": true,\n            \"isDeleted\": true,\n            \"isRead\": true,\n         }\n     ],\n     \"sent\": [\n         {\n             \"messageId\": \"67c090c6-6d30-462a-bee1-57a6cd8b8066\",\n             \"timestamp\": \"1590523227\",\n             \"content\": \"a6cd8b8066...\",\n             \"to\": \"john.doe@post.ar\",\n             \"isStarred\": true,\n             \"isDeleted\": true,\n         }\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1000",
            "description": "<p>Unauthorized access</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1010",
            "description": "<p>Unexpected error, please try again later</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1018",
            "description": "<p>Failed to get messages from trash</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/src/trash-controller.ts",
    "groupTitle": "TrashController"
  },
  {
    "type": "post",
    "url": "/trash/undoDelete",
    "title": "Move messages from trash",
    "name": "undoDelete",
    "group": "TrashController",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "messages",
            "description": "<p>List of message objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "messages",
          "content": "[\n    {\n        \"messageId\": \"567cf053-a302-4d61-b25a-e260d3736f40\",\n        \"type\": \"inbox\"\n    },\n    {\n        \"messageId\": \"67c090c6-6d30-462a-bee1-57a6cd8b8066\",\n        \"type\": \"sent\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "description": "<p>Move messages from trash. Undo delete.</p> <p>To access this route, user needs to have an active session.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "2015",
            "description": "<p>Messages moved from trash successfully</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1000",
            "description": "<p>Unauthorized access</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1001",
            "description": "<p>Invalid payload, field missing or invalid in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1013",
            "description": "<p>Invalid message type</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1019",
            "description": "<p>Failed to move message to trash</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/src/trash-controller.ts",
    "groupTitle": "TrashController"
  },
  {
    "type": "post",
    "url": "/user/changeTheme",
    "title": "Change theme",
    "name": "changeTheme",
    "group": "UserController",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "theme",
            "description": "<p>Allowed values are &quot;dark&quot; and &quot;default&quot;.</p>"
          }
        ]
      }
    },
    "description": "<p>Change user theme.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "2017",
            "description": "<p>Successfully changed user theme</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response",
          "content": "{\n    \"status\": 200,\n    \"statusCode\": 2017,\n    \"message\": \"Successfully changed user theme\",\n    \"payload\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1000",
            "description": "<p>Unauthorized access</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1001",
            "description": "<p>Invalid payload, field missing or invalid in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1021",
            "description": "<p>Failed to change user theme</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/src/user-controller.ts",
    "groupTitle": "UserController"
  },
  {
    "type": "get",
    "url": "/user/checkSession",
    "title": "Check session",
    "name": "checkSession",
    "group": "UserController",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "keepMeLoggedIn",
            "description": "<p>Keep me logged in flag</p>"
          }
        ]
      }
    },
    "description": "<p>Check user session. If user session is found, encrypted user data is returned. Encrypted user data contains username, name, surname and theme.</p> <p>Important note: all encrypted data is stringified.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "2016",
            "description": "<p>Found user session</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response",
          "content": "{\n    \"status\": 200,\n    \"statusCode\": 2016,\n    \"message\": \"Found user session\",\n    \"payload\": {\n        \"data\": \"0456efd731...\",\n        \"secret\": \"669e03b4b7...\",\n        \"hash\": \"1c1a2ca539...\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Encrypted data",
          "content": "{ \n    \"username\": \"jane.doe@post.ar\",\n    \"name\": \"Jane\",\n    \"surname\": \"Doe\",\n    \"theme\": \"dark\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1010",
            "description": "<p>Unexpected error, please try again later</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1022",
            "description": "<p>User session not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/src/user-controller.ts",
    "groupTitle": "UserController"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login",
    "name": "login",
    "group": "UserController",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "keepMeLoggedIn",
            "description": "<p>Keep me logged in flag</p>"
          }
        ]
      }
    },
    "description": "<p>User login. After successful login, new user session is created. <code>SESSIONID</code> cookie is set to browser that contains <code>sessionId</code> for user session.</p> <p>Based on user <code>keepMeLoggedIn</code> flag, user session active time will be extend. If flag is equal to true, user session time will be extended for 2 hours each request, otherwise user session lasts only 2 hours.</p> <p>In response, encrypted data contains user information: username, name, surname and theme.</p> <p>Important note: all encrypted data is stringified.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "2001",
            "description": "<p>User logged in successfully</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response",
          "content": "{\n    \"status\": 200,\n    \"statusCode\": 2001,\n    \"message\": \"User logged in successfully\",\n    \"payload\": {\n        \"data\": \"a767bb0b49...\",\n        \"secret\": \"22ae09a39a...\",\n        \"hash\": \"1c1a2ca539...\"\n    }\n}",
          "type": "json"
        },
        {
          "title": "Encrypted data",
          "content": "{ \n    \"username\": \"jane.doe@post.ar\",\n    \"name\": \"Jane\",\n    \"surname\": \"Doe\",\n    \"theme\": \"dark\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1001",
            "description": "<p>Invalid payload, field missing or invalid in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1003",
            "description": "<p>User failed to login</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1010",
            "description": "<p>Unexpected error, please try again later</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/src/user-controller.ts",
    "groupTitle": "UserController"
  },
  {
    "type": "get",
    "url": "/logout",
    "title": "Logout",
    "name": "logout",
    "group": "UserController",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "keepMeLoggedIn",
            "description": "<p>Keep me logged in flag</p>"
          }
        ]
      }
    },
    "description": "<p>User logout.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "2018",
            "description": "<p>User logged out successfully</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response",
          "content": "{\n    \"status\": 200,\n    \"statusCode\": 2018,\n    \"message\": \"User logged out successfully\",\n    \"payload\": {}\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "documentation/src/user-controller.ts",
    "groupTitle": "UserController"
  },
  {
    "type": "post",
    "url": "/register",
    "title": "Register",
    "name": "register",
    "group": "UserController",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "surname",
            "description": "<p>User surname</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          }
        ]
      }
    },
    "description": "<p>Register user to postar mail. Username must be unique.</p> <p>After successful registration, users register with <code>username@post.ar</code> username.</p>",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "Number",
            "optional": false,
            "field": "2000",
            "description": "<p>User registered successfully</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response",
          "content": "{\n    \"status\": 200,\n    \"statusCode\": 2000,\n    \"message\": \"User registered successfully\",\n    \"payload\": {}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1001",
            "description": "<p>Invalid payload, field missing or invalid in request</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "1002",
            "description": "<p>User failed to register, username exists</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "documentation/src/user-controller.ts",
    "groupTitle": "UserController"
  }
] });
