import React from 'react'
import { assign } from 'lodash'

import DRect from './DRect'
import DDiamond from './DDiamond'
import DText from './DText'
import DImgRect from './DImgRect'

import FormConfig from './FormConfig'
const {
    taskForm,
    actionDetailForm,
    functionForm,
    restApiForm,
    sendSmsForm,
    sendEmailForm,
    runCommandForm,
    callForm,
    decisionForm,
    multiDecisionForm,
    buildForm,
    ocurrenceForm,
    flowFinishForm,
    shareVarForm,
    generalMonitorForm,
    serviceMonitorForm,
    pingForm,
    remotePingForm,
    sendImForm,
    imQueryForm,
    slackUserStatusForm,
    credForm,
    linkCredForm
} = FormConfig

export const iw = 24
const rectConfig = {
    visible: true,
    component: DRect,
    img: <g key="1">
        <g />
        <g>
            <g transform="translate(0.5,0.5)">
                <rect x="2" y={iw / 4} width={iw - 3} height={iw / 2} fill="#ffffff" stroke="#000000"/>
            </g>
        </g>
        <g/>
        <g/>
    </g>,
    fill: '#DEFFAD',
    connectionPoints: 12,
    getConnectionPoint: (object, point) => {
        const {x, y, w, h} = object
        const p = [
            {x: 0.25, y: 0},
            {x: 0.5, y: 0},
            {x: 0.75, y: 0},
            {x: 0, y: 0.25},
            {x: 1, y: 0.25},
            {x: 0, y: 0.5},
            {x: 1, y: 0.5},
            {x: 0, y: 0.75},
            {x: 1, y: 0.75},
            {x: 0.25, y: 1},
            {x: 0.5, y: 1},
            {x: 0.75, y: 1}
        ]
        return {
            x: x + w * p[point].x,
            y: y + h * p[point].y
        }
    },
    primaryPoints: [1, 5, 6, 10],
    isTopPoint: (point) => {
        return point === 0 || point === 1 || point === 2
    },
    isLeftPoint: (point) => {
        return point === 3 || point === 5 || point === 7
    },
    isRightPoint: (point) => {
        return point === 4 || point === 6 || point === 8
    },
    isBottomPoint: (point) => {
        return point === 9 || point === 10 || point === 11
    },
    getLeftCenterPoint: () => {
        return 5
    },
    getRightCenterPoint: () => {
        return 6
    },
    getTopCenterPoint: () => {
        return 1
    },
    getBottomCenterPoint: () => {
        return 10
    }
}

const diamondConfig = {
    visible: true,
    component: DDiamond,
    img: <g key="4">
        <g />
        <g>
            <g transform="translate(0.5,0.5)">
                <path d={`M ${iw / 2} 1 L ${iw - 1} ${iw / 2} L ${iw / 2} ${iw - 1} L 1 ${iw / 2} Z`} fill="#ffffff" stroke="#000000" strokeMiterlimit="10"/>
            </g>
        </g>
        <g/>
        <g/>
    </g>,
    fill: '#C9DBFC',
    connectionPoints: 8,
    getConnectionPoint: (object, point) => {
        const {x, y, w, h} = object
        const p = [
            {x: 0.5, y: 0},
            {x: 0.25, y: 0.25},
            {x: 0.75, y: 0.25},
            {x: 0, y: 0.5},
            {x: 1, y: 0.5},
            {x: 0.25, y: 0.75},
            {x: 0.75, y: 0.75},
            {x: 0.5, y: 1}
        ]
        return {
            x: x + w * p[point].x,
            y: y + h * p[point].y
        }
    },
    primaryPoints: [0, 3, 4, 7],
    isTopPoint: (point) => {
        return point === 0 || point === 1 || point === 2
    },
    isLeftPoint: (point) => {
        return point === 1 || point === 3 || point === 5
    },
    isRightPoint: (point) => {
        return point === 2 || point === 4 || point === 6
    },
    isBottomPoint: (point) => {
        return point === 5 || point === 6 || point === 7
    },
    getLeftCenterPoint: () => {
        return 3
    },
    getRightCenterPoint: () => {
        return 4
    },
    getTopCenterPoint: () => {
        return 0
    },
    getBottomCenterPoint: () => {
        return 7
    }
}

const imgRectConfig = assign({}, rectConfig, {
    title: 'Node',
    component: DImgRect,
    w: 50,
    h: 50
})

export const baseConfigs = {
    rectConfig,
    diamondConfig,
    imgRectConfig
}

