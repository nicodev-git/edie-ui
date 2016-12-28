import React from 'react'
import {
    ButtonGroup,
    Button
} from 'react-bootstrap'
import { connect } from 'react-redux'

import {ResponsiveInfiniteTable} from '../../../../shared/InfiniteTable'
import { appendComponent, removeComponent } from '../../../../../util/Component'
import { showAlert } from '../../../../shared/Alert'

import SettingTabs from '../SettingTabs'
import TabPage from '../../../../shared/TabPage'
import TabPageBody from '../../../../shared/TabPageBody'
import TabPageHeader from '../../../../shared/TabPageHeader'

import MoveModal from './MoveModal'
import BackupModal from './BackupModal'
import RestoreModal from './RestoreModal'
import WorkflowModal from './WorkflowModal'
import { fetchWorkflows, openWorkflowModal, removeWorkflow } from '../../../../../actions'
import { ROOT_URL } from '../../../../../actions/config'

class Rules extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tabIndex: 1,
      category: 1,

      logicalRuleId: 0,
      deviceType: 0,

      keyword: '',

      categories: [],
      deviceTypes: []
    }

    this.cellLogicals = [{
      'displayName': 'Name',
      'columnName': 'name'
    }, {
      'displayName': 'Description',
      'columnName': 'desc'
    }, {
      'displayName': 'Present',
      'columnName': 'present'
    }]

    this.cellPhysicals = [{
      'displayName': 'Name',
      'columnName': 'name'
    }, {
      'displayName': 'Type',
      'columnName': 'devicetype'
    }, {
      'displayName': 'Severity',
      'columnName': 'severity'
    }, {
      'displayName': 'Filter1',
      'columnName': 'prefilter1'
    }, {
      'displayName': 'Filter2',
      'columnName': 'prefilter2'
    }, {
      'displayName': 'Rewriteval  ',
      'columnName': 'rewriteval'
    }, {
      'displayName': 'Parser',
      'columnName': 'parser'
    }]
        //
        // this.listeners = {
        //     [EVENTS.RULE_CATEGORY_CHANGED]: this.onChangeCategory.bind(this),
        //     [EVENTS.RULE_OPEN_LOGICAL_CLICKED]: this.onClickOpenLogical.bind(this),
        //     [EVENTS.RULE_SHOW_LOGICAL]: this.onShowLogical.bind(this),
        //     [EVENTS.RULE_MOVE_LOGICAL_CLICKED]: this.onMoveRule.bind(this),
        //
        //     [EVENTS.RULE_DEVICE_TYPE_CHANGED]: this.onDeviceTypeChange.bind(this),
        //     [EVENTS.RULE_KEYWORD_CHANGED]: this.onKeywordChange.bind(this),
        //
        //     [EVENTS.RULE_BACKUP_CLICKED]: this.onBackup.bind(this),
        //     [EVENTS.RULE_RESTORE_CLICKED]: this.onRestore.bind(this),
        //
        //
        // }
  }
  componentWillMount () {
    this.props.fetchWorkflows()
  }

  renderContent () {
    return (
            <ResponsiveInfiniteTable
              cells={this.cellLogicals}
              ref="logicalRules"
              rowMetadata={{'key': 'id'}}
              selectable
              onRowDblClick={this.onEditWorkflow.bind(this)}

              useExternal={false}
              data={this.props.workflows}
            />
    )
  }

  // renderContent2 () {
  //   const {tabIndex} = this.state
  //   let table
  //   if (tabIndex === 1) {
  //     table = (
  //       <InfiniteTable
  //         url="/rules/getLogicalName"
  //         params={{
  //           search: this.state.keyword,
  //           category: this.state.category
  //         }}
  //         cells={this.cellLogicals}
  //         rowMetadata={{'key': 'id'}}
  //         selectable
  //         bodyHeight={this.props.containerHeight}
  //         ref="logicalRules"
  //
  //         onRowDblClick={this.onClickOpenLogical.bind(this)}
  //       />
  //     )
  //   } else if (tabIndex === 2) {
  //     table = (
  //         <InfiniteTable
  //           url="/rules/getByLogicalRuleId"
  //           params={{
  //             search: this.state.keyword,
  //             logicalRuleId: this.state.logicalRuleId,
  //             devicetype: this.state.deviceType
  //           }}
  //           cells={this.cellPhysicals}
  //           rowMetadata={{'key': 'id'}}
  //           selectable
  //           bodyHeight={this.props.containerHeight}
  //           ref="physicalRules"
  //         />
  //     )
  //   }
  //
  //   return (
  //           <div>
  //               {table}
  //           </div>
  //   )
  // }

  renderWorkflowModal () {
    if (!this.props.workflowModalVisible) return null
    return (
            <WorkflowModal/>
    )
  }

  getTable () {
    return this.refs.logicalRules.refs.wrappedInstance
  }

    // /////////////////////////////////////

  onChangeDeviceType () {

  }

  onChangeCategory (category) {
    this.setState({ category })
  }

  onClickOpenLogical () {
    const selected = this.refs.logicalRules.getSelected()
    if (!selected) return showAlert('Please select row.')

    this.setState({
      logicalRuleId: selected.id,
      tabIndex: 2
    })
    emit(EVENTS.RULE_LOGICAL_OPENED) // eslint-disable-line no-undef
  }

  onShowLogical () {
    this.setState({ tabIndex: 1 })
  }

  onDeviceTypeChange (deviceType) {
    this.setState({ deviceType })
  }

  onKeywordChange (keyword) {
    this.setState({ keyword })
  }

  onLogicalOpened () {
    this.setState({ tabIndex: 2 })
  }

  onClickBack () {
    emit(EVENTS.RULE_SHOW_LOGICAL) // eslint-disable-line no-undef
    this.setState({ tabIndex: 1 })
  }

  onSearchKeyUp () {
    clearTimeout(this.searchTimer)
    const keyword = this.refs.search.value
    this.searchTimer = setTimeout(() => {
      emit(EVENTS.RULE_KEYWORD_CHANGED, keyword) // eslint-disable-line no-undef
    }, 200)
  }

  onClickEditCategory () {

  }

  onAddWorkflow () {
    this.props.openWorkflowModal()
  }

  onEditWorkflow () {
    const selected = this.getTable().getSelected()
    if (!selected) return showAlert('Please select map.')

    this.props.openWorkflowModal(selected)
  }

  onRemoveWorkflow () {
    const selected = this.getTable().getSelected()
    if (!selected) return showAlert('Please select map.')

    this.props.removeWorkflow(selected)
  }

    // ////////////////////////////////////////

  onMoveRule () {
    const selected = this.refs.logicalRules.getSelected()
    if (!selected) return showAlert('Please select row.')

    appendComponent(
            <MoveModal onClose={this.onCloseMoveModal.bind(this)}/>
        )
  }

  onCloseMoveModal (modal, category) {
    removeComponent(modal)
    if (!category) return

    const selected = this.refs.logicalRules.getSelected()

    $.get(`${ROOT_URL}${Api.rule.changeCategory}`, { // eslint-disable-line no-undef
      id: selected.id,
      newCategory: category
    }).done(data => {
      if (!data.success) return showAlert('Failed!')

      this.refs.logicalRules &&
            this.refs.logicalRules.refresh()
    }).fail(() => {
      showAlert('Failed!')
    })
  }

    // ////////////////////////////////////////

  onBackup () {
    appendComponent(
            <BackupModal onClose={removeComponent}/>
        )
  }

  onRestore () {
    appendComponent(
            <RestoreModal onClose={(modal, success) => {
              removeComponent(modal)
              success &&
                this.refs.logicalRules &&
                this.refs.logicalRules.refresh()
            }}/>
        )
  }

  render () {
    // const {tabIndex} = this.state // Never used
    return (
      <TabPage>
        <TabPageHeader title="Settings">
          <div className="text-center margin-md-top">
            <div className="pull-right">
              <ButtonGroup>

                <Button onClick={this.onAddWorkflow.bind(this)}>Add</Button>
                <Button onClick={this.onEditWorkflow.bind(this)}>Edit</Button>
                <Button onClick={this.onRemoveWorkflow.bind(this)}>Remove</Button>
              </ButtonGroup>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={SettingTabs} tab={2}>
          {this.renderContent()}
          {this.renderWorkflowModal()}
        </TabPageBody>
      </TabPage>
    )
  }
}

Rules.defaultProps = {}

function mapStateToProps (state) {
  return {
    workflows: state.settings.workflows,
    workflowModalVisible: state.settings.workflowModalVisible
  }
}

const actions = {
  fetchWorkflows, openWorkflowModal, removeWorkflow
}

export default connect(mapStateToProps, actions)(Rules)
