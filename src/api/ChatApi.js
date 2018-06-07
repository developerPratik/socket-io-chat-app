import Axios from 'axios';
import authStore from '../stores/AuthStore';

export function getMessages(conversationId, skip, limit) {
    return Axios.get(`/api/messages/${conversationId}`, {
        params: {},
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('auth_user')
        }
    });

}

export function sendMessage(message) {

    return Axios.post('/api/chat/message', {}, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('auth_user')
        }
    });

}


// export function deleteMessage(messageId, userId) {
//     Axios.delete('/api/chat/message',);
// }


/**
 * 
 * @param {Array} users Array of user Ids
 * 
 */
export function createConversation(users) {

    return Axios.post(`/api/conversation`, { users }, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('auth_user')
        }
    });
}

export function updateConversation(conversationId, conversation) {

    return Axios.put('/api/conversation', {}, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('auth_user')
        }
    });
}

export function getConversations(userId) {

    return Axios.get(`/api/conversations/${userId}`, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('auth_user')
        }
    });
}
