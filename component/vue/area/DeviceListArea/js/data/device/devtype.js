export class Devtype {
  moveup (index, originData) {
    let temp = originData[index]
    if (index - 1 >= 0) {
      originData.splice(index - 1, 0, temp)
      originData.splice(index + 1, 1)
    }
  }
  movedown (index, originData) {
    let temp = originData[index]
    if (originData.length - (index + 1) >= 0) {
      originData.splice(index + 2, 0, temp)
      originData.splice(index, 1)
    }
  }
  getNewAlldevtype (devtypeInfo, allDevtype) {
    let newDevtype = JSON.parse(JSON.stringify(allDevtype))
    allDevtype.map(function (item, index) {
      if (item.devtype == devtypeInfo.devtype) {
        newDevtype.splice(index, 1, devtypeInfo)
      }
    })
    return newDevtype
  }
  /**
   * 把对象的属性转换成数组的属性
   * @param {Object} data 
   */
  formatPropertiesToArgs (data) {
    let result = Object.assign({}, data)
    Object.keys(data).forEach(item => {
      result[item] = JSON.parse(JSON.stringify(data[item]))
      if (data[item].properties) {
        result[item].args = data[item].properties
        this.formatPropertiesToArgs(result[item].args)
      } else {
        result[item] = data[item]
      }
      delete result[item].properties
    })
    return result
  }
  /**
   * 把数组的属性转换成对象的属性
   * @param {Object} data 
   */
  formatArgsToProperties (data) {
    let result = Object.assign({}, data)
    Object.keys(data).forEach(item => {
      result[item] = {}
      if (data[item].args && Object.keys(data[item].args).length) {
        result[item].properties = data[item].args
        result[item].comment = data[item].comment
        result[item].type = data[item].data
        this.formatArgsToProperties(result[item].properties)
      } else if (data[item].args && !Object.keys(data[item].args).length) {
        result[item].comment = data[item].comment
        result[item].type = data[item].type
      }
    })
    return result
  }
  /**
   * 类型的设备初始化字段值设置
   * 自定义类型根据基础类型的schema来过滤掉不能被设置的字段值
   * @param {Object} initData 
   * @param {Object} baseTempalte 
   */
  initParams (initData, baseTempalte) {
    let newData = {
      deviceProfile: {}
    }
    Object.keys(initData.deviceProfile).forEach(item => {
      Object.keys(baseTempalte.deviceProfile).forEach(value => {
        if (item == value && !baseTempalte.deviceProfile[value].readonly && !baseTempalte.deviceProfile[value].autoGen) {
          newData.deviceProfile[value] = Object.assign({}, baseTempalte.deviceProfile[value])
          newData.deviceProfile[value].keys = item
          newData.deviceProfile[value].default_value = initData.deviceProfile[item]
          if (baseTempalte.deviceProfile[value].type == 'object') newData.deviceProfile[value].default_value = JSON.stringify(initData.deviceProfile[item])
          if (baseTempalte.deviceProfile[value].type == 'boolean') newData.deviceProfile[value].default_value = initData.deviceProfile[item] + ''
          baseTempalte.deviceProfile[value].keys = value
        }
      })
    })
    return newData
  }
  /**
   * 类型的设备初始化字段值设置初始化展示
   * @param {Object} initData 
   * @param {Object} newData 
   */
  formatInitParams (initData, newData) {
    let newVal = {
      deviceProfile: {}
    }
    try {
      Object.keys(initData.deviceProfile).forEach(item => {
        Object.keys(newData.deviceProfile).forEach(value => {
          if (item == newData.deviceProfile[value].keys) {
            switch (newData.deviceProfile[value].type) {
              case 'string':
                newVal.deviceProfile[item] = newData.deviceProfile[value].default_value
                break
              case 'object':
                newVal.deviceProfile[item] = JSON.parse(newData.deviceProfile[value].default_value)
                break
              case 'number':
                newVal.deviceProfile[item] = newData.deviceProfile[value].default_value - 0
                break
              case 'boolean':
                // eslint-disable-next-line
                newVal.deviceProfile[item] = newData.deviceProfile[value].default_value == 'true' ? true : false
                break
            }
          }
        })
      })
      return newVal
    } catch (e) {
      return 'error'
    }
  }
}
