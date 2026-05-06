<template>
  <div class="content">
    <App />
  </div>
</template>

<script>
import App from '../../App.vue'
export default {
  components: {
    App
  },
  data() {
    return {
      title: 'ZY Player'
    }
  },
  onLoad() {
    // #ifdef APP-PLUS
    // 电视端适配：隐藏导航栏
    uni.setNavigationBarHidden({
      hidden: true
    })
    // #endif
  }
}
</script>

<style>
.content {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
