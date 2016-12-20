import React from 'react'

class TabPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="flex-vertical flex-1 tabpage">
                {this.props.children}
            </div>
        )
    }
}

TabPage.defaultProps = {}

export default TabPage