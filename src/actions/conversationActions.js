import Dispatcher from '../dispatcher';
import {actions} from '../constants';
import  * as api from '../api/ChatApi';

export function getConversations(userId){



    Dispatcher.dispatch({
        type: actions.conversation.fetch_conversations
    });

    


    api.getConversations(userId)
    .then(response => {
        Dispatcher.dispatch({
            type: actions.conversation.set_conversations,
            conversations: response.data.conversations
        });
        
    })
    .catch(error => {
        Dispatcher.dispatch({
            type: 'CONVERSATION_ERROR',
            error: error
        })
    })

}


