import React from 'react'

class TabPageHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="tab-header">
                <div>
                    <span className="tab-title">{this.props.title}</span>
                </div>
                <div className="margin-md-top" style={{width: '100%'}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

TabPageHeader.defaultProps = {
    title: ''
}

export default TabPageHeader