class ZLGWxSocket {
/**
   * 小程序socket的二次封装
   * @param {string} url
   */
  constructor (url) {
    this.socketTask = null
    this.url = url
    this.init()
  }
  init () {
    this.socketTask = wx.connectSocket({
        url: this.url,
        data: 'data',
        header: {
          'content-type':'application/json'
        },
        method:'post',
        success: function (res) {
        },
        fail: function (res) {
        }
      })
  }
  /**
   * 发送消息
   * @param {string} message 要发送的消息
   */
  send (massage, callback) {
    this.socketTask.send({
        data: massage,
        success: function (res) {
            callback(res)
        },
        fail: function (err) {
            callback(res)
        }
    })
  }
  /**
   * 关闭连接
   */
  close (callback) {
    this.socketTask.close({
        code: 1000,
        reason: 'close',
        success: function(res) {
            callback(res)
        },
        fail: function(res) {
            callback(res)
        }
    })
  }

  /**
   * 连接建立时触发
   * @param {ZLGWebSocket~callback} callback
   */
  onOpen (callback) {
    this.socketTask.onOpen(function(res) {
      callback(res)
    })
  }
  /**
   * 客户端接收服务端数据时触发
   * @param {ZLGWebSocket~callback} callback
   */
  onMessage (callback) {
    this.socketTask.onMessage(function(res) {
        callback(res)
    })
  }
  /**
   * 通信发生错误时触发
   * @param {ZLGWebSocket~callback} callback
   */
  onError (callback) {
    this.socketTask.onError(function(res) {
        callback(res)
    })
  }
  /**
   * 连接关闭时触发
   * @param {ZLGWebSocket~callback} callback
   */
  onClose (callback) {
    this.socketTask.onClose(function(res) {
        callback(res)
    })
  }

}
export default ZLGWxSocket