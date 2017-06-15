import React from 'react'
import {Dialog, FlatButton, RefreshIndicator} from 'material-ui'
import {Line} from 'react-chartjs-2'

const loadingStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
}

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(80,80,80,0.5)'
}

export default class SearchGraphModalView extends React.Component {
  renderLoading () {
    if (!this.props.loading) return

    return (
      <div style={overlayStyle}>
        <div style={loadingStyle}>
          <RefreshIndicator
            size={50}
            left={0}
            top={0}
            status="loading"
            style={{display: 'inline-block', position: 'relative'}}
          />
        </div>
      </div>
    )
  }
  render () {
    const {onHide, chartData, chartOptions} = this.props
    return (
      <Dialog open title="Graph">
        <Line data={chartData} options={chartOptions} width="850" height="300" />
        {this.renderLoading()}
        <div className="form-buttons">
          <FlatButton label="Close" onClick={onHide}/>
        </div>
      </Dialog>
    )
  }
}
