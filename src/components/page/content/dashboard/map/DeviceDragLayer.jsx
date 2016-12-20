import React, { PropTypes } from 'react'
import { DragLayer } from 'react-dnd'
import {DragTypes} from 'shared/Global.jsx'

function collect(monitor) {
    return {
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        currentOffset: monitor.getClientOffset(),
        isDragging: monitor.isDragging()
    };
}

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%'
};

function getItemStyles(props) {
    const { currentOffset } = props;
    if (!currentOffset) {
        return {
            display: 'none'
        };
    }

    const { x, y } = currentOffset;
    return {
        position: 'absolute',
        left: (x - 24) + 'px',
        top: (y - 24) + 'px',
    };
}


class DeviceDragLayer extends React.Component {
    renderItem(type, item, style) {
        switch (type) {
            case DragTypes.DEVICE:
                return (
                    <img src={"/externalpictures?name=" + item.img} width="48" height="48" style={style}/>
                );
        }
    }

    render() {
        const { item, itemType, isDragging } = this.props;
        if (!isDragging) {
            return null;
        }

        return (
            <div style={layerStyles}>
                {this.renderItem(itemType, item, getItemStyles(this.props))}
            </div>
        )

        // return this.renderItem(itemType, item, getItemStyles(this.props))
    }
}

DeviceDragLayer.defaultProps = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    currentOffset: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }),
    isDragging: PropTypes.bool.isRequired
}

export default DragLayer(collect)(DeviceDragLayer)