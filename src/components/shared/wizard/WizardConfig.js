export const MAX_WIDTH = 12
const POPUP_WIDTH_SM = 600

export const deviceTypeMap = {
  'Group': 'group',
  'Telephony': 'group',
  'Jetro': 'group',
  'Customers': 'group',
  'DR Site': 'group',
  'Partners': 'group',

  'Long hub': 'longhub'
}

export const monitorTypeMap = {
  'port': 'monitor-port'
}

export function getDeviceType (templateName) {
  if (!templateName) return 'custom'
  return deviceTypeMap[templateName] || 'custom'
}

export function getMonitorType (monitorType) {
  if (!monitorType) return 'monitor-custom'
  return monitorTypeMap[monitorType] || 'monitor-custom'
}

export const commonconfig = {
  checkinterval: {
    values: [{
      display: '1 sec',
      value: 1000
    }, {
      display: '5 sec',
      value: 5000
    }, {
      display: '10 sec',
      value: 10000,
      selected: true
    }, {
      display: '30 sec',
      value: 30000
    }, {
      display: '1 min',
      value: 60000
    }, {
      display: '5 min',
      value: 300000
    }, {
      display: '15 min',
      value: 900000
    }, {
      display: '30 min',
      value: 1800000
    }, {
      display: '60 min',
      value: 3600000
    }]
  },
  threshold: {
    values: [{
      display: '1',
      value: '1'
    }, {
      display: '2',
      value: '2'
    }, {
      display: '3',
      value: '3'
    }, {
      display: '4',
      value: '4'
    }, {
      display: '5',
      value: '5'
    }, {
      display: '10',
      value: '10'
    }]
  },
  m1: {
    values: [{
      display: 'Not Used',
      value: 'Not Used'
    }, {
      display: 'Source IP',
      value: 'Source IP'
    }, {
      display: 'Mac',
      value: 'Mac'
    }, {
      display: 'User Name',
      value: 'Username'
    }, {
      display: 'Destination IP',
      value: 'Destination IP'
    }, {
      display: 'Severity',
      value: 'Severity'
    }, {
      display: 'Message',
      value: 'Message'
    }, {
      display: 'Custom',
      value: 'Custom'
    }]
  },
  port: {
    values: [{
      display: '21 ftp',
      value: '21'
    }, {
      display: '22 ssh',
      value: '22'
    }, {
      display: '23 telnet',
      value: '23'
    }, {
      display: '25 smtp',
      value: '25'
    }, {
      display: '80 http',
      value: '80'
    }, {
      display: '110 pop3',
      value: '110'
    }, {
      display: '143 imap',
      value: '143'
    }, {
      display: '179 bgp',
      value: '179'
    }, {
      display: '443 https',
      value: '443'
    }, {
      display: '465 smtps',
      value: '465'
    }, {
      display: '993 imaps',
      value: '993'
    }, {
      display: '995 pop3s',
      value: '995'
    }, {
      display: '1433 mssql',
      value: '1433'
    }, {
      display: '1720 h.323',
      value: '1720'
    }, {
      display: '1723 pptp',
      value: '1723'
    }, {
      display: '3306 mysql',
      value: '3306'
    }, {
      display: '3389 ms-term',
      value: '3389'
    }, {
      display: '5060 sip',
      value: '5060'
    }, {
      display: '5900 vnc',
      value: '5900'
    }, {
      display: '8000 https',
      value: '8000'
    }, {
      display: '8080 http',
      value: '8080'
    }, {
      display: '8443 https',
      value: '8443'
    }]
  },
  expectedType: {
    type: 'radiocombo',
    label: {
      text: 'Expected Type',
      type: 'attach',
      cls: 'mb-none p-none',
      style: {
        'margin-bottom': 0
      },
      width: 2
    },
    items: [{
      label: 'None',
      value: 'none'
    }, {
      label: 'Exact Number',
      value: 'exact',
      items: [{
        type: 'text',
        label: {
          text: 'Expected Response',
          type: 'attach',
          cls: 'mb-none p-none',
          style: {
            'margin-bottom': 0
          },
          width: 2
        },
        name: 'expectedResponse',
        required: true
      }]
    }, {
      label: 'Number in range',
      value: 'range',
      items: [{
        type: 'text',
        label: {
          text: 'Minimum',
          type: 'attach',
          width: 2
        },
        name: 'minimum',
        width: 6
      }, {
        type: 'text',
        label: {
          text: 'Maximum',
          type: 'attach',
          width: 2
        },
        name: 'maximum',
        width: 6
      }]
    }, {
      label: 'Exact String',
      value: 'exact string',
      items: [{
        type: 'text',
        label: {
          text: 'Expected Response',
          type: 'attach',
          cls: 'mb-none p-none',
          style: {
            'margin-bottom': 0
          },
          width: 2
        },
        name: 'expectedResponse',
        required: true
      }]
    }, {
      label: 'String contains',
      value: 'contains',
      items: [{
        type: 'text',
        label: {
          text: 'Expected Response',
          type: 'attach',
          cls: 'mb-none p-none',
          style: {
            'margin-bottom': 0
          },
          width: 2
        },
        name: 'expectedResponse',
        required: true
      }]
    }],
    name: 'expectedType'
  },

  info: {
    type: 'textarea',
    label: {
      text: 'Info',
      type: 'attach',
      width: 1
    },
    rows: 5,
    name: 'notes',
    inputStyle: {
      width: '400px',
      height: '105px',
      overflow: 'auto'
    },
    server: {
      get: {
        params: [{
          name: 'deviceid',
          configvalue: 'id'
        }]
      },
      update: {
        params: [{
          name: 'deviceid',
          configvalue: 'id'
        }]
      }
    },
    width: 8
  },

  ipvalidation: {
    type: 'server',
    param: 'ip',
    fn: function (res) {
      return !res.success
    },
    msg: 'IP Already Exists'
  },

  enablecheck: {
    type: 'combo',
    label: {
      text: 'Enabled',
      width: 3
    },
    items: [{
      display: 'Enabled',
      value: 'false'
    }, {
      display: 'Disabled',
      value: 'true'
    }],
    name: 'disabled'
  },

  credentialsMenu: function (labelWidth) {
    return {
      type: 'combo',
      name: 'credentialid',

      label: {
        text: 'Credential',
        type: 'attach',
        width: labelWidth || 2
      },

      remote: true,
      server: {
        root: 'data',
        display: 'name',
        value: 'id'
      },

      sidebar: {
        position: 'right',
        buttons: [{
          type: 'add',
          click: 'credentialModal'
        }]
      }
    }
  },

  monitorList: function (type) {
    return {
      type: 'monitors',
      title: 'Monitors',
      defaults: {
        params: {
          type: type
        },
        root: 'object'
      },
      style: {
        padding: 0
      }
    }
  },

  timeout: {
    values: [{
      display: '1 sec',
      value: 1000
    }, {
      display: '5 sec',
      value: 5000
    }, {
      display: '10 sec',
      value: 10000,
      selected: true
    }, {
      display: '30 sec',
      value: 30000
    }, {
      display: '1 min',
      value: 60000
    }, {
      display: '5 min',
      value: 300000
    }, {
      display: '15 min',
      value: 900000
    }, {
      display: '30 min',
      value: 1800000
    }, {
      display: '60 min',
      value: 3600000
    }]
  }
}

