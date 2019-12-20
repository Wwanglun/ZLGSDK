import ZWSBaseTool from '../ZWSBaseTool'
/**
 * 字符串相关的工具类
 * 分配后缀命名空间String
 */
class ZWSStringTool extends ZWSBaseTool {
  /**
   * 检查模糊搜索内容中的特殊字符，进行转义
   * @param {String} content 
   */
  static symbolEscapeString (content) {
    if (typeof content != 'string') {
      return content
    }
    // eslint-disable-next-line
    let regex = new RegExp("[*'.?+$^\\[\\](){}|/%@!#\\\\]", 'gim')
    return content.replace(regex, '\\$&')
  }
}
export default ZWSStringTool