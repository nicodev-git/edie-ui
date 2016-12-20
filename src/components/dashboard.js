import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessage } from '../actions/index';


class Dashboard extends Component {

    componentWillMount() {
        this.props.fetchMessage();
    }

    rendereMessage() {
        if (this.props.message) {
            return (
                <div>
                   <h3>This is the secured Dashboard!</h3>
                    <strong>{this.props.message}</strong>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                This is a feature
                {this.rendereMessage()}
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {message: state.auth.message};
}

export default connect(mapStateToProps, {fetchMessage})(Dashboard);


