import React, { Component } from 'react'
import Tooltip from 'react-tooltip'

export default class WorkflowWizard extends Component {
  render () {
    const {step, steps, current, markers, onClose, onDiagram,
      onPrev, onNext, diagramModal} = this.props
    return (
      <div>
        <div className="wizard-container m-none">
          <div className="wizard-progress hidden">
            {markers}
            <div className="progress progress-striped progress-xs" style={{margin: '10px 0'}}>
              <div className="progress-bar" style={{width: `${current * 100 / steps}%`}} />
            </div>
          </div>
          {step}
          <div className="text-right mb-none">
            <a href="javascript:;" className="btn btn-default btn-sm margin-sm-right"
              onClick={onClose}>Cancel</a>
            <a href="javascript:;" className="btn btn-default btn-sm margin-sm-right"
              onClick={onDiagram}>Diagram</a>
            <a href="javascript:;" className="btn btn-default btn-sm margin-sm-right"
              disabled={current === 1}
              onClick={onPrev}>Previous</a>
            { current < steps ? <a href="javascript:;" className="btn btn-default btn-sm" onClick={onNext}>Next</a> : null}
            { current === steps ? <button className="btn btn-primary btn-sm" type="submit">Finish</button> : null}
          </div>
        </div>
        {diagramModal}
        <Tooltip place="right" event="mouseover" eventOff="mouseout" multiline effect="solid"/>
      </div>
    )
  }
}
