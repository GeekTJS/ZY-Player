<template>
  <div class="listpage" id="star">
    <div class="listpage-content">
      <div class="listpage-header">
        <span class="btn" :class="[showToolbar ? 'active' : '']" @click="showToolbar = !showToolbar">
          <svg t="1595939102917" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11041" style="width: 20px; height: 20px;">
            <path d="M 64 192 H 320 V 256 H 64 V 192 Z M 64 448 H 576 V 512 H 64 V 448 Z M 64 704 H 448 V 768 H 64 V 704 Z M 832 320 L 960 192 L 832 64 L 704 192 L 832 320 Z M 832 832 L 960 704 L 832 576 L 704 704 L 832 832 Z M 832 576 L 960 448 L 832 320 L 704 448 L 832 576 Z" p-id="11042" fill="#ffffff"></path>
          </svg>
        </span>
        <span class="btn" @click="refreshList">
          <svg t="1595939427219" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11417" style="width: 20px; height: 20px;">
            <path d="M 960 416 V 192 H 704 v 64 h 160 l -3.3 3.3 C 807.5 322.9 739.9 384 658.6 416 H 576 v 64 h 82.6 c 102.1 38.2 176.8 123.5 204.8 228.1 c 5.7 21.4 20.9 39.1 40.9 48.2 l 53.3 24.1 l 26.7 -58.9 l -53.3 -24.1 c -6.6 -3 -11.6 -9.2 -13.6 -16.4 C 891.5 614.6 801.4 512.6 685.8 469.3 C 801.4 426 891.5 324 883.4 209.1 c -2 -7.2 -7 -13.4 -13.6 -16.4 l -53.3 -24.1 l -26.7 58.9 l 53.3 24.1 c 20 9.1 35.2 26.8 40.9 48.2 c 8.1 30.5 10.3 62.2 6.5 93.9 H 960 Z M 64 416 V 192 h 256 v 64 H 160 l 3.3 3.3 C 216.5 322.9 284.1 384 365.4 416 H 448 v 64 h -82.6 c -102.1 38.2 -176.8 123.5 -204.8 228.1 c -5.7 21.4 -20.9 39.1 -40.9 48.2 l -53.3 24.1 l -26.7 -58.9 l 53.3 -24.1 c 6.6 -3 11.6 -9.2 13.6 -16.4 C 132.5 614.6 222.6 512.6 338.2 469.3 C 222.6 426 132.5 324 140.6 209.1 c 2 -7.2 7 -13.4 13.6 -16.4 l 53.3 -24.1 l 26.7 58.9 l -53.3 24.1 c -20 9.1 -35.2 26.8 -40.9 48.2 c -8.1 30.5 -10.3 62.2 -6.5 93.9 H 64 Z" p-id="11418" fill="#ffffff"></path>
          </svg>
        </span>
        <span class="btn" @click="exportFavoritesEvent">
          <svg t="1595939464379" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11549" style="width: 20px; height: 20px;">
            <path d="M 512 64 C 264.6 64 64 264.6 64 512 s 200.6 448 448 448 s 448 -200.6 448 -448 S 759.4 64 512 64 Z M 512 832 c -176.7 0 -320 -143.3 -320 -320 S 335.3 192 512 192 s 320 143.3 320 320 S 688.7 832 512 832 Z M 672 480 H 352 v 64 h 320 V 480 Z M 480 352 v 320 h 64 V 352 H 480 Z" p-id="11550" fill="#ffffff"></path>
          </svg>
        </span>
        <span class="btn" @click="importFavoritesEvent">
          <svg t="1595939485610" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11717" style="width: 20px; height: 20px;">
            <path d="M 512 64 C 264.6 64 64 264.6 64 512 s 200.6 448 448 448 s 448 -200.6 448 -448 S 759.4 64 512 64 Z M 512 832 c -176.7 0 -320 -143.3 -320 -320 S 335.3 192 512 192 s 320 143.3 320 320 S 688.7 832 512 832 Z M 672 480 H 352 v 64 h 320 V 480 Z" p-id="11718" fill="#ffffff"></path>
          </svg>
        </span>
        <span class="btn" @click="clearFavoritesEvent">
          <svg t="1595939505661" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11885" style="width: 20px; height: 20px;">
            <path d="M 512 64 C 264.6 64 64 264.6 64 512 s 200.6 448 448 448 s 448 -200.6 448 -448 S 759.4 64 512 64 Z M 512 832 c -176.7 0 -320 -143.3 -320 -320 S 335.3 192 512 192 s 320 143.3 320 320 S 688.7 832 512 832 Z M 672 480 H 352 v 64 h 320 V 480 Z" p-id="11886" fill="#ffffff"></path>
          </svg>
        </span>
      </div>
      <div class="listpage-body" id="list-table">
        <el-table
          :data="filteredList"
          height="100%"
          row-key="id"
          @row-click="detailEvent"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="片名">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            width="100">
          </el-table-column>
          <el-table-column
            prop="year"
            label="年份"
            width="100">
          </el-table-column>
          <el-table-column
            prop="site"
            label="源站"
            width="100">
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button @click.stop="playEvent(scope.row)" type="text">播放</el-button>
              <el-button @click.stop="deleteEvent(scope.row)" type="text">删除</el-button>
              <el-button @click.stop="shareEvent(scope.row)" type="text">分享</el-button>
              <el-button @click.stop="downloadEvent(scope.row)" type="text">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { history, star, sites, setting } from '../lib/dexie'
