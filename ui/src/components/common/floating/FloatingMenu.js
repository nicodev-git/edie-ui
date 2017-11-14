import React from 'react'
import {FloatingActionButton} from 'material-ui'
import EditIcon from 'material-ui/svg-icons/content/add'

import FloatingChildButton from './FloatingChildButton'

const containerStyle = {
    position: 'absolute', right: 26, bottom: 20,
    textAlign: 'center'
}
export default class FloatingMenu extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            open: false,
            labelVisible: []
        }

        this.onMouseEnter = this.onMouseEnter.bind(this)
        this.onMouseLeave = this.onMouseLeave.bind(this)
    }

    onMouseEnter () {
        this.setState({
            open: true
        })
    }

    onMouseLeave () {
        this.setState({
            open: false
        })
    }

    renderMenu () {
        const {menuItems} = this.props

        return menuItems.map((item, i) =>
            <FloatingChildButton key={i} item={item} visible={this.state.open}/>
        )
    }
    render () {
        return (
            <div style={containerStyle}
                 onMouseEnter={this.onMouseEnter}
                 onMouseLeave={this.onMouseLeave}>
                {this.renderMenu()}
                <FloatingActionButton
                    secondary>
                    <EditIcon />
                </FloatingActionButton>
            </div>
        )
    }
}
