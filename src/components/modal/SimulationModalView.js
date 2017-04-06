import React from 'react'

class SimulationModalView extends React.Component {
  renderStep1 () {
    return (
      <div>
        <div className="row margin-md-bottom">
          <label className="col-md-2">Filter</label>
          <div className="col-md-10">
            <Field name="filters" component="input" type="text" className="form-control"/>
          </div>
        </div>

        <div className="row margin-md-bottom">
          <label className="col-md-2">Result:</label>
          <label className="col-md-10">{this.props.matchResult}</label>
        </div>
      </div>
    )
  }

  renderStep2 () {
    return (
      <div>
        <span className="margin-sm-right">Patterns</span>

        <div style={{maxHeight: '300px', overflow: 'scroll'}}>
          <table className="table table-hover table-p-sm">
            <tbody>
            {
              this.props.initialValues.patterns.map((a, index) =>
                <tr key={index}>
                  <td>
                    {a}
                  </td>
                </tr>
              )
            }
            </tbody>
          </table>
        </div>

        <div className="row margin-md-top">
          <label className="col-md-2">Result:</label>
          <label className="col-md-10">{this.props.parseResult}</label>
        </div>
      </div>
    )
  }

  renderStep () {
    const { step } = this.props
    switch (step) {
      case 1:
        return this.renderStep1()
      case 2:
        return this.renderStep2()
    }
  }

  renderButtons () {
    const {step, steps} = this.state
    return (
      <div className="text-right">
        <Button className="btn-sm margin-sm-left" type="submit" style={{display: step === 1 ? 'initial' : 'none'}}>Match Filter</Button>
        <Button className="btn-sm margin-sm-left" type="submit" style={{display: step === 2 ? 'initial' : 'none'}}>Parse</Button>

        <Button className="btn-sm margin-sm-left" onClick={this.onClickPrev.bind(this)} disabled={step < 2}>Prev</Button>
        <Button className="btn-sm margin-sm-left" onClick={this.onClickNext.bind(this)}>{ step < steps ? 'Next' : 'Finish'}</Button>
        <Button className="btn-sm margin-sm-left" onClick={this.onClickClose.bind(this)}>Cancel</Button>
      </div>
    )
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default SimulationModalView