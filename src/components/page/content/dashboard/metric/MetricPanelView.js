import React from 'react'
import Metric from '../../../../shared/Metric'
import HistoryIcon from 'material-ui/svg-icons/action/history'
import AlarmIcon from 'material-ui/svg-icons/action/alarm'
import BugReportIcon from 'material-ui/svg-icons/action/bug-report'
import FlagIcon from 'material-ui/svg-icons/content/flag'

const MetricPanelView = ({stats, showOpen, showToday, showAttackers, showMonth,
  attackers}) => (
  <div className="row news-info metric-panel">
    <div className="col-sm-3 col-lg-3 col-xs-6 metric-container">
      <Metric icon={<FlagIcon/>} title="Open Incidents" value={stats.open}
        onClick={showOpen}/>
    </div>
    <div className="col-sm-3 col-lg-3 col-xs-6 metric-container">
      <Metric icon={<AlarmIcon/>} title="Today's Incidents" value={stats.today}
        onClick={showToday}/>
    </div>
    <div className="col-sm-3 col-lg-3 col-xs-6 metric-container">
      <Metric icon={<BugReportIcon/>} title="Attackers Today" value={stats.attackers}
        onClick={showAttackers}/>
    </div>
    <div className="col-sm-3 col-lg-3 col-xs-6 metric-container">
      <Metric icon={<HistoryIcon/>} title="Month Incidents" value={stats.month}
        onClick={showMonth}/>
    </div>
    {attackers}
  </div>
)

export default MetricPanelView
