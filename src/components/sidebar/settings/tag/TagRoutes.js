import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'

import SettingTagsContainer from 'containers/settings/tag/TagsContainer'
import SettingTemplatesContainer from 'containers/settings/template/TemplatesContainer'
import SettingParserTypesContainer from 'containers/settings/parserTypes/ParserTypesContainer'

export default class TagRoutes extends React.Component {
  render () {
    return (
      <Switch>
        <Route path="/settings/tags" exact component={SettingTagsContainer} />
        <Route path="/settings/tags/templates" component={SettingTemplatesContainer} />
        <Route path="/settings/tags/parserTypes" component={SettingParserTypesContainer} />
      </Switch>
    )
  }
}
