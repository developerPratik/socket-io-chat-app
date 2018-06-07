import { EventEmitter } from "events";
import { actions } from '../constants';
import Dispatcher from '../dispatcher';

/**
 * A flux store that holds the conversations to be displayed in the sidebar with the last message
 * */


class ConversationStore extends EventEmitter {

    constructor() {
        super();
        this.conversations = [];
    }



    getConversations() {

        return this.conversations;
    }


    updateConversations(conversationObject) {

        this.conversations.unshift(conversationObject);
        this.emit('CONVERSATIONS_CHANGED');
    }


    handleActions(action) {

        switch (action.type) {


            case actions.conversation.fetch_conversations:
                this.emit('FETCH_CONVERSATIONS');
                break;

            case actions.conversation.set_conversations:
                this.conversations = action.conversations;

                this.emit(actions.conversation.retrieve_conversations);


        }



    }





}

let conversationStore = new ConversationStore();


Dispatcher.register(conversationStore.handleActions.bind(conversationStore));

export default conversationStore;
