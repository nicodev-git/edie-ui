import React from 'react'
import {Dialog, RefreshIndicator} from 'material-ui'
import {Line} from 'react-chartjs-2'
import moment from 'moment'

import {CloseIconButton} from 'components/modal/parts'
import {dateFormat} from 'shared/Global'

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
  background: 'rgba(80,80,80,0.5)',
  zIndex: 10
}

const chipStyle = {
  color: 'white',
  background: '#1775C3',
  borderRadius: 4,
  fontSize: '11px',
  padding: '4px 8px',
  margin: '2px 4px',
  display: 'inline-block'
}

const dialogContentStyle = {
  paddingTop: 0
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
    const {onHide, chartData, chartOptions, queryChips, params} = this.props
    return (
      <Dialog open title="" bodyStyle={dialogContentStyle}>
        <CloseIconButton onClick={onHide}/>
        <div className="pull-left margin-md-bottom">
          <small><b>Date Range:</b></small><br/>
          <small>
            {moment(params.dateFrom, dateFormat).format('MMM D, YYYY')}&nbsp;-&nbsp;
            {moment(params.dateTo, dateFormat).format('MMM D, YYYY')}
          </small>
        </div>
        <div className="pull-right margin-md-bottom text-right">
          <div><small>Search Keywords:</small></div>
          {queryChips.map((p, i) =>
            <div key={i} style={chipStyle}>
              {p.name !== '_all' ? <b>{p.name}: </b> : null}{p.value}
            </div>
          )}
        </div>
        <div className="margin-md-top">
          <Line data={chartData} options={chartOptions} width="850" height="300" />
        </div>
        {this.renderLoading()}
      </Dialog>
    )
  }
}
