<template>
  <div class="film">
    <div class="header">
      <div class="site" v-if="sites.length > 0">
        <el-select v-model="selectedSiteName" placeholder="请选择源站" @change="siteChange">
          <el-option
            v-for="item in sites"
            :key="item.key"
            :label="item.name"
            :value="item.key">
          </el-option>
        </el-select>
      </div>
      <div class="search">
        <el-input
          placeholder="请输入片名"
          v-model="searchTxt"
          @keyup.enter.native="searchEvent"
          clearable>
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <div class="actions">
        <el-button type="primary" @click="searchEvent">搜索</el-button>
        <el-button @click="clearSearch">清空</el-button>
      </div>
    </div>
    <div class="content">
      <div class="class-list" v-if="classList.length > 0">
        <el-tag
          v-for="item in classList"
          :key="item.tid"
          :type="selectedClassName === item.name ? 'primary' : 'info'"
          @click="classChange(item)">
          {{item.name}}
        </el-tag>
      </div>
      <div class="film-list" v-if="list.length > 0">
        <el-row :gutter="20">
          <el-col :xs="12" :sm="8" :md="6" :lg="4" v-for="item in list" :key="item.id">
            <div class="film-item" @click="detailEvent(item)">
              <div class="poster">
                <img :src="item.pic" :alt="item.name" @error="handleImageError">
              </div>
              <div class="info">
                <div class="name">{{item.name}}</div>
                <div class="meta">
                  <span>{{item.type}}</span>
                  <span>{{item.year}}</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="empty" v-else>
        <el-empty description="暂无数据"></el-empty>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { star, history, search, sites, setting } from '../lib/dexie'
import zy from '../lib/site/tools'
import Waterfall from 'vue-waterfall-plugin'
import InfiniteLoading from 'vue-infinite-loading'
const FILM_DATA_CACHE = {}
export default {
  name: 'film',
  data () {
    return {
      showFind: false,
      showTableLastColumn: false,
      sites: [],
      site: {},
      classList: [],
      searchClassList: [],
      type: {},
      selectedSiteName: '',
      selectedClassName: '',
      selectedSearchClassNames: [],
      totalpagecount: 0,
      pagecount: 0,
      recordcount: 0,
      list: [],
      statusText: ' ',
      infiniteId: +new Date(),
      searchID: 0,
      searchList: [],
      searchTxt: '',
      searchContents: [],
      filteredSearchContents: [],
      currentColumn: '',
      searchGroup: '',
      searchGroups: ['站内', '组内', '全站'],
      classFilterKeywords: [],
      filteredList: [],
      areas: [],
      searchRunning: false,
      siteSearchCount: 0,
      infiniteHandlerCount: 0,
      // Toolbar
      showToolbar: false,
      selectedAreas: [],
      sortKeyword: '',
      sortKeywords: ['按片名', '按上映年份', '按更新时间'],
      selectedYears: { start: 0, end: new Date().getFullYear() }
    }
  },
  components: {
    Waterfall,
    InfiniteLoading
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
    },
    setting: {
      get () {
        return this.$store.getters.getSetting
      },
      set (val) {
        this.SET_SETTING(val)
      }
    }
  },
  watch: {
    view () {
      if (this.view === 'Film') {
        this.getAllSites()
      }
    }
  },
  methods: {
    ...mapMutations(['SET_VIEW', 'SET_VIDEO', 'SET_DETAIL', 'SET_SHARE', 'SET_SETTING']),
    getAllSites () {
      sites.all().then(res => {
        this.sites = res.filter(item => item.isActive)
        if (this.sites.length > 0) {
          this.selectedSiteName = this.sites[0].key
          this.siteChange(this.selectedSiteName)
        }
      })
    },
    siteChange (key) {
      this.site = this.sites.find(item => item.key === key)
      this.getClassList()
    },
    getClassList () {
      zy.class(this.site.key).then(res => {
        if (res) {
          this.classList = res.class
          if (this.classList.length > 0) {
            this.classChange(this.classList[0])
          }
        }
      })
    },
    classChange (item) {
      this.selectedClassName = item.name
      this.type = item
      this.getFilmList()
    },
    getFilmList () {
      zy.list(this.site.key, 1, this.type.tid).then(res => {
        if (res) {
          this.list = res
        }
      })
    },
    searchEvent () {
      if (!this.searchTxt) {
        this.$message.warning('请输入搜索内容')
        return
      }
      zy.search(this.site.key, this.searchTxt).then(res => {
        if (res) {
          this.list = res
        } else {
          this.list = []
          this.$message.info('未找到相关内容')
        }
      })
    },
    clearSearch () {
      this.searchTxt = ''
      this.getFilmList()
    },
    detailEvent (item) {
      this.detail = {
        show: true,
        key: this.site.key,
        info: {
          id: item.id,
          name: item.name,
          type: item.type,
          year: item.year
        }
      }
    },
    handleImageError (e) {
      e.target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    },
    downloadEvent (item) {
      zy.download(this.site.key, item.id).then(res => {
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
    }
  },
  created () {
    this.getAllSites()
  }
}
</script>

<style lang="scss" scoped>
.film {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    align-items: center;
    padding: 10px;
    .site {
      margin-right: 10px;
    }
    .search {
      flex: 1;
      margin-right: 10px;
    }
    .actions {
      display: flex;
    }
  }
  .content {
    flex: 1;
    overflow: auto;
    padding: 10px;
    .class-list {
      margin-bottom: 15px;
      .el-tag {
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
      }
    }
    .film-list {
      .film-item {
        margin-bottom: 20px;
        cursor: pointer;
        transition: transform 0.2s;
        &:hover {
          transform: scale(1.02);
        }
        .poster {
          width: 100%;
          padding-top: 140%;
          position: relative;
          overflow: hidden;
          border-radius: 4px;
          img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .info {
          padding: 5px 0;
          .name {
            font-size: 14px;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .meta {
            font-size: 12px;
            color: #999;
            span {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
