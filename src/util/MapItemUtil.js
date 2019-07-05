import {find} from 'lodash'

export function getItemImage (item, monitorTemplates) {
    const {image, monitortype} = item
    if (image) return image
    if (monitortype && monitorTemplates) {
        const tpl = find(monitorTemplates, {monitortype})
        if (tpl) return tpl.image
    }
    return ''
}