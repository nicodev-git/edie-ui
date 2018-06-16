import React from 'react'
import { connect } from 'react-redux'
import {getFormValues, reduxForm} from 'redux-form'

import BrainCellModalView from './BrainCellModalView'
import ScriptModal from './ScriptModal'
import GrokModal from './GrokModal'
import {getKeyValues} from 'shared/Global'
import CellParamModal from './CellParamModal'

class BrainCellModal extends React.Component {
    constructor(props) {
        super(props)

        const lines = props.editBrainCell && props.editBrainCell.type === 'Grok' ? (props.editBrainCell.value || []) : []
        lines.push('')

        const params2 = props.editBrainCell ? (props.editBrainCell.params2 || {}) : {}

        const params2Fields = getKeyValues(params2).map((p, i) => ({
            ...p,
            i
        })).filter(p => !['linuxShell', 'windowsShell', 'script'].includes(p.key))

        this.state = {
            params: props.editBrainCell ? (props.editBrainCell.params || []) : [],
            tags: params2.tags || [],
            params2Fields,
            lines,
            selectedLineIndex: -1,
            params2Selected: -1,
            tagInputValue: ''
        }
    }
    componentWillMount () {
        const {editBrainCell} = this.props
        this.props.change('externalstatus', editBrainCell && editBrainCell.external ? 'external' : 'internal')
    }
    getCategories () {
        const {brainCells} = this.props
        return brainCells.filter(p => p.type === 'CommandCategory').map(p => ({
            label: p.name, value: p.name
        }))
    }
    getCategory(name) {
        const {brainCells} = this.props
        const found = brainCells.filter(p => p.type === 'CommandCategory' && p.name === name)
        return found.length ? found[0] : null
    }
    getSubcategories () {
        const {allValues, brainCells} = this.props
        if (!allValues) return []
        const categoryName = allValues.functionCategory || ''
        const category = this.getCategory(categoryName)
        if (!category) return []
        return brainCells.filter(p => p.type === 'CommandSubcategory' && p.key === category.id).map(p => ({
            label: p.name, value: p.name
        }))
    }
    onSubmit (values) {
        const {onSave, editBrainCell} = this.props
        const {params, lines, params2Fields, tags} = this.state

        const entity = {
            ...editBrainCell,
            ...values,
            params,
            external: values.externalstatus === 'external'
        }
        if (entity.type === 'Grok') entity.value = lines.filter(p => !!p)
        if (!entity.params2) entity.params2 = {}
        params2Fields.forEach(p => {
            if (!p.key) return
            entity.params2[p.key] = p.value
        })
        entity.params2.tags = tags

        onSave(entity)
        this.onClickClose()
    }
    onClickClose () {
        this.props.onClose()
    }

    onAddParam () {
        const param = window.prompt('Type param name')
        if (!param) return
        const {params} = this.state
        this.setState({
            params: [...params, param]
        })
    }

    onDeleteParam (index) {
        const {params} = this.state
        this.setState({
            params: params.filter((p, i) => i !== index)
        })
    }

    onClickScript (prop) {
        const {allValues} = this.props
        this.setState({
            editScript: (allValues.params2 || {})[prop],
            editScriptType: prop
        })
        this.props.showScriptModal(true)
    }

    onSaveScript (script) {
        const {editScriptType} = this.state
        this.props.change(`params2.${editScriptType}`, script)
        this.onCloseScript()
    }

    onCloseScript () {
        this.props.showScriptModal(false)
    }

    onAddLine () {
        this.setState({
            editLineIndex: -1,
            editLine: ''
        })
        this.props.showGrokModal(true)
    }

    onEditLine (i, line) {
        this.setState({
            editLineIndex: i,
            editLine: line
        })
        this.props.showGrokModal(true)
    }

    onDeleteLine (i) {
        const {lines, selectedLineIndex} = this.state
        if (selectedLineIndex < 0) return
        lines.splice(selectedLineIndex, 1)
        this.setState({
            lines
        })
    }

    onLineClick (index) {
        const {lines} = this.state
        if (index !== lines.length - 1) {
            this.setState({
                selectedLineIndex: index
            })
        }
    }

    onLineChange (index, data) {
        let { lines } = this.state
        lines = lines.map((r, i) => i === index ? data.pattern : r)
        if (index === lines.length - 1) lines.push('')
        this.setState({ lines })
    }