export const wizardConfig = {

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Devices

  'server': {
    title: 'Server',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        type: 'Windows Server'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        },
        required: true,
        name: 'name'
      }, {
        type: 'text',
        label: {
          text: 'LAN IP Address',
          type: 'attach',
          width: 3
        },
        required: true,
        name: 'ipaddress'
      }, commonconfig.credentialsMenu(3),
      {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }, {
          type: 'radiocombo',
          name: 'behindpublic',
          label: {
            text: ' ',
            type: 'attach',
            width: 3
          },
          items: [{
            label: 'Device is not behind public address',
            value: 0
          }, {
            label: 'Device is behind public address',
            value: 1,
            items: [{
              type: 'text',
              label: {
                text: 'External IP',
                type: 'attach',
                width: 3
              },
              name: 'externalIP'
            }]
          }]

        }]
      }]
    }, {
      title: 'step 2',
      items: [commonconfig.monitorList('Windows Server')]
    }]
  },

  'linuxserver': {
    title: 'Linux Server',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        type: 'Linux Server'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        },
        required: true,
        name: 'name'
      }, {
        type: 'text',
        label: {
          text: 'LAN IP Address',
          type: 'attach',
          width: 3
        },
        required: true,
        name: 'ipaddress'
      }, commonconfig.credentialsMenu(3),
      {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }, {
          type: 'radiocombo',
          name: 'behindpublic',
          label: {
            text: ' ',
            type: 'attach',
            width: 3
          },
          items: [{
            label: 'Device is not behind public address',
            value: 0
          }, {
            label: 'Device is behind public address',
            value: 1,
            items: [{
              type: 'text',
              label: {
                text: 'External IP',
                type: 'attach',
                width: 3
              },
              name: 'externalIP'
            }]
          }]

        }]
      }]
    }, {
      title: 'step 2',
      items: [commonconfig.monitorList('Linux Server')]
    }]
  },

  'website': {
    title: 'Website',
    width: POPUP_WIDTH_SM,

    server: {
      params: {
        type: 'Web Site',
        monitorNames: 'http'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 2
        },
        required: true,
        name: 'name'
      }, {
        type: 'text',
        label: {
          text: 'URL',
          type: 'attach',
          width: 2
        },
        required: true,
        name: 'url'
      }, {
        type: 'text',
        label: {
          text: 'Text to match',
          type: 'attach',
          width: 2
        },
        name: 'contains'
      }, {
        type: 'label',
        text: '',
        width: 2
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 10,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }]
  },

  'group': {
    title: 'Group',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        isgroup: true
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 2
        },
        width: MAX_WIDTH,
        required: true,
        name: 'name'
      }]
    }]
  },

  'router': {
    title: 'Router',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        type: 'Router'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        },
        width: MAX_WIDTH,
        required: true,
        name: 'name'
      }, {
        type: 'text',
        label: {
          text: 'IP Address',
          type: 'attach',
          width: 3
        },
        required: true,
        width: MAX_WIDTH,
        name: 'ipaddress'
      }, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }, {
      title: 'step 2',
      items: [commonconfig.monitorList('Router')]
    }]
  },

  'firewall': {
    title: 'Firewall',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        type: 'Firewall',
        credentialid: -1
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        },
        width: MAX_WIDTH,
        required: true,
        name: 'name'
      }, {
        type: 'text',
        label: {
          text: 'IP Address',
          type: 'attach',
          width: 3
        },
        required: true,
        width: MAX_WIDTH,
        name: 'ipaddress'
      }, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }, {
      title: 'step 2',
      items: [commonconfig.monitorList('Firewall')]
    }]
  },

  'internet': {
    title: 'Internet',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        credentialid: -1,
        type: 'Internet'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        },
        width: MAX_WIDTH,
        required: true,
        name: 'name'
      }, {
        type: 'text',
        label: {
          text: 'IP Address',
          type: 'attach',
          width: 3
        },
        required: true,
        width: MAX_WIDTH,
        name: 'ipaddress'
      }, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }]
  },

  'db-mysql': {
    title: 'MySQL DB',
    server: {
      params: {
        type: 'MYSQLDB'
      }
    },

    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 2
        },
        name: 'name',
        required: true,
        width: 6
      }, {
        label: {
          text: 'Threshold',
          type: 'attach',
          width: 2
        },
        width: 6,
        type: 'combo',
        items: commonconfig.threshold.values,
        name: 'threshHold',
        required: true
      }, {
        type: 'text',
        label: {
          text: 'IP',
          type: 'attach',
          width: 2
        },
        name: 'ipaddress',
        required: true,
        width: 6
      }, {
        type: 'text',
        label: {
          text: 'DB Name',
          type: 'attach',
          width: 2
        },
        width: 6,
        required: true,
        name: 'dbname'
      }, {
        type: 'text',
        label: {
          text: 'Query',
          type: 'attach',
          width: 2
        },
        width: MAX_WIDTH,
        required: true,
        name: 'query'
      },
        commonconfig.expectedType,
        commonconfig.credentialsMenu(),
      {
        type: 'label',
        text: '',
        width: 2
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 10,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }, {
          type: 'check',
          label: {
            text: 'Enabled',
            type: 'attach',
            width: 3
          },
          name: 'enabled',
          checked: true,
          value: 1,
          width: 9
        }]
      }]
    }]
  },

  'db-oracle': {
    title: 'Oracle DB',
    server: {
      params: {
        type: 'OracleDB'
      }
    },

    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 2
        },
        name: 'name',
        required: true,
        width: 6
      }, {
        label: {
          text: 'Threshold',
          type: 'attach',
          width: 2
        },
        width: 6,
        type: 'combo',
        items: commonconfig.threshold.values,
        name: 'threshHold',
        required: true
      }, {
        type: 'text',
        label: {
          text: 'IP',
          type: 'attach',
          width: 2
        },
        name: 'ipaddress',
        required: true,
        width: 6
      }, {
        type: 'text',
        label: {
          text: 'DB Name',
          type: 'attach',
          width: 2
        },
        width: 6,
        required: true,
        name: 'dbname'
      }, {
        type: 'text',
        label: {
          text: 'Query',
          type: 'attach',
          width: 2
        },
        width: MAX_WIDTH,
        required: true,
        name: 'query'
      },
        commonconfig.expectedType,
        commonconfig.credentialsMenu(),
      {
        type: 'label',
        text: '',
        width: 2
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 10,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }, {
          type: 'check',
          label: {
            text: 'Enabled',
            type: 'attach',
            width: 3
          },
          name: 'enabled',
          checked: true,
          value: 1,
          width: 9
        }]
      }]
    }]
  },

  'db-mssql': {
    title: 'MSSQL DB',
    server: {
      params: {
        type: 'MSSQLDB'
      }
    },

    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 2
        },
        name: 'name',
        required: true,
        width: 6
      }, {
        label: {
          text: 'Threshold',
          type: 'attach',
          width: 2
        },
        width: 6,
        type: 'combo',
        items: commonconfig.threshold.values,
        name: 'threshHold',
        required: true
      }, {
        type: 'text',
        label: {
          text: 'IP',
          type: 'attach',
          width: 2
        },
        name: 'ipaddress',
        required: true,
        width: 6
      }, {
        type: 'text',
        label: {
          text: 'DB Name',
          type: 'attach',
          width: 2
        },
        width: 6,
        required: true,
        name: 'dbname'
      }, {
        type: 'text',
        label: {
          text: 'Query',
          type: 'attach',
          width: 2
        },
        width: MAX_WIDTH,
        required: true,
        name: 'query'
      },
        commonconfig.expectedType,
        commonconfig.credentialsMenu(),
      {
        type: 'label',
        text: '',
        width: 2
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 10,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }, {
          type: 'check',
          label: {
            text: 'Enabled',
            type: 'attach',
            width: 3
          },
          name: 'enabled',
          checked: true,
          value: 1,
          width: 9
        }]
      }]
    }]
  },

  'custom': {
    title: 'Custom',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        type: 'Custom Device'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        },
        width: MAX_WIDTH,
        required: true,
        name: 'name'
      }, {
        type: 'text',
        label: {
          text: 'WAN IP',
          type: 'attach',
          width: 3
        },
        width: MAX_WIDTH,
        name: 'wanip'
      }, {
        type: 'text',
        label: {
          text: 'LAN IP',
          type: 'attach',
          width: 3
        },
        width: MAX_WIDTH,
        name: 'lanip'
      }, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }, {
      title: 'step 2',
      items: [{
        type: 'monitors',
        title: 'Monitors'
      }]
    }]
  },

  'pc': {
    title: 'PC',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        credentialid: -1,
        type: 'PC'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        },
        width: MAX_WIDTH,
        required: true,
        name: 'name'
      }, {
        type: 'combo',
        label: {
          text: 'OS',
          width: 3
        },
        items: [{
          display: 'Windows 8',
          value: 'win8'
        }, {
          display: 'Windows 7',
          value: 'win7'
        }, {
          display: 'Windows XP',
          value: 'winxp'
        }],
        width: MAX_WIDTH,
        name: 'os'
      }, {
        type: 'text',
        label: {
          text: 'IP Address',
          type: 'attach',
          width: 3
        },
        required: true,
                // pattern: /((^|\.)((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]?\d))){4}$/,
        name: 'ipaddress'
      }, commonconfig.credentialsMenu(3),
      {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }]
  },

  'antivirus': {
    title: 'Antivirus',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        type: 'Antivirus'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        }
      }, {
        type: 'text',
        label: {
          text: 'IP Address',
          type: 'attach',
          width: 3
        },
        required: true,
        name: 'ipaddress'
      }, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        },
          commonconfig.credentialsMenu(3)
        ]
      }]
    }]
  },

  'nac': {
    title: 'NAC',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        type: 'NAC'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        }
      }, {
        type: 'text',
        label: {
          text: 'IP Address',
          type: 'attach',
          width: 3
        },
        required: true,
        name: 'ipaddress'
      }, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        },
          commonconfig.credentialsMenu(3)
        ]
      }]
    }]
  },

  'safend': {
    title: 'Safend',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        type: 'Safend'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        }
      }, {
        type: 'text',
        label: {
          text: 'IP Address',
          type: 'attach',
          width: 3
        },
        required: true,
        name: 'ipaddress'
      }, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }]
  },

  'telephony': {
    title: 'telephony',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        type: 'Telephony'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        }
      }, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }]
  },

  'jetro': {
    title: 'Jetro',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        type: 'Jetro'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        }
      }, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }]
  },

  'customers': {
    title: 'Customers',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        type: 'Customers'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        }
      }, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }]
  },

  'drsite': {
    title: 'DR Site',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        type: 'DR Site'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        }
      }, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }]
  },

  'partners': {
    title: 'Partners',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        type: 'Partners'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        }
      }, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }]
  },

  'ips': {
    title: 'IPS',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        type: 'IPS'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        }
      }, {
        type: 'text',
        label: {
          text: 'IP Address',
          type: 'attach',
          width: 3
        },
        required: true,
        name: 'ipaddress'
      }, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        },
          commonconfig.credentialsMenu(3),
        {
          type: 'label',
          text: 'Show Destination IP',
          width: 3,
          style: {
            'margin-top': '-8px',
            'margin-bottom': 0
          }
        }, {
          type: 'check',
          label: ' ',
          name: 'showDestination',
          checked: true,
          value: 1,
          width: 9
        }]
      }]
    }]
  },

  'bi-gauge': {
    title: 'Gauge',
    server: {
      params: {
        type: 'SQLQueryGauge'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 2
        },
        name: 'name',
        width: 6,
        required: true
      }, {
        label: {
          text: 'Threshold',
          type: 'attach',
          width: 2
        },
        width: 6,
        type: 'combo',
        items: commonconfig.threshold.values,
        name: 'threshHold',
        required: true
      }, {
        type: 'combo',
        name: 'dbtype',
        width: 12,
        label: {
          text: 'DB Type',
          width: 2
        },
        items: [{
          display: 'SQL',
          value: 'sql'
        }, {
          display: 'Oracle',
          value: 'oracle'
        }, {
          display: 'MySQL',
          value: 'mysql'
        }]
      },
        commonconfig.credentialsMenu(2),
      {
        type: 'text',
        label: {
          text: 'URL',
          type: 'attach',
          width: 2
        },
        required: true,
        name: 'url'
      }, {
        type: 'text',
        label: {
          text: 'Query',
          type: 'attach',
          width: 2
        },
        required: true,
        name: 'query'
      }, {
        type: 'text',
        label: {
          text: 'Text',
          type: 'attach',
          width: 2
        },
        required: true,
        name: 'text'
      }, {
        type: 'label',
        text: '',
        width: 2
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 10,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH
        }]
      }]
    }]
  },
  'bi-temperature': {
    title: 'Chart',
    width: 600,
    server: {
      params: {
        type: 'genericdevice',
        chartType: 'temperature'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 1
        },
        name: 'name',
        width: 6
      }]
    }]
  },
  'bi-line': {
    title: 'Chart',
    server: {
      params: {
        type: 'SQLBI',
        chartType: 'line'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 2
        },
        name: 'name',
        width: 6,
        required: true
      }, {
        label: {
          text: 'Threshold',
          type: 'attach',
          width: 2
        },
        width: 6,
        type: 'combo',
        items: commonconfig.threshold.values,
        name: 'threshHold',
        required: true
      }, {
        type: 'combo',
        name: 'dbtype',
        width: 12,
        label: {
          text: 'DB Type',
          width: 2
        },
        items: [{
          display: 'SQL',
          value: 'sql'
        }, {
          display: 'Oracle',
          value: 'oracle'
        }, {
          display: 'MySQL',
          value: 'mysql'
        }]
      },
        commonconfig.credentialsMenu(2),
      {
        type: 'text',
        label: {
          text: 'URL',
          type: 'attach',
          width: 2
        },
        required: true,
        name: 'url'
      }, {
        type: 'text',
        label: {
          text: 'Query',
          type: 'attach',
          width: 2
        },
        required: true,
        name: 'query'
      }, {
        type: 'text',
        label: {
          text: 'Text',
          type: 'attach',
          width: 2
        },
        required: true,
        name: 'text'
      }, {
        type: 'label',
        text: '',
        width: 2
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 10,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }]
  },

  'bi-bar': {
    title: 'Chart',
    server: {
      params: {
        type: 'SQLBI',
        chartType: 'bar'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 2
        },
        name: 'name',
        width: 6,
        required: true
      }, {
        label: {
          text: 'Threshold',
          type: 'attach',
          width: 2
        },
        width: 6,
        type: 'combo',
        items: commonconfig.threshold.values,
        name: 'threshHold',
        required: true
      }, {
        type: 'combo',
        name: 'dbtype',
        width: 12,
        label: {
          text: 'DB Type',
          width: 2
        },
        items: [{
          display: 'SQL',
          value: 'sql'
        }, {
          display: 'Oracle',
          value: 'oracle'
        }, {
          display: 'MySQL',
          value: 'mysql'
        }]
      },
        commonconfig.credentialsMenu(),
      {
        type: 'text',
        label: {
          text: 'URL',
          type: 'attach',
          width: 2
        },
        required: true,
        name: 'url'
      }, {
        type: 'text',
        label: {
          text: 'Query',
          type: 'attach',
          width: 2
        },
        required: true,
        name: 'query'
      }, {
        type: 'text',
        label: {
          text: 'Text',
          type: 'attach',
          width: 2
        },
        required: true,
        name: 'text'
      }, {
        type: 'label',
        text: '',
        width: 2
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 10,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }]
  },

  'bi-pie': {
    title: 'Chart',
    server: {
      params: {
        type: 'SQLBI',
        chartType: 'pie'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 2
        },
        name: 'name',
        width: 6,
        required: true
      }, {
        label: {
          text: 'Threshold',
          type: 'attach',
          width: 2
        },
        width: 6,
        type: 'combo',
        items: commonconfig.threshold.values,
        name: 'threshHold',
        required: true
      }, {
        type: 'combo',
        name: 'dbtype',
        width: 12,
        label: {
          text: 'DB Type',
          width: 2
        },
        items: [{
          display: 'SQL',
          value: 'sql'
        }, {
          display: 'Oracle',
          value: 'oracle'
        }, {
          display: 'MySQL',
          value: 'mysql'
        }]
      },
        commonconfig.credentialsMenu(),
      {
        type: 'text',
        label: {
          text: 'URL',
          type: 'attach',
          width: 2
        },
        required: true,
        name: 'url'
      }, {
        type: 'text',
        label: {
          text: 'Query',
          type: 'attach',
          width: 2
        },
        required: true,
        name: 'query'
      }, {
        type: 'text',
        label: {
          text: 'Text',
          type: 'attach',
          width: 2
        },
        required: true,
        name: 'text'
      }, {
        type: 'label',
        text: '',
        width: 2
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 10,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }]
  },

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  'usertext': {
    title: 'Free Text',
    server: {
      params: {
        type: 'Text',
        checkinterval: 86400000,
        agentid: 1
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Text',
          type: 'attach',
          width: 2
        }
      }]
    }]
  },

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Monitors

  'monitor-custom': {
    title: 'Monitor',
    width: POPUP_WIDTH_SM,
    server: {
      params: {

      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        },
        width: MAX_WIDTH,
        required: true,
        name: 'name'
      }, {
        type: 'check',
        label: {
          text: 'Enabled',
          type: 'attach',
          width: 3
        },
        name: 'enable',
                // checked: true,
        width: MAX_WIDTH
      }, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 10,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, commonconfig.info, commonconfig.enablecheck, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }]
  },

  'monitor-security': {
    title: 'Security',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        agentid: 1,
        type: 'security'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'label',
        text: 'Adding security monitor.'
      }]
    }]
  },

  'monitor-ping': {
    title: 'Ping',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        agentid: 1,
        type: 'ping'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'label',
        text: 'Adding ping monitor.'
      }]
    }]
  },

  'monitor-http': {
    title: 'Http',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        type: 'http'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 2
        },
        name: 'name',
        required: true
      }, {
        type: 'text',
        label: {
          text: 'URL',
          type: 'attach',
          width: 2
        },
        name: 'url',
        required: true
      }, {
        type: 'text',
        label: {
          text: 'Text to match',
          type: 'attach',
          width: 2
        },
        name: 'contains'
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 10,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }, {
          type: 'combo',
          label: {
            text: 'Timeout',
            width: 3
          },
          items: commonconfig.timeout.values,
          width: MAX_WIDTH,
          name: 'timeout'
        }, {
          type: 'check',
          label: {
            text: 'Enabled',
            type: 'attach',
            width: 3
          },
          name: 'enabled',
          checked: true,
          value: 1,
          width: 9
        }]
      }]
    }]
  },

  'monitor-log-file': {
    title: 'Log',
    server: {
      params: {
        type: 'LogCheck'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 2
        }
      }, {
        type: 'radiocombo',
        name: 'protocol',
        label: {
          text: 'Protocol',
          type: 'attach',
          width: 2
        },
        style: {
          'padding-right': '52%'
        },
        items: [{
          label: 'SSH',
          value: 'ssh',
          width: 2,
          items: [{
            type: 'text',
            name: 'user',
            required: true,
            label: {
              text: 'User',
              type: 'attach',
              width: 2
            },
            width: 6
          }, {
            type: 'text',
            name: 'password',
            required: true,
            label: {
              text: 'Password',
              type: 'attach',
              width: 2
            },
            width: 6
          }, {
            type: 'text',
            name: 'hostname',
            required: true,
            label: {
              text: 'Host',
              type: 'attach',
              width: 2
            }
          }]
        }, {
          label: 'SMB',
          value: 'smb',
          width: 2,
          items: [{
            type: 'text',
            name: 'user',
            required: true,
            label: {
              text: 'User',
              type: 'attach',
              width: 2
            },
            width: 6
          }, {
            type: 'text',
            name: 'password',
            required: true,
            label: {
              text: 'Password',
              type: 'attach',
              width: 2
            },
            width: 6
          }, {
            type: 'text',
            name: 'hostname',
            required: true,
            label: {
              text: 'Host',
              type: 'attach',
              width: 2
            }
          }]
        }, {
          label: 'Local',
          value: 'local',
          width: 7,
          checked: true,
          items: []
        }]
      }, {
        type: 'text',
        name: 'path',
        label: {
          text: 'Path',
          type: 'attach',
          width: 2
        }
      }, {
        type: 'combo',
        label: {
          text: 'Check Interval',
          width: 2
        },
        items: commonconfig.checkinterval.values,
        width: MAX_WIDTH,
        name: 'checkinterval',
        style: {
          'padding-right': '40%'
        }
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 2,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        },
          commonconfig.credentialsMenu(3),
        {
          type: 'text',
          name: 'dayskeep',
          required: true,
          label: {
            text: 'Days To Keep Log',
            type: 'attach',
            width: 3
          },
          value: 5
        }, {
          type: 'check',
          label: {
            text: 'To Log',
            type: 'attach',
            width: 3
          },
          name: 'tolog',
          checked: true,
          value: 1,
          disablespan: true
        }, {
          type: 'check',
          label: {
            text: 'Enabled',
            type: 'attach',
            width: 3
          },
          name: 'enabled',
          checked: true,
          value: 1
        }]
      }]
    }, {
      title: 'step 2',
      items: [{
        type: 'matchignore',
        title: 'Text To Match / Text To Ignore',
        idproperty: 'id',
        columns: [{
          name: 'textToMatch'
        }, {
          name: 'textToIgnore'
        }, {
          name: 'occurrence'
        }]
      }]
    }, {
      title: 'step 3',
      items: [{
        type: 'globalignore',
        title: 'Global Ignore',
        idproperty: 'globalignoreid',
        columns: [{
          name: 'globalignore'
        }]
      }]
    }]
  },

  'monitor-file': {
    title: 'File',
    server: {
      params: {
        type: 'file'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 2
        }
      },
        commonconfig.credentialsMenu(),
      {
        type: 'text',
        label: {
          text: 'Filename',
          type: 'attach',
          width: 2
        },
        required: true,
        name: 'filename',
        style: {
          'padding-right': '40%'
        }
      }, {
        type: 'row',
        items: [{
          type: 'label',
          text: '',
          width: 2
        }, {
          type: 'label',
          style: {
            'text-align': 'left'
          },
          html: '<img src="/images/info.png" style="width:26px;height:26px;">This file will be monitored for any change or in a case it will be deleted.',
          width: 10
        }]
      }, {
        label: {
          text: ' ',
          width: 2
        },
        type: 'advanced',
        text: 'Advanced',
        width: 10,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }, {
          type: 'check',
          label: {
            text: 'Enabled',
            width: 3
          },
          name: 'enabled',
          checked: true,
          value: 1,
          width: 9
        }]
      }]
    }]
  },

  'monitor-eventlog': {
    title: 'EventLog',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        agentid: 1,
        type: 'eventlog'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'row',
        items: [{
          type: 'label',
          text: 'Adding eventlog monitor.'
        }]
      }, {
        type: 'check',
        label: {
          text: 'Enabled',
          width: 2
        },
        name: 'enabled',
        checked: true,
        value: [1, 0],
        width: 10
      }]
    }]
  },

  'monitor-port': {
    title: 'Port',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        type: 'port'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 2
        },
        name: 'name',
        required: true
      }, {
        type: 'portlist',
        required: true,
        name: 'params.port',
        label: {
          text: 'Port',
          width: 2
        },
        items: commonconfig.port.values
        // name: 'json',

        // extra: [{
        //   type: 'advanced',
        //   text: 'Advanced',
        //   width: 2,
        //   items: [{
        //     type: 'combo',
        //     remote: true,
        //     server: {
        //       display: 'name',
        //       title: 'description',
        //       value: 'id'
        //     },
        //     label: {
        //       text: 'Agent',
        //       type: 'attach',
        //       width: 3
        //     },
        //     name: 'agentid'
        //   }, {
        //     type: 'combo',
        //     label: {
        //       text: 'Check Interval',
        //       width: 3
        //     },
        //     items: commonconfig.checkinterval.values,
        //     width: MAX_WIDTH,
        //     name: 'checkinterval'
        //   }, {
        //     type: 'check',
        //     label: {
        //       text: 'Enabled',
        //       width: 3
        //     },
        //     name: 'enabled',
        //     checked: true,
        //     value: 1,
        //     width: 9
        //   }]
        // }]
      }]
    }]
  },

  'monitor-sql': {
    title: 'SQL',
    server: {
      params: {
        type: 'jdbc_query'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 2
        },
        name: 'name',
        required: true
      }, {
        type: 'radiogroup',
        name: 'devstatus',
        width: MAX_WIDTH,
        label: {
          text: 'Device',
          type: 'attach',
          width: 2
        },
        items: [{
          label: 'Existing Device',
          width: 3,
          items: [{
            type: 'combo',
            name: 'fatherid',
            remote: true,
            label: {
              text: 'Device',
              type: 'attach',
              width: 2
            },
            server: {
              display: 'name',
                            // params : ['fatherid', 'mapid'],
              value: 'id'
            },
            required: true,
            style: {
              'padding-right': '40%'
            }
          }]
        }, {
          label: 'No Device Attached',
          width: 6,
          items: [{
            type: 'text',
            label: {
              text: 'IP',
              type: 'attach',
              width: 2
            },
            name: 'ipaddress',
            required: true,
            style: {
              'padding-right': '40%'
            }
          }, {
            type: 'combo',
            remote: true,
            server: {
              display: 'name',
              title: 'description',
              value: 'id'
            },
            label: {
              text: 'Agent',
              type: 'attach',
              width: 2
            },
            width: MAX_WIDTH,
            name: 'agentid'
          }]
        }]
      }, {
        type: 'combo',
        name: 'dbtype',
        label: {
          text: 'DB Type',
          width: 2
        },
        items: [{
          display: 'MSSQL',
          value: 'sql'
        }, {
          display: 'Oracle',
          value: 'oracle'
        }, {
          display: 'MySQL',
          value: 'mysql'
        }]
      }, {
        type: 'text',
        label: {
          text: 'DB Name',
          type: 'attach',
          width: 2
        },
        required: true,
        name: 'dbname'
      }, {
        type: 'text',
        label: {
          text: 'Query',
          type: 'attach',
          width: 2
        },
        required: true,
        name: 'query'
      },
        commonconfig.expectedType,
        commonconfig.credentialsMenu(),
      {
        type: 'label',
        text: '',
        width: 2
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 10,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          label: {
            text: 'Threshold',
            type: 'attach',
            width: 3
          },
          type: 'combo',
          items: commonconfig.threshold.values,
          name: 'threshHold',
          required: true
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }, {
          type: 'check',
          label: {
            text: 'Enabled',
            width: 3
          },
          name: 'enabled',
          checked: true,
          value: 1,
          width: 9
        }]
      }]
    }]
  },

  'monitor-web': {
    title: 'WebService',
    server: {
      params: {
        type: 'Webservice'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 2
        }
      }, {
        type: 'text',
        label: {
          text: 'URI',
          type: 'attach',
          width: 2
        },
        required: true,
        name: 'uri'
      }, {
        type: 'text',
        label: {
          text: 'Request',
          type: 'attach',
          width: 2
        },
        required: true,
        name: 'requestP'
      }, {
        type: 'text',
        label: {
          text: 'Contains',
          type: 'attach',
          width: 2
        },
        required: true,
        name: 'contains'
      }, {
        type: 'text',
        label: {
          text: 'Action',
          type: 'attach',
          width: 2
        },
        required: true,
        name: 'action'
      },
        commonconfig.credentialsMenu(),
      {
        type: 'label',
        text: '',
        width: 2
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 10,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }, {
          type: 'check',
          label: {
            text: 'Enabled',
            width: 3
          },
          name: 'enabled',
          checked: true,
          value: 1,
          width: 9
        }]
      }]
    }]
  },

  'monitor-db-table': {
    title: 'SQL',
    server: {
      params: {
        type: 'DBTableMonitor'
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 2
        },
        name: 'name',
        required: true
      }, {
        type: 'text',
        label: {
          text: 'DB',
          type: 'attach',
          width: 2
        },
        name: 'db'
      }, {
        type: 'text',
        label: {
          text: 'Table',
          type: 'attach',
          width: 2
        },
        name: 'table'
      }, {
        type: 'text',
        label: {
          text: 'ID',
          type: 'attach',
          width: 2
        },
        name: 'id'
      },
        commonconfig.credentialsMenu(), {
          type: 'label',
          text: '',
          width: 2
        }, {
          type: 'advanced',
          text: 'Advanced',
          width: 10,
          items: [{
            type: 'combo',
            remote: true,
            server: {
              display: 'name',
              title: 'description',
              value: 'id'
            },
            label: {
              text: 'Agent',
              type: 'attach',
              width: 3
            },
            name: 'agentid'
          }, {
            label: {
              text: 'Threshold',
              type: 'attach',
              width: 3
            },
            type: 'combo',
            items: commonconfig.threshold.values,
            name: 'threshHold',
            required: true
          }, {
            type: 'combo',
            label: {
              text: 'Check Interval',
              width: 3
            },
            items: commonconfig.checkinterval.values,
            width: MAX_WIDTH,
            name: 'checkinterval'
          }, {
            type: 'check',
            label: {
              text: 'Enabled',
              width: 3
            },
            name: 'enabled',
            checked: true,
            value: 1,
            width: 9
          }]
        }]
    }]
  },

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Rules

  'devicerule': {
    title: 'Rule',
    server: {
      params: {}
    },
    steps: [ {
      title: 'step 1',
      items: [ {
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 2
        }
      }, {
        type: 'combo',
        items: [{
          display: 'High',
          value: 'High'
        }, {
          display: 'Medium',
          value: 'Medium'
        }, {
          display: 'Low',
          value: 'Low'
        }, {
          display: 'Audit',
          value: 'Audit'
        }, {
          display: 'Device',
          value: 'Device'
        }, {
          display: 'Ignore',
          value: 'Ignore'
        }, {
          display: 'Ignore/Delete',
          value: 'IgnoreDelete'
        }],
        label: {
          text: 'Severity',
          type: 'Attach',
          width: 2
        },
        name: 'severity'
      }, {
        type: 'combo',
        name: 'ruleCategory',
        remote: true,
        label: {
          text: 'Category',
          type: 'attach',
          width: 2
        },
        server: {
          display: 'name',
          value: 'id'
        }

      }, {
        type: 'text',
        name: 'rewriteval',
        required: true,
        label: {
          text: 'Rewriteval',
          type: 'attach',
          width: 2
        }
      }, {
        type: 'check',
        label: {
          text: 'Enabled',
          type: 'attach',
          width: 2
        },
        name: 'enabled',
        checked: true,
        value: 1
      }]
    }, {
      title: 'step 2',
      items: [{
        type: 'text',
        name: 'filter1',
        label: {
          text: 'Filter1',
          type: 'attach',
          width: 2
        }
      }, {
        type: 'text',
        name: 'filter2',
        label: {
          text: 'Filter2',
          type: 'attach',
          width: 2
        }
      }, {
        type: 'text',
        name: 'parser',
        label: {
          text: 'Parser',
          type: 'attach',
          width: 2
        }
      }, {
        type: 'text',
        name: 'ignorefilter',
        label: {
          text: 'Ignore',
          type: 'attach',
          width: 2
        }
      }, {
        type: 'mtable',
        prefix: 'm',
        cls: 'p-none'
      }]
    }]
  },

  'tplrule': {
    title: 'Rule',
    server: {
      params: {}
    },
    steps: [ {
      title: 'step 1',
      items: [ {
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 2
        }
      }, {
        type: 'combo',
        items: [{
          display: 'High',
          value: 'High'
        }, {
          display: 'Medium',
          value: 'Medium'
        }, {
          display: 'Low',
          value: 'Low'
        }, {
          display: 'Audit',
          value: 'Audit'
        }],
        label: {
          text: 'Severity',
          type: 'Attach',
          width: 2
        },
        name: 'severity'
      }, {
        type: 'text',
        name: 'rewriteval',
        required: true,
        label: {
          text: 'Rewriteval',
          type: 'attach',
          width: 2
        }
      }, {
        type: 'combo',
        remote: true,
        multiple: true,
        server: {
          root: ['object'],
          display: 'devicename',
          value: 'id'
        },
        label: {
          text: 'Type',
          type: 'Attach',
          width: 2
        },
        name: 'devicetypes'
      }, {
        type: 'check',
        label: {
          text: 'Enabled',
          type: 'attach',
          width: 2
        },
        name: 'enabled',
        checked: true,
        value: 1
      }]
    }, {
      title: 'step 2',
      items: [{
        type: 'text',
        name: 'filter1',
        label: {
          text: 'Filter1',
          type: 'attach',
          width: 2
        }
      }, {
        type: 'text',
        name: 'filter2',
        label: {
          text: 'Filter2',
          type: 'attach',
          width: 2
        }
      }, {
        type: 'text',
        name: 'parser',
        label: {
          text: 'Parser',
          type: 'attach',
          width: 2
        }
      }, {
        type: 'combo',
        items: commonconfig.m1.values,
        label: {
          text: 'M1',
          type: 'attach',
          width: 2
        },
        width: 6,
        name: 'm1'
      }, {
        type: 'combo',
        items: commonconfig.m1.values,
        label: {
          text: 'M2',
          type: 'attach',
          width: 2
        },
        width: 6,
        name: 'm2'
      }, {
        type: 'combo',
        items: commonconfig.m1.values,
        label: {
          text: 'M3',
          type: 'attach',
          width: 2
        },
        width: 6,
        name: 'm3'
      }, {
        type: 'combo',
        items: commonconfig.m1.values,
        label: {
          text: 'M4',
          type: 'attach',
          width: 2
        },
        width: 6,
        name: 'm4'
      }, {
        type: 'combo',
        items: commonconfig.m1.values,
        label: {
          text: 'M5',
          type: 'attach',
          width: 2
        },
        width: 6,
        name: 'm5'
      }]
    }]
  }
}

