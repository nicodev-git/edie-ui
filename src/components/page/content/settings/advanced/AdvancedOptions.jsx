import React from 'react'
import {
    ButtonGroup,
    Button,
    DropdownButton,
    MenuItem
} from 'react-bootstrap'

import {
    emit,
    listen,
    unlisten
} from 'shared/event/Emitter.jsx'
import { EVENTS } from 'shared/event/Events.jsx'

class AdvancedOptions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageIndex: 0
        }
    }

    render() {
        const { pageIndex } = this.state

        return (
            <div className="tab-header">
                <div>
                    <span className="tab-title">Settings</span>
                </div>
                <div className="text-center margin-md-top">

                    <div style={{position:"absolute", right:"25px"}}>
                        <ButtonGroup>
                            
                            <DropdownButton title="Routing" id="dd-setting-routing" pullRight={true}
                                            className={pageIndex == 2 ? '' : 'hidden'}>
                                <MenuItem eventKey="1"  onClick={emit.bind(null, EVENTS.ROUTING_ADD_CLICKED)}>Add</MenuItem>
                                <MenuItem eventKey="2"  onClick={emit.bind(null, EVENTS.ROUTING_EDIT_CLICKED)}>Edit</MenuItem>
                            </DropdownButton>

                            <DropdownButton title={<i className="fa fa-gear"/>}
                                            id="dd-setting-adv-more" pullRight={true}>

                                <MenuItem eventKey="1" onClick={this.onClickTab.bind(this, 0)}>
                                    <span className={pageIndex == 0 ? "text-bold" : ""}>Main</span></MenuItem>
                                <MenuItem eventKey="2" onClick={this.onClickTab.bind(this, 1)}>
                                    <span className={pageIndex == 1 ? "text-bold" : ""}>Websocket</span></MenuItem>
                                <MenuItem eventKey="3" onClick={this.onClickTab.bind(this, 2)}>
                                    <span className={pageIndex == 2 ? "text-bold" : ""}>Routing</span></MenuItem>

                            </DropdownButton>

                        </ButtonGroup>
                    </div>
                </div>
            </div>
        )
    }

    onClickTab(pageIndex) {
        emit(EVENTS.ADVANCED_TAB_CLICKED, pageIndex)
        this.setState({ pageIndex })

    }


}

AdvancedOptions.defaultProps = {}

export default AdvancedOptions