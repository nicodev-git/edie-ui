import React, { Component } from 'react'
import Tooltip from 'react-tooltip'
import { WizardButtons } from './parts'

export default class WorkflowWizard extends Component {
  render () {
    const {step, steps, current, markers, onClose, onDiagram,
      onPrev, onNext, diagramModal, isDiagramButton} = this.props
    return (
      <div>
        <div className="wizard-container padding-md m-none">
          <div className="wizard-progress hidden">
            {markers}
            <div className="progress progress-striped progress-xs" style={{margin: '10px 0'}}>
              <div className="progress-bar" style={{width: `${current * 100 / steps}%`}} />
            </div>
          </div>
          {step}
          <br/>
          <WizardButtons steps={steps} current={current} onClose={onClose} onPrev={onPrev}
            onNext={onNext} onDiagram={onDiagram} isDiagramButton={isDiagramButton}/>
        </div>
        {diagramModal}
        <Tooltip place="right" event="mouseover" eventOff="mouseout" multiline effect="solid"/>
      </div>
    )
  }
}
