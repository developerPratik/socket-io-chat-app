
let Schema = require('mongoose').Schema;


let MessageSchema = new Schema({
    _id: {type: String, required: true},
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now() },
    seen: { type: Array, default: [] },
    sender: { type: Schema.Types.ObjectId, required: true },
    conversation_id: { type: Schema.Types.ObjectId, required: true },
    hidden_by: { type: Array, default: [] }
});


let MessageModel = require('mongoose').model("Message", MessageSchema, "Messages");

module.exports = MessageModel;


