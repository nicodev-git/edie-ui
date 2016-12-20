import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class Device extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentWillMount() {
        if (!this.props.selectedDevice) {
            this.props.router.replace('/')
            return
        }

        if (!this.props.children) {
            this.props.router.replace('/device/main/incidents')
        }
    }

    render() {
        if (!this.props.selectedDevice) return null
        return this.props.children
    }
}

Device.defaultProps = {

}

function mapStateToProps(state) {
    const {selectedDevice} = state.dashboard
    return {selectedDevice}
}

export default withRouter(connect(mapStateToProps)(Device))