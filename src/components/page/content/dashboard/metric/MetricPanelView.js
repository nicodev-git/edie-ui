import React from 'react'
import Metric from '../../../../shared/Metric'

const MetricPanelView = ({stats, showOpen, showToday, showAttackers, showMonth, attackers}) => (
  <div className="row news-info">
    <div className="col-sm-3 col-lg-3 col-xs-6">
      <Metric icon="fa-tags" title="Open Incidents" value={stats.open} className="panel-body-inverse"
        onClick={showOpen}/>
    </div>
    <div className="col-sm-3 col-lg-3 col-xs-6">
      <Metric icon="fa-trophy" title="Today's Incidents" value={stats.today} className="panel-body-inverse"
        onClick={showToday}/>
    </div>
    <div className="col-sm-3 col-lg-3 col-xs-6">
      <Metric icon="fa-chain-broken" title="Attackers Today" value={stats.attackers} className="panel-body-inverse"
        onClick={showAttackers}/>
    </div>
    <div className="col-sm-3 col-lg-3 col-xs-6">
      <Metric icon="fa-users" title="Month Incidents" value={stats.month} className="panel-body-inverse"
        onClick={showMonth}/>
    </div>
    {attackers}
  </div>
)

export default MetricPanelView
