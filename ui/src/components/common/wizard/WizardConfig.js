export const MAX_WIDTH = 12
const POPUP_WIDTH_SM = 600

export const deviceTypeMap = {
  'Group': 'group',
  'Telephony': 'group',
  'Jetro': 'group',
  'Customers': 'group',
  'DR Site': 'group',
  'Partners': 'group',

  'Linux Server': 'linux',

  'Long hub': 'longhub',
  'Free Text': 'usertext'
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
  distribution: {
    values: [{
      display: 'Red Hat',
      value: 'redhat'
    }, {
      display: 'Fedora',
      value: 'fedora'
    }, {
      display: 'Cent OS',
      value: 'centos'
    }, {
      display: 'Ubuntu',
      value: 'ubuntu'
    }, {
      display: 'Debian',
      value: 'debian'
    }, {
      display: 'Kali',
      value: 'kali'
    }]
  }
}

export const wizardConfig = {

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Devices

  'group': {
    title: 'Group',
    server: {
      url: '/group',
      params: {}
    },
    steps: [{
      title: 'Basic',
      panels: [{
        items: [{
          type: 'text',
          label: {
            text: 'Name',
            type: 'attach',
            width: 3
          },
          required: true,
          name: 'name'
        }]
      }]
    }]
  },

  'custom': {
    title: 'Custom',
    width: POPUP_WIDTH_SM,
    server: {
      url: '/device',
      params: {
        type: 'Custom Device'
      }
    },
    steps: [{
      title: 'Settings',
      panels: [{
        title: 'Basic',
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
            text: 'IP',
            type: 'attach',
            width: 3
          },
          width: MAX_WIDTH,
          name: 'wanip'
        }]
      }, {
        title: 'Credentials',
        items: [{
          type: 'credpicker'
        }]
      }],
    }, {
      title: 'Monitors',
      panels: [{
        skip: true,
        items: [{
          type: 'monitors',
          title: 'Monitors'
        }]
      }]

    }, {
      title: 'Advanced',
      panels: [{
        title: 'Advanced',
        items: [{
          type: 'text',
          label: {
            text: 'LAN IP',
            type: 'attach',
            width: 3
          },
          width: MAX_WIDTH,
          name: 'lanip'
        }]
      }]
    }]
  },

  'linux': {
    title: 'Custom',
    width: POPUP_WIDTH_SM,
    server: {
      url: '/device',
      params: {
        type: 'Custom Device'
      }
    },
    steps: [{
      title: 'Settings',
      panels: [{
        title: 'Basic',
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
            text: 'Distribution',
            width: 3
          },
          items: commonconfig.distribution.values,
          width: MAX_WIDTH,
          required: true,
          name: 'distribution'
        }, {
          type: 'text',
          label: {
            text: 'IP',
            type: 'attach',
            width: 3
          },
          width: MAX_WIDTH,
          name: 'wanip'
        }]
      }, {
        title: 'Credentials',
        items: [{
          type: 'credpicker'
        }]
      }],
    }, {
      title: 'Monitors',
      panels: [{
        skip: true,
        items: [{
          type: 'monitors',
          title: 'Monitors'
        }]
      }]

    }, {
      title: 'Advanced',
      panels: [{
        title: 'Advanced',
        items: [{
          type: 'text',
          label: {
            text: 'LAN IP',
            type: 'attach',
            width: 3
          },
          width: MAX_WIDTH,
          name: 'lanip'
        }]
      }]
    }]
  },

  'custom-edit': {
    title: 'Custom',
    width: POPUP_WIDTH_SM,
    server: {
      url: '/device',
      params: {
        type: 'Custom Device'
      }
    },
    steps: [{
      title: 'Settings',
      panels: [{
        title: 'Basic',
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
            text: 'IP',
            type: 'attach',
            width: 3
          },
          width: MAX_WIDTH,
          name: 'wanip'
        }]
      }, {
        title: 'Agent',
        items: [{
          type: 'agentpicker'
        }]
      }],
    }, {
      title: 'Monitors',
      panels: [{
        skip: true,
        items: [{
          type: 'monitors',
          title: 'Monitors'
        }]
      }]

    }, {
      title: 'Advanced',
      panels: [{
        title: 'Advanced',
        items: [{
          type: 'text',
          label: {
            text: 'LAN IP',
            type: 'attach',
            width: 3
          },
          width: MAX_WIDTH,
          name: 'lanip'
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
      panels: [{
        title: 'Basic',
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
    }]
  }
}

export const wizardEditConfig = {
    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Devices

  'group': {
    title: 'Group',
    server: {
      url: '/group',
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

  'custom': {
    title: 'Custom',
    width: POPUP_WIDTH_SM,
    server: {
      url: '/device',
      params: {

      }
    },
    steps: [{
      title: 'Basic',
      items: [{
        type: 'text',
        label: {
          text: 'Name',
          type: 'attach',
          width: 3
        },
        width: MAX_WIDTH,
        required: true,
        name: 'name',
        cls: 'pull-left'
      }, {
        type: 'uploader',
        label: {
          text: 'Image',
          type: 'attach',
          width: 3
        },
        cls: 'pull-right margin-md-top',
        name: 'image'
      }, {
        type: 'text',
        label: {
          text: 'IP',
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
  }
}
