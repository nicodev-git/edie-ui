/**
 * Created by Cheng on 9/8/16.
 */

var Api = { // eslint-disable-line no-unused-vars
  admin: {
    getOptions: '/admin/getOptions',
    updateOptions: '/admin/updateOptions',
    moveDevice: '/admin/moveDevice',

    getSegments: '/admin/getSegments',
    addSegment: '/admin/addSegment',
    editSegment: '/admin/editSegment',
    removeSegment: '/admin/removeSegment',

    addIdentity: '/admin/addIdentity',
    editIdentity: '/admin/editIdentity',
    delIdentity: '/admin/delIdentity'
  },

  deviceadmin: {
    addDevice: '/deviceadmin/addDevice',
    countDeviceData: '/deviceadmin/countDeviceData',
    removeDevice: '/deviceadmin/removeDevice',
    importMap: '/deviceadmin/importMap',
    getShapeTypes: '/deviceadmin/getShapeTypes',
    updateDevice: '/deviceadmin/updateDevice',
    exportMap: '/deviceadmin/exportMap',

    addCustomDevice: '/deviceadmin/addCustomDevice',
    checkExistsIp: '/deviceadmin/checkExistsIp',
    showDefaultMonitorsForDevice: '/deviceadmin/showDefaultMonitorsForDevice',
    addWindowsServer: '/deviceadmin/addWindowsServer',
    addWebsite: '/deviceadmin/addWebsite',
    addGroup: '/deviceadmin/addGroup',
    addRouter: '/deviceadmin/addRouter',
    addFirewall: '/deviceadmin/addFirewall',
    addInternet: '/deviceadmin/addInternet',
    addMYSQLDB: '/deviceadmin/addMYSQLDB',
    addOracleDB: '/deviceadmin/addOracleDB',
    addMSSQLDB: '/deviceadmin/addMSSQLDB',
    addpc: '/deviceadmin/addpc',
    addAntivirus: '/deviceadmin/addAntivirus',
    addNAC: '/deviceadmin/addNAC',
    addIPS: '/deviceadmin/addIPS'

  },

  devices: {
    updateLine: '/devices/updateLine',
    renameDevice: '/devices/renameDevice',
    countIncidentsAndAttacks: '/devices/countIncidentsAndAttacks',
    getDevicesAndProps: '/devices/getDevicesAndProps',
    getAllDevicesDT: '/devices/getAllDevicesDT',
    modifyAgentConfig: '/devices/modifyAgentConfig',
    modifyAgentConfigs: '/devices/modifyAgentConfigs',
    getAgentDevicesDT: '/devices/getAgentDevicesDT',
    getDeviceTypes: '/devices/getDeviceTypes',

    addCredential: '/devices/addCredential',
    addCredentials: '/devices/addCredentials',
    editCredential: '/devices/editCredential',
    removeCredential: '/devices/removeCredential',
    getDevicesCredentials: '/devices/getDevicesCredentials',

    getIcons: '/devices/getIcons',
    addIcon: '/devices/addIcon',
    downloadAgentConfig: '/devices/downloadAgentConfig',

    getAgents: '/devices/getAgents',
    getDeviceNotes: '/devices/getDeviceNotes',
    updateDeviceNotes: '/devices/updateDeviceNotes',
    getCredentials: '/devices/getCredentials',

    getDevicesByShape: '/devices/getDevicesByShape'
  },

  user: {
    updateDefaultMap: '/user/updateDefaultMap',
    getUsers: '/user/getUsers',
    updateUser: '/user/updateUser',
    removeUser: '/user/removeUser',
    addUserWithDetails: '/user/addUserWithDetails',
    resetPin: '/user/resetPin',

    updatePassword: '/user/updatePassword',
    getRoles: '/user/getRoles',

    updateProfile: '/user/updateProfile',
    getData: '/user/getData'
  },

  group: {
    addGroupAlloc: '/group/addGroupAlloc',
    removeGroupAlloc: '/group/removeGroupAlloc',

    modifyGroup: '/group/modifyGroup',
    addGroup: '/group/addGroup',
    removeGroup: '/group/removeGroup',

    getGroupsDT: '/group/getGroupsDT'
  },

  incidents: {
    getUnfixedIncidentsQuick: '/incidents/getUnfixedIncidentsQuick',
    addIncident: '/incidentstable/addIncident',
    fixMonthIncidents: '/incidentstable/fixMonthIncidents',
    fixAllOpenIncidents: '/incidentstable/fixAllOpenIncidents',
    fixTodayIncidents: '/incidentstable/fixTodayIncidents',
    getNetStats: '/incidentstable/getNetStats',

    addDeviceIncident: '/incidentstable/addDeviceIncident',
    fixSelectIncidents: '/incidentstable/fixSelectIncidents',
    deleteRawIncidents: '/incidentstable/deleteRawIncidents',

    getProcessRunTimes: '/incidentstable/getProcessRunTimes',
    getProcessChildren: '/incidentstable/getProcessChildren',

    getLatestNews: '/incidentstable/getLatestNews',
    ackIncident: '/incidentstable/ackIncident',
    fixIncident: '/incidentstable/fixIncident',
    saveCommentsForIncident: '/incidentstable/saveCommentsForIncident',
    showCommentsForIncident: '/incidentstable/showCommentsForIncident',

    pdfShobIncidentsByDeviceID: '/incidentstable/pdfShobIncidentsByDeviceID'
  },

  routing: {
    addTarget: '/routingTarget/addTarget',
    removeTarget: '/routingTarget/removeTarget',

    modifyRouting: '/routing/modifyRouting',
    addRouting: '/routing/addRouting'
  },

  dashboard: {
    addMap: '/dashboard/addMap',
    updateMap: '/dashboard/updateMap',
    deleteMap: '/dashboard/deleteMap',

    getDevicesForMap: '/dashboard/getDevicesForMap',
    getLineByLine: '/dashboard/getLineByLine',
    renameMap: '/dashboard/renameMap',
    getMonitorsByMapAndDeviceDT: '/dashboard/getMonitorsByMapAndDeviceDT',
    getDevicesByType: '/dashboard/getDevicesByType',
    getDevices: '/dashboard/getDevices',
    getDevicesByGroup: '/dashboard/getDevicesByGroup',

    getMaps: '/dashboard/getMaps'
  },

  map: {
    addMapUser: '/map/addMapUser',
    removeMapUser: '/map/removeMapUser',
    getMapsByUserDT: '/map/getMapsByUserDT'
  },

  chat: {
    users: '/chat/users'
  },

  rule: {
    getCategories: '/rules/getCategories',
    addCategory: '/rules/addCategory',
    deleteACategory: '/rules/deleteACategory',
    changeCategory: '/rules/changeCategory',

    addIgnoreRuleForDevice: '/rules/addIgnoreRuleForDevice',
    getLogicalName: '/rules/getLogicalName',
    deleteARuleForADevice: '/rules/deleteARuleForADevice',
    deletePhysicalName: '/rules/deletePhysicalName',
    updateARuleToADevice: '/rules/updateARuleToADevice',
    addDeviceRuleFromPhysical: '/rules/addDeviceRuleFromPhysical',
    updatePhysicalName: '/rules/updatePhysicalName',
    addNewPhysicalName: '/rules/addNewPhysicalName',
    getRulesForDevice: '/rules/getRulesForDevice',
    getByLogicalRuleId: '/rules/getByLogicalRuleId',
    getPhysicalRulesNotApplied: '/rules/getPhysicalRulesNotApplied',

    copyRule: '/rules/copyRule',
    applyTemplateToDevices: '/rules/applyTemplateToDevices',
    shareRule: '/rules/shareRule',
    getParsersForDevice: '/rules/getParsersForDevice',
    runSimulator: '/rules/runSimulator',

    backupRules: '/rules/backupRules',
    listOfBackupFiles: '/rules/listOfBackupFiles',
    restoreRules: '/rules/restoreRules',

    copyRulesTo: '/rules/copyRulesTo',
    moveRulesTo: '/rules/moveRulesTo',
    createRulesFromTemplates: '/rules/createRulesFromTemplates',
    createTemplatesFromRules: '/rules/createTemplatesFromRules',

    addNewRuleForDevice: '/rules/addNewRuleForDevice'

  },

  log: {
    getFiles: '/logs/getFiles',
    getErrorFiles: '/logs/getErrorFiles',
    getExistingContent: '/logs/getExistingContent',
    getErrorsInLog: '/logs/getErrorsInLog'
  },

  bi: {
    searchDevicesDT: '/bi/searchDevicesDT',
    threatMapEventsReal: '/bi/threatMapEventsReal',
    threatMapEventsHistory: '/bi/threatMapEventsHistory',

    search: '/bi/search'
  },

  server: {
    simulation: '/server/simulation'
  },

  security: {
    login: '/security/login'
  },

  upload: {
    uploadUserImage: '/upload/uploadUserImage',
    uploadImage: '/upload/uploadImage'

  },

  test: {
    addIncident: '/test/addIncident',
    changeOpenIncidentCount: '/test/changeOpenIncidentCount',
    changeTodayIncidentCount: '/test/changeTodayIncidentCount',
    changeAttackerTodayCount: '/test/changeAttackerTodayCount',
    changeMonthIncidentCount: '/test/changeMonthIncidentCount',
    pushNews: '/test/pushNews',
    changeDeviceStatus: '/test/changeDeviceStatus',
    changeConnectorColor: '/test/changeConnectorColor'
  }
}
