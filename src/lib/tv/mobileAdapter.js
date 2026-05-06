// 移动端适配器
// 处理触摸事件、手势操作等移动端特性

class MobileAdapter {
  constructor() {
    this.isMobile = false
    this.touchStartX = 0
    this.touchStartY = 0
    this.touchStartTime = 0
    this.longPressTimer = null
    this.init()
  }

  init() {
    this.checkMobileDevice()
    
    if (this.isMobile) {
      this.bindTouchEvents()
      this.setupMobileStyles()
    }
  }

  checkMobileDevice() {
    const userAgent = navigator.userAgent.toLowerCase()
    const screenWidth = window.screen.width
    
    // 检测移动设备
    const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'ipod', 'windows phone', 'blackberry']
    this.isMobile = mobileKeywords.some(keyword => userAgent.includes(keyword)) || screenWidth < 768

    // #ifdef APP-PLUS
    try {
      const deviceInfo = uni.getSystemInfoSync()
      if (deviceInfo.platform === 'android' || deviceInfo.platform === 'ios') {
        this.isMobile = true
      }
    } catch (e) {
      console.log('获取设备信息失败')
    }
    // #endif
  }

  bindTouchEvents() {
    // 全局触摸事件处理
    document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false })
    document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false })
    document.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false })
    document.addEventListener('touchcancel', this.handleTouchCancel.bind(this), { passive: false })
  }

  handleTouchStart(e) {
    const touch = e.touches[0]
    this.touchStartX = touch.clientX
    this.touchStartY = touch.clientY
    this.touchStartTime = Date.now()

    // 长按检测
    this.longPressTimer = setTimeout(() => {
      this.handleLongPress(e)
    }, 800)
  }

  handleTouchMove(e) {
    // 移动时取消长按
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer)
      this.longPressTimer = null
    }

    const touch = e.touches[0]
    const deltaX = touch.clientX - this.touchStartX
    const deltaY = touch.clientY - this.touchStartY

    // 检测滑动方向
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // 水平滑动
      if (Math.abs(deltaX) > 50) {
        e.preventDefault()
      }
    }
  }

  handleTouchEnd(e) {
    // 清除长按定时器
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer)
      this.longPressTimer = null
    }

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - this.touchStartX
    const deltaY = touch.clientY - this.touchStartY
    const deltaTime = Date.now() - this.touchStartTime

    // 检测快速滑动
    if (deltaTime < 300) {
      if (Math.abs(deltaX) > 100 && Math.abs(deltaX) > Math.abs(deltaY)) {
        // 水平快速滑动
        if (deltaX > 0) {
          this.handleSwipeRight()
        } else {
          this.handleSwipeLeft()
        }
      } else if (Math.abs(deltaY) > 100 && Math.abs(deltaY) > Math.abs(deltaX)) {
        // 垂直快速滑动
        if (deltaY > 0) {
          this.handleSwipeDown()
        } else {
          this.handleSwipeUp()
        }
      }
    }
  }

  handleTouchCancel(e) {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer)
      this.longPressTimer = null
    }
  }

  handleLongPress(e) {
    // 触发长按事件
    const event = new CustomEvent('mobile-long-press', {
      detail: {
        x: this.touchStartX,
        y: this.touchStartY
      }
    })
    document.dispatchEvent(event)
  }

  handleSwipeLeft() {
    const event = new CustomEvent('mobile-swipe-left')
    document.dispatchEvent(event)
  }

  handleSwipeRight() {
    const event = new CustomEvent('mobile-swipe-right')
    document.dispatchEvent(event)
  }

  handleSwipeUp() {
    const event = new CustomEvent('mobile-swipe-up')
    document.dispatchEvent(event)
  }

  handleSwipeDown() {
    const event = new CustomEvent('mobile-swipe-down')
    document.dispatchEvent(event)
  }

  setupMobileStyles() {
    // 添加移动端优化样式
    const style = document.createElement('style')
    style.textContent = `
      /* 移动端触摸优化 */
      * {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
      }
      
      /* 增大触摸区域 */
      button, [role="button"], a, .zy-svg {
        min-height: 44px;
        min-width: 44px;
      }
      
      /* 禁用文本选择 */
      .no-select {
        -webkit-user-select: none;
        user-select: none;
      }
      
      /* 滚动优化 */
      .scroll-container {
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
      }
      
      /* 防止缩放 */
      input, textarea, select {
        font-size: 16px;
      }
    `
    document.head.appendChild(style)
  }

  // 震动反馈
  vibrate(pattern = 50) {
    if (navigator.vibrate) {
      navigator.vibrate(pattern)
    }
    // #ifdef APP-PLUS
    uni.vibrateShort()
    // #endif
  }

  // 显示触摸反馈
  showTouchFeedback(x, y) {
    const feedback = document.createElement('div')
    feedback.style.cssText = `
      position: fixed;
      left: ${x - 25}px;
      top: ${y - 25}px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(64, 158, 255, 0.3);
      pointer-events: none;
      z-index: 9999;
      animation: touchFeedback 0.5s ease-out forwards;
    `
    document.body.appendChild(feedback)
    
    setTimeout(() => {
      document.body.removeChild(feedback)
    }, 500)
  }
}

// 添加CSS动画
const style = document.createElement('style')
style.textContent = `
  @keyframes touchFeedback {
    0% {
      transform: scale(0.5);
      opacity: 1;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
`
document.head.appendChild(style)

export default new MobileAdapter()
