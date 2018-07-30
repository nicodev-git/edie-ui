export const messageTypes = [{
  name: 'CPU',
  img: 'cpu.png',
  data: [{
    key: 'usage',
    label: 'Usage'
  }, {
    key: 'timestamp',
    label: 'Timestamp'
  }],
  json: ''
}, {
  name: 'Root Login',
  img: 'credential.png',
  data: [{
    key: 'ip',
    label: 'IP'
  }, {
    key: 'time',
    label: 'Time'
  }, {
    key: 'timestamp',
    label: 'Timestamp'
  }],
  json: '{"incident":{"monitorName":"Logfile","monitortype":"logfile","description":"","startTimestamp":${timestamp},"data":{"file":"/var/log/secure","line":"${time} cloud4 sshd[15564]: Accepted password for root from ${ip} port 54376 ssh2"},"params":{"parse":"{\\"line\\":\\"AnyLine\\"}"}}}'
}]