import ZLGHttp from './ZLGHttp'
import ZLGHttpClientCode from './ZLGHttpClientCode'
import ZLGHttpErrors from './ZLGHttpErrors'

class ZLGBaseModule {
  static init (baseURL, timeout, header) {
    ZLGHttp.getInstance(baseURL, timeout, header)
  }

  static fetch (params) {
    const http = ZLGHttp.getInstance()
    return http.fetch(params)
  }

  static setErrorHandler (handler) {
    if (typeof handler === 'function') {
      this.errorHandler = handler
    } else {
      throw new Error('Error Handler Must Be Function')
    }
  }

  static handleError (errorMap, err) {
    let status = err.status
    let code = err.data.code
    const commonErrorMap = {
      400: ZLGHttpClientCode.ZLG_PARAM_WRONG,
      401: ZLGHttpClientCode.ZLG_NOT_LOGIN,
      403: ZLGHttpClientCode.ZLG_FORBIDDEN,
      408: ZLGHttpClientCode.ZLG_REQUEST_TIMEOUT,
      500: ZLGHttpClientCode.ZLG_SERVER_ERROR,
      NO_RESPONSE: ZLGHttpClientCode.ZLG_SERVER_NO_RESPONSE
    }
    let errorCode = code || errorMap[status] || commonErrorMap[status] || ZLGHttpClientCode.ZLG_UNKNOW
    if (!this.errorHandler || !this.errorHandler(ZLGHttpErrors[errorCode] || errorCode)) {
      /* eslint-disable-next-line */
      return Promise.reject({
        errorCode: ZLGHttpErrors[errorCode] || errorCode
      })
    }
  }
}

export default ZLGBaseModule
