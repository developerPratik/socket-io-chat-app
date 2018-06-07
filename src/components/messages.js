/**
 *  React component that displays the all the messages in the current conversation, based on the conversation id
 * 
 */

import React from 'react';
import PropTypes from 'prop-types';

let ENTER = 13;


// don't need the user images in this layout

export default class Messages extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            conversationId: props.conversationId,
            messages: props.messages,
            isTyping: false,
            id: props.id
        }
    }

    componentWillReceiveProps(nextProps) {


        if (nextProps.messages && nextProps.messages !== undefined) {
            this.setState({ messages: nextProps.messages});

        }

        if (nextProps.id && nextProps.id !== undefined) {
            this.setState({
                id: nextProps.id
            })
        }

    }

    messageWindowScroll() {

        /**
         * handle message window scroll -> load older messages from the server
         * on scroll to the top of the window
         * 
         */




    }


    type(event) {
        let text = this.refs.messageBox.value;
        if (event.keyCode === ENTER && text !== "") {
            this.props.onType(false, text);
            this.refs.messageBox.value = "";
            return;
        }

        this.props.onType(true);

    }




    render() {



        return (

            // load more messages on scroll: pending task
            <div className="right">
                <div className="top"><span>To: <span className="name"> </span></span></div>
                <div className="chat active-chat">

                    <div className="conversation-start" >
                      
                    </div>
                    {this.props.messages.map((message, index) =>
                        <div key={message._id} className={`bubble ${this.state.id === message.sender ? 'me' : 'you'}`}>
                            {message.message}
                        </div>)}
                    {this.props.typing ?
                        <div className='bubble you'>
                            <div className="typing">
                                <span className="circle"></span>
                                <span className="circle"></span>
                                <span className="circle"></span>
                            </div>
                        </div> : null}
                </div>


                <div className="write">
                    <a href="javascript:;" className="write-link attach"></a>
                    <input type="text" ref="messageBox" onKeyDown={this.type.bind(this)} onKeyUp={this.props.stopType.bind(this)} />
                    <a href="javascript:;" className="write-link smiley"></a>
                    <a href="javascript:;" className="write-link send"></a>
                </div>
            </div>
        )
    }



}


Messages.propTypes = {
    conversationId: PropTypes.string,
    messages: PropTypes.array.isRequired,
    loading: PropTypes.bool,

}