import ZWSBaseTool from '../ZWSBaseTool'
/**
 * 字符串相关的工具类
 * 分配后缀命名空间Date
 */
class ZWSNumberTool extends ZWSBaseTool {
    /**
   * 比较两个数值的大小，支持三位小数
   * @param {Number} num1 
   * @param {Number} num2 
   */
  static compareTwoNumber (num1, num2) {
    if (typeof num1 != 'number' || typeof num2 != 'number') {
      return 'error'
    }
    let intNum1 = parseInt(num1)
    let intNum2 = parseInt(num2)
    if (intNum1 === intNum2) {
      let tempNum1 = num1 - intNum1 * 1000
      let tempNum2 = num2 = intNum2 * 1000
      return tempNum1 - tempNum2 > 0 ? {min: num2, max: num1} : {max: num2, min: num1}
    } else {
      return intNum1 - intNum2 > 0 ? {min: num2, max: num1} : {max: num2, min: num1}
    }
  }
}
export default ZWSNumberTool