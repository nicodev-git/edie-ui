import React from 'react'
import Users from './Users.jsx'
import Groups from '../groups/Groups.jsx'
import {
    emit,
    listen,
    unlisten
} from 'shared/event/Emitter.jsx'
import { EVENTS } from 'shared/event/Events.jsx'

class UserAndGroup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userPage: true
        }

        this.listeners = {
            [EVENTS.USERS_MORE_CLICKED]: this.onUsersClicked.bind(this),
            [EVENTS.GROUPS_MORE_CLICKED]: this.onGroupsClicked.bind(this),
        }
    }

    componentWillMount() {
        listen(this.listeners)
    }

    componentWillUnmount() {
        unlisten(this.listeners)
    }

    onUsersClicked() {
        console.log('Now Users!')
        this.setState({ userPage: true })
    }

    onGroupsClicked() {
        console.log('Now Groups!')
        this.setState({ userPage: false })
    }

    render() {

        if (this.state.userPage) return <Users />
        return <Groups/>
    }
}

UserAndGroup.defaultProps = {

}

export default UserAndGroup