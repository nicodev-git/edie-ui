import React from 'react'

class Preloader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    render() {
        return (
            <div className="preloader">
                <div className="overlay"></div>
                <div className="content">

                    {
                        this.state.loading ?
                            <div className="row">
                                <img alt="" src="/images/Preloader_3.gif"/>
                            </div>
                            :
                            <div className="row">
                                <img alt="" src="/images/PR_3_00000.png"/>
                            </div>
                    }

                    {
                        this.state.loading ?
                            <div className="row text-center">
                                <span>{this.props.message}</span>
                            </div>
                            :
                            <div className="row text-center">
                                <a href="javscript:;" className="btn btn-primary" onClick={ this.onClickClose.bind(this) }>Done</a>
                            </div>
                    }
                </div>
            </div>
        )
    }

    onClickClose() {
        this.props.onClose &&
        this.props.onClose(this)
    }
}

Preloader.defaultProps = {
    onClose: null,
    message: 'Loading...',
}

export default Preloader