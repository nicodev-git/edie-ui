import React from 'react'
import {
    ButtonGroup,
    Button
} from 'react-bootstrap'
import { connect } from 'react-redux'

import { ResponsiveInfiniteTable } from '../../../../shared/InfiniteTable'
import { showAlert, showConfirm } from '../../../../shared/Alert'

import CredentialModal from './CredentialModal'

import SettingTabs from '../SettingTabs'
import TabPage from '../../../../shared/TabPage'
import TabPageBody from '../../../../shared/TabPageBody'
import TabPageHeader from '../../../../shared/TabPageHeader'

import { fetchCredentials, openCredentialsModal, removeCredentials } from '../../../../../actions'

class Credentials extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filter: ''
    }

    this.cells = [{
      'displayName': 'Name',
      'columnName': 'name'
    }, {
      'displayName': 'Description',
      'columnName': 'description'
    }, {
      'displayName': 'User Name',
      'columnName': 'username'
    }]

        // this.listeners = {
        //     [EVENTS.CREDENTIALS_ADD_CLICKED]: this.onAddCred.bind(this),
        //     [EVENTS.CREDENTIALS_EDIT_CLICKED]: this.onEditCred.bind(this),
        //     [EVENTS.CREDENTIALS_REMOVE_CLICKED]: this.onRemoveCred.bind(this),
        //
        //     [EVENTS.CREDENTIALS_KEYWORD_CHANGED]: this.onKeywordChanged.bind(this),
        // }
  }

  componentWillMount () {
    this.props.fetchCredentials()
  }

  renderContent () {
    return (
            <ResponsiveInfiniteTable
              cells={this.cells}
              ref="credentials"
              rowMetadata={{'key': 'id'}}
              selectable
              onRowDblClick={this.onEditCred.bind(this)}

              useExternal={false}
              data={this.props.credentials}
            />
    )
  }

  renderContent2 () {
    return (
            <InfiniteTable
              url="/devices/getCredentials"
              params={{filter: this.state.filter}}
              cells={this.cells}
              rowMetadata={{'key': 'id'}}
              selectable
              bodyHeight={this.props.containerHeight}
              ref="credentials"

              onRowDblClick={this.onEditCred.bind(this)}
            />
    )
  }

  renderCredentialsModal () {
    if (!this.props.credentialsModalVisible) return null
    return (
            <CredentialModal />
    )
  }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getTable () {
    return this.refs.credentials.refs.wrappedInstance
  }

  onKeywordChanged (filter) {
    this.setState({ filter })
  }

  onAddCred () {
    this.props.openCredentialsModal()
  }

  onEditCred () {
    let selected = this.getTable().getSelected()
    if (!selected) return showAlert('Please choose credentials.')

    this.props.openCredentialsModal(selected)
  }

  onRemoveCred () {
    let selected = this.getTable().getSelected()
    if (!selected) return showAlert('Please choose credentials.')

    showConfirm('Are you sure? Click OK to remove.', (btn) => {
      if (btn !== 'ok') return

      this.props.removeCredentials(selected)
    })
  }

  onSearchKeyUp (e) {
    clearTimeout(this.searchTimer)
    const value = e.target.value
    this.searchTimer = setTimeout(() => {
      emit(EVENTS.CREDENTIALS_KEYWORD_CHANGED, value) // eslint-disable-line no-undef
    }, 200)
  }

  render () {
    return (
      <TabPage>
        <TabPageHeader title="Settings">
          <div className="text-center margin-md-top">
            <div className="pull-right">
              <ButtonGroup>

                <Button onClick={this.onAddCred.bind(this)}>Add</Button>
                <Button onClick={this.onEditCred.bind(this)}>Edit</Button>
                <Button onClick={this.onRemoveCred.bind(this)}>Remove</Button>

              </ButtonGroup>
            </div>

            <div className="inline">
              <input type="text" placeholder="Search" className="form-control"
                     style={{width: '220px', paddingLeft: '35px'}}
                     onKeyUp={this.onSearchKeyUp.bind(this)}/>
              <a className="btn" href="javascript:;"
                 style={{position: 'absolute', left: 0, top: 0}}>
                <i className="fa fa-search" />
              </a>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={6}>
          {this.renderContent()}
          {this.renderCredentialsModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}

Credentials.defaultProps = {}

function mapStateToProps (state) {
  return {
    credentials: state.settings.credentials,
    credentialsModalVisible: state.settings.credentialsModalVisible
  }
}

const actions = {
  fetchCredentials,
  openCredentialsModal,
  removeCredentials
}

export default connect(mapStateToProps, actions)(Credentials)
