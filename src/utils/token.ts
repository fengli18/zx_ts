/**
 * 封装token的本地存储和读取
 */

export function SET_TOKEN(token: string) {
  localStorage.setItem('TOKEN', token)
}

export function GET_TOKEN(): string {
  return localStorage.getItem('TOKEN')
}

export function DEL_TOKEN(): void {
  localStorage.removeItem('TOKEN')
}