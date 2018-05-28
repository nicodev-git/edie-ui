import React from 'react'
import {Dialog, IconButton} from '@material-ui/core'
import ZoomOutIcon from '@material-ui/icons/ZoomOutMap'
import {Line} from 'react-chartjs-2'
import moment from 'moment'

import RefreshOverlay from 'components/common/RefreshOverlay'
import {CloseIconButton} from 'components/modal/parts'
import {anyFieldKey} from 'shared/Global'

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

const maxContentStyle = {
  width: '100%',
  maxWidth: 'none',
  margin: 0
}

export default class SearchGraphModalView extends React.Component {
  render () {
    const {
      onHide, onMaximize, graphMaximized, chartData, chartOptions, queryChips, params, graphParams,
      onChangeSplitBy, onChangeSplitUnit
    } = this.props
    return (
      <Dialog
        open
        className={graphMaximized ? 'pt-none' : ''}
        style={{...dialogContentStyle, ...(graphMaximized ? maxContentStyle : {}), left: 5, right: 5, width: 'initial'}}
        onClose={onHide}
      >
        <CloseIconButton onClick={onHide}>
          <IconButton onClick={onMaximize}>
            <ZoomOutIcon size={32} nativeColor="#545454"/>
          </IconButton>
        </CloseIconButton>
        <div className="pull-left form-inline margin-md-bottom">
          <label><small>Duration {moment(params.from).format('MMM D, YYYY')}&nbsp;-&nbsp;
            {moment(params.to).format('MMM D, YYYY')} resolution</small></label>

          <select
            className="form-control input-sm select-custom" value={graphParams.splitBy}
            onChange={onChangeSplitBy}>
            <option value="1">&nbsp;1</option>
            <option value="2">&nbsp;2</option>
            <option value="3">&nbsp;3</option>
            <option value="5">&nbsp;5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="30">30</option>
          </select>

          <select
            className="form-control input-sm select-custom" value={graphParams.splitUnit}
            onChange={onChangeSplitUnit}>
            <option value="minute">Minute(s)</option>
            <option value="hour">Hour(s)</option>
            <option value="day">Day(s)</option>
            <option value="month">Month(s)</option>
          </select>
        </div>
        <div className="pull-right margin-md-bottom text-right">
          <div><small>Search Keywords:</small></div>
          {queryChips.map((p, i) =>
            <div key={i} style={chipStyle}>
              {p.name !== anyFieldKey ? <b>{p.name}: </b> : null}{p.value}
            </div>
          )}
        </div>
        <div className="margin-md-top">
          <Line data={chartData} options={chartOptions} width={800} height={250} />
        </div>
        {this.props.loading ? <RefreshOverlay /> : null}
      </Dialog>
    )
  }
}
