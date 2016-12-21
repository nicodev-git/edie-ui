import React from 'react'

class MainSettings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      translate: false
    }
  }

  componentWillMount () {
    $.get(Api.admin.getOptions, {}).done((res) => {
      let state = {}

      res.data.forEach(item => {
        switch (item.name) {
          case 'enable_translate_from_heb7':
            state.translate = item.value === 'true'
            break
        }
      })

      this.setState(state)
    })
  }

  render () {
    return (
            <div className="padding-md-top">
                <div className="form-inline">
                    <div className="col-md-12 margin-md-bottom">
                        <div className="checkbox">
                            <label className="margin-sm-top margin-sm-bottom">
                                <input type="checkbox" className="margin-xs-right"
                                  checked={this.state.translate}
                                  onChange={this.onChangeTranslate.bind(this)}/>
                                Enable Translate From heb7
                            </label>
                        </div>
                    </div>
                </div>
            </div>
    )
  }

  onChangeTranslate (e) {
    let {checked} = e.target
    this.setState({ translate: checked }, () => {
      this.updateOption('enable_translate_from_heb7', checked)
    })
  }

    // ///////////////////////////////////////////

  updateOption (name, value, param) {
    if (!name) return false
    value = value || ''
    param = param || ''
    return $.get(Api.admin.updateOptions, {name, value, param})
  }
}

MainSettings.defaultProps = {}

export default MainSettings
