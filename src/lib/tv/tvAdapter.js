// 电视端遥控器适配器
// 处理方向键、确认键、返回键等遥控器按键事件

class TVAdapter {
  constructor() {
    this.focusableElements = []
    this.currentFocusIndex = 0
    this.isTV = false
    this.init()
  }

  init() {
    // 检测是否为电视设备
    this.checkTVDevice()
    
    if (this.isTV) {
      this.bindTVKeys()
      this.setupFocusSystem()
    }
  }

  checkTVDevice() {
    // 通过用户代理或屏幕尺寸判断是否为电视
    const userAgent = navigator.userAgent.toLowerCase()
    const screenWidth = window.screen.width
    const screenHeight = window.screen.height
    
    // 常见电视设备标识
    const tvKeywords = ['tv', 'smart-tv', 'appletv', 'googletv', 'hbbtv', 'pov_tv', 'netcast.tv', 'webos', 'tizen']
    
    this.isTV = tvKeywords.some(keyword => userAgent.includes(keyword)) || 
                (screenWidth >= 1280 && screenHeight >= 720 && !userAgent.includes('mobile'))
    
    // 也可以通过uni-app的条件编译判断
    // #ifdef APP-PLUS
    try {
      const deviceInfo = uni.getSystemInfoSync()
      if (deviceInfo.deviceType === 'tv' || deviceInfo.screenWidth >= 1280) {
        this.isTV = true
      }
    } catch (e) {
      console.log('获取设备信息失败')
    }
    // #endif
  }

  bindTVKeys() {
    // 监听遥控器按键
    document.addEventListener('keydown', (e) => {
      switch(e.keyCode) {
        case 37: // 左方向键
        case 10009: // Tizen TV 返回键
          e.preventDefault()
          this.moveFocus('left')
          break
        case 38: // 上方向键
          e.preventDefault()
          this.moveFocus('up')
          break
        case 39: // 右方向键
          e.preventDefault()
          this.moveFocus('right')
          break
        case 40: // 下方向键
          e.preventDefault()
          this.moveFocus('down')
          break
        case 13: // 确认键 (Enter)
        case 23: // Android TV 确认键
          e.preventDefault()
          this.clickFocusedElement()
          break
        case 8: // 返回键 (Backspace)
        case 10009: // Samsung Smart TV 返回键
        case 461: // webOS 返回键
          e.preventDefault()
          this.handleBackKey()
          break
        case 36: // Home键
          e.preventDefault()
          this.handleHomeKey()
          break
        case 415: // 播放键
        case 19: // 暂停键
          e.preventDefault()
          this.handlePlayPause()
          break
      }
    })
  }

  setupFocusSystem() {
    // 为可聚焦元素添加焦点样式
    const style = document.createElement('style')
    style.textContent = `
      .tv-focus {
        outline: 3px solid #409EFF !important;
        outline-offset: 2px !important;
        box-shadow: 0 0 10px rgba(64, 158, 255, 0.5) !important;
      }
      .tv-focus-item {
        transition: all 0.2s ease;
      }
      .tv-focus-item:focus {
        outline: 3px solid #409EFF;
        outline-offset: 2px;
        transform: scale(1.05);
      }
    `
    document.head.appendChild(style)

    // 定期更新可聚焦元素列表
    setInterval(() => {
      this.updateFocusableElements()
    }, 1000)
  }

  updateFocusableElements() {
    // 获取所有可交互元素
    this.focusableElements = Array.from(document.querySelectorAll(
      'button, [role="button"], a, input, select, textarea, [tabindex]:not([tabindex="-1"]), .el-select, .el-option, .zy-svg, li'
    )).filter(el => {
      // 过滤掉隐藏元素
      return el.offsetParent !== null && 
             !el.disabled && 
             getComputedStyle(el).visibility !== 'hidden'
    })
  }

  moveFocus(direction) {
    if (this.focusableElements.length === 0) return

    const currentElement = this.focusableElements[this.currentFocusIndex]
    if (!currentElement) {
      this.currentFocusIndex = 0
      this.setFocus(this.focusableElements[0])
      return
    }

    const currentRect = currentElement.getBoundingClientRect()
    let nextElement = null
    let minDistance = Infinity

    // 寻找下一个焦点元素
    this.focusableElements.forEach((el, index) => {
      if (index === this.currentFocusIndex) return

      const rect = el.getBoundingClientRect()
      const distance = this.calculateDistance(currentRect, rect, direction)

      if (distance !== null && distance < minDistance) {
        minDistance = distance
        nextElement = el
        this.currentFocusIndex = index
      }
    })

    if (nextElement) {
      this.setFocus(nextElement)
    }
  }

  calculateDistance(rect1, rect2, direction) {
    const center1 = {
      x: rect1.left + rect1.width / 2,
      y: rect1.top + rect1.height / 2
    }
    const center2 = {
      x: rect2.left + rect2.width / 2,
      y: rect2.top + rect2.height / 2
    }

    const dx = center2.x - center1.x
    const dy = center2.y - center1.y

    switch(direction) {
      case 'left':
        if (dx >= 0) return null
        return Math.abs(dx) + Math.abs(dy) * 0.5
      case 'right':
        if (dx <= 0) return null
        return Math.abs(dx) + Math.abs(dy) * 0.5
      case 'up':
        if (dy >= 0) return null
        return Math.abs(dy) + Math.abs(dx) * 0.5
      case 'down':
        if (dy <= 0) return null
        return Math.abs(dy) + Math.abs(dx) * 0.5
      default:
        return null
    }
  }

  setFocus(element) {
    // 移除之前的焦点样式
    this.focusableElements.forEach(el => {
      el.classList.remove('tv-focus')
      el.blur()
    })

    // 添加新的焦点样式
    element.classList.add('tv-focus')
    element.focus()

    // 滚动到可视区域
    element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
  }

  clickFocusedElement() {
    const focusedElement = document.querySelector('.tv-focus')
    if (focusedElement) {
      // 模拟点击事件
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
      focusedElement.dispatchEvent(clickEvent)
    }
  }

  handleBackKey() {
    // 处理返回键 - 可以触发Vue路由返回或关闭弹窗
    const event = new CustomEvent('tv-back-key')
    document.dispatchEvent(event)
  }

  handleHomeKey() {
    // 处理Home键
    const event = new CustomEvent('tv-home-key')
    document.dispatchEvent(event)
  }

  handlePlayPause() {
    // 处理播放/暂停键
    const event = new CustomEvent('tv-play-pause')
    document.dispatchEvent(event)
  }

  // 手动设置焦点到指定元素
  focusElement(selector) {
    const element = document.querySelector(selector)
    if (element) {
      const index = this.focusableElements.indexOf(element)
      if (index !== -1) {
        this.currentFocusIndex = index
        this.setFocus(element)
      }
    }
  }
}

// 导出单例
export default new TVAdapter()
