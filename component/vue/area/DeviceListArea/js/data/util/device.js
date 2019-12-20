/**
 * Createx by caoxiaoli
 * time: 209-05-16
 * content: 渲染设备相关函数
 */

/**
 * 动态渲染SD卡状态
 * value 传入SD的值（数字类型），返回相对应的字符串
 */
export const SDStatFunc = (value) => {
  let text = ''
  switch (value) {
    case -1:
      text = '不支持'
      break
    case 0:
      text = '未插入'
      break
    case 1:
      text = '未记录'
      break
    case 2:
      text = '记录中'
      break
    default:
      text = '--'
      break
  }
  return text
}

/**
 * 统一设备在线显示规则，输出三种值， 0：在线，1：离线，2:故障
 * 规则：设备在线状态下，如果fault为0，则为在线正常；如果fault为1，则为在线异常。
 * @param {Number} status 设备在线状态
 * @param {Number} fault 设备的是否故障的状态
 */
export function formatDevStatus (status, fault) {
	const offline = 1
	const onlineNormal = 0
	const onlineAbnormal = 2
  if (typeof status === 'number') {
		if (status === 0) {
			if (!Number(fault)) {
				return onlineNormal
			} else if (fault && fault == 1) {
				return onlineAbnormal
			}
		} else {
			return offline
		}
  } else {
		return offline
	}
}
