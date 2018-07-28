import React, {Component} from 'react'
import {Dialog} from '@material-ui/core'
import {ButtonsBlock} from 'components/modal/parts'

export default class DiagramModalView extends Component {
  renderPanel () {
    const {
      dragLayer, toolbar, sidebar, panel, modals, noModal
    } = this.props
    return (
      <div className={noModal ? "diagram flex-1 flex-vertical" : "diagram"} style={{overflow: 'auto'}}>
        {dragLayer}
        {toolbar}
        <div className="flex-1 flex-horizontal">
          {sidebar}
          {panel}
        </div>
        {modals}
      </div>
    )
  }

  render () {
    const {
      header, onHide, innerModal
    } = this.props

    if (innerModal) return this.renderPanel()

    return (
      <Dialog open title={header}
              autoScrollBodyContent
              bodyStyle={{padding: 0}}
              contentStyle={{maxWidth: 'initial', width: 1000}}>
        {this.renderPanel()}
        <ButtonsBlock name1="Close" action1={onHide}/>
      </Dialog>
    )
  }
}
