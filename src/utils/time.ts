/**
 * 获取当前时间 返回下午、上午、晚上
 */

export function getTime(): string {
  let message: string = ''
  let hours: number = new Date().getHours()
  if (hours >= 6 && hours <= 9) {
    message = '早上好'
  } else if (hours <= 14) {
    message = '中午好'
  } else if (hours <= 18) {
    message = '下午好'
  } else {
    message = '晚上好'
  }
  return message
}