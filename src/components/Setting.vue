<template>
  <div class="setting">
    <div class="logo">
      ZY Player
    </div>
    <div class="info">
      <a @click="linkOpen('https://github.com/Hunlongyu/ZY-Player')">Github</a>
      <a @click="linkOpen('https://github.com/Hunlongyu/ZY-Player/issues')">当前版本v{{pkg.version}} 反馈</a>
    </div>
    <div class="view">
      <div class="title">视图</div>
      <div class="view-box">
        <div class="zy-select" @mouseleave="show.view = false">
          <div class="vs-placeholder" @click="show.view = true">默认视图</div>
          <div class="vs-options" v-show="show.view">
            <ul class="zy-scroll">
              <li :class="d.view === 'picture' ? 'active' : ''" @click="selectView('picture')">海报</li>
              <li :class="d.view === 'table' ? 'active' : ''" @click="selectView('table')">表格</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="site">
      <div class="title">源站</div>
      <div class="site-box">
        <div class="zy-select" @mouseleave="show.site = false">
          <div class="vs-placeholder" @click="show.site = true">默认源站</div>
          <div class="vs-options" v-show="show.site">
            <ul class="zy-scroll">
              <li :class="d.site === i.key ? 'active' : ''" v-for="i in sitesList" :key="i.key" @click="selectSite(i)" v-show="i.isActive">{{ i.name }}</li>
            </ul>
          </div>
        </div>
        <div @click="editSitesEvent" class="zy-svg">
          <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="editIconTitle">
            <title id="editIconTitle">编辑源</title>
            <path d="M18.85 4.575a2.1 2.1 0 0 0-2.97 0L5.433 14.97 4 20l5.028-1.433L18.85 7.545a2.1 2.1 0 0 0 0-2.97z"></path>
          </svg>
        </div>
      </div>
    </div>
    <div class="shortcut">
      <div class="title">快捷键</div>
      <div class="shortcut-box">
        <div class="zy-select" @mouseleave="show.shortcut = false">
          <div class="vs-placeholder" @click="show.shortcut = true">快捷键</div>
          <div class="vs-options" v-show="show.shortcut">
            <ul class="zy-scroll">
              <li :class="d.shortcut === true ? 'active' : ''" @click="selectShortcut(true)">开启</li>
              <li :class="d.shortcut === false ? 'active' : ''" @click="selectShortcut(false)">关闭</li>
            </ul>
          </div>
        </div>
        <div @click="editShortcutEvent" class="zy-svg">
          <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="editIconTitle">
            <title id="editIconTitle">编辑快捷键</title>
            <path d="M18.85 4.575a2.1 2.1 0 0 0-2.97 0L5.433 14.97 4 20l5.028-1.433L18.85 7.545a2.1 2.1 0 0 0 0-2.97z"></path>
          </svg>
        </div>
      </div>
    </div>
    <div class="theme">
      <div class="title">主题</div>
      <div class="theme-box">
        <div @click="changeTheme('light')" class="theme-item light" :class="d.theme === 'light' ? 'active' : ''">
          <div class="theme-image">
            <img src="../assets/image/light.png" alt="">
          </div>
          <div class="theme-title">Light</div>
        </div>
        <div @click="changeTheme('dark')" class="theme-item dark" :class="d.theme === 'dark' ? 'active' : ''">
          <div class="theme-image">
            <img src="../assets/image/dark.png" alt="">
          </div>
          <div class="theme-title">Dark</div>
        </div>
        <div @click="changeTheme('green')" class="theme-item green" :class="d.theme === 'green' ? 'active' : ''">
          <div class="theme-image">
            <img src="../assets/image/green.png" alt="">
          </div>
          <div class="theme-title">Green</div>
        </div>
        <div @click="changeTheme('pink')" class="theme-item pink" :class="d.theme === 'pink' ? 'active' : ''">
          <div class="theme-image">
            <img src="../assets/image/pink.png" alt="">
          </div>
          <div class="theme-title">Pink</div>
        </div>
      </div>
    </div>
    <div class="other">
      <div class="title">其他</div>
      <div class="other-box">
        <div class="other-item">
          <div class="tip">恢复窗口位置</div>
          <div class="zy-switch">
            <input type="checkbox" name="restoreWindowPositionAndSize" v-model="d.restoreWindowPositionAndSize" @change="updateSettingEvent">
          </div>
        </div>
        <div class="other-item">
          <div class="tip">默认播放视频时自动全屏</div>
          <div class="zy-switch">
            <input type="checkbox" name="autoPlayFullScreen" v-model="d.autoPlayFullScreen" @change="updateSettingEvent">
          </div>
        </div>
        <div class="other-item">
          <div class="tip">默认播放视频时进入精简模式</div>
          <div class="zy-switch">
            <input type="checkbox" name="enterMiniModeOnPlay" v-model="d.enterMiniModeOnPlay" @change="updateSettingEvent">
          </div>
        </div>
        <div class="other-item">
          <div class="tip">默认播放视频时自动跳转上次进度</div>
          <div class="zy-switch">
            <input type="checkbox" name="allowPassWhenIptvAdd" v-model="d.allowPassWhenIptvAdd" @change="updateSettingEvent">
          </div>
        </div>
        <div class="other-item">
          <div class="tip">默认关闭软件时最小化到托盘</div>
          <div class="zy-switch">
            <input type="checkbox" name="closeAppRoute" v-model="d.closeAppRoute" @change="updateSettingEvent">
          </div>
        </div>
        <div class="other-item">
          <div class="tip">开启代理</div>
          <div class="zy-switch">
            <input type="checkbox" name="proxy" v-model="show.proxy" @change="proxyChange">
          </div>
        </div>
        <div class="other-item">
          <div class="tip">允许点击历史列表直接播放</div>
          <div class="zy-switch">
            <input type="checkbox" name="allowDirectPlayFromHistory" v-model="d.allowDirectPlayFromHistory" @change="updateSettingEvent">
          </div>
        </div>
        <div class="other-item">
          <div class="tip">默认解析接口</div>
          <div class="zy-input">
            <input type="text" v-model="d.defaultParseURL" @change="updateSettingEvent" placeholder="请输入解析接口">
          </div>
        </div>
        <div class="other-item">
          <div class="tip">源站接口文件</div>
          <div class="zy-input">
            <input type="text" v-model="d.sitesDataURL" @change="updateSettingEvent" placeholder="请输入源站接口文件URL">
          </div>
        </div>
      </div>
    </div>
    <div class="qrcode">
      <div class="title">二维码</div>
      <div class="qrcode-box">
        <qrcode-vue :value="pkg.homepage" :size="200" level="H" />
      </div>
    </div>
    <div class="update">
      <div class="title">更新</div>
      <div class="update-box">
        <div class="update-item">
          <div class="tip">当前版本</div>
          <div class="zy-input">
            <input type="text" v-model="pkg.version" readonly>
          </div>
        </div>
        <div class="update-item">
          <div class="tip">最新版本</div>
          <div class="zy-input">
            <input type="text" v-model="latestVersion" readonly>
          </div>
        </div>
        <div class="update-item">
          <div class="tip">更新内容</div>
          <div class="zy-input">
            <textarea v-model="update.html" readonly></textarea>
          </div>
        </div>
        <div class="update-item">
          <div class="tip">操作</div>
          <div class="zy-input">
            <button @click="checkUpdate">检查更新</button>
            <button @click="downloadUpdate" v-if="update.show">下载更新</button>
            <button @click="installUpdate" v-if="update.downloaded">安装更新</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import pkg from '../../package.json'
