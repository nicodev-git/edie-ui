import React, { Component } from 'react';
import { Link } from 'react-router';


export default class Device extends Component {


    renderLinks(){
        return <Link to="/" className="nnav-item">Dashboard</Link>
    }

    render(){
        return (
            <div>
                <h2>This is a  Device From </h2>
                <ul className="nav navbar-nav">
                    {this.renderLinks()}
                </ul>
                </div>
    );
    }
}