export const workflowItems = [assign({}, imgRectConfig, {
    // 0
    title: 'Rest API',
    visible: true,
    config: {
        img: '/images/action_api.png'
    },
    img: <g><image href="/images/action_api.png" width={iw} height={iw}/></g>,
    group: 'Collectors',
    form: restApiForm
}), assign({}, rectConfig, {
    // 1
    title: 'Action',
    config: {
        type: 'ACTION'
    },
    form: actionDetailForm
}), assign({}, diamondConfig, {
    // 2
    title: 'Decision',
    config: {
        type: 'DECISION'
    },
    form: decisionForm //ruleForm
}), assign({}, rectConfig, {
    // 3
    title: 'Text',
    visible: false,
    component: DText,
    img: <g key="1">
        <g>
            <text x="18" y="18" textAnchor="middle" dominantBaseline="central" fontSize="12">Text</text>
        </g>
    </g>
}), assign({}, imgRectConfig, {
    // 3
    title: 'Multiple Value Decision',
    config: {
        img: '/images/multidecision.png',
        type: 'MULTIDECISION'
    },
    img: <g><image href="/images/multidecision.png" width={iw} height={iw}/></g>,
    form: multiDecisionForm
}), assign({}, imgRectConfig, {
    // 7
    title: 'Function',
    config: {
        img: '/images/diagram_function.png',
        type: 'FUNCTION'
    },
    img: <g><image href="/images/diagram_function.png" width={iw} height={iw}/></g>,
    form: functionForm
}), assign({}, imgRectConfig, {
    // 3
    title: 'Occurrence',
    config: {
        img: '/images/stack.png',
        type: 'Occurrence'
    },
    img: <g><image href="/images/stack.png" width={iw} height={iw}/></g>,
    form: ocurrenceForm
}), assign({}, imgRectConfig, {
    // 3
    title: 'Workflow Check',
    config: {
        img: '/images/flowfinish.png',
        type: 'WORKFLOWCHECK'
    },
    img: <g><image href="/images/flowfinish.png" width={iw} height={iw}/></g>,
    form: flowFinishForm
}), assign({}, imgRectConfig, {
    // 9
    title: 'Send sms',
    visible: true,
    config: {
        img: '/images/action_sms.png'
    },
    img: <g><image href="/images/action_sms.png" width={iw} height={iw}/></g>,
    group: 'Actions',
    form: sendSmsForm
}), assign({}, imgRectConfig, {
    // 10
    title: 'Send email',
    visible: true,
    config: {
        img: '/images/action_email.png',
        type: 'EMAIL'
    },
    img: <g><image href="/images/action_email.png" width={iw} height={iw}/></g>,
    group: 'Actions',
    form: sendEmailForm
}), assign({}, imgRectConfig, {
    // 11
    title: 'Run Command',
    visible: true,
    config: {
        img: '/images/action_run.png',
        type: 'RUNCMD'
    },
    img: <g><image href="/images/action_run.png" width={iw} height={iw}/></g>,
    group: 'Actions',
    form: runCommandForm
}), assign({}, imgRectConfig, {
    // 11
    title: 'Call',
    visible: true,
    config: {
        img: '/images/action_call.png'
    },
    img: <g><image href="/images/action_call.png" width={iw} height={iw}/></g>,
    group: 'Actions',
    form: callForm
}), assign({}, imgRectConfig, {
    // 11
    title: 'Chat',
    visible: true,
    config: {
        img: '/images/chat.png',
        type: 'CHAT'
    },
    img: <g><image href="/images/chat.png" width={iw} height={iw}/></g>,
    group: 'Actions',
    form: actionDetailForm
}), assign({}, imgRectConfig, {
    // 11
    title: 'Group',
    visible: true,
    config: {
        img: '/images/group.png',
        type: 'GROUP'
    },
    img: <g><image href="/images/group.png" width={iw} height={iw}/></g>,
    form: taskForm
}), assign({}, imgRectConfig, {
    // 11
    title: 'Generate JSON',
    visible: true,
    config: {
        img: '/images/build.png',
        type: 'BUILD'
    },
    img: <g><image href="/images/build.png" width={iw} height={iw}/></g>,
    group: 'Actions',
    form: buildForm
}), assign({}, imgRectConfig, {
    title: 'Share Variable',
    visible: true,
    config: {
        img: '/images/share.png',
        type: 'SHAREVAR'
    },
    img: <g><image href="/images/share.png" width={iw} height={iw}/></g>,
    group: 'Actions',
    form: shareVarForm
}), assign({}, imgRectConfig, {
    title: 'Open Incident',
    visible: true,
    config: {
        img: '/images/sendim.png',
        type: 'OPENINCIDENT'
    },
    img: <g><image href="/images/sendim.png" width={iw} height={iw}/></g>,
    group: 'Actions',
    form: sendImForm
}), assign({}, imgRectConfig, {
    title: 'Check CPU',
    config: {
        img: '/images/cpu.png',
        type: 'CHECKCPU'
    },
    img: <g><image href="/images/cpu.png" width={iw} height={iw}/></g>,
    group: 'Servers',
    form: generalMonitorForm
}), assign({}, imgRectConfig, {
    title: 'Check Disk',
    config: {
        img: '/images/disk.png',
        type: 'CHECKDISK'
    },
    img: <g><image href="/images/disk.png" width={iw} height={iw}/></g>,
    group: 'Servers',
    form: generalMonitorForm
}), assign({}, imgRectConfig, {
    title: 'Check Memory',
    config: {
        img: '/images/memory.png',
        type: 'CHECKMEMORY'
    },
    img: <g><image href="/images/memory.png" width={iw} height={iw}/></g>,
    group: 'Servers',
    form: generalMonitorForm
}), assign({}, imgRectConfig, {
    title: 'Check OS',
    config: {
        img: '/images/cpu.png',
        type: 'CHECKOS'
    },
    img: <g><image href="/images/cpu.png" width={iw} height={iw}/></g>,
    group: 'Servers',
    form: generalMonitorForm
}), assign({}, imgRectConfig, {
    title: 'Restart Server',
    config: {
        img: '/images/server.png',
        type: 'RESTARTSERVER'
    },
    img: <g><image href="/images/server.png" width={iw} height={iw}/></g>,
    group: 'Servers',
    form: generalMonitorForm
}), assign({}, imgRectConfig, {
    title: 'Check Services',
    config: {
        img: '/images/service.png',
        type: 'CHECKSERVICE'
    },
    img: <g><image href="/images/service.png" width={iw} height={iw}/></g>,
    group: 'Servers',
    form: generalMonitorForm
}), assign({}, imgRectConfig, {
    title: 'Start Service',
    config: {
        img: '/images/service.png',
        type: 'STARTSERVICE'
    },
    img: <g><image href="/images/service.png" width={iw} height={iw}/></g>,
    group: 'Servers',
    form: serviceMonitorForm
}), assign({}, imgRectConfig, {
    title: 'Ping',
    config: {
        img: '/images/ping.jpg',
        type: 'PING'
    },
    img: <g><image href="/images/ping.jpg" width={iw} height={iw}/></g>,
    group: 'Network',
    form: pingForm
}), assign({}, imgRectConfig, {
    title: 'Remote Ping',
    config: {
        img: '/images/remoteping.png',
        type: 'REMOTEPING'
    },
    img: <g><image href="/images/remoteping.png" width={iw} height={iw}/></g>,
    group: 'Network',
    form: remotePingForm
}), assign({}, imgRectConfig, {
    title: 'IM Query',
    config: {
        img: '/images/imquery.png',
        type: 'IMQuery'
    },
    img: <g><image href="/images/imquery.png" width={iw} height={iw}/></g>,
    group: 'Network',
    form: imQueryForm
}), assign({}, imgRectConfig, {
    title: 'Slack User Status',
    config: {
        img: '/images/slack.png',
        type: 'SlackUserStatus'
    },
    img: <g><image href="/images/slack.png" width={iw} height={iw}/></g>,
    group: 'Actions',
    form: slackUserStatusForm
}), assign({}, imgRectConfig, {
    title: 'Credential',
    config: {
        img: '/images/credential.png',
        type: 'AddCredential'
    },
    img: <g><image href="/images/credential.png" width={iw} height={iw}/></g>,
    group: 'Actions',
    form: credForm
}), assign({}, imgRectConfig, {
    title: 'Link Credential To Device',
    config: {
        img: '/images/credential.png',
        type: 'LinkCredentialToDevice'
    },
    img: <g><image href="/images/credential.png" width={iw} height={iw}/></g>,
    group: 'Actions',
    form: linkCredForm
})]

