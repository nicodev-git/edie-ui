import GLineChart from 'components/common/gauge/GLineChart'
import GBarChart from 'components/common/gauge/GBarChart'
import GPieChart from 'components/common/gauge/GPieChart'
import GMonitor from 'components/common/gauge/GMonitor'
import GCpu from 'components/common/gauge/GCpu'
import GMemory from 'components/common/gauge/GMemory'
import GDisk from 'components/common/gauge/GDisk'
import GAccelView from 'components/common/gauge/GAccelView'
import GLiquid from 'components/common/gauge/GLiquid'
import GIncidentTable from 'components/common/gauge/GIncidentTable'
import GServers from 'components/common/gauge/GServers'
import GMonitors from 'components/common/gauge/GMonitors'
import GTable from 'components/common/gauge/GTable'
import GInstallApp from 'components/common/gauge/GInstallApp'
import GNews from 'components/common/gauge/GNews'
import GLog from 'components/common/gauge/GLog'
import GService from 'components/common/gauge/GService'
import GDeviceInfo from 'components/common/gauge/GDeviceInfo'
import GDeviceBasic from 'components/common/gauge/GDeviceBasic'
import GEventLog from 'components/common/gauge/GEventLog'
import GProcessList from 'components/common/gauge/GProcessList'
import GServiceList from 'components/common/gauge/GServiceList'
import GUsers from 'components/common/gauge/GUsers'
import GFirewall from 'components/common/gauge/GFirewall'
import GNetwork from 'components/common/gauge/GNetwork'

const gaugeMap = {
  'Line Chart': GLineChart,
  'Bar Chart': GBarChart,
  'Pie Chart': GPieChart,
  'Monitor': GMonitor,
  'Up/Down': GMonitor,
  'Cpu': GCpu,
  'Memory': GMemory,
  'Disk': GDisk,
  'Accelerometer': GAccelView,
  'Liquid': GLiquid,
  'Incident Table': GIncidentTable,
  'Table': GTable,
  'Servers': GServers,
  'Monitors': GMonitors,
  'Installed App': GInstallApp,
  'News': GNews,
  'Log': GLog,
  'Service': GService,
  'Device Info': GDeviceInfo,
  'Device Basic': GDeviceBasic,
  'Event Log': GEventLog,
  'Process': GProcessList,
  'Services': GServiceList,
  'Users': GUsers,
  'Firewall': GFirewall,
  'Network': GNetwork
}

export default gaugeMap
