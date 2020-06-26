export const Properties = {
    username: { type: String, required: true },
    password: { type: String, required: true },

    name:     { type: String, required: true },
    lastname: { type: String, required: true },

    from:    { type: String, required: true },
    to:      { type: String, required: true },
    content: { type: String, required: true },
    
    messageId:  { type: String, required: true },
    messageIds: { type: Array, each: { type: String }, required: true },

    type: { type: String, required: true },
    
    theme: { type: String, required: true },

    keepMeLoggedIn: { type: Boolean, required: true },

    messages: {
        type: Array, 
        required: true,
        each: {
            messageId: { type: String, required: true },
            type: { type: String, required: true },
        }
    }

}