export const wfTaskItems = [assign({}, rectConfig, {
    // 0
    title: 'Action',
    config: {
        type: 'ACTION'
    }
}), assign({}, diamondConfig, {
    // 2
    title: 'Decision',
    config: {
        type: 'DECISION'
    }
})]

export const wfRuleItems = [assign({}, rectConfig, {
    // 0
    title: 'Rule',
    config: {
    }
})]

export const handlePoints = [
    {x: 0, y: 0, cursor: 'nw-resize'},
    {x: 0.5, y: 0, cursor: 'n-resize'},
    {x: 1, y: 0, cursor: 'ne-resize'},
    {x: 0, y: 0.5, cursor: 'w-resize'},
    {x: 1, y: 0.5, cursor: 'e-resize'},
    {x: 0, y: 1, cursor: 'sw-resize'},
    {x: 0.5, y: 1, cursor: 's-resize'},
    {x: 1, y: 1, cursor: 'se-resize'}
]


const baseConfigMap = {
    imgRect: imgRectConfig,
    rect: rectConfig,
    diamond: diamondConfig
}
export function extendShape(shape) {
    const baseConfig = baseConfigMap[shape.baseName || 'imgRect']
    return {
        ...baseConfig,
        title: shape.title,
        group: shape.group,
        config: {
            type: shape.type,
            img: `/images/${shape.img}`
        },
        img: <g><image href={`/images/${shape.img}`} width={iw} height={iw}/></g>,
        form: FormConfig[shape.form]
    }
}
