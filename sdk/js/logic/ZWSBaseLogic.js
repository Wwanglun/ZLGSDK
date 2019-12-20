export default class ZWSBaseLogic {
  // 输出定义，默认值放在data里面
  static getExportConfig (config) {
    let $default = {}
    Object.entries(config).forEach(item => {
      if (item[0] === 'show') {
        $default[item[0]] = {}
        Object.entries(item[1]).forEach(v => {
          $default[item[0]][v[0]] = []
          v[1].forEach(_v => {
            let single = {}
            Object.assign(single, _v, {flag: true})
            $default[item[0]][v[0]].push(single)
          })
        })
      } else {
        $default[item[0]] = item[1]
      }
    })
    return $default
  }
}
