import Dispatcher from '../dispatcher';
import * as api from '../api/ChatApi';
import { actions } from '../constants';

export function SendMessage(conversationId, message, from, socket) {

    let newMessage = {
        _id: Date.now(),
        message,
        timestamp: Date.now(),
        conversation_id: conversationId,
        seen: [from],
        sender: from,
        hidden_by: []
    }
    Dispatcher.dispatch({
        type: actions.message.send_message,
        message: newMessage
    });

    socket.emit(actions.message.send_message, newMessage);
}

export function ResendMessage(converationId, message, socket) {

}

export function ReceiveNewMessage(message){

    Dispatcher.dispatch({
        type: actions.message.receive_new_message,
        message
    })

}

export function IsTyping(conversationId, username, socket) {

    // send a typing event to the server and then the server broadcasts the event to all the other clients in the given room

    socket.emit(actions.message.is_typing, { username, conversationId });
}

export function StopTyping(username, conversationId, socket) {
    socket.emit(actions.message.stop_typing, { username, conversationId });
}

export function getMessages(converationId) {


    Dispatcher.dispatch({
        type: actions.message.fetch_messages
    });
    api.getMessages(converationId) // change to conversationId
        .then(response => {
            console.log(response);

            Dispatcher.dispatch({
                type: actions.message.get_messages,
                messages: response.data.messages
            })
        })
        .catch(error => {
            console.log(error);
        })
}


