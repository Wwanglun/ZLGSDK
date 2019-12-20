export class Base64 {
  static $Str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  static encode (u8) {
    if (u8 instanceof Uint8Array) {
      let encodeStr = ''
      for (let i = 0; i < u8.length; i += 3) {
        const num1 = u8[i] >> 2
        const num2 = ((u8[i] & 3) << 4) | (u8[i + 1] >> 4)
        let num3 = ((u8[i + 1] & 15) << 2) | (u8[i + 2] >> 6)
        let num4 = u8[i + 2] & 63
        if (!Number.isInteger(u8[i + 1])) {
          num3 = 64
          num4 = 64
        } else if (!Number.isInteger(u8[i + 2])) {
          num4 = 64
        }
        encodeStr += this.$Str.charAt(num1) + this.$Str.charAt(num2) + this.$Str.charAt(num3) + this.$Str.charAt(num4)
      }
      return encodeStr
    } else {
      throw new Error('u8必须是Uint8Array')
    }
  }
  static decode (encodeStr) {
    if (typeof encodeStr === 'string') {
      let u8 = new Uint8Array(Number.parseInt(encodeStr.length / 4) * 3)
      let j = 0
      for (let i = 0; i < encodeStr.length; i += 4) {
        const num1 = this.$Str.indexOf(encodeStr[i])
        const num2 = this.$Str.indexOf(encodeStr[i + 1])
        const num3 = this.$Str.indexOf(encodeStr[i + 2])
        const num4 = this.$Str.indexOf(encodeStr[i + 3])
        u8[j] = num1 << 2 | (num2 >> 4)
        j++
        if (num3 !== 64) {
          u8[j] = ((num2 & 15) << 4) | (num3 >> 2)
          j++
        }
        if (num4 !== 64) {
          u8[j] = ((num3 & 3) << 6) | num4
          j++
        }
      }
      u8 = new Uint8Array(u8.buffer.slice(0, j))
      return u8
    } else {
      throw new Error('encodeStr必须是String')
    }
  }
}

export function formatter (value, l) {
  var str = ''
  var group = [16, 10, 2]
  var data = value
  if (l == 3) {
    for (var j in data) {
      str += String.fromCharCode(data[j])
    }
  } else {
    if (l === 4) {
      str = Base64.encode(value)
    } else {
      for (var i in data) {
        var half = parseInt(data[i]).toString(group[l])
        if (l == 2) {
          half = ' ' + ('00000000').slice(half.length) + half
        } else if (l == 0) {
          half = ' ' + ('00').slice(half.length) + half
        } else if (l == 1) {
          half = ' ' + half
        }
        str += half
      }
    }
  }
  return str
}

export function setDataFormat (arr, dataFormat = 4, devclass = 0) {
  let util = []
  arr.forEach(item => {
    let single = JSON.parse(JSON.stringify(item))
    if (item.raw) {
      Object.assign(single, parseRaw(item.raw, dataFormat, devclass))
    }
    util.push(single)
  })
  return util
}
export function parseRaw (single, dataFormat, devclass) {
  let data = {}
  // eslint-disable-next-line
  let buff = new Buffer(single, 'base64')
  let str = buff.slice(4).toString('utf8')
  let reg = /([a-zA-Z%]+)/.test(str)
  let dataObj = (reg && str.indexOf('{') === -1) || str === '' ? {data: single} : JSON.parse(str)
  let unitArray = Base64.decode(dataObj.data || single)
  let utilData = formatter(unitArray, dataFormat)
  if (devclass === 2 || devclass === 3) {
    data = {
      raw: utilData,
      loraserver: JSON.stringify(dataObj.loraserver)
    }
  } else {
    data = {
      raw: utilData
    }
  }
  return data
}