const baseUrl=getApp().globalData.baseUrl
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

//防抖
function debounce (fn, time = 1000, triggerNow) {
  var t = null,res;
  var debounced = function () {
    const _self = this
    const args = arguments
    // 先立即执行
    if (triggerNow) {
      const exits = t
      if (t) {
        clearTimeout(t)
      }
      t = setTimeout(() => {
        t = null
      }, time)
      if (!exits) {
        res = fn.apply(_self, args)
      }
    } else {
      clearTimeout(t)
      t = setTimeout(() => {
        res = fn.apply(_self, args)
      }, time)
    }
    return res
  }
  // 强制取消防抖
  debounced.remove = function () {
    clearTimeout(t)
    t = null
  }
  return debounced
}

//节流
function throttle (fn, delay = 1000) {
  var t = null,
    // 记录开始时间和结束时间作比较
    begain = new Date().getTime()
  // 返回一个函数，通过监听事件进行调用
  return function () {
  // 清除定时器
    clearTimeout(t)
  // 记录事件函数调用的时间
    var cur = new Date().getTime(),
      _self = this,
      args = arguments
  // 事件执行事件差，和延迟时间相比较
    if (cur - begain >= delay) {
      fn.apply(this, args)
      begain = cur
    } else {
  // 最后一次 事件 delay 执行回调
      t = setTimeout(function () {
        fn.apply(_self, args)
        begain = cur
      }, delay)
    }
  }
}

module.exports = {
  formatTime,
  baseUrl,
  debounce,
  throttle,
}
