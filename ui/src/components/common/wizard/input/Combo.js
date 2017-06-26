import React from 'react'
import { util } from '../WizardUtil'
import {SelectField} from 'material-ui'

import CredentialModal from 'components/sidebar/settings/credentials/CredentialModal'
import { appendComponent, removeComponent } from 'util/Component'

export default class Combo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      options: []
    }
  }

  componentWillMount () {
    const config = this.props.config

    if (config.remote === true) {
      let url = config.server.url
      if (config.server.params && config.server.params.length > 0) {
        let params = {}
        if (config.server.url.indexOf('?') === -1) {
          url += '?'
        } else {
          url += '&'
        }

        url += $.param(params) // eslint-disable-line no-undef
      }

      this.loadComboOptions(config, url)
    } else {
      let options = []
      $.each(config.items, function (i, item) { // eslint-disable-line no-undef
        options.push({
          label: item.display || '',
          value: item.value || '',
          selected: item.selected === true
        })
      })

      this.setState({options})
    }
  }

  renderSidebar () {
    const config = this.props.config
    let sidebarItems = []

    if (config.remote === true) {
      if (config.sidebar) {
        config.sidebar.buttons.forEach((button, i) => {
          if (button.type === 'add') {
            const style = {
              position: 'absolute',
              top: '9px',
              right: `${-7 - i * 20}px`
            }

            sidebarItems.push(
              <a href="javascript:;" className="margin-md-left" style={style}
                onClick={this.onSidebarItem.bind(this, button)}>
                  <i className="fa fa-plus fa-lg" />
              </a>
            )
          } else if (button.type === 'edit') {

          }
        })
      }
    }

    return sidebarItems
  }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  loadComboOptions (config, url) {

  }

  onSidebarItem (button) {
    if (button.click === 'credentialModal') {
      appendComponent(
        <CredentialModal onClose={(modal) => {
          removeComponent(modal)

          const config = this.props.config

          if (config.remote === true) {
            let url = config.server.url
            this.loadComboOptions(config, url)
          }
        }}/>
      )
    }
  }

  render () {
    let config = this.props.config
    let values = this.props.values

    let label, input
    let width = util.calcWidth(config.width)

    if (config.label !== null) {
      if (config.label.type === 'place') {

      } else {
        label = this.props.buildLabel(config.label)
        width = util.calcWidth(config.width) - util.calcWidth(config.label.width)
      }
    }

    let defaultValue = config.value

    let options = this.state.options.map(item => {
      if (item.selected && !defaultValue) defaultValue = item.value
      return {
        text: item.label,
        value: item.value
      }
    })

    if (config.name && values[config.name] !== undefined) {
      defaultValue = values[config.name]
    }

    if (!defaultValue && options.length) {
      defaultValue = options[0].value
    }

    input = (
      <div className={`col-md-${width}`}
        style={util.convertStyle(config.style)}>
        <SelectField className={`form-control ${config.cls || ''}`}
          name={config.name}
          validation={config.required ? 'required' : null}
          defaultValue={defaultValue}
          options={options}
        />
        {this.renderSidebar()}
      </div>
    )

    return util.wrapInputs(label, input, config['useColumn'])
  }
}

Combo.defaultProps = {
  config: {},
  values: {},
  buildLabel: null
}
