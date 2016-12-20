import React from 'react'
import {
    ButtonGroup,
    Button,
} from 'react-bootstrap'

import {
    emit,
    listen,
    unlisten
} from 'shared/event/Emitter.jsx'

import { EVENTS } from 'shared/event/Events.jsx'

class MapOptions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="tab-header">
                <div>
                    <span className="tab-title">Settings</span>
                </div>
                <div className="text-center margin-md-top">
                    <div style={{position:"absolute", right:"25px"}}>
                        <ButtonGroup>

                            <Button onClick={emit.bind(null, EVENTS.MAPS_ADD_CLICKED)}>Add Map</Button>
                            <Button onClick={emit.bind(null, EVENTS.MAPS_EDIT_CLICKED)}>Edit Map</Button>
                            <Button onClick={emit.bind(null, EVENTS.MAPS_DELETE_CLICKED)}>Delete Map</Button>
                            <Button onClick={emit.bind(null, EVENTS.MAPS_RESTORE_CLICKED)}>Restore Map</Button>
                            <Button onClick={emit.bind(null, EVENTS.MAPS_USERS_CLICKED)}>Edit Map Users</Button>

                        </ButtonGroup>
                    </div>
                </div>
            </div>
        )
    }
}

MapOptions.defaultProps = {}

export default MapOptions