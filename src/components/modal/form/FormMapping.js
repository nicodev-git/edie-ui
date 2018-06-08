import DecisionForm from './DecisionForm'
import MapperForm from './MapperForm'
import BuildForm from './BuildForm'
import MultiDecisionForm from './MultiDecisionForm'
import FlowFinishForm from './FlowFinishForm'
import ShareVarForm from './ShareVarForm'
import GeneralMonitorForm from './GeneralMonitorForm'
import ServiceMonitorForm from './ServiceMonitorForm'
import RemotePingForm from './RemotePingForm'
import IMQueryForm from './IMQueryForm'
import ExcludeForm from './ExcludeForm'

const mapping = {
    'Decision': DecisionForm,
    'Mapper': MapperForm,
    'Build': BuildForm,
    'MultiDecision': MultiDecisionForm,
    'FlowFinish': FlowFinishForm,
    'ShareVar': ShareVarForm,
    'GeneralMonitor': GeneralMonitorForm,
    'ServiceMonitor': ServiceMonitorForm,
    'RemotePing': RemotePingForm,
    'IMQuery': IMQueryForm,
    'Exclude': ExcludeForm
}

export default mapping