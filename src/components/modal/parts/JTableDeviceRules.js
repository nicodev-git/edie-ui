import React from 'react'
import JDataTable from 'components/shared/JDataTable'

const JTableDeviceRules = ({ref, deviceId}) => (
  <JDataTable
    height="350px"
    className="table-hover"
    url="Api.rule.getRulesForDevice"
    columns = {[{
      title: 'Category', data: 'categoryName'
    }, {
      title: 'Name', data: 'name'
    }]}
    params = {{
      deviceid: deviceId,
      ruleCategory: 0,
      severity: ''
    }}
    ref={ref}
  />
)

export default JTableDeviceRules
