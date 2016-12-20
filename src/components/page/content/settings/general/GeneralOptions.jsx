import React from 'react'
import {
    ButtonGroup,
    Button,
} from 'react-bootstrap'

class OptionPanel extends React.Component {
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

                            <Button>System Backup</Button>

                            <Button>System Restore</Button>

                        </ButtonGroup>
                    </div>
                </div>
            </div>
        )
    }
}

OptionPanel.defaultProps = {
}

export default OptionPanel