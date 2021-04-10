<template>
  <div class="dashboard-container">
    <div v-if="!url" class="dashboard-text">Welcome back, {{ username }}</div>
    <iframe
      :src="url"
      frameborder="0"
      width="100%"
      height="820px"
      scrolling="auto"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      url: 'http://bmjline.com'
    }
  },
  computed: {
    ...mapGetters(['username'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 15px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
