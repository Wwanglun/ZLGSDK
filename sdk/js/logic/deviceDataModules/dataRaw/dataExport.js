import ZWSDateTool from '../../../tool/toolModules/ZWSDateTool.js'
import {parseRaw} from './dataParse.js'
export default function historyWorker (self) {
  self.addEventListener('message', (e) => {
    let allData = e.data.saveData
    let schema = e.data.schema
    let dataFormat = e.data.dataFormat
    let devclass = e.data.devclass
    let title = schema.map(v => (v.label ? v.label : v.prop) + (v.unit ? '(' + v.unit + ')' : ''))
    title.push('时间')
    let titleForKey = schema.map(v => v.prop)
    let formatArr = schema.map(v => v.format)
    let typeArr = schema.map(v => v.type)
    titleForKey.push('zlgCloudTime')
    let data = []
    data.push(title)
    allData.forEach(sData => {
      let singleData = []
      titleForKey.forEach((sSch, index) => {
        singleData.push((sSch === 'zlgCloudTime' && index === titleForKey.length - 1)
          ? ZWSDateTool.timestampToLocalDate(sData['time'])
          : (sData[sSch] || sData[sSch] == 0)
            ? typeArr[index] === 'number'
              ? formatArr[index] === 'float'
                ? Number(sData[sSch]).toFixed(2)
                : Math.round(sData[sSch])
              : sSch === 'raw'
                ? parseRaw(sData[sSch], dataFormat, devclass).raw
                : sData[sSch]
            : (devclass === 2 || devclass === 3) && sSch === 'loraserver'
              ? parseRaw(sData['raw'], dataFormat, devclass).loraserver
              : '--')
      })
      data.push(singleData)
    })
    self.postMessage({data: [{data}]})
    self.close()
  })
}
