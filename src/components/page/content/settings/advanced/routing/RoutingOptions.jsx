import React from 'react'
import {
    ButtonGroup,
    Button,
    DropdownButton,
    MenuItem
} from 'react-bootstrap'
import { findIndex } from 'lodash'

import {
    emit,
    listen,
    unlisten
} from 'shared/event/Emitter.jsx'
import { EVENTS } from 'shared/event/Events.jsx'

class RoutingOptions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="tab-header margin-md-bottom">
                <div className="text-center">
                    <div className="pull-left">
                        <span className="tab-title">Groups</span>
                    </div>

                    <div className="pull-right">
                        <ButtonGroup>

                            <Button onClick={emit.bind(null, EVENTS.ROUTING_ADD_CLICKED)}>Add</Button>
                            <Button onClick={emit.bind(null, EVENTS.ROUTING_EDIT_CLICKED)}>Edit</Button>

                        </ButtonGroup>
                    </div>
                </div>
            </div>
        )
    }
}

RoutingOptions.defaultProps = {}

export default RoutingOptions