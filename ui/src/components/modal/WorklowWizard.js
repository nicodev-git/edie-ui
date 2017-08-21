import React, { Component } from 'react'
// import Tooltip from 'react-tooltip'
import { WizardButtons, CardPanel } from 'components/modal/parts'

export default class WorkflowWizard extends Component {
  render () {
    const {step, steps, current, markers, onClose, onDiagram,
      onPrev, onNext, diagramModal, isDiagramButton} = this.props
    return (
      <div>
        <div className="wizard-container padding-md m-none">
          <CardPanel>
          <div className="wizard-progress hidden">
            {markers}
            <div className="progress progress-striped progress-xs" style={{margin: '10px 0'}}>
              <div className="progress-bar" style={{width: `${current * 100 / steps}%`}} />
            </div>
          </div>
          {step}
          </CardPanel>
          <br/>
          <WizardButtons steps={steps} current={current} onClose={onClose} onPrev={onPrev}
            onNext={onNext} onDiagram={onDiagram} isDiagramButton={isDiagramButton}/>
        </div>
        {diagramModal}
      </div>
    )
  }
}
