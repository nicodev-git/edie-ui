import React from 'react'
import {FloatingActionButton} from 'material-ui'

const style = {
    position: 'absolute',
    right: '100%',
    background: 'black',
    padding: 4,
    color: '#ececec',
    top: '50%',
    transform: 'translate(0, -50%)',
    borderRadius: 2,
    fontSize: 13
}

const containerStyle = {
    position: 'relative'
}

export default class FloatingChildButton extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            open: false
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

    renderLabel () {
        if (!this.state.open) return null
        const {item} = this.props
        return (
            <div style={style}><b>{item.label}</b></div>
        )
    }

    render () {
        const {item, visible} = this.props

        return (
            <div className={`margin-md-bottom floating-item ${visible ? 'visible' : ''}`}
                 style={containerStyle}
                 onMouseEnter={this.onMouseEnter}
                 onMouseLeave={this.onMouseLeave}>
                <FloatingActionButton secondary mini onClick={item.onClick}>
                    {item.icon}
                </FloatingActionButton>
                {this.renderLabel()}
            </div>
        )
    }
}
