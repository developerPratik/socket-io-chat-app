import { EventEmitter } from 'events';
import Dispatcher from '../dispatcher';
import { actions } from '../constants';


/**
 *A store that holds the messages in the current chat conversation id
 * 
 **/


class MessageStore extends EventEmitter {


    constructor() {
        super();
        this.messages = []; // gets updated every time with conversation messages
    }


    getMessages() {
        return this.messages;
    }



    handleActions(action) {

        switch (action.type) {

            case actions.message.new_message:
                this.messages.unshift(message);
                this.emit(actions.message.get_messages);
                break;

            case actions.message.fetch_messages:
                this.emit(actions.message.fetch_messages);
                break;

            case actions.message.receive_new_message:
                this.messages.push(action.message);
                this.emit(actions.message.get_messages);
                break;
                
            case actions.message.get_messages:
                this.messages = action.messages;

                this.emit(actions.message.get_messages);
                break;
            case actions.message.more_messages:
                this.messages.unshift(action.messages);
                this.emit(actions.message.more_messages);
                break;
            case actions.message.send_message:
                console.log(action);
      
                this.messages.push(action.message);
                this.emit(actions.message.new_message);
            default:

        }
    }


}

let messageStore = new MessageStore();
Dispatcher.register(messageStore.handleActions.bind(messageStore));

export default messageStore;