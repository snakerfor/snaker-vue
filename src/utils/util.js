export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () { }
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

export function millsToTime (mills) {
  if (!mills) {
    return ''
  }
  const s = mills / 1000
  if (s < 60) {
    return s.toFixed(0) + ' 秒'
  }
  const m = s / 60
  if (m < 60) {
    return m.toFixed(0) + ' 分钟'
  }
  const h = m / 60
  if (h < 24) {
    return h.toFixed(0) + ' 小时'
  }
  const d = h / 24
  if (d < 30) {
    return d.toFixed(0) + ' 天'
  }
  const month = d / 30
  if (month < 12) {
    return month.toFixed(0) + ' 个月'
  }
  const year = month / 12
  return year.toFixed(0) + ' 年'
}

export function sleep (n) {
  var start = new Date().getTime()
  //  console.log('休眠前：' + start);
  while (true) {
    if (new Date().getTime() - start > n) {
      break
    }
  }
  // console.log('休眠后：' + new Date().getTime());
}

export function uuid () {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  var uuid = s.join('')
  return uuid
}

export function isEqualArray (listA, listB) {
  return listA.length === listB.length && listA.every(a => listB.some(b => a === b)) && listB.every(_b => listA.some(_a => _a === _b))
}

export function formatTodayDate () {
  var date = new Date()
  var seperator1 = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate
  return currentdate
}

// 对数组按某个元素属性进行分组
export function arrayGroupBy (list, groupId) {
  const sorted = groupBy(list, function (item) {
    return [item[groupId]]
  })
  return sorted
}

function groupBy (array, f) {
  const groups = {}
  array.forEach(function (o) {
    var group = JSON.stringify(f(o))
    groups[group] = groups[group] || []
    groups[group].push(o)
  })
  return Object.keys(groups).map(function (group) {
    return groups[group]
  })
}

export function isNumber (val) {
  if (parseFloat(val).toString() === 'NaN') {
    return false
  } else {
    return true
  }
}

export function sortNumberArr (numberArr) {
  var compare = function (x, y) {
    if (x < y) {
      return -1
    } else if (x > y) {
      return 1
    } else {
      return 0
    }
  }
  numberArr.sort(compare)
}

export function isArrayFn (value) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value)
  } else {
    return Object.prototype.toString.call(value) === '[object Array]'
  }
}
