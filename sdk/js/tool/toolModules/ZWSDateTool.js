import ZWSBaseTool from '../ZWSBaseTool'
/**
 * 字符串相关的工具类
 * 分配后缀命名空间Date
 */
class ZWSDateTool extends ZWSBaseTool {
	/**
	 * 时间戳转本地时间
	 * @param {Number} timestamp 
	 * @param {Boolean} showMilliseconds 
	 */
  static timestampToLocalDate (timestamp, showMilliseconds) {
		let date = 0
		if ((timestamp + '').length == 10) {
			date = new Date(timestamp * 1000)
		} else {
			date = new Date(timestamp)
		}
		const Y = date.getFullYear() + '-'
		const M =
			(date.getMonth() + 1 < 10
				? '0' + (date.getMonth() + 1)
				: date.getMonth() + 1) + '-'
		const D =
			date.getDate() < 10
				? '0' + date.getDate() + '  '
				: date.getDate() + '  '
		const H =
			(date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
			':'
		const Minute =
			(date.getMinutes() < 10
				? '0' + date.getMinutes()
				: date.getMinutes()) + ':'
		const S =
			date.getSeconds() < 10
				? '0' + date.getSeconds()
				: date.getSeconds()
		const milliseconds =
				date.getMilliseconds() < 100
					? (date.getMilliseconds() < 10 ? ('00' + date.getMilliseconds()) : '0' + date.getMilliseconds())
					: date.getMilliseconds()
				
		return showMilliseconds ? (Y + M + D + H + Minute + S + '.' + milliseconds) : (Y + M + D + H + Minute + S)
	}
}
export default ZWSDateTool