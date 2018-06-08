import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'
import uuid from 'uuid'
import {assign, merge, findIndex, keys} from 'lodash'

import WorkflowEditModalView from './WorkflowEditModalView'
// import UserPickModal from './UserPickModal'
import DiagramObjectModal from 'components/dashboard/map/device/main/workflows/diagram/DiagramObjectModal'
import {drawFlows} from "components/dashboard/map/device/main/workflows/DiagramLoader"
import {extendShape} from 'components/dashboard/map/device/main/workflows/diagram/DiagramItems'
import { DiagramTypes } from 'shared/Global'

const typeOptions = [{
    label: 'Normal', value: 'normal'
}, {
    label: 'System', value: 'system'
}]

const timeOptions = [{
    label: 'Minute', value: 'minute'
}, {
    label: 'Hour', value: 'hour'
}, {
    label: 'Day', value: 'day'
}]

const conditionOptions = [{
    label: 'IP', value: 'ip'
}, {
    label: 'User', value: 'user'
}]

const SCHEDULED = 'scheduled'
class WorkflowEditModal extends React.Component {
    constructor(props) {
        super(props)

        const wfData = drawFlows((props.editWf || {}).flowItems || [], this.props.shapes.map(p => extendShape(p)))

        this.state = {
            permitterUsers: props.editWf ? (props.editWf.permitterUsers || []) : [],
            tab: 'general',
            shapeAnchorEl: null,
            shape: null,
            shapeModalOpen: false,
            wfData,

            tags: props.editWf ? (props.editWf.tags || []) : [],
            tagInputValue: '',

            rulePanelExpanded: false
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.allValues && prevProps.allValues.type !== 'system' && this.props.allValues.type === 'system') {
            this.props.change('calledDirect', true)
        }
    }

    getWfDataItems () {
        const wfDataItems = this.state.wfData.objects.map(p => {
            const {type} = p.config
            const {sentence, name, field, fieldType, variable} = p.data

            let itemLabel = ''
            let itemValue = ''

            switch(type) {
                case 'DECISION':
                case 'EXCLUDE': {
                    itemLabel = 'Match Text'
                    var varname = (fieldType === 'field' ? field :
                        fieldType === 'variable' ? variable : 'message') || ''
                    const words = varname.split('.')
                    const lastword = words[words.length - 1]
                    itemValue = `$\{${lastword}}=${sentence}`
                    break
                }
                case 'COUNT':
                    itemLabel = type
                    itemValue = `${variable} > ${sentence}`
                    break
                default:
                    itemLabel = type
                    itemValue = sentence || name
            }

            return {
                label: itemLabel,
                value: itemValue
            }
        })
        return wfDataItems
    }

    onSubmit (values) {
        if (!values) return
        const {onSave, userInfo} = this.props
        const {permitterUsers, wfData, tags} = this.state

        const entity = {
            ...values,
            permitterUsers,
            flowItems: wfData.objects.map(p => p.data),
            tags
        }
        if (!entity.ownerUser) entity.ownerUser = userInfo.username

        const tagIndex = entity.tags.indexOf(SCHEDULED)
        if (entity.scheduled) {
            if (tagIndex < 0) entity.tags.push(SCHEDULED)
        } else {
            if (tagIndex >= 0) entity.tags.splice(tagIndex, 1)
        }

        onSave && onSave(entity)
        this.onClickClose()
    }
    onClickClose () {
        this.props.showWfNameModal(false)
    }
    onClickAddUser () {
        this.props.showUserPickModal(true)
    }
    onClickRemoveUser (user) {
        const {permitterUsers} = this.state
        this.setState({
            permitterUsers: permitterUsers.filter(p => p !== user)
        })
    }

    onCloseAddUser (user) {
        this.props.showUserPickModal(false)
        const {permitterUsers} = this.state
        if (user) {
            this.setState({
                permitterUsers: [...permitterUsers, user]
            })
        }
    }

    ////////////////////////////////////////////////////

    onChangeTab (e, value) {
        this.setState({
            tab: value
        })
    }

    ////////////////////////////////////////////////////


    onClickAddShape (e) {
        this.setState({
            shapeAnchorEl: e.target
        })
    }

