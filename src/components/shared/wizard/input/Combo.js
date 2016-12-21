import React from 'react'
import {util} from '../WizardUtil'
import {SelectField} from 'react-serial-forms'

import CredentialModal from './CredentialModal'
import { appendComponent, removeComponent } from '../../../../util/Component'

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

        url += $.param(params)
      }

      this.loadComboOptions(config, url)
    } else {
      let options = []
      $.each(config.items, function (i, item) {
        options.push({
          label: item.display || '',
          value: item.value || '',
          selected: item.selected === true
        })
      })

      this.setState({options})
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
                        // var btn = $('<a href="javascript:;" class="margin-md-left"><i class="fa fa-edit fa-lg"></i></a>');
                        // btn.css({
                        //     position: 'absolute',
                        //     top: '9px',
                        //     right: (-7 - i * 20) + 'px'
                        // });
                        //
                        // btn.click(function(){
                        //     var option = input.find(':selected');
                        //     var obj = option.data('object');
                        //     button.click && button.click(obj, function(cred){
                        //         console.log(cred);
                        //         option.text(cred[config.server.display]);
                        //         option.attr('value', cred[config.server.value]);
                        //         option.data('object', cred);
                        //     });
                        // });
                        //
                        // sidebarItems.push(btn);
          }
        })
      }
    }

    return sidebarItems
  }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  loadComboOptions (config, url) {
        // $.ajax({
        //     dataType : "json",
        //     url : url,
        //     async : false,
        //     success : (data, status, jqXHR) => {
        //         var root = config.server.root;
        //         if(typeof root === 'string') {
        //             data  = data[root];
        //         } else if(root && root.length) {
        //             $.each(root, function(i, prop){
        //                 data = data[prop];
        //                 if(!data) return false;
        //             });
        //         }
        //
        //         let options = []
        //
        //         data.forEach((d, i) => {
        //             options.push({
        //                 label: d[config.server.display],
        //                 value: d[config.server.value],
        //                 object: d
        //             })
        //         })
        //
        //         this.setState({options});
        //     }
        // });
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
}

Combo.defaultProps = {
  config: {},
  values: {},
  buildLabel: null
}
