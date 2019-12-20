import axios from 'axios'
/**
 * 处理 http 网络请求
 */
class ZLGHttp {
  /**
   * 保证 Http 只有一个实例
   * @param {string} [baseURL] url 前缀
   * @param {number} [timeout] 超时时间
   * @return {ZLGHttp}
   */
  static getInstance (baseURL = 'https://zlab.zlgcloud.com/v1', timeout = 5000, header, adapter) {
    if (!this.instance) {
      if (typeof window !== 'undefined') {
        this.instance = new ZLGWebHttp(baseURL, timeout, header, adapter)
      } else if (typeof weex !== 'undefined') {
        this.instance = new ZLGWeexHttp(baseURL, timeout, header, adapter)
      } else if (typeof wx !== 'undefined'){
        this.instance = new ZLGWeixinHttp(baseURL, timeout, header, adapter)
      }
    }
    return this.instance
  }
}

/**
   * 序列化url参数
   */
  function addParams (params) {
    if (params) {
      var paramStr = '?'
      var keys = Object.keys(params)
      for (var i = 0; i < keys.length; i++) {
        paramStr += `${keys[i]}=${params[keys[i]]}`
      }
      return paramStr
    } else {
      return ''
    }
  }

class ZLGWebHttp {
  // http = null
  /**
   * 调用{@link ZLGHttp.getInstance}创建唯一实例
   * @param {string} [baseURL] url 前缀
   * @param {number} [timeout] 超时时间
   */
  constructor (baseURL, timeout, header, adapter) {
    let options = {
      baseURL: baseURL || '',
      timeout: timeout || 10000,
      headers: header || {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    if (adapter) {
      options.adapter = adapter
    }
    this.http = axios.create(options)
    // this.setRequestIntercepter((config) => {
    //   console.log('RequestIntercepter config: ', config)
    //   return config
    // })
    // this.setResponseIntercepter(response => {
    //   console.log('ResponseIntercepter response: ', response)
    //   return response
    // })
  }

  /**
   * 发送请求
   * @param {Object} request
   * @param {string} request.url - 相对路径，完整路径为 baseUrl + url
   * @param {string} [request.method] - 请求方式，分为GET、POST、HEAD、PUT、DELETE、PATCH
   * @param {Object} [request.data] - 请求的数据，只适用于这些请求方法: 'PUT', 'POST', 'PATCH'
   * @param {string} [request.params] - url 参数
   * @return {Promise<ZLGHttp~resolve, ZLGHttp~reject>}
   */
  fetch ({ url = '', method = 'get', data = undefined, params = undefined } = {}) {
    return this.http.request({ url, method, data, params }).then(res => {
      return res.data
    }).catch(error => {
      let result = {}
      if (error.response) {
        result = {
          status: error.response.status,
          errorMsg: error.response.statusText,
          data: error.response.data
        }
      } else if (error.request) {
        result = {
          status: 'NO_RESPONSE',
          errorMsg: 'NO_RESPONSE'
        }
      } else {
        result.errorMsg = 'Something happened in setting up the request that triggered an Error'
      }
      return Promise.reject(result)
    })
  }

  setRequestIntercepter (callback) {
    this.http.interceptors.request.use(callback, error => {
      return Promise.reject(error)
    })
  }

  setResponseIntercepter (callback) {
    this.http.interceptors.response.use(callback, error => {
      return Promise.reject(error)
    })
  }
}

class ZLGWeixinHttp {
  constructor (baseURL, timeout, header) {
    this.baseURL = baseURL
    this.timeout = timeout
    this.header = header
  }
  fetch ({ url = '', method = 'get', data = undefined, params = undefined} = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: encodeURI(`${this.baseURL}${url}${addParams(params)}`),
        data: data,
        method: method,
        header: this.header || {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        success (res) {
          resolve(res)
        },
        fail (err) {
          reject(err)
        }
      })
    })
  }
}

class ZLGWeexHttp {
  // http = null
  constructor (baseURL, timeout) {
    baseURL = ''
    timeout = 5000
    this.baseURL = baseURL
    this.timeout = timeout
    /* eslint-disable-next-line */
    this.http = weex.requireModule('bmAxios')
  }
  fetch ({ url = '', method = 'get', data = undefined, params = undefined } = {}) {
    return new Promise((resolve, reject) => {
      var bmoptions = {}
      bmoptions.method = method.toUpperCase()
      bmoptions.url = encodeURI(`${this.baseURL}${url}${addParams(params)}`)
      bmoptions.data = data
      bmoptions.timeout = this.timeout

      this.http.fetch(bmoptions, res => {
        const { status, errorMsg, data } = res
        if (status >= 200 && status < 300) {
          resolve(data)
        } else {
          /* eslint-disable-next-line */
          reject({ status, errorMsg, data })
        }
      })
    })
  }
}

export default ZLGHttp
