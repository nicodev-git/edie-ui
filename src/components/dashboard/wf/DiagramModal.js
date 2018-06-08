import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { findIndex, assign, keys } from 'lodash'
import Popover from 'components/common/popover'

import DiagramPanel from './diagram/DiagramPanel'
import DiagramDragLayer from './diagram/DiagramDragLayer'
import DiagramDragItem from './diagram/DiagramDragItem'
import DiagramToolbar from './diagram/DiagramToolbar'
import { DiagramTypes } from 'shared/Global'
import DiagramModalView from './DiagramModalView'

import DiagramObjectModal from './diagram/DiagramObjectModal'
import ColorPicker from './diagram/ColorPicker'
import {extendShape} from './diagram/DiagramItems'

const itemStyle = {
  width: '24px',
  height: '24px'
}

class DiagramModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      keyword: '',
      target: null,
      targetPos: {
        x: 0,
        y: 0
      },
      active: 1
    }
  }

  onClickClose () {
    const { onClose } = this.props
    onClose && onClose()
  }

  onClickSave () {
    const { objects, lines, lastId, onClose } = this.props
    const data = {
      objects, lines, lastId
    }

    onClose && onClose(JSON.stringify(data))
  }

  // ////////////////////////////////////////////////////
  onSearchChange (e) {
    const text = e.target.value
    if (this.state.text !== text) this.setState({ text })
  }

  onSearchKeyPress (e) {
    if (e.keyCode === 13) {
      this.setState({
        keyword: this.refs.search.value
      })
    }
  }

  onClickClear (e) {
    this.setState({ text: '', keyword: '' })
  }

  // ////////////////////////////////////////////////////

  onDrop (item, offset, component) {
    const {shapes} = this.props
    const node = ReactDOM.findDOMNode(component)
    const rt = node.getClientRects()[0]

    const tpl = extendShape(shapes[item.imgIndex])
    const w = tpl.w || 120
    const h = tpl.h || 50
    const object = {
      imgIndex: item.imgIndex,

      x: offset.x - rt.left - w / 2,
      y: offset.y - rt.top - h / 2,
      w,
      h,

      id: this.props.lastId + 1,
      type: DiagramTypes.OBJECT,
      config: {
        ...tpl.config
      },
      fill: tpl.fill,
      data: assign({}, tpl.data)
    }

    this.props.openDiagramObjectModal(this.props.stateId, object, tpl)
  }

  onClickItemInfo (stateId, flow, obj, e) {
    const {shapes} = this.props
    const tpl = extendShape(shapes[obj.imgIndex])

    this.setState({
      target: e.target,
      targetPos: {
        x: obj.x + obj.w / 2,
        y : obj.y + obj.h / 2
      }
    })
    this.props.openDiagramObjectModal(stateId, obj, tpl)
  }

  // ////////////////////////////////////////////////////

  onSaveFillColor () {
    this.props.showFillColorPicker(this.props.stateId, false)
    this.props.changeFlowItemFill(this.props.stateId, this.props.pickerColor, this.props.selected[0])
  }

  onChangePickerColor (color) {
    this.props.changePickerColor(this.props.stateId, color.hex)
  }

  // ////////////////////////////////////////////////////

  getWorkflowItems () {
    const {shapes} = this.props
    const extended = shapes.map(p => extendShape(p))
    return extended
  }

  // ///////////////////////////////////////////////////
  renderToolbar () {
    return (
      <DiagramToolbar {...this.props}/>
    )
  }

  renderSearch () {
    const {shapes} = this.props
    const { keyword, text } = this.state
    const filtered = keyword ? shapes.filter(m => m.title.toLowerCase().indexOf(keyword.toLowerCase()) >= 0) : null

    let result = null
    if (filtered) {
      if (filtered.length) {
        result = filtered.map((m, index) =>
          <DiagramDragItem key={index} imgIndex={shapes.indexOf(m)}>
            <div className="inline-block valign-middle">
              <svg style={itemStyle}>{`/images/${m.img}`}</svg>
            </div>&nbsp;&nbsp;
            <span>{m.title}</span>
          </DiagramDragItem>
        )
      } else {
        result = `No results for '${keyword}'`
      }
    }

    let searchBtn
    if (text) {
      searchBtn = <img src="/images/close2.png" style={{position: 'relative', left: '-18px', top: '-1px'}} onClick={this.onClickClear.bind(this)} alt=""/>
    } else {
      searchBtn = <img src="/images/search2.png" style={{position: 'relative', left: '-18px', top: '-1px'}} alt=""/>
    }

    return (
      <div style={{display: 'block'}}>
        <div className="geSidebar" style={{boxSizing: 'border-box', overflow: 'hidden', width: '100%', padding: '5px'}}>
          <div style={{whiteSpace: 'nowrap', textOverflow: 'clip', paddingBottom: '8px', cursor: 'default'}}>
            <input placeholder="Search Shapes" type="text" ref="search"
                   style={{fontSize: '12px', overflow: 'hidden', boxSizing: 'border-box', border: '1px solid rgb(213, 213, 213)', borderRadius: '4px', width: '100%', outline: 'none', padding: '6px 20px 6px 6px'}}
                   onKeyUp={this.onSearchKeyPress.bind(this)} onChange={this.onSearchChange.bind(this)} value={text}/>
            { searchBtn }
          </div>

          {result}
        </div>
      </div>
    )
  }

  renderSidebar () {
    const {active} = this.state
    const { /*workflowItems, */shapes } = this.props
    let groups = []

    shapes.forEach((m, index) => {
      const group = m.group || 'General'
      const gindex = findIndex(groups, {key: group})
      let groupItems = []
      if (gindex < 0) groups.push({key: group, items: groupItems})
      else groupItems = groups[gindex].items
      groupItems.push(
        <DiagramDragItem key={index} imgIndex={index} title={m.title}>
          <div className="inline-block valign-middle">
            <img src={`/images/${m.img}`} style={itemStyle} alt=""/>
          </div>&nbsp;&nbsp;
          <span>{m.title}</span>
        </DiagramDragItem>
      )
    })

    return (
      <div className="draw-sidebar">
        {this.renderSearch()}
        {groups.map((g, i) =>
          <div key={i}>
            <div className="group-title link" onClick={() => this.setState({active: i})}>
              <img src={active === i ? '/images/minus.png' : '/images/plus.png'}
                   alt="" className="link valign-middle" width="16"/>
              <span className="valign-middle">{g.key}</span>
            </div>
            <div className={active === i ? '' : 'hidden'}>
              {g.items}
            </div>
          </div>
        )}
      </div>
    )
  }

  renderPopoverTarget () {
    if (!this.props.objectModalOpen) return null

    const {targetPos} = this.state
    const { closeDiagramObjectModal, objectConfig, objectTpl, commands, stateId, formContents, onSaveDiagramObject,
      flow, objects } = this.props

    if (!objectConfig.data.uuid) return null

    const contents = formContents || objectTpl.form
    const initialValues = {
      ...objectConfig.data
    }

    const modal = (
      <DiagramObjectModal
        stateId={stateId}
        flow={flow}
        objects={objects}
        closeModal={() => closeDiagramObjectModal(stateId)}
        objectConfig={objectConfig}

        header={`Edit ${objectTpl.title}`}
        contents={contents}
        initialValues={initialValues}
        onSaveDiagramObject={onSaveDiagramObject}

        commands={commands}
        noModal
      />
    )

    return (
      <Popover
        appendTarget={document.body} isOpen body={modal}
        target={this.state.target}
        preferPlace="right"
        tipSize={12}
      >
        <div style={{position: 'absolute', left: `${targetPos.x}px`, top: `${targetPos.y}px`}}>
        </div>
      </Popover>
    )
  }

  renderPanel () {
    return (
      <DiagramPanel
        {...this.props}
        workflowItems={this.getWorkflowItems()}
        onClickItemInfo={this.onClickItemInfo.bind(this)}
        onDrop={this.onDrop.bind(this)}
        popoverTarget={this.renderPopoverTarget()}
      />
    )
  }

  renderDragLayer () {
    return (
      <DiagramDragLayer shapes={this.props.shapes}/>
    )
  }

  renderObjectModal () {
    if (!this.props.objectModalOpen) return null

    const { closeDiagramObjectModal, objectConfig, objectTpl, commands, stateId, formContents, onSaveDiagramObject,
      flow, objects } = this.props

    if (objectConfig.data.uuid) return null

    const contents = formContents || objectTpl.form
    const initialValues = {}
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

    return (
      <DiagramObjectModal
        stateId={stateId}
        flow={flow}
        objects={objects}
        closeModal={() => closeDiagramObjectModal(stateId)}
        objectConfig={objectConfig}

        header={`Edit ${objectTpl.title}`}

        contents={contents}
        initialValues={initialValues}
        onSaveDiagramObject={onSaveDiagramObject}

        commands={commands}
        noModal={false}
      />
    )
  }

  renderColorPicker () {
    if (!this.props.fillColorPickerOpen) return null
    return (
      <ColorPicker
        color={this.props.pickerColor}
        onHide={() => this.props.showFillColorPicker(this.props.stateId, false)}
        onSave={this.onSaveFillColor.bind(this)}
        onChange={this.onChangePickerColor.bind(this)}
      />
    )
  }

  renderModals () {
    return (
      <div>
        {this.renderObjectModal()}
        {this.renderColorPicker()}
      </div>
    )
  }

  render () {
    const header = 'Workflow'
    const dragLayer = this.renderDragLayer()
    const toolbar = this.renderToolbar()
    const sidebar = this.renderSidebar()
    const panel = this.renderPanel()
    const modals = this.renderModals()
    return (
      <DiagramModalView
        show
        innerModal={this.props.innerModal}
        noModal={this.props.noModal}
        onHide={this.onClickClose.bind(this)}
        onSave={this.onClickSave.bind(this)}
        header={header}
        dragLayer={dragLayer}
        toolbar={toolbar}
        sidebar={sidebar}
        panel={panel}
        modals={modals}
      />
    )
  }
}

export default DiagramModal
