
export const actions = {

    todo: {

        create: 'CREATE_TODO',
        delete: 'DELETE_TODO',
        toggle: 'TOGGLE',
        all_completed: 'ALL_COMPLETED',
        fetch_todos: 'FETCH_TODOS',
        retrieve_todos: 'RETRIVE_TODOS',
        todo_changed: 'TODO_CHANGED'
    },

    auth: {
        logged_in: 'LOGGED_IN', 
        logout: 'LOGOUT', // send a logout action, remove jwt tokens and set logged in state to false
        block_user: 'BLOCK_USER',
        unblock_user: 'UNBLOCK_USER',
        mute_user: 'MUTE_USER'
        
    },
    conversation: {

        add_last_message: 'ADD_LAST_MESSAGE',
        add_members: 'ADD_MEMBERS',
        delete_conversation: 'DELETE_CONVERSATION',
        remove_members: 'REMOVE_MEMBERS',
        fetch_conversations: 'FETCH_CONVERSATIONS',
        retrieve_conversations: 'RETRIEVE_CONVERSATIONS',
        set_conversations: 'SET_CONVERSATIONS'


    },

    message: {

        send_message: 'SEND_MESSAGE', // send a message to a conversation id 
        resend_message: 'RESEND_MESSAGE', // resend a failed message by clicking on the message
        fetch_messages: 'FETCH_MESSAGES', // fetch more messages on page scroll; uses mongo db pagination
        delete_message: 'DELETE_MESSAGE', // delete or "hides" the message from the user
        error_message: 'ERROR_MESSAGE', // when the message is not delivered to the user
        new_message: 'NEW_MESSAGE', // event when a new message is recieved from the server
        is_typing: 'IS_TYPING', // sends a typing event to the server using socket io
        stop_typing: 'STOP_TYPING',
        get_messages: 'GET_MESSAGES', // get new messages -> set as the messages array
        more_messages: 'MORE_MESSAGES',// called on scroll, unshift to the messages 
        receive_new_message: 'RECEIVE_NEW_MESSAGE'
    }


};

