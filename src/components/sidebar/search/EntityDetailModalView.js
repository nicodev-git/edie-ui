import React from 'react'
import {Checkbox} from '@material-ui/core'
import JSONTree from 'react-json-tree'
import { FormControlLabel } from '@material-ui/core'

import { Modal, CardPanel } from 'components/modal/parts'

/*
<ReactJson
              name={false}
              displayDataTypes={false}
              displayObjectSize={false}
              src={detailEntity}
              valueRenderer={valueRenderer}
            />
 */

const theme = {
  "base00": "#ffffff",
  "base01": "#e0e0e0",
  "base02": "#c5c8c6",
  "base03": "#b4b7b4",
  "base04": "#969896",
  "base05": "#373b41",
  "base06": "#282a2e",
  "base07": "#1d1f21",
  "base08": "#CC342B",
  "base09": "#F96A38",
  "base0A": "#FBA922",
  "base0B": "#198844",
  "base0C": "#3971ED",
  "base0D": "#3971ED",
  "base0E": "#A36AC7",
  "base0F": "#3971ED"
}

export default class EntityDetailModalView extends React.Component {
  render () {
    const {onHide, detailEntity, isShowNull, onCheckShowNull, labelRenderer, valueRenderer} = this.props
    return (
      <Modal title="Detail" onRequestClose={onHide} contentStyle={{width: 1035, maxWidth: 'initial'}}>
        <CardPanel title="Detail">
          <FormControlLabel
            control={
              <Checkbox checked={isShowNull} onChange={onCheckShowNull}/>
            }
            label="Show Null"
          />

          <div style={{width: '100%', overflow: 'auto'}}>
            <JSONTree
              data={detailEntity}
              theme={theme}
              invertTheme={false}
              shouldExpandNode={() => true}
              labelRenderer={labelRenderer}
              valueRenderer={valueRenderer}
            />
          </div>

        </CardPanel>
      </Modal>
    )
  }
}
