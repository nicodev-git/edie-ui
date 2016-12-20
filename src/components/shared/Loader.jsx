import React from 'react'

export default class Loader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="loader">
                <div className="overlay"></div>
                <div className="content">
                    <img src="/images/preloader.gif"/>
                    <div className="margin-md-top text-white">{this.props.message}</div>
                </div>
            </div>
        )
    }
}
Loader.defaultProps = {
    message: ''
}