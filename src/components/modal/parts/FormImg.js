import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

const style = {
  width: '100%',
  height: '100%',
  textAlign: 'center',
  verticalAlign: 'middle'
}

class FormImg extends Component {
  constructor (props) {
    super(props)
    this.state = {
      count: -1
    }
  }
  onDrop (filesToUpload, e) {
    let field = this.props.field
    field.input.onChange(filesToUpload)
    this.setState({
      count: this.state.count++
    })
  }
  render () {
    let field = this.props.field
    let files = field.input.value
    let count = this.state.count
    return (
      <div className="image-container">
        <Dropzone
          name={field.name}
          style={style}
          onDrop={this.onDrop.bind(this)}
        >
          {files ? null : <div>Here should be a nice picture designed by Cvetan</div>}
        </Dropzone>
        {field.meta.touched &&
          field.meta.error &&
          <span className="error">{field.meta.error}</span>}
        {files && (<div className="image-uploader"><img src={files[count].preview}/></div>)}
        {console.log(files)}
      </div>
    )
  }
}

export default FormImg
