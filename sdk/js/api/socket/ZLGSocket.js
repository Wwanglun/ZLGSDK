import ZLGWebSocket from './socketModules/ZLGWebSocket'
import ZLGWeexSocket from './socketModules/ZLGWeexSocket'
import ZLGWxSocket from './socketModules/ZLGWxSocket'
import ZLGSocketCErrors from './socketBase/ZLGSocketCErrors'
import ZLGSocketClientCode from './socketBase/ZLGSocketClientCode'
/**
 * 处理 socket 网络请求
 */
class ZLGSocket {
    constructor (token, url ='wss://zlab.zlgcloud.com:8403') {
        this.url = url
        this.token = token
        if (!this.instance) {
          if (typeof window !== 'undefined') {
            this.instance = new ZLGWebSocket(url)
          } else if (typeof weex !== 'undefined') {
            this.instance = new ZLGWeexSocket(url)
          } else if (typeof wx !== 'undefined'){
            this.instance = new ZLGWxSocket(url)
          }
        }
        this.instance.onOpen(() => {
            this.loginSocket()
        })
    }
      /**
       * 订阅主题
       * @param {Sring} event 监听事件主题，offline,online,status,raw,data
       * @param {Array} devices 设备数组，[{devid: test, devtype: test}]
       */
        addListenerSocket (topicType, devices) {
            var addListener = {
                action: 'addListener',
                data: {event: topicType, devices: devices}
            }
            this.instance.socket.send(JSON.stringify(addListener))
        }
        /**
         * 取消主题订阅
         * @param {Sring} event 监听事件主题，offline,online,status,raw,data,log,error,warning
         * @param {Array} devices 设备数组，[{devid: test, devtype: test}]
         */
        removeListenerSocket (topicType, devices) {
            var removeListener = {
              action: 'removeListener',
              data: {
                event: topicType, devices: devices
              }
            }
            try {
                this.instance.socket.send(JSON.stringify(removeListener))
            } catch (e) {
          
            }
          }
        /**
         * 登录socket
         */
        loginSocket () {
            var login = {
              action: 'login',
              data: { token: this.token }
            }
            this.instance.socket.send(JSON.stringify(login))
          }
        /**
         * 发送消息
         * @param {string} message 要发送的消息，格式为：{action: 'test', data: 'test'}
         */
        send (message, callback) {
            this.instance.send(JSON.stringify(message), function (res) {
                if (JSON.parse(res.data.result)) {
                    callback(res)
                }
            })
        }
        /**
         * 关闭连接
         */
        close (callback) {
            this.instance.close(callback)
        }
        /**
         * 客户端接收服务端数据时触发
         * @param {ZLGWebSocket~callback} callback
         */
        onMessage (callback) {
            this.instance.onMessage(function(res) {
                var message = JSON.parse(res.data)
                // 检测到异常断开websocket返回的信息
                if (message.action === 'close') {
                    if (message.data.message === 'access minute rate limit reach.') {
                    // 请求websocket连接每分钟限制
                    callback({code: ZLGSocketClientCode.ACCESS_MINUTE_LIMIT, message: ZLGSocketCErrors[ZLGSocketClientCode.ACCESS_MINUTE_LIMIT]})
                    } else if (message.data.message === 'access day rate limit reach.') {
                    // websocket每天传输数据量限制
                    callback({code: ZLGSocketClientCode.ACCESS_DAY_LIMIT, message: ZLGSocketCErrors[ZLGSocketClientCode.ACCESS_DAY_LIMIT]})
                    } else if (message.data.message === 'broadcast minute rate limit reach.') {
                    // websocket一分钟传输数据量限制
                    callback({code: ZLGSocketClientCode.BROADCAST_MINUTE_LIMIT, message: ZLGSocketCErrors[ZLGSocketClientCode.BROADCAST_MINUTE_LIMIT]})
                    callback()
                    } else if (message.data.message === 'broadcast day rate limit reach.') {
                        callback({code: ZLGSocketClientCode.BROADCAST_DAY_LIMIT, message: ZLGSocketCErrors[ZLGSocketClientCode.BROADCAST_DAY_LIMIT]})
                    } else {
                        callback(res)
                    }
                } else if (message.action == 'notify') {
                    var topic = message.data.topic.split('/')
                    var devtype = topic[3]
                    var devid = topic[4]
                    var topicType = topic[5]
                    var data = message.data.payload
                    callback({data: {devtype: devtype, devid: devid, topicType: topicType, data}})
                }
            })
        }
        /**
         * 通信发生错误时触发
         * @param {ZLGWebSocket~callback} callback
         */
        onError (callback) {
            this.instance.onError(function (res) {
                callback({code: ZLGSocketClientCode.INTENET_ERROR, message: ZLGSocketCErrors[ZLGSocketClientCode.INTERNET_ERROR]})
            })
        }
        /**
         * 连接关闭时触发
         * @param {ZLGWebSocket~callback} callback
         */
        onClose (callback) {
            this.instance.onClose(callback)
        }
    }
export default ZLGSocket