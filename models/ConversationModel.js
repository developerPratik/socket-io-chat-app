let Schema = require('mongoose').Schema;



let ConversationSchema = new Schema({

    participants: { type: Schema.Types.Array, required: true },
    hidden: {type: Array, default: []},
    last_message: {type: String, required: true},
    last_message_timestamp: {type: Schema.Types.Date, required: true, default: Date.now() }
});

let ConversationModel = require('mongoose').model("Conversation", ConversationSchema, "Conversations");

module.exports = ConversationModel;

