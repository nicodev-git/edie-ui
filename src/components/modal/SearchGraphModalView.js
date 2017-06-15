import React from 'react'
import {Dialog, FlatButton, RefreshIndicator} from 'material-ui'
import {Line} from 'react-chartjs-2'

export default class SearchGraphModalView extends React.Component {
  render () {
    const {onHide, chartData, chartOptions} = this.props
    return (
      <Dialog open title="Graph">
        <div>
          {chartData ? (
            <Line data={chartData} options={chartOptions} width="850" height="300" />
          ) : (
            <div className="text-center">
              <RefreshIndicator
                size={50}
                left={0}
                top={0}
                status="loading"
                style={{display: 'inline-block', position: 'relative'}}
              />
            </div>
          )}

        </div>
        <div className="form-buttons">
          <FlatButton label="Close" onClick={onHide}/>
        </div>
      </Dialog>
    )
  }
}
