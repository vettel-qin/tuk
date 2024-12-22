/**
 *  localStorage 、sessionStorage 模块封装
 */

export const storage = {
  /**
   * storage存储
   * @param key { string } 参数名称
   * @param value { any } 写入值
   */
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  /**
   * storage 读取
   * @param key { string } 参数名称
   * @returns storage { any } 返回值
   */
  get(key: string) {
    const value = localStorage.getItem(key)
    if (!value) return ''
    try {
      return JSON.parse(value)
    } catch (error) {
      return ''
    }
  },
  /**
   * storage 删除
   * @param key { string } 参数名称
   */
  remove(key: string) {
    localStorage.removeItem(key)
  },
  /**
   * 清空所有
   */
  clear() {
    localStorage.clear()
  },
}

export const sessionStorage = {
  /**
   * sessionStorage 存储
   * @param key { string } 参数名称
   * @param value { any } 写入值
   */
  set(key: string, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  },
  /**
   * sessionStorage 读取
   * @param key { string } 参数名称
   * @returns sessionStorage { any } 返回值
   */
  get(key: string) {
    return JSON.parse(window.sessionStorage.getItem(key) as string)
  },
  /**
   * sessionStorage 删除
   * @param key { string } 参数名称
   */
  remove(key: string) {
    window.sessionStorage.removeItem(key)
  },
  /**
   * 清空所有
   */
  clear() {
    sessionStorage.clear()
  },
}
