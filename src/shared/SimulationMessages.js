export const messageTypes = [{
  name: 'CPU',
  img: 'cpu.png',
  data: [{
    key: 'usage',
    label: 'Usage'
  }, {
    key: 'time',
    label: 'Time'
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
  }],
  json: '{"incident":{"monitorName":"Logfile","monitortype":"logfile","description":"","startTimestamp":${time},"data":{"file":"/var/log/secure","line":"Jul 20 17:51:15 cloud4 sshd[15564]: Accepted password for root from 192.168.254.207 port 54376 ssh2"},"params":{"parse":"{\\"line\\":\\"AnyLine\\"}"}}}'
}]