import { setting, sites, shortcut } from '../lib/dexie'
import { localKey as defaultShortcuts } from '../lib/dexie/initData'
import db from '../lib/dexie/dexie'
import zy from '../lib/site/tools'

export default {
  name: 'setting',
  data () {
    return {
      pkg: pkg,
      shortcutList: [],
      show: {
        site: false,
        shortcut: false,
        view: false,
        editPlayerPath: false,
        checkPasswordDialog: false,
        changePasswordDialog: false,
        proxy: false,
        proxyDialog: false,
        configDefaultParseUrlDialog: false,
        configSitesDataUrlDialog: false
      },
      d: { },
      latestVersion: pkg.version,
      inputPassword: '',
      action: '',
      proxy: {
        type: '',
        scheme: '',
        url: '',
        port: ''
      },
      update: {
        find: false,
        version: '',
        show: false,
        html: '',
        downloaded: false,
        showDownload: true
      }
    }
  },
  computed: {
    view: {
      get () {
        return this.$store.getters.getView
      },
      set (val) {
        this.SET_VIEW(val)
      }
    },
    setting: {
      get () {
        return this.$store.getters.getSetting
      },
      set (val) {
        this.SET_SETTING(val)
      }
    },
    sitesList () {
      return this.$store.getters.getSitesList
    }
  },
  watch: {
    view () {
      if (this.view === 'Setting') {
        this.getSetting()
      }
    }
  },
  methods: {
    ...mapMutations(['SET_VIEW', 'SET_SETTING', 'SET_EDITSITES']),
    linkOpen (e) {
      // 在移动端/电视端使用系统浏览器打开链接
      // #ifdef APP-PLUS
      plus.runtime.openURL(e)
      // #endif
      // #ifndef APP-PLUS
      window.open(e, '_blank')
      // #endif
    },
    selectView (e) {
      this.d.view = e
      this.show.view = false
      this.updateSettingEvent()
    },
    selectSite (e) {
      this.d.site = e.key
      this.show.site = false
      this.updateSettingEvent()
    },
    selectShortcut (e) {
      this.d.shortcut = e
      this.show.shortcut = false
      this.updateSettingEvent()
    },
    changeTheme (e) {
      this.d.theme = e
      this.updateSettingEvent()
    },
    getSetting () {
      setting.find().then(res => {
        this.d = res
        this.setting = this.d
      })
    },
    updateSettingEvent () {
      setting.find().then(res => {
        res.theme = this.d.theme
        res.shortcut = this.d.shortcut
        res.view = this.d.view
        res.site = this.d.site
        res.volume = this.d.volume
        res.autoPlayFullScreen = this.d.autoPlayFullScreen
        res.enterMiniModeOnPlay = this.d.enterMiniModeOnPlay
        res.allowPassWhenIptvAdd = this.d.allowPassWhenIptvAdd
        res.closeAppRoute = this.d.closeAppRoute
        res.allowDirectPlayFromHistory = this.d.allowDirectPlayFromHistory
        res.proxy = this.d.proxy
        res.defaultParseURL = this.d.defaultParseURL
        res.sitesDataURL = this.d.sitesDataURL
        res.restoreWindowPositionAndSize = this.d.restoreWindowPositionAndSize
        res.windowPositionAndSize = this.d.windowPositionAndSize
        setting.update(res)
        this.setting = res
      })
    },
    editSitesEvent () {
      this.view = 'EditSites'
    },
    editShortcutEvent () {
      this.view = 'EditShortcut'
    },
    proxyChange () {
      this.updateSettingEvent()
    },
    checkUpdate () {
      // 在移动端/电视端，使用简单的版本检查
      this.$message.info('正在检查更新...')
      // 这里可以添加从服务器获取最新版本的逻辑
      // 暂时模拟检查
      setTimeout(() => {
        this.$message.success('当前已是最新版本')
      }, 1000)
    },
    downloadUpdate () {
      this.$message.info('开始下载更新...')
    },
    installUpdate () {
      this.$message.info('开始安装更新...')
    },
    copyToClipboard (text) {
      // #ifdef APP-PLUS
      uni.setClipboardData({
        data: text,
        success: () => {
          this.$message.success('复制成功')
        }
      })
      // #endif
      // #ifndef APP-PLUS
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          this.$message.success('复制成功')
        })
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = text
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        this.$message.success('复制成功')
      }
      // #endif
    }
  },
  created () {
    this.getSetting()
  }
}
</script>

<style lang="scss" scoped>
.setting {
  padding: 20px;
  .logo {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .info {
    margin-bottom: 20px;
    a {
      margin-right: 15px;
      color: #409EFF;
      cursor: pointer;
    }
  }
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .view, .site, .shortcut, .theme, .other, .qrcode, .update {
    margin-bottom: 20px;
  }
  .theme-box {
    display: flex;
    .theme-item {
      margin-right: 15px;
      cursor: pointer;
      border: 2px solid transparent;
      &.active {
        border-color: #409EFF;
      }
      .theme-image {
        width: 100px;
        height: 60px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .theme-title {
        text-align: center;
        margin-top: 5px;
      }
    }
  }
  .other-box, .update-box {
    .other-item, .update-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .tip {
        width: 200px;
      }
      .zy-input {
        flex: 1;
        input, textarea {
          width: 100%;
          padding: 5px;
          border: 1px solid #dcdfe6;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
