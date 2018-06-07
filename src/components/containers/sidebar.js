
/**
 * Sidebar component to display Conversations list, other things :P
 */
import React from 'react';
import PropTypes from 'prop-types';

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            conversations: props.conversations || [],
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            conversations: nextProps.conversations
        })
        if (nextProps.conversations && nextProps.conversations !== undefined && Array.isArray(nextProps.conversations)) {

        }

    }


    componentWillMount() { }
    componentDidMount() { }


    onConversationChanged(id) {
        this.props.onConversationChanged(id);
    }



    render() {

        return (

            <div className="left">
                <div className="top">
                    <input type="text" placeholder="Search" />
                    <a href="javascript:;" className="search"></a>
                </div>
                <ul className="people" type="none" style={{ listStyleType: 'none' }}>
                    {this.state.conversations.map((conversation, index) =>
                        <li className="person" key={conversation._id} onClick={() => { this.onConversationChanged(conversation._id) }} data-chat={`person${index + 1}`}>
                            <img src="https://s13.postimg.org/ih41k9tqr/img1.jpg" alt="User" />
                            <span className="name">Friend {index + 1}</span>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

Sidebar.propTypes = {
    converstations: PropTypes.array,
    muteConversation: PropTypes.func,
    deleteConversation: PropTypes.func,
    openConversation: PropTypes.func, // handle "seen" flag for the last message, 
    isOpen: PropTypes.func, // is the conversation the current conversation in message window,  

}