    onCloseShapeMenu () {
        this.setState({
            shapeAnchorEl: null
        })
    }

    onClickShape (shape) {
        this.onCloseShapeMenu()

        this.setState({
            shapeModalOpen: false
        }, () => {
            this.setState({
                shapeModalOpen: true,
                rulePanelExpanded: true,
                editShape: null,
                shape
            })
        })
    }


    onCloseShapeModal () {
        this.setState({
            shapeModalOpen: false
        })
    }

    onSaveShape (stateId, values, objectConfig) {
        const {wfData} = this.state
        const {objects} = wfData
        const object = {...objectConfig}

        object.data = merge({}, values, {
            uiprops: {
                type: (objectConfig.config || {}).type,
                x: objectConfig.x,
                y: objectConfig.y,
                w: objectConfig.w,
                h: objectConfig.h,
                fill: objectConfig.fill,
                lines: []
            }
        })
        object.name = values.name || object.name

        if (object.data.uuid) {
            // this.props.updateFlowItem('', flow, object)
            this.setState({
                wfData: {
                    ...wfData,
                    objects: objects.map(p => p.data.uuid === object.data.uuid ? object : p)
                }
            })
        } else {
            object.data = assign(object.data, {
                uuid: uuid.v4(),
                step: Math.max.apply(null, [0, ...objects.map(u => u.data ? u.data.step : 0)]) + 1
            })
            let x = 100
            let y = 100

            if (objects.length) {
                const lastObj = objects[objects.length - 1]
                x = lastObj.data.uiprops.x + lastObj.data.uiprops.w + 50
                y = lastObj.data.uiprops.y
                lastObj.data.uiprops.lines.push({
                    targetUuid: object.data.uuid,
                    startPoint: 0,
                    endPoint: 0
                })
            }

            object.data.uiprops.x = x
            object.data.uiprops.y = y
            // this.props.addFlowItem('', flow, object)

            this.setState({
                wfData: {
                    ...wfData,
                    objects: [...objects, object]
                }
            })


        }

        console.log(object)

        return true
    }

    onClickDeleteShape (index) {
        const {wfData} = this.state
        const {objects} = wfData

        const current = objects[index]

        if (index < objects.length - 1) {
            const next = objects[index + 1]

            objects.forEach((object, i) => {
                if (i === index) return
                object.data.uiprops.lines.forEach(line => {
                    if (line.targetUuid === current.data.uuid) {
                        line.targetUuid = next.data.uuid
                    }
                })
            })
        } else {
            objects.forEach((object, i) => {
                if (i === index) return
                const {uiprops} = object.data
                uiprops.lines = uiprops.lines.filter(line => line.targetUuid !== current.data.uuid)
            })
        }

        objects.splice(index, 1)
        this.setState({
            wfData: {
                ...wfData,
                objects
            }
        })
        return false
    }

    onClickEditShape (index) {
        const {wfData} = this.state
        const {objects} = wfData
        const current = objects[index]

        const shapeIndex = findIndex(this.props.shapes, {
            type: current.config.type
        })

        if (shapeIndex < 0) return alert('Shape not found')

        this.setState({
            shapeModalOpen: false
        }, () => {
            this.setState({
                shapeModalOpen: true,
                rulePanelExpanded: true,
                editShape: current,
                shape: this.props.shapes[shapeIndex]
            })
        })
        this.props.resetForm('simpleModalForm')
    }

    ////////////////////////////////////////////////////
    onChangeTagInput (event, { newValue }) {
        this.setState({
            tagInputValue: newValue
        })
    }

    onClickAddTag () {
        const {tags} = this.state
        const {allTags, allValues} = this.props
        const {tag} = allValues
        if (!tag) return

        this.setState({
            tags: [...tags, tag],
            tagInputValue: ''
        })

        this.props.change('tag', '')

        if (allTags.filter(p => p.name.toLowerCase() === tag.toLowerCase()).length) return

        this.props.addBrainCell({
            type: 'Tag',
            name: tag,
            description: '',
        })
    }

    onClickDeleteTag (index) {
        const {tags} = this.state
        tags.splice(index, 1)
        this.setState({tags})
    }

