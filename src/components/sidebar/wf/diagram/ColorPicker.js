import React from 'react'
import {Dialog} from '@material-ui/core'
import { SketchPicker } from 'react-color'

import {ButtonsBlock} from 'components/modal/parts'

export default class ColorPicker extends React.Component {
    render () {
        const {
            onHide, onSave, onChange, color
        } = this.props

        return (
            <Dialog open title="Pick a color">
                <SketchPicker onChange={onChange} color={color}/>
                <ButtonsBlock name1="Cancel" name2="OK" action1={onHide} action2={onSave}/>
            </Dialog>
        )
    }
}
