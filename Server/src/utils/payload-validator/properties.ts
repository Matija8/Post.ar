export const Properties = {
    username: { type: String, required: true },
    password: { type: String, required: true },

    name:     { type: String, required: true },
    lastname: { type: String, required: true },

    recipient: { type: String, required: true },
    subject:   { type: String, required: false },
    content:   { type: String, required: true },
    
    messageId:  { type: String, required: true },
    messageIds: { type: Array, each: { type: String }, required: true },

    type: { type: String, required: true }
}
