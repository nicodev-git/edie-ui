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

class IdentityOptions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="tab-header">
                <div className="text-center">
                    <div className="pull-left">
                        <span className="tab-title">Identities</span>
                    </div>

                    <div className="pull-right">
                        <ButtonGroup>

                            <Button onClick={emit.bind(null, EVENTS.IDENTITY_ADD_CLICKED)}>Add</Button>
                            <Button onClick={emit.bind(null, EVENTS.IDENTITY_EDIT_CLICKED)}>Edit</Button>
                            <Button onClick={emit.bind(null, EVENTS.IDENTITY_REMOVE_CLICKED)}>Remove</Button>
                            <Button onClick={emit.bind(null, EVENTS.IDENTITY_SEGMENTS_CLICKED)}>Segments</Button>

                        </ButtonGroup>
                    </div>

                    <div className="inline">
                        <input type="text" placeholder="Search" className="form-control"
                               style={{width: "220px", paddingLeft: "35px"}}/>
                        <a className="btn" href="javascript:;" style={{position: "absolute", left: 0, top: 0}}>
                            <i className="fa fa-search"></i>
                        </a>
                    </div>
                </div>
                <div className="text-center margin-md-top"></div>
            </div>
        )
    }
}

IdentityOptions.defaultProps = {}

export default IdentityOptions