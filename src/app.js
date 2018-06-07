import React from 'react';
import Axios from 'axios';
import { map } from 'lodash';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

// app actions
import * as MessageActions from './actions/MessageActions';
import * as ConversationActions from './actions/conversationActions';
import * as AuthActions from './actions/AuthActions';

// app stores
import messageStore from './stores/MessagesStore';
import conversationStore from './stores/ConversationStore';
import authStore from './stores/AuthStore';

// app action constants
import { actions } from './constants';

// components
import Login from './components/login';
import Sidebar from './components/containers/sidebar';
import Messages from './components/messages';

// socket.io library
import { connect } from 'socket.io-client';

// styles;
import './styles/chat.scss';
import ConversationStore from './stores/ConversationStore';

// utils
import { debounce } from 'lodash';





export default class App extends React.Component {

    constructor(props, context) {

        super(props, context);
        this.state = {
            count: 0,
            conversations: [],
            typing: false,
            loading: {
                conversations: true,
                messages: true
            },
            conversationName: null,
            conversationId: null, // the current conversation in the message window
            messages: [], // an array of messages in the current window
            loadingMessages: false,
            timer: 0
        };

        this.user = {};
        this.fetchConversationMessages = this.fetchConversationMessages.bind(this);
        this.stopTypingTimout = null;
    }

    componentWillMount() {



    }
    fetchConversationMessages(conversationId) {

        // called when the user clicks on a conversation from the sidebar with the conversationId, and then maybe we can call the database and show the messages 

      
        MessageActions.getMessages(conversationId);

    }
    componentDidMount() {


        // messageStore.on(auth.)


        if (!this.user || !localStorage.getItem('auth_user')) {
            this.props.history.push('/login');
            return;
        }

        this.user = JSON.parse(localStorage.getItem('user'));
        ConversationActions.getConversations(this.user.id);



        this.socket = connect(window.location.origin, { query: `id=${this.user.id}` }); // get the id from the auth store



        conversationStore.on('FETCH_CONVERSATIONS', function () {
            // show loader in conversations;

        });

        // get conversations
        let that = this;
        conversationStore.on(actions.conversation.retrieve_conversations, function () {

            console.log("hello world");
            let conversations = conversationStore.getConversations();
            that.setState({
                conversations: conversations,
                conversationId: conversations[0]._id
            });
            that.fetchConversationMessages(conversations[0]._id);
        });









        this.socket.on(actions.message.new_message, function (data) {



            /**
             * 
             * data -> (conversationId, message, timestamp)
             * Socket sends a new_message event to the flux client, with the conversation id, and the new message, when that happens;
             * call the conversation and messages action handlers which will in turn add the data to their respective stores
             */
    


            MessageActions.ReceiveNewMessage(data);

            this.setState({
                typing : false
            })





        }.bind(this));


        this.socket.on('TYPING', function (username) {
            this.setState({
                typing: true
            })

        }.bind(this))

        this.socket.on('STOP_TYPING', function (username) {

            console.log('stopped typing');
        })


        messageStore.on(actions.message.fetch_messages, () => {

            this.setState({
                loading: Object.assign({}, this.state.loading, { messages: true })
            })
        });

        messageStore.on(actions.message.get_messages, function () {
            let messages = messageStore.getMessages();

            this.setState({
                messages
            })
        }.bind(this));

        messageStore.on(actions.message.new_message, function () {

            this.setState({
                messages: messageStore.getMessages()
            });
        }.bind(this));




    }

    componentWillUnmount() {

    }

    handleMessage(typing, message) {
        if (!this.state.conversationId) {
            // this condition would only be called when the user has not selected any conversation id, else would always be called 
            return;
        }


        if (typing) {
            MessageActions.IsTyping(this.state.conversationId, this.user.username, this.socket);
        }

        else {
           
            MessageActions.SendMessage(this.state.conversationId, message, this.user.id, this.socket);
        }

    }

    stopType() {
       this.socket.emit('STOPPED_TYPING')
    }




    render() {


        /**sidebar should be displayed always, 
         * a messages component that takes a conversation id as a parameter and fetches the messages from the MessageStore 
         * 
         */

        return (

            <div className="wrapper">
                <div className="container">

                    <Sidebar conversations={this.state.conversations} conversation={this.state.conversationId} loading={this.state.loading.conversations} onConversationChanged={this.fetchConversationMessages.bind(this)} />

                    <Messages messages={this.state.messages} loading={false} conversationId={this.state.conversationId} onType={this.handleMessage.bind(this)} stopType={this.stopType.bind(this)} typing={this.state.typing} id={this.user.id} />
                </div>
            </div>

        );
    }
}


App.contextTypes = {
    socket: PropTypes.object
}

