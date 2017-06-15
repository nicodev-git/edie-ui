import React from 'react'
import {Dialog, RefreshIndicator, Chip} from 'material-ui'
import {Line} from 'react-chartjs-2'
import moment from 'moment'

import {CloseIconButton} from 'components/modal/parts'
import {chipStyles} from 'style/materialStyles'
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
      <Dialog open title="">
        <CloseIconButton onClick={onHide}/>
        <div>
          <small>Date Range:</small><br/>
          <small>
            {moment(params.dateFrom, dateFormat).format('MMM D, YYYY')}&nbsp;-&nbsp;
            {moment(params.dateTo, dateFormat).format('MMM D, YYYY')}
          </small>
        </div>
        <div style={chipStyles.wrapper} className="pull-right">
          {queryChips.map((p, i) =>
            <Chip key={i} style={chipStyles.chip}>
              {p.name !== '_all' ? <b>{p.name}: </b> : null}{p.value}
            </Chip>
          )}
        </div>
        <Line data={chartData} options={chartOptions} width="850" height="300" />
        {this.renderLoading()}
      </Dialog>
    )
  }
}
