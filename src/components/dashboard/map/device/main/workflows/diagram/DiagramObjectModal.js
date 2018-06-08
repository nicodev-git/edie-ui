import React from 'react'
import SimpleModalContainer from 'containers/modal/simple_modal_container'
import {updateFlowItemForm} from 'shared/global'

class DiagramObjectModal extends React.Component {
    onClickClose () {
        this.props.closeModal()
    }

    onClickSave (values) {
        const {objectConfig, stateId, flow, objects} = this.props

        const entity = updateFlowItemForm(values)
        console.log(entity)

        if (this.props.onSaveDiagramObject(stateId, entity, objectConfig, flow, objects)) {
            this.props.closeModal()
        }
    }

    render () {
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
