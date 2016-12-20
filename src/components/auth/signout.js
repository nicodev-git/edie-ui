import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signOut } from '../../actions/index';


class Signout extends Component {

    componentWillMount(){
        this.props.signOut();
    }

    render() {
        return (
            <div>
                See you nex time...
            </div>
        );
    }
}

export default Signout = connect(null, { signOut })(Signout);