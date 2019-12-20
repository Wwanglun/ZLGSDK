class ZLGWebSocket {
  socket = null

  /**
   * 前端websocket的二次封装
   * @param {string} url
   */
  constructor (url) {
    this.socket = new WebSocket(url)
  }

  /**
   * 发送消息
   * @param {string} message 要发送的消息
   */
  send (message) {
    this.socket.send(message)
  }
  /**
   * 关闭连接
   */
  close () {
    this.socket.close()
  }

  /**
   * 连接建立时触发
   * @param {ZLGWebSocket~callback} callback
   */
  onOpen (callback) {
    this.socket.onopen = callback
  }
  /**
   * 客户端接收服务端数据时触发
   * @param {ZLGWebSocket~callback} callback
   */
  onMessage (callback) {
    this.socket.onmessage = callback
  }
  /**
   * 通信发生错误时触发
   * @param {ZLGWebSocket~callback} callback
   */
  onError (callback) {
    this.socket.onerror = callback
  }
  /**
   * 连接关闭时触发
   * @param {ZLGWebSocket~callback} callback
   */
  onClose (callback) {
    this.socket.onclose = callback
  }
}

/**
 * callback返回的数据
 * @typedef {object} ZLGWebSocket~event
 * @property {string} data
 */

/**
 * 相关事件触发时调用该函数
 * @callback ZLGWebSocket~callback
 * @param {ZLGWebSocket~event} event
 */

export default ZLGWebSocket
