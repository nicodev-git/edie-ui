export const messageTypes = [{
  name: 'CPU',
  img: 'cpu.png',
  group: 'internal',
  data: [{
    key: 'usage',
    label: 'Usage',
    default: '80%'
  }, {
    key: 'timestamp',
    label: 'Timestamp',
    default: 1532080275000,
    type: 'datetime',
    format: ''
  }],
  json: '{"tags": ["monitorcpu"],"incident":{"monitorid": "5ad4712552faff0001196425aa123", "agentid": "5ad4712552faff0001196425", "deviceid": ["5ad4712552faff0001196425"], "monitorName":"CPU","monitortype":"cpu","description":"Usage is ${usage}%","startTimestamp":${timestamp},"data":{"Usage":"${usage}%"}}}'
}, {
  name: 'Root Login',
  img: 'credential.png',
  group: 'internal',
  data: [{
    key: 'ip',
    label: 'IP',
    default: '192.168.254.200'
  }, {
    key: 'time',
    label: 'Time',
    default: 'Jul 20 17:51:15'
  }, {
    key: 'timestamp',
    label: 'Timestamp',
    default: 1532080275000,
    type: 'datetime',
    format: ''
  }, {
    key: 'user',
    label: 'User',
    default: 'root'
  }],
  json: '{"incident":{"monitorName":"Logfile","monitortype":"logfile","description":"","startTimestamp":${timestamp},"data":{"file":"/var/log/secure","line":"${time} cloud4 sshd[15564]: Accepted password for root from ${ip} port 54376 ssh2"},"params":{"parse":"{\\"line\\":\\"AnyLine\\"}"}}}'
}, {
  name: 'Login Failure',
  img: 'credential.png',
  group: 'internal',
  data: [{
    key: 'ip',
    label: 'IP',
    default: '192.168.254.200'
  }, {
    key: 'time',
    label: 'Time',
    default: 'Jul 20 17:51:15'
  }, {
    key: 'timestamp',
    label: 'Timestamp',
    default: 1532080275000,
    type: 'datetime',
    format: ''
  }, {
    key: 'user',
    label: 'User',
    default: 'root'
  }],
  json: '{"incident":{"monitorName":"Logfile","monitortype":"logfile","description":"","startTimestamp":${timestamp},"data":{"file":"/var/log/secure","line":"${time} cloud4 sshd[21332]: Failed password for root from ${ip} port 2086 ssh2"},"params":{"parse":"{\\"line\\":\\"AnyLine\\"}"}}}'
}, {
  name: 'Syslog',
  img: 'group.png',
  group: 'syslog',
  data: [{
    key: 'connectorId',
    label: 'Connector Id',
    default: ''
  }, {
    key: 'text',
    label: 'Text',
    default: ''
  }],
  json: '{"text": "${text}", "connectorId": "${connectorId}"}'
}]