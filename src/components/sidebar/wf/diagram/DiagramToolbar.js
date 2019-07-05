import React from 'react'

import {DiagramTypes} from 'shared/Global'

class DiagramToolbar extends React.Component {

    onClickDelete () {
        const {stateId, selected, flow, lines} = this.props
        this.props.onDeleteDiagramObject(stateId, flow, selected, lines)
    }

    onClickEdit () {
        const {stateId, selected, workflowItems} = this.props
        if (!selected.length || selected[0].type !== DiagramTypes.OBJECT) return
        this.props.openDiagramObjectModal(stateId, selected[0], workflowItems[selected[0].imgIndex])
    }

    onClickFillColor () {
        const { stateId, selected } = this.props
        this.props.showFillColorPicker(stateId, true, selected[0].fill)
    }

    onClickDisable () {
        const { stateId, selected } = this.props
        this.props.onToggleDisable(stateId, selected[0])
    }

    render () {
        const {selected, workflowSelect, onToggleDisable, onChangeMapping} = this.props
        const objectSelected = selected && selected.length && selected[0].type === DiagramTypes.OBJECT

        // //////////////////////////////////////////////////////////////////////////

        return (
            <div className="toolbar-container">
                <div
                    className="link geLabel"
                    style={{whiteSpace: 'nowrap', overflow: 'hidden', position: 'relative', width: '42px'}}>
                    <div className="geSprite geSprite-formatpanel" style={{marginLeft: '-4px', marginTop: '-3px'}}/>
                    <img style={{position: 'absolute', right: '4px', top: '5px', left: '25px'}} src="/images/caret.gif" alt=""/>
                </div>

                <div className="geSeparator"/>

                {workflowSelect}
                {workflowSelect ? <div className="geSeparator"/> : null }

                <div className="link geLabel"
                    style={{whiteSpace: 'nowrap', overflow: 'hidden', position: 'relative', width: '56px'}}>
                    100%
                    <img style={{position: 'absolute', right: '4px', top: '5px', left: '40px'}} src="/images/caret.gif" alt=""/>
                </div>

                <div className="geSeparator"/>

                <div className="link geButton">
                    <div className="geSprite geSprite-zoomin"/>
                </div>
                <div className="link geButton">
                    <div className="geSprite geSprite-zoomout"/>
                </div>

                <div className="geSeparator"/>

                <div className="link geButton">
                    <div className="geSprite geSprite-undo"/>
                </div>
                <div className="link geButton mxDisabled">
                    <div className="geSprite geSprite-redo"/>
                </div>

                <div className="geSeparator"/>
                <div
                    className={`link hidden geButton ${objectSelected ? '' : 'mxDisabled'}`}
                    onClick={objectSelected ? this.onClickEdit.bind(this) : null}>
                    <div className="geSprite geSprite-unorderedlist"/>
                </div>

                {
                    onToggleDisable ? <div className={`link geButton hidden ${objectSelected ? '' : 'mxDisabled'}`}
                        onClick={this.onClickDisable.bind(this)}>
                        <i className="fa fa-warning"/>
                    </div> : null
                }

                <div className={`link geButton ${selected.length ? '' : 'mxDisabled'}`}
                    onClick={selected.length ? this.onClickDelete.bind(this) : null}>
                    <div className="geSprite geSprite-delete"/>
                </div>

                <div className="geSeparator"/>

                <div className="link geButton mxDisabled">
                    <div className="geSprite geSprite-tofront"/>
                </div>
                <div className="link geButton mxDisabled">
                    <div className="geSprite geSprite-toback"/>
                </div>

                <div className="geSeparator"/>

                <div className={`link geButton ${objectSelected ? '' : 'mxDisabled'}`}
                    onClick={this.onClickFillColor.bind(this)}>
                    <div className="geSprite geSprite-fillcolor"/>
                </div>
                <div className="link geButton">
                    <div className="geSprite geSprite-strokecolor"/>
                </div>
                <div className="link geButton">
                    <div className="geSprite geSprite-shadow"/>
                </div>

                <div className="geSeparator"/>

                <div className="link geButton"
                    style={{whiteSpace: 'nowrap', overflow: 'hidden', position: 'relative', width: '42px'}}>
                    <div className="geSprite geSprite-connection" style={{marginLeft: 0, marginTop: 0}}/>
                    <img style={{position: 'absolute', right: '4px', top: '5px', left: '25px'}} src="/images/caret.gif" alt=""/>
                </div>
                <div className="link geButton"
                    style={{whiteSpace: 'nowrap', overflow: 'hidden', position: 'relative', width: '42px'}}>
                    <div className="geSprite geSprite-orthogonal" style={{marginLeft: 0, marginTop: 0}}/>
                    <img style={{position: 'absolute', right: '4px', top: '5px', left: '25px'}} src="/images/caret.gif" alt=""/>
                </div>

                <div className="geSeparator"/>

                <div className="link geLabel"
                    style={{whiteSpace: 'nowrap', overflow: 'hidden', position: 'relative', width: '42px'}}>
                    <div className="geSprite geSprite-plus" style={{marginLeft: '-4px', marginTop: '-3px'}}/>
                    <img style={{position: 'absolute', right: '4px', top: '5px', left: '25px'}} src="/images/caret.gif" alt=""/>
                </div>

                <div className="geSeparator"/>
                {onChangeMapping && <div className="link geButton" onClick={onChangeMapping}>
                    <div className="geSprite geSprite-unorderedlist"/>
                </div>}
            </div>
        )
    }
}

export default DiagramToolbar
