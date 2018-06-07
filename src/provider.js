import React from 'react';
import PropTypes from 'prop-types';

class Provider extends React.Component {

    constructor(props) {
        super(props);
    }


    getChildContext() {
        return { socket: this.props.socket };
    }

    render() {
        return (this.props.children)
    }
}

Provider.childContextTypes ={
    socket: PropTypes.object
}



export default Provider;