export const wizardEditConfig = {
    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Devices

  'server': {
    title: 'Server',
    server: {
      params: {}
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        },

        required: true,
        name: 'name'
      }, {
        type: 'combo',
        remote: true,
        server: {
          display: 'name',
          title: 'description',
          value: 'id'
        },
        label: {
          text: 'Agent',
          type: 'attach',
          width: 3
        },

        name: 'agentid'
      }, {
        type: 'combo',
        label: {
          text: 'Check Interval',
          width: 3
        },
        items: commonconfig.checkinterval.values,

        name: 'checkinterval'
      }, {
        type: 'text',
        label: {
          text: 'IP',
          type: 'attach',
          width: 3
        },
        required: true,
        name: 'ipaddress'
      }, {
        type: 'text',
        label: {
          text: 'Host',
          type: 'attach',
          width: 3
        },

        name: 'hostname'
      }, commonconfig.credentialsMenu(3),
        commonconfig.info,
        commonconfig.enablecheck, {
          type: 'uploader',
          label: {
            text: 'Image',
            type: 'attach',
            width: 3
          },

          name: 'customimage'
        }, {
          type: 'text',
          label: {
            text: 'External IP',
            type: 'attach',
            width: 3
          },
          name: 'externalIP'
        }]
    }]
  },

  'website': {
    title: 'Website',
    server: {
      params: {
        credential: -1
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        },

        required: true,
        name: 'name'
      }, {
        type: 'combo',
        remote: true,
        server: {
          display: 'name',
          title: 'description',
          value: 'id'
        },
        label: {
          text: 'Agent',
          type: 'attach',
          width: 3
        },

        name: 'agentid'
      },
      {
        type: 'combo',
        label: {
          text: 'Check Interval',
          width: 3
        },
        items: commonconfig.checkinterval.values,

        name: 'checkinterval'
      }, {
        type: 'uploader',
        label: {
          text: 'Image',
          type: 'attach',
          width: 3
        },

        name: 'customimage'
      }, commonconfig.info, commonconfig.enablecheck]
    }]
  },

  'group': {
    title: 'Group',
    server: {
      params: {}
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        },

        required: true,
        name: 'name'
      }, commonconfig.info, commonconfig.enablecheck, {
        type: 'uploader',
        label: {
          text: 'Image',
          type: 'attach',
          width: 3
        },

        name: 'customimage'
      }]
    }]
  },

  'router': {
    title: 'Router',
    server: {
      params: {
        credential: -1
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        },

        required: true,
        name: 'name'
      }, {
        type: 'combo',
        remote: true,
        server: {
          display: 'name',
          title: 'description',
          value: 'id'
        },
        label: {
          text: 'Agent',
          type: 'attach',
          width: 3
        },

        name: 'agentid'
      }, {
        type: 'text',
        label: {
          text: 'IP',
          type: 'attach',
          width: 3
        },
        required: true,
        name: 'ipaddress'
      }, {
        type: 'text',
        label: {
          text: 'Host',
          type: 'attach',
          width: 3
        },

        name: 'hostname'
      }, commonconfig.info, commonconfig.enablecheck, {
        type: 'uploader',
        label: {
          text: 'Image',
          type: 'attach',
          width: 3
        },

        name: 'customimage'
      }]
    }]
  },

  'firewall': {
    title: 'Firewall',
    server: {
      params: {
        credential: -1
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        },

        required: true,
        name: 'name'
      }, {
        type: 'combo',
        remote: true,
        server: {
          display: 'name',
          title: 'description',
          value: 'id'
        },
        label: {
          text: 'Agent',
          type: 'attach',
          width: 3
        },

        name: 'agentid'
      }, {
        type: 'text',
        label: {
          text: 'IP',
          type: 'attach',
          width: 3
        },
        required: true,
        name: 'ipaddress'
      }, {
        type: 'text',
        label: {
          text: 'Host',
          type: 'attach',
          width: 3
        },

        name: 'hostname'
      }, commonconfig.info, commonconfig.enablecheck, {
        type: 'uploader',
        label: {
          text: 'Image',
          type: 'attach',
          width: 3
        },

        name: 'customimage'
      }]
    }]
  },

  'internet': {
    title: 'Internet',
    server: {
      params: {
        credential: -1
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        },

        required: true,
        name: 'name'
      }, {
        type: 'combo',
        remote: true,
        server: {
          display: 'name',
          title: 'description',
          value: 'id'
        },
        label: {
          text: 'Agent',
          type: 'attach',
          width: 3
        },

        name: 'agentid'
      }, {
        type: 'text',
        label: {
          text: 'IP',
          type: 'attach',
          width: 3
        },
        required: true,
        name: 'ipaddress'
      }, {
        type: 'text',
        label: {
          text: 'Host',
          type: 'attach',
          width: 3
        },

        name: 'hostname'
      }, commonconfig.info, commonconfig.enablecheck, {
        type: 'uploader',
        label: {
          text: 'Image',
          type: 'attach',
          width: 3
        },

        name: 'customimage'
      }]
    }]
  },

  'db-mysql': {
    title: 'MySQL DB',
    server: {
      params: {}
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        },
        style: {
          'padding-right': '52%'
        },
        required: true,
        name: 'name'
      }, {
        type: 'text',
        label: {
          text: 'IP',
          type: 'attach',
          width: 3
        },
        name: 'ipaddress',
        pattern: /((^|\.)((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]?\d))){4}$/,
        required: true

      }, {
        type: 'text',
        label: {
          text: 'Host',
          type: 'attach',
          width: 3
        },

        name: 'hostname'
      }, {
        type: 'text',
        label: {
          text: 'Port',
          type: 'attach',
          width: 3
        },

        required: true,
        name: 'port'
      }, {
        type: 'text',
        label: {
          text: 'OS Username',
          type: 'attach',
          width: 3
        },

        required: true,
        name: 'osusername'
      }, {
        type: 'text',
        label: {
          text: 'OS Password',
          type: 'attach',
          width: 3
        },

        required: true,
        name: 'ospassword'
      }, {
        type: 'text',
        label: {
          text: 'DB Username',
          type: 'attach',
          width: 3
        },

        required: true,
        name: 'dbusername'
      }, {
        type: 'text',
        label: {
          text: 'DB Password',
          type: 'attach',
          width: 3
        },

        required: true,
        name: 'dbpassword'
      }, commonconfig.info, commonconfig.enablecheck, {
        type: 'uploader',
        label: {
          text: 'Image',
          type: 'attach',
          width: 3
        },

        name: 'customimage'
      }]
    }],
    advanced: [{
      type: 'combo',
      remote: true,
      server: {
        display: 'name',
        title: 'description',
        value: 'id'
      },
      label: {
        text: 'Agent',
        type: 'attach',
        width: 3
      },

      name: 'agentid'
    }, {
      type: 'combo',
      label: {
        text: 'Check Interval',
        width: 3
      },
      items: commonconfig.checkinterval.values,

      name: 'checkinterval'
    }]
  },
  'db-oracle': {
    title: 'Oracle DB',
    server: {
      params: {}
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        },
        style: {
          'padding-right': '52%'
        },
        required: true,
        name: 'name'
      }, {
        type: 'text',
        label: {
          text: 'IP',
          type: 'attach',
          width: 3
        },
        name: 'ipaddress',
        pattern: /((^|\.)((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]?\d))){4}$/,
        required: true

      }, {
        type: 'text',
        label: {
          text: 'Host',
          type: 'attach',
          width: 3
        },

        name: 'hostname'
      }, {
        type: 'text',
        label: {
          text: 'Port',
          type: 'attach',
          width: 3
        },

        required: true,
        name: 'port'
      }, {
        type: 'text',
        label: {
          text: 'OS Username',
          type: 'attach',
          width: 3
        },

        required: true,
        name: 'osusername'
      }, {
        type: 'text',
        label: {
          text: 'OS Password',
          type: 'attach',
          width: 3
        },

        required: true,
        name: 'ospassword'
      }, {
        type: 'text',
        label: {
          text: 'DB Username',
          type: 'attach',
          width: 3
        },

        required: true,
        name: 'dbusername'
      }, {
        type: 'text',
        label: {
          text: 'DB Password',
          type: 'attach',
          width: 3
        },

        required: true,
        name: 'dbpassword'
      }, commonconfig.info, commonconfig.enablecheck, {
        type: 'uploader',
        label: {
          text: 'Image',
          type: 'attach',
          width: 3
        },

        name: 'customimage'
      }]
    }],
    advanced: [{
      type: 'combo',
      remote: true,
      server: {
        display: 'name',
        title: 'description',
        value: 'id'
      },
      label: {
        text: 'Agent',
        type: 'attach',
        width: 3
      },

      name: 'agentid'
    }, {
      type: 'combo',
      label: {
        text: 'Check Interval',
        width: 3
      },
      items: commonconfig.checkinterval.values,

      name: 'checkinterval'
    }]
  },

  'db-mssql': {
    title: 'Oracle DB',
    server: {
      params: {}
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        },
        style: {
          'padding-right': '52%'
        },
        required: true,
        name: 'name'
      }, {
        type: 'text',
        label: {
          text: 'IP',
          type: 'attach',
          width: 3
        },
        name: 'ipaddress',
        pattern: /((^|\.)((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]?\d))){4}$/,
        required: true

      }, {
        type: 'text',
        label: {
          text: 'Host',
          type: 'attach',
          width: 3
        },

        name: 'hostname'
      }, {
        type: 'text',
        label: {
          text: 'Port',
          type: 'attach',
          width: 3
        },

        required: true,
        name: 'port'
      }, {
        type: 'text',
        label: {
          text: 'OS Username',
          type: 'attach',
          width: 3
        },

        required: true,
        name: 'osusername'
      }, {
        type: 'text',
        label: {
          text: 'OS Password',
          type: 'attach',
          width: 3
        },

        required: true,
        name: 'ospassword'
      }, {
        type: 'text',
        label: {
          text: 'DB Username',
          type: 'attach',
          width: 3
        },

        required: true,
        name: 'dbusername'
      }, {
        type: 'text',
        label: {
          text: 'DB Password',
          type: 'attach',
          width: 3
        },

        required: true,
        name: 'dbpassword'
      }, commonconfig.info, commonconfig.enablecheck, {
        type: 'uploader',
        label: {
          text: 'Image',
          type: 'attach',
          width: 3
        },

        name: 'customimage'
      }]
    }],
    advanced: [{
      type: 'combo',
      remote: true,
      server: {
        display: 'name',
        title: 'description',
        value: 'id'
      },
      label: {
        text: 'Agent',
        type: 'attach',
        width: 3
      },

      name: 'agentid'
    }, {
      type: 'combo',
      label: {
        text: 'Check Interval',
        width: 3
      },
      items: commonconfig.checkinterval.values,

      name: 'checkinterval'
    }]

  },

  'custom': {
    title: 'Custom',
    width: POPUP_WIDTH_SM,
    server: {
      params: {

      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        },
        width: MAX_WIDTH,
        required: true,
        name: 'name'
      }, {
        type: 'text',
        label: {
          text: 'WAN IP',
          type: 'attach',
          width: 3
        },
        width: MAX_WIDTH,
        name: 'wanip'
      }, {
        type: 'text',
        label: {
          text: 'LAN IP',
          type: 'attach',
          width: 3
        },
        width: MAX_WIDTH,
        name: 'lanip'
      }, {
        type: 'text',
        label: {
          text: 'Info',
          type: 'attach',
          width: 3
        },
        width: MAX_WIDTH,
        name: 'info'
      }, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 10,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, commonconfig.info, commonconfig.enablecheck, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }]
  },

  'pc': {
    title: 'PC',
    width: POPUP_WIDTH_SM,
    server: {
      params: {
        credentialid: -1
      }
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        },
        width: MAX_WIDTH,
        required: true,
        name: 'name'
      }, {
        type: 'combo',
        label: {
          text: 'OS',
          width: 3
        },
        items: [{
          display: 'Windows 8',
          value: 'win8'
        }, {
          display: 'Windows 7',
          value: 'win7'
        }, {
          display: 'Windows XP',
          value: 'winxp'
        }],
        width: MAX_WIDTH,
        name: 'os'
      }, {
        type: 'text',
        label: {
          text: 'IP Address',
          type: 'attach',
          width: 3
        },
        required: true,
        name: 'ipaddress'
      }, {
        type: 'combo',
        name: 'usertatus',
        label: {
          text: 'User',
          type: 'attach',
          width: 3
        },
        width: MAX_WIDTH,
        items: [{
          display: 'Existing User',
          value: 0
        }, {
          display: 'New User',
          value: 1,
          form: [{
            type: 'form', // specific for windows
            server: {
              value: 'id',
              label: 'username'
            },
            result: 'credentialid',
            items: [{// will show when checked
              type: 'text',
              required: true,
              label: {
                text: 'User Name',
                type: 'attach',
                width: 3
              },
              name: 'username'
            }, {
              type: 'password',
              required: true,
              label: {
                text: 'Password',
                type: 'attach',
                width: 3
              },
              name: 'password'
            }, {
              type: 'text',
              label: {
                text: 'Description',
                type: 'attach',
                width: 3
              },
              name: 'description',
              required: true,
              width: MAX_WIDTH
            }, {
              type: 'label',
              html: '',
              width: 3
            }, {
              type: 'check',
              label: 'Domain',
              name: 'isDomainUser',
              width: 9,
              checked: true,
              value: 1,
              items: [{
                type: 'text',
                label: {
                  text: 'Domain Name',
                  type: 'attach',
                  width: 3
                },
                name: 'domainName',
                required: true
              }]
            }]
          }]
        }]
      }, {
        type: 'combo',
        name: 'credentialid',
        remote: true,
        label: {
          text: 'Credential',
          type: 'attach',
          width: 3
        },
        server: {
          root: 'data',
          display: 'userDescription',
          value: 'id'
        }
      }, commonconfig.info, commonconfig.enablecheck, {
        type: 'uploader',
        label: {
          text: 'Image',
          type: 'attach',
          width: 3
        },

        name: 'customimage'
      }, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }]
  },

  'antivirus': {
    title: 'Antivirus',
    width: POPUP_WIDTH_SM,
    server: {
      params: {}
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        },
        width: 6
      }, {
        type: 'text',
        label: {
          text: 'IP Address',
          type: 'attach',
          width: 3
        },
        required: true,
        name: 'ipaddress',
        width: 6
      }, commonconfig.info, commonconfig.enablecheck, {
        type: 'uploader',
        label: {
          text: 'Image',
          type: 'attach',
          width: 3
        },

        name: 'customimage'
      }]
    }]
  },

  'nac': {
    title: 'NAC',
    width: POPUP_WIDTH_SM,
    server: {
      params: {}
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        }
      }, {
        type: 'text',
        label: {
          text: 'IP Address',
          type: 'attach',
          width: 3
        },
        required: true,
        name: 'ipaddress'
      }, commonconfig.info, commonconfig.enablecheck, {
        type: 'uploader',
        label: {
          text: 'Image',
          type: 'attach',
          width: 3
        },

        name: 'customimage'
      }, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }, {
          type: 'combo',
          name: 'credentialid',
          label: {
            text: 'User',
            width: 3
          },
          remote: true,
          server: {
            root: 'data',
            display: 'userDescription',
            value: 'id'
          }
        }]
      }]
    }]
  },

  'safend': {
    title: 'Safend',
    width: POPUP_WIDTH_SM,
    server: {
      params: {}
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        }
      }, {
        type: 'text',
        label: {
          text: 'IP Address',
          type: 'attach',
          width: 3
        },
        required: true,
        name: 'ipaddress'
      }, commonconfig.info, commonconfig.enablecheck, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }]
  },

  'telephony': {
    title: 'telephony',
    width: POPUP_WIDTH_SM,
    server: {
      params: {}
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        }
      }, {
        type: 'text',
        label: {
          text: 'IP Address',
          type: 'attach',
          width: 3
        },
        required: true,
        name: 'ipaddress'
      }, commonconfig.info, commonconfig.enablecheck, {
        type: 'uploader',
        label: {
          text: 'Image',
          type: 'attach',
          width: 3
        },

        name: 'customimage'
      }, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }]
  },

  'jetro': {
    title: 'Jetro',
    width: POPUP_WIDTH_SM,
    server: {
      params: {}
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        }
      }, {
        type: 'text',
        label: {
          text: 'IP Address',
          type: 'attach',
          width: 3
        },
        required: true,
        name: 'ipaddress'
      }, {
        type: 'uploader',
        label: {
          text: 'Image',
          type: 'attach',
          width: 3
        },

        name: 'customimage'
      }, commonconfig.info, commonconfig.enablecheck, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }]
  },

  'customers': {
    title: 'Customers',
    width: POPUP_WIDTH_SM,
    server: {
      params: {}
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        }
      }, {
        type: 'text',
        label: {
          text: 'IP Address',
          type: 'attach',
          width: 3
        },
        required: true,
        name: 'ipaddress'
      }, commonconfig.info, commonconfig.enablecheck, {
        type: 'uploader',
        label: {
          text: 'Image',
          type: 'attach',
          width: 3
        },

        name: 'customimage'
      }, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }]
  },

  'drsite': {
    title: 'DR Site',
    width: POPUP_WIDTH_SM,
    server: {
      params: {}
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        }
      }, {
        type: 'text',
        label: {
          text: 'IP Address',
          type: 'attach',
          width: 3
        },
        required: true,
        name: 'ipaddress'
      }, commonconfig.info, commonconfig.enablecheck, {
        type: 'uploader',
        label: {
          text: 'Image',
          type: 'attach',
          width: 3
        },

        name: 'customimage'
      }, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }]
  },

  'partners': {
    title: 'Partners',
    width: POPUP_WIDTH_SM,
    server: {
      params: {}
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        }
      }, {
        type: 'text',
        label: {
          text: 'IP Address',
          type: 'attach',
          width: 3
        },
        required: true,
        name: 'ipaddress'
      }, commonconfig.info, commonconfig.enablecheck, {
        type: 'uploader',
        label: {
          text: 'Image',
          type: 'attach',
          width: 3
        },

        name: 'customimage'
      }, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }]
      }]
    }]
  },

  'ips': {
    title: 'IPS',
    width: POPUP_WIDTH_SM,
    server: {
      params: {}
    },
    steps: [{
      title: 'step 1',
      items: [{
        type: 'text',
        name: 'name',
        required: true,
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        }
      }, {
        type: 'text',
        label: {
          text: 'IP Address',
          type: 'attach',
          width: 3
        },
        required: true,
        name: 'ipaddress'
      }, commonconfig.info, commonconfig.enablecheck, {
        type: 'uploader',
        label: {
          text: 'Image',
          type: 'attach',
          width: 3
        },

        name: 'customimage'
      }, {
        type: 'label',
        text: '',
        width: 3
      }, {
        type: 'advanced',
        text: 'Advanced',
        width: 9,
        items: [{
          type: 'combo',
          remote: true,
          server: {
            display: 'name',
            title: 'description',
            value: 'id'
          },
          label: {
            text: 'Agent',
            type: 'attach',
            width: 3
          },
          name: 'agentid'
        }, {
          type: 'combo',
          label: {
            text: 'Check Interval',
            width: 3
          },
          items: commonconfig.checkinterval.values,
          width: MAX_WIDTH,
          name: 'checkinterval'
        }, {
          type: 'combo',
          name: 'credentialid',
          label: {
            text: 'User',
            width: 3
          },
          remote: true,
          server: {
            root: 'data',
            display: 'userDescription',
            value: 'id'
          }
        }, {
          type: 'label',
          text: 'Show Destination IP',
          width: 3,
          style: {
            'margin-top': '-8px',
            'margin-bottom': '0'
          }
        }, {
          type: 'check',
          label: ' ',
          name: 'showDestination',
          checked: true,
          value: 1,
          width: 9
        }]
      }]
    }]
  }
}
