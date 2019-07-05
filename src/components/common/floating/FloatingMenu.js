import React from 'react'
import {Button} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Add'

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
        if (!menuItems) return null
        return menuItems.map((item, i) =>
            <FloatingChildButton key={i} item={item} visible={this.state.open}/>
        )
    }
    render () {
        const {onClickMain} = this.props
        return (
            <div style={containerStyle}
                 onMouseEnter={this.onMouseEnter}
                 onMouseLeave={this.onMouseLeave}>
                {this.renderMenu()}
                <Button variant="fab" color="secondary" onClick={onClickMain}>
                    <EditIcon />
                </Button>
            </div>
        )
    }
}
