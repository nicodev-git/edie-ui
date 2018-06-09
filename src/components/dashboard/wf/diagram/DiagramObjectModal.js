import React from 'react'
import SimpleModalContainer from 'containers/modal/SimpleModalContainer'
import {updateFlowItemForm} from 'shared/Global'

class DiagramObjectModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onClickClose() {
    this.props.closeModal()
  }

  onClickSave(values) {
    const {objectConfig, stateId, flow, objects} = this.props

    const entity = updateFlowItemForm(values)
    console.log(entity)

    if (this.props.onSaveDiagramObject(stateId, entity, objectConfig, flow, objects)) {
      this.props.closeModal()
    }
  }

  render() {
    const {initialValues, contents, noModal, header, embedded} = this.props
    return (
      <SimpleModalContainer
        header={header}
        content={contents}
        doAction={this.onClickSave.bind(this)}
        onClose={this.onClickClose.bind(this)}
        initialValues={initialValues}
        rowCls=" "
        noModal={noModal}
        embedded={embedded}
      />
    )
  }
}

export default DiagramObjectModal
