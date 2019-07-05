import React from 'react'
import BaseObject from './BaseObject'

class DImgRect extends BaseObject {
    renderGreyImg () {

    }
    render () {
        const { x, y, w, h, name, greyImg, config, listeners, data } = this.props
        const { img } = config

        return (
            <g style={{visibility: 'visible', cursor: 'move'}}>
                <image x={x} y={y} width={w} height={h} href={img}/>
                <rect x={x} y={y} width={w} height={h} fill={greyImg ? '#808080' : 'none'} style={{opacity: greyImg ? 0.5 : 1}} stroke="none" pointerEvents="all" {...listeners}/>
                <text x={x + w / 2} y={y + h + 10} textAnchor="middle" dominantBaseline="central" pointerEvents="none" style={this.getTextStyle()}>{name}</text>
                <text x={x + w / 2} y={y - 10} textAnchor="middle" dominantBaseline="central" pointerEvents="none" style={this.getTextStyle()}>{data.step}</text>
            </g>
        )
    }
}

export default DImgRect
