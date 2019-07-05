import React from 'react'

const textStyle = {
    fontSize: '11px'
}

const greyTextStyle = {
    fontSize: '11px',
    fill: 'grey'
}

class BaseObject extends React.Component {

    getTextStyle () {
        if (this.props.greyImg) return greyTextStyle
        return textStyle
    }

    render () {
        return (
            <g />
        )
    }
}

export default BaseObject
