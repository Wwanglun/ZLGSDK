import ZLGBaseModule from '../httpBase/ZLGBaseModule'

/**
 * 规则引擎配置
 */
class ZLGRulesConfig extends ZLGBaseModule {
  /**
   * 查询符合条件的规则
   * @param {Object} [params]
   * @param {string} [params.filter] - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {number} [params.skip] - 跳过前面N条记录
   * @param {number} [params.limit] - 最多返回的记录数
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link RulesConfig}] }
   */
  static getRulesList ({ filter, skip, limit } = {}) {
    return this.fetch({
      url: '/rules',
      method: 'get',
      params: { filter, skip, limit }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 添加规则
   * @param {Object} params
   * @param {Object} params.info
   * @param {string} params.info.name - 规则名称（支持大小写字母、数字、中下划线）
   * @param {string} params.info.desc - 规则描述(0-256Byte)
   * @param {string} params.info.data_type - 采用何种方式解析终端上行的消息，当前支持的类型为[JSON、BINARY、ZPROTOBUF]。
   * @param {string} params.info.select - 规则触发时，采集的数据点（自动追加设备类型、设备标识符和设备所有者）
   * @param {string} params.info.from - 设备上行到服务器的主题，用于匹配需要处理的设备消息。设备ID层级支持通配符'+'（代表某设备类型下的所有设备）。具体的主题格式可参考设备与服务器通信的协议文档。
   * @param {string} params.info.where - 规则的触发条件，当接收到对应topic的消息时，该语句会作为是否触发的判定条件。
   * @param {string} params.info.status - 规则是否启用，取值为[ENABLE、DISABLE]，只有处于启用态的规则才会进行数据流转处理
   * @param {boolean} params.info.record - 是否保存触发记录到服务器
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link RuleConfig} }
   */
  static addRule ({ info }) {
    return this.fetch({
      url: '/rules',
      method: 'post',
      data: info
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 删除规则
   * @param {Object} params
   * @param {string} params.id - 规则ID
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link RuleConfig} }
   */
  static deleteRule ({ id }) {
    return this.fetch({
      url: `/rules/${id}`,
      method: 'delete'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取指定规则信息
   * @param {Object} params
   * @param {string} params.id - 规则ID
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link RuleConfig} }
   */
  static getRuleInfo ({ id }) {
    return this.fetch({
      url: `/rules/${id}`,
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 更新规则信息
   * @param {Object} params
   * @param {Object} params.info
   * @param {string} params.id - 规则ID
   * @param {string} params.info.desc - 规则描述(0-256Byte)
   * @param {string} params.info.select - 规则触发时，采集的数据点（自动追加设备类型、设备标识符和设备所有者）
   * @param {string} params.info.where - 规则的触发条件，当接收到对应topic的消息时，该语句会作为是否触发的判定条件。
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link RuleConfig} }
   */
  static updateRuleInfo ({ id, info }) {
    return this.fetch({
      url: `/rules/${id}`,
      method: 'put',
      data: info
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 更新规则状态
   * @param {Object} params
   * @param {Object} params.info
   * @param {string} params.id - 规则ID
   * @param {string} params.info.status - 规则是否启用，取值为[ENABLE、DISABLE]，只有处于启用态的规则才会进行数据流转处理
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link RuleConfig} }
   */
  static updateRuleStatus ({ id, info }) {
    return this.fetch({
      url: `/rules/status/${id}`,
      method: 'patch',
      data: info
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 更新触发记录功能
   * @param {Object} params
   * @param {Object} params.info
   * @param {string} params.id - 规则ID
   * @param {boolean} params.info.record - 是否保存触发记录到服务器
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link RuleConfig} }
   */
  static updateRuleRecord ({ id, info }) {
    return this.fetch({
      url: `/rules/record/${id}`,
      method: 'patch',
      data: info
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 查询符合条件的动作
   * @param {Object} [params]
   * @param {string} [params.filter] - 查询条件，参考{@link https://docs.mongodb.com/manual/reference/operator/query-comparison/}
   * @param {number} [params.skip] - 跳过前面N条记录
   * @param {number} [params.limit] - 最多返回的记录数
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: [{@link RulesConfig}] }
   */
  static getRuleActionsList ({ filter, skip, limit } = {}) {
    return this.fetch({
      url: '/rule_actions',
      method: 'get',
      params: { filter, skip, limit }
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 添加规则动作
   * @param {Object} params
   * @param {Object} params.info
   * @param {string} params.info.rule_id - 规则ID
   * @param {string} params.info.kind - 动作类型。用何种方式通知，当前支持的通知类型为[SMS、EMAIL、HTTP、MQTT
   * @param {Object} params.info.config - 动作的详细信息。 与动作的类型相关
   * 1. 当动作类型为SMS时，config为: { "numbers": "phoneNumber1, phoneNumber2, ..." } 多个手机号码以英文逗号（,）
   * 2. 当动作类型为MAIL时，config为： { "addresses": "xxxx@qq.com, xxxx@163.com, ...", "template": "通知文本的模板" } 多个邮箱地址以英文逗号（,）隔开。
   * 3. 当动作类型为HTTPS时（默认为POST请求），config为： { "url": "https://xxxx.com/xxxx" }
   * 4. 当动作类型为MQTT时，config为：{ "server": "tcp://hostname:port", "username": "xxxx", "password": "xxxx", "client_id": "xxxx", "topic": "xxxx" }
   * 5. 当动作类型为MONGO时，config为： { "url": "mongodb://hostname:port", "username": "xxxx", "password": "xxxx", "database": "xxxx", "collection": "xxxx" }
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link RuleConfig} }
   */
  static addRuleAction ( info ) {
    return this.fetch({
      url: '/rule_actions',
      method: 'post',
      data: info
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 删除指定动作
   * @param {Object} params
   * @param {string} params.id - 动作ID
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link RuleConfig} }
   */
  static deleteRuleAction ({ id }) {
    return this.fetch({
      url: `/rule_actions/${id}`,
      method: 'delete'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 获取指定动作信息
   * @param {Object} params
   * @param {string} params.id - 动作ID
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link RuleConfig} }
   */
  static getRuleActionInfo ({ id }) {
    return this.fetch({
      url: `/rule_actions/${id}`,
      method: 'get'
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
  /**
   * 更新指定动作信息
   * @param {Object} params
   * @param {Object} params.info
   * @param {string} params.id - 规则ID
   * @param {Object} params.info.config - 动作的详细信息。 与动作的类型相关
   * @return {Promise<Response, Error>} - Response: { result: true, message: '', jwt: '', data: {@link RuleConfig} }
   */
  static updateRuleActionInfo ({ id, info }) {
    return this.fetch({
      url: `/rule_actions/${id}`,
      method: 'put',
      data: info
    }).catch(err => {
      let errorMap = {}
      return this.handleError(errorMap, err)
    })
  }
}

export default ZLGRulesConfig