    onClickExistingTag (tag) {
        if (!tag) return null
        const {tags} = this.state

        this.setState({
            tags: [...tags, tag]
        })
    }

    ////////////////////////////////////////////////////

    onExpandRulePanel (e, expanded) {
        this.setState({
            rulePanelExpanded: expanded
        })
    }
    ////////////////////////////////////////////////////

    renderUserPickModal () {
        if (!this.props.userPickModalOpen) return null
        // return (
        //     <UserPickModal
        //         fetchUsers={this.props.fetchUsers}
        //         users={this.props.users}
        //         onClose={this.onCloseAddUser.bind(this)}
        //     />
        // )
    }

    renderShapeModal () {
        if (!this.state.shapeModalOpen) return null

        // if (objectConfig.data.uuid) return null
        const { shape, editShape, wfData } = this.state
        const {objects} = wfData


        const tpl = extendShape(shape)
        const w = tpl.w || 120
        const h = tpl.h || 50
        const objectConfig = editShape || {
            // imgIndex: item.imgIndex,

            x: 0,
            y: 0,
            w,
            h,

            // id: this.props.lastId + 1,
            type: DiagramTypes.OBJECT,
            config: {
                ...tpl.config
            },
            fill: tpl.fill,
            data: assign({}, tpl.data)
        }

        const contents = tpl.form
        const initialValues = editShape ? {
            ...editShape.data
        } : {}
        if (!editShape) {
            contents.forEach(p => {
                if (!p.default) return

                if (p.form) {
                    keys(p.default).forEach(k => {
                        initialValues[k] = p.default[k]
                    })
                } else {
                    initialValues[p.key] = p.default

                }
            })
        }

        return (
            <DiagramObjectModal
                stateId=""
                flow={{}}
                objects={objects}
                closeModal={this.onCloseShapeModal.bind(this)}
                objectConfig={objectConfig}

                header={`Edit ${tpl.title}`}

                contents={contents}
                initialValues={initialValues}
                onSaveDiagramObject={this.onSaveShape.bind(this)}

                commands={[]}
                noModal
                embedded
            />
        )
    }

    render () {
        const { handleSubmit, groups, shapes } = this.props
        return (
            <WorkflowEditModalView
                {...this.props}
                groupOptions={groups.map(p => ({label: p.name, value: p.id}))}
                typeOptions={typeOptions}
                conditionOptions={conditionOptions}
                timeOptions={timeOptions}
                onSubmit={handleSubmit(this.onSubmit.bind(this))}
                onClickClose={this.onClickClose.bind(this)}

                tab={this.state.tab}
                onChangeTab={this.onChangeTab.bind(this)}

                permitterUsers={this.state.permitterUsers}
                onClickAddUser={this.onClickAddUser.bind(this)}
                onClickRemoveUser={this.onClickRemoveUser.bind(this)}

                shapeAnchorEl={this.state.shapeAnchorEl}
                wfDataItems={this.getWfDataItems()}
                shapes={shapes}
                onClickAddShape={this.onClickAddShape.bind(this)}
                onCloseShapeMenu={this.onCloseShapeMenu.bind(this)}
                onClickShape={this.onClickShape.bind(this)}
                onClickDeleteShape={this.onClickDeleteShape.bind(this)}
                onClickEditShape={this.onClickEditShape.bind(this)}

                tags={this.state.tags}
                tagInputValue={this.state.tagInputValue}
                onChangeTagInput={this.onChangeTagInput.bind(this)}
                getTagSuggestionValue={t => t.name}
                onClickAddTag={this.onClickAddTag.bind(this)}
                onClickDeleteTag={this.onClickDeleteTag.bind(this)}
                onClickExistingTag={this.onClickExistingTag.bind(this)}

                shapeModal={this.renderShapeModal()}
                rulePanelExpanded={this.state.rulePanelExpanded}
                onExpandRulePanel={this.onExpandRulePanel.bind(this)}
            >
                {this.renderUserPickModal()}
            </WorkflowEditModalView>
        )
    }
}
export default connect(
    (state, props) => ({
        initialValues: props.editWf || {type: 'normal'},
        allValues: getFormValues('wfNameForm')(state)
    })
)(reduxForm({form: 'wfNameForm'})(WorkflowEditModal))
