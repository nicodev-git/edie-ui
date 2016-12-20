import React from 'react'
import {
    ButtonGroup,
    Button,
    DropdownButton,
    MenuItem
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { assign } from 'lodash'

import {ResponsiveInfiniteTable} from 'components/shared/InfiniteTable.jsx'

import SettingTabs from '../SettingTabs'
import TabPage from 'components/shared/TabPage'
import TabPageBody from 'components/shared/TabPageBody'
import TabPageHeader from 'components/shared/TabPageHeader'

import { appendComponent, removeComponent } from 'util/Component.jsx'
import { showAlert, showConfirm } from 'components/shared/Alert.jsx'

import IdentityModal from './IdentityModal.jsx'
import SegmentListModal from './SegmentListModal.jsx'

import { fetchIdentities, openIdentityModal, removeIdentity } from 'actions/index'

class Identities extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.cells = [{
            "displayName": "Name",
            "columnName": "name",
        }, {
            "displayName": "Description",
            "columnName": "desc",
        }, {
            "displayName": "IP",
            "columnName": "ip",
        }, {
            "displayName": "Segment",
            "columnName": "segment",
        }, {
            "displayName": "Country",
            "columnName": "country",
        }]

        // this.listeners = {
        //     [EVENTS.IDENTITY_ADD_CLICKED]: this.onAddIdentity.bind(this),
        //     [EVENTS.IDENTITY_EDIT_CLICKED]: this.onEditIdentity.bind(this),
        //     [EVENTS.IDENTITY_REMOVE_CLICKED]: this.onRemoveIdentity.bind(this),
        //
        //     [EVENTS.IDENTITY_SEGMENTS_CLICKED]: this.onClickSegments.bind(this),
        // }
    }

    componentWillMount() {
        this.props.fetchIdentities()
    }

    render() {
        return (
            <TabPage>
                <TabPageHeader title="Settings">
                    <div className="text-center margin-md-top">
                        <div className="pull-right">
                            <ButtonGroup>

                                <Button onClick={this.onAddIdentity.bind(this)}>Add</Button>
                                <Button onClick={this.onEditIdentity.bind(this)}>Edit</Button>
                                <Button onClick={this.onRemoveIdentity.bind(this)}>Remove</Button>
                                <Button onClick={this.onClickSegments.bind(this)}>Segments</Button>

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
                </TabPageHeader>

                <TabPageBody tabs={SettingTabs} tab={5}>
                    {this.renderContent()}
                    {this.renderIdentityModal()}
                </TabPageBody>
            </TabPage>
        )
    }

    renderContent() {
        return (
            <ResponsiveInfiniteTable
                cells={this.cells}
                ref="identities"
                rowMetadata={{"key": "id"}}
                selectable={true}
                onRowDblClick={this.onEditIdentity.bind(this)}

                useExternal={false}
                data={this.props.identities.map(u => {return assign({ id: u.id }, u.identities)})}
            />
        )
    }

    renderContent2() {
        return (
            <JDataTable
                url="/admin/getIdentities"
                className="table-hover"
                columns={this.cells}
                height={this.props.containerHeight + 'px'}
                length={1000}
                ref="identities"

                onRowDblClick={this.onEditIdentity.bind(this)}
            />
        )
    }

    renderIdentityModal() {
        if (!this.props.identityModalVisible) return null
        return (
            <IdentityModal />
        )
    }

    /////////////////////////////////////////////////////////////////////

    getTable() {
        return this.refs.identities.refs.wrappedInstance;
    }

    onAddIdentity() {
        this.props.openIdentityModal()
    }

    onEditIdentity() {
        let selected = this.getTable().getSelectedIndex()
        if (!selected < 0) return showAlert("Please select identity.")

        this.props.openIdentityModal(this.props.identities[selected])
    }

    onRemoveIdentity() {
        let selected = this.getTable().getSelectedIndex()
        if (!selected < 0) return showAlert("Please select identity.")

        showConfirm('Click OK to remove.', (btn) => {
            if (btn != 'ok') return

            this.props.removeIdentity(this.props.identities[selected])
        })
    }

    /////////////////////////

    onCloseIdentityModal(modal, identity) {
        removeComponent(modal)
        if (!identity) return

        this.refs.identities.reload()
    }

    onClickSegments() {
        appendComponent(
            <SegmentListModal onClose={removeComponent}/>
        )
    }
}

Identities.defaultProps = {}

function mapStateToProps(state) {
    return {
        identities: state.settings.identities,
        identityModalVisible: state.settings.identityModalVisible
    }
}

const actions = {
    fetchIdentities,
    openIdentityModal,
    removeIdentity
}

export default connect(mapStateToProps, actions)(Identities)