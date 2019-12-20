export function setTableTitle (tableColumn) {
  let title = [{label: 'raw', prop: 'raw', type: 'string', width: '120px', fixed: true, isCustom: false}]
  tableColumn.forEach(item => {
    if (item.flag && item.key !== 'raw') {
      let single = {}
      single.label = item.nickname || item.key
      single.prop = item.key
      single.width = item.width + 'px'
      single.type = item.type || 'number'
      single.fixed = false
      single.isCustom = true
      single.format = item.format || 'float'
      title.push(single)
    }
  })
  return title
}