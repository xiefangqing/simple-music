export function getComponentRect(selector) {
  return new Promise(resolve => {
    const query = wx.createSelectorQuery()
    query.select(selector).boundingClientRect()
    query.exec(resolve)
  })
}

// 支持返回promise的节流函数
export function throttle(callback, delay) {
  let valid = true
  return function () {
    return new Promise(resolve => {
      if (!valid) return
      valid = false
      setTimeout(_ => {
        resolve(callback.apply(this, arguments))
        valid = true
      }, delay)
    })
  }
}

// 支持返回promise的防抖函数
export function debounce(callback, delay) {
  let timer = null
  return function () {
    return new Promise(resolve => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(_ => {
        resolve(callback.apply(this, arguments))
      }, delay)
    })
  }
}
