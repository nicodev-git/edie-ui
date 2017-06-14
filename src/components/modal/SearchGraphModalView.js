import React from 'react'
import {Dialog, FlatButton} from 'material-ui'
import {Line} from 'react-chartjs-2'

export default class SearchGraphModalView extends React.Component {
  render () {
    const {onHide, chartData, chartOptions} = this.props
    return (
      <Dialog open title="Graph">
        <div>
          <Line data={chartData} options={chartOptions} width="850" height="300" />
        </div>
        <div className="form-buttons">
          <FlatButton label="Close" onClick={onHide}/>
        </div>
      </Dialog>
    )
  }
}