import zy from '../lib/site/tools'
import fs from 'fs'
import Sortable from 'sortablejs'
import Waterfall from 'vue-waterfall-plugin'
export default {
  name: 'star',
  data () {
    return {
      list: [],
      sites: [],
      numNoUpdate: 0,
      shiftDown: false,
      selectionBegin: '',
      selectionEnd: '',
      multipleSelection: [],
      filteredList: [],
      areas: [],
      types: [],
      // Toolbar
      showToolbar: false,
      selectedAreas: [],
      selectedTypes: [],
      sortKeyword: '',
      sortKeywords: ['按片名', '按上映年份', '按更新时间'],
      selectedYears: { start: 0, end: new Date().getFullYear() },
      onlyShowItemsHasUpdate: false
    }
  },
  components: {
    Waterfall
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
    video: {
      get () {
        return this.$store.getters.getVideo
      },
      set (val) {
        this.SET_VIDEO(val)
      }
    },
    detail: {
      get () {
        return this.$store.getters.getDetail
      },
      set (val) {
        this.SET_DETAIL(val)
      }
    },
    share: {
      get () {
        return this.$store.getters.getShare
      },
      set (val) {
        this.SET_SHARE(val)
      }
    }
  },
  watch: {
    view () {
      if (this.view === 'Star') {
        this.getAllsites()
        this.getFavorites()
      }
    },
    list () {
      this.filteredList = this.list
    }
  },
  methods: {
    ...mapMutations(['SET_VIEW', 'SET_VIDEO', 'SET_DETAIL', 'SET_SHARE']),
    detailEvent (e) {
      this.detail = {
        show: true,
        key: e.key,
        info: {
          id: e.ids,
          name: e.name,
          type: e.type,
          year: e.year,
          index: e.index
        }
      }
    },
    async playEvent (e) {
      const db = await history.find({ site: e.key, ids: e.ids })
      if (db) {
        this.video = { key: e.key, info: { id: e.ids, name: e.name, index: db.index } }
      } else {
        this.video = { key: e.key, info: { id: e.ids, name: e.name, index: 0 } }
      }
      this.view = 'Play'
    },
    deleteEvent (e) {
      star.remove(e.id).then(res => {
        if (res) {
          this.$message.warning('删除失败')
        } else {
          this.$message.success('删除成功')
          this.getFavorites()
        }
      })
    },
    shareEvent (e) {
      this.share = {
        show: true,
        key: e.key,
        info: {
          id: e.ids,
          name: e.name
        }
      }
    },
    downloadEvent (e) {
      zy.download(e.key, e.ids).then(res => {
        if (res) {
          // #ifdef APP-PLUS
          uni.setClipboardData({
            data: res.downloadUrls,
            success: () => {
              this.$message.success(res.info)
            }
          })
          // #endif
          // #ifndef APP-PLUS
          if (navigator.clipboard) {
            navigator.clipboard.writeText(res.downloadUrls).then(() => {
              this.$message.success(res.info)
            })
          } else {
            const textarea = document.createElement('textarea')
            textarea.value = res.downloadUrls
            document.body.appendChild(textarea)
            textarea.select()
            document.execCommand('copy')
            document.body.removeChild(textarea)
            this.$message.success(res.info)
          }
          // #endif
        }
      })
    },
    getAllsites () {
      sites.all().then(res => {
        this.sites = res
      })
    },
    getFavorites () {
      star.all().then(res => {
        this.list = res
      })
    },
    refreshList () {
      this.getFavorites()
    },
    exportFavoritesEvent () {
      // #ifdef APP-PLUS
      const favorites = JSON.stringify(this.list)
      uni.setClipboardData({
        data: favorites,
        success: () => {
          this.$message.success('收藏列表已复制到剪贴板')
        }
      })
      // #endif
      // #ifndef APP-PLUS
      const favorites = JSON.stringify(this.list)
      if (navigator.clipboard) {
        navigator.clipboard.writeText(favorites).then(() => {
          this.$message.success('收藏列表已复制到剪贴板')
        })
      } else {
        const blob = new Blob([favorites], { type: 'application/json' })
        const downloadElement = document.createElement('a')
        const href = window.URL.createObjectURL(blob)
        downloadElement.href = href
        downloadElement.download = 'favorites.json'
        document.body.appendChild(downloadElement)
        downloadElement.click()
        document.body.removeChild(downloadElement)
        window.URL.revokeObjectURL(href)
      }
      // #endif
    },
    importFavoritesEvent () {
      // 在移动端/电视端，使用剪贴板导入
      // #ifdef APP-PLUS
      uni.getClipboardData({
        success: (res) => {
          try {
            const favorites = JSON.parse(res.data)
            if (Array.isArray(favorites)) {
              favorites.forEach(item => {
                star.add(item)
              })
              this.$message.success('导入成功')
              this.getFavorites()
            }
          } catch (e) {
            this.$message.error('剪贴板内容格式错误')
          }
        }
      })
      // #endif
      // #ifndef APP-PLUS
      if (navigator.clipboard) {
        navigator.clipboard.readText().then(text => {
          try {
            const favorites = JSON.parse(text)
            if (Array.isArray(favorites)) {
              favorites.forEach(item => {
                star.add(item)
              })
              this.$message.success('导入成功')
              this.getFavorites()
            }
          } catch (e) {
            this.$message.error('剪贴板内容格式错误')
          }
        })
      } else {
        this.$message.info('请手动粘贴收藏列表')
      }
      // #endif
    },
    clearFavoritesEvent () {
      star.clear().then(res => {
        this.$message.success('清空成功')
        this.getFavorites()
      })
    }
  },
  created () {
    this.getAllsites()
    this.getFavorites()
  }
}
</script>

<style lang="scss" scoped>
.listpage {
  height: 100%;
  display: flex;
  flex-direction: column;
  .listpage-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    .listpage-header {
      height: 40px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      .btn {
        margin-right: 10px;
        cursor: pointer;
        &.active {
          color: #409EFF;
        }
      }
    }
    .listpage-body {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
