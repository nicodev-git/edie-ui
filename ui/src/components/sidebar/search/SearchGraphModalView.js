import React from 'react'
import {Dialog, RefreshIndicator, IconButton, SelectField, MenuItem} from 'material-ui'
import ZoomOutIcon from 'material-ui/svg-icons/maps/zoom-out-map'
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

const maxContentStyle = {
  width: '100%',
  maxWidth: 'none',
  margin: 0
}

// const maxStyle = {
//   paddingTop: 0,
//   margin: 0
// }

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
    const {onHide, onMaximize, graphMaximized, chartData, chartOptions, queryChips, params} = this.props
    return (
      <Dialog
        open title=""
        bodyStyle={dialogContentStyle}
        contentStyle={graphMaximized ? maxContentStyle : {}}
        className={graphMaximized ? 'pt-none' : ''}
        style={{left: 5, right: 5, width: 'initial'}}
        onRequestClose={onHide}
      >
        <CloseIconButton onClick={onHide}>
          <IconButton onTouchTap={onMaximize}>
            <ZoomOutIcon size={32} color="#545454"/>
          </IconButton>
        </CloseIconButton>
        <div className="pull-left margin-md-bottom">
          <small><b>Date Range:</b></small><br/>
          <small>
            {moment(params.dateFrom, dateFormat).format('MMM D, YYYY')}&nbsp;-&nbsp;
            {moment(params.dateTo, dateFormat).format('MMM D, YYYY')}
          </small>
        </div>
        <div className="pull-left margin-md-left">
          <SelectField value="day" style={{width: 100}} className="valign-bottom">
            <MenuItem value="day" primaryText="Day"/>
            <MenuItem value="hour" primaryText="Hour"/>
            <MenuItem value="min" primaryText="Minute"/>
          </SelectField>&nbsp;
          <SelectField value="1" style={{width: 80}} className="valign-bottom">
            <MenuItem value="1" primaryText="1"/>
            <MenuItem value="3" primaryText="3"/>
            <MenuItem value="5" primaryText="5"/>
            <MenuItem value="10" primaryText="10"/>
            <MenuItem value="15" primaryText="15"/>
          </SelectField>
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
          <Line data={chartData} options={chartOptions} width="800" height="250" />
        </div>
        {this.renderLoading()}
      </Dialog>
    )
  }
}