    onSaveGrok (line) {
        if (!line) return
        const {lines, editLineIndex} = this.state
        if (editLineIndex >= 0) {
            this.setState({
                lines: lines.map((p, i) => i === editLineIndex ? line : p)
            })
        } else {
            this.setState({
                lines: [...lines, line]
            })
        }

        this.onCloseGrok()
    }

    onCloseGrok () {
        this.props.showGrokModal(false)
    }

    ///////////////////////////////////////////////////////////////////

    onAddParam2Field () {
        this.props.showCellParamModal(true)
    }

    onDeleteParam2Field (i) {
        const {params2Selected, params2Fields} = this.state
        if (params2Selected < 0) return null
        params2Fields.splice(params2Selected, 1)
        this.setState({
            params2Fields,
            params2Selected: -1
        })
    }

    onClickParam2Field (i) {
        this.setState({
            params2Selected: this.state.params2Selected === i ? -1 : i
        })

    }

    onSaveCellParam (value) {
        const {params2Fields} = this.state
        this.setState({
            params2Fields: [...params2Fields, value]
        })
        this.onCloseCellParam()
    }

    onCloseCellParam () {
        this.props.showCellParamModal(false)
    }

    ///////////////////////////////////////////////////////////////////
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

    ///////////////////////////////////////////////////////////////////

    renderScriptModal () {
        if (!this.props.scriptModalOpen) return null
        return (
            <ScriptModal script={this.state.editScript}
                         onSave={this.onSaveScript.bind(this)}
                         onClose={this.onCloseScript.bind(this)}
            />
        )
    }

    renderGrokModal () {
        if (!this.props.grokModalOpen) return null
        return (
            <GrokModal
                text={this.state.editLine}
                onSave={this.onSaveGrok.bind(this)}
                onClose={this.onCloseGrok.bind(this)}
            />
        )
    }

    renderCellParamModal () {
        if (!this.props.cellParamModalOpen) return null
        return (
            <CellParamModal
                onSave={this.onSaveCellParam.bind(this)}
                onClose={this.onCloseCellParam.bind(this)}
            />
        )
    }

    render () {
        const { handleSubmit, allValues, workflows, allTags } = this.props
        return (
            <BrainCellModalView
                params={this.state.params}
                workflows={workflows}
                allValues={allValues}

                lines={this.state.lines}
                selectedLineIndex={this.state.selectedLineIndex}
                onLineClick={this.onLineClick.bind(this)}
                onLineChange={this.onLineChange.bind(this)}
                onAddLine={this.onAddLine.bind(this)}
                onEditLine={this.onEditLine.bind(this)}
                onDeleteLine={this.onDeleteLine.bind(this)}

                params2Fields={this.state.params2Fields}
                onAddParam2Field={this.onAddParam2Field.bind(this)}
                onDeleteParam2Field={this.onDeleteParam2Field.bind(this)}
                params2Selected={this.state.params2Selected}
                onClickParam2Field={this.onClickParam2Field.bind(this)}

                categories={this.getCategories()}
                subcategories={this.getSubcategories()}

                onAddParam={this.onAddParam.bind(this)}
                onDeleteParam={this.onDeleteParam.bind(this)}

                tags={this.state.tags}
                allTags={allTags}
                tagInputValue={this.state.tagInputValue}
                onChangeTagInput={this.onChangeTagInput.bind(this)}
                getTagSuggestionValue={t => t.name}
                onClickExistingTag={this.onClickExistingTag.bind(this)}
                onClickAddTag={this.onClickAddTag.bind(this)}
                onClickDeleteTag={this.onClickDeleteTag.bind(this)}

                onSubmit={handleSubmit(this.onSubmit.bind(this))}
                onClickClose={this.onClickClose.bind(this)}

                onClickScript={this.onClickScript.bind(this)}
            >
                {this.renderScriptModal()}
                {this.renderGrokModal()}
                {this.renderCellParamModal()}
            </BrainCellModalView>
        )
    }
}
export default connect(
    (state, props) => ({
        initialValues: state.settings.editBrainCell || {
            type: props.type
        },
        allValues: getFormValues('brainCellForm')(state)
    })
)(reduxForm({form: 'brainCellForm'})(BrainCellModal))
