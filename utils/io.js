
let UserModel = require('../models/UserModel');
let ConversationModel  = require('../models/ConversationModel');
let MessageModel = require('../models/MessageModel');

module.exports = function (client) {
    let user = client.handshake.query.id;
 
 
    UserModel.findOne({ _id: user }, 'conversations', function (err, user) {

        if (!err && user.conversations !== undefined) {
            user.conversations.forEach(conversation => {
                client.join(conversation[0], function (err) { });
            })
        }
        else {
            console.log('at joining rooms', err);
        }
    })

    client.on('SEND_MESSAGE', function (message) {

        //  client sends a message to a room, check the user to whom the message is sent and send the message to the user

        // TODO , save the message in the database
        ConversationModel.updateOne({ conversation_id: message.conversation_id }, {
            last_message: message.message
        });
        MessageModel.create(message, function (err) {
            console.log(err);

        })
        client.to(message.conversation_id).broadcast.emit('NEW_MESSAGE', { from: message.sender, message: message.message, timestamp: message.timestamp });
    });

    client.on('IS_TYPING', function (data) {

        // user is typing
        // client.to(data.conversationId).emit('TYPING', { user: data.username });
        client.to(data.conversationId).broadcast.emit('TYPING', { user: data.username, conversationId: data.conversationId });


    });

    client.on('STOP_TYPING', function (data) {
        console.log('stopped typing', Date.now());
        client.to(data.conversationId).broadcast.emit('STOP_TYPING', { user: data.username, conversationId: data.conversationId });
    });



    client.on('disconnect', function (user) {


        // set the status to offline from user's id;
        console.log('client disconnected', user);

    })
}