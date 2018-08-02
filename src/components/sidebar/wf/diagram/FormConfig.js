const forms = {
    "taskForm": [
        {
            "key": "name",
            "name": "Name"
        }, {
            "key": "type",
            "name": "Type",
            "type": "select",
            "options": [{
                "label": "Basic",
                "value": "basic"
            }, {
                "label": "Knowledge",
                "value": "knowledge"
            }]
        }
    ],
    "ruleForm": [
        {
            "key": "condition",
            "name": "Condition",
            "type": "select",
            "options": [{
                "label": "If Match Text",
                "value": "If Match Text"
            }, {
                "label": "If Contains Text",
                "value": "contains"
            }]
        },
        {
            "key": "sentence",
            "name": "Sentence"
        },
        {
            "key": "response",
            "name": "Response"
        },
        {
            "key": "variable",
            "name": "Variable",
            "default": "response"
        }
    ],
    "decisionForm": [{
        "form": "Decision"
    }],
    "excludeForm": [{
        "form": "Exclude"
    }],
    "multiDecisionForm": [{
        "form": "MultiDecision"
    }],
    "mapperForm": [{
        "form": "Mapper"
    }],
    "buildForm": [{
       "form": "Build"
    }],
    "ocurrenceForm": [{
        "key": "name",
        "name": "Name"
    }, {
        "key": "variable",
        "name": "Variable Name"
    }],
    "flowFinishForm": [{
        "form": "FlowFinish"
    }],
    "shareVarForm": [{
        "form": "ShareVar"
    }],
    "generalMonitorForm": [{
        "form": "GeneralMonitor"
    }],
    "serviceMonitorForm": [{
        "form": "ServiceMonitor"
    }],
    "pingForm": [{
        "key": "name",
        "name": "Name"
    }, {
        "key": "ip",
        "name": "IP"
    }],
    "remotePingForm": [{
        "form": "RemotePing"
    }],
    "imQueryForm": [{
        "form": "IMQuery",
        "default": {
            params: [
                {name: 'page', value: '0'},
                {name: 'size', value: '1'},
                {name: 'types', value: 'event'},
                {name: 'from', value: '0'}
            ],
            resVars: [
                {name: 'count', value: '/page/totalElements'}
            ]
        }
    }],
    "actionDetailForm": [{
        "key": "name",
        "name": "Name"
    }, {
        "key": "contentType",
        "name": "Content Type",
        "type": "select",
        "options": [{
            "label": "Simple",
            "value": "SIMPLE"
        }, {
            "label": "Variable",
            "value": "VARIABLE"
        }, {
            "label": "Combined",
            "value": "COMBINED"
        }]
    }, {
        "key": "channel",
        "name": "Channel",
        "type": "select",
        "options": [{
            "label": "Don't override",
            "value": ""
        }, {
            "label": "Slack",
            "value": "Slack"
        }, {
            "label": "RocketChat",
            "value": "RocketChat"
        }]
    }, {
        "key": "room",
        "name": "Room"
    }, {
        "key": "sentence",
        "name": "Sentence",
        "fullWidth": true
    }],
    "functionForm": [
        {
            "key": "name",
            "name": "Name"
        },
        {
            "key": "function",
            "name": "Function",
            "type": "select",
            "options": [{
                "label": "Average",
                "value": "avg"
            }, {
                "label": "TimeAgo",
                "value": "timeago"
            }]
        },
        {
            "key": "field",
            "name": "Field Name"
        },
        {
            "key": "varField",
            "name": "Field Var Name"
        },
        {
            "key": "variable",
            "name": "Output Variable"
        }
    ],
    "restApiForm": [
        {
            "key": "name",
            "name": "Name"
        },
        {
            "key": "url",
            "name": "URL"
        }
    ],
    "sendSmsForm": [
        {
            "key": "name",
            "name": "Name"
        },
        {
            "key": "sms",
            "name": "SMS"
        },
        {
            "key": "recipient",
            "name": "Recipient"
        }
    ],
    "sendEmailForm": [
        {
            "key": "name",
            "name": "Name"
        },
        {
            "key": "receiver",
            "name": "Receiver"
        },
        {
            "key": "title",
            "name": "Title"
        },
        {
            "key": "body",
            "name": "Body"
        }
    ],
    "runCommandForm": [
        {
            "key": "name",
            "name": "Name"
        }, {
            "key": "sentence",
            "name": "Sentence",
            "fullWidth": true
        }
    ],
    "callForm": [
        {
            "key": "name",
            "name": "Name"
        },
        {
            "key": "valueToFind",
            "name": "ValueToFind"
        },
        {
            "key": "function",
            "name": "Function",
            "type": "select",
            "options": [
                {
                    "label": null,
                    "value": null
                }
            ]
        },
        {
            "key": "refId",
            "name": "RefId"
        },
        {
            "key": "mandatoryAttrs",
            "name": "MandatoryAttrs"
        },
        {
            "key": "persistInd",
            "name": "PersistInd"
        }
    ],
    "sendImForm": [{
        "key": "name",
        "name": "Name",
    }, {
        "key": "varField",
        "name": "Variable"
    }],
    "slackUserStatusForm": [{
        "key": "name",
        "name": "Name",
    }, {
        "key": "function",
        "name": "Function",
        "type": "select",
        "options": [
            {
                "label": "Update user online status",
                "value": "updateUserOnlineStatus"
            }
        ]
    }, {
        "key": "variable",
        "name": "Variable",
        "default": "result"
    }],
    "credForm": [{
        "key": "name",
        "name": "Name",
    }, {
        "key": "username",
        "name": "User Name",
    }, {
        "key": "password",
        "name": "Password",
        "type": "password"
    }, {
        "key": "isglobal",
        "name": "Global",
        "type": "checkbox"
    }],
    "linkCredForm": [{
        "key": "name",
        "name": "Name"
    }, {
        "key": "credName",
        "name": "Credential Name"
    }, {
        "key": "deviceName",
        "name": "Device Name"
    }],
    "countForm": [{
        "key": "name",
        "name": "Name",
    }, {
        "key": "variable",
        "name": "Variable"
    }, {
        "key": "sentence",
        "name": "Value",
        "keyField": true
    }, {
        "key": "saveMsg",
        "name": "Save Message",
        "type": "checkbox"
    }],
  "timeLastForm": [{
    "key": "name",
    "name": "Name",
  }, {
    "key": "sentence",
    "name": "Minutes",
    "default": "10"
  }]
}
export default forms