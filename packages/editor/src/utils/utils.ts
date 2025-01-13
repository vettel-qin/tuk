/**
 * 生成组件ID
 * @param name 组件类型名称
 * @returns 新名称
 */
export const createId = (name: string, len: number = 10) => {
  return (
    name +
    '_' +
    Number(Math.random().toString().substring(2, 12) + Date.now())
      .toString(36)
      .slice(0, len)
  )
}

/**
 * 递归获取元素的相对位置(相对于pageWrapper)
 */
export function getBoundingClientRect(element: any) {
  let offsetTop = 0
  let offsetLeft = 0
  const { width, height } = element.getBoundingClientRect()
  while (element) {
    // 如果是顶级元素，则直接跳出循环
    if (element.id === 'editor') {
      offsetTop -= element.offsetTop
      break
    }
    offsetTop += element.offsetTop
    offsetLeft += element.offsetLeft
    element = element.offsetParent
  }

  return {
    width: width,
    height: height,
    top: offsetTop,
    left: offsetLeft,
  }
}
