<template>
  <div class="Vue2Verify">
    <Verify
      :type="3"
      :show-button="false"
      :v-offset="3"
      :bar-size="{width:'100%',height:'40px'}"
      @success="onHandler('success')"
      @error="onHandler('error')"
    />
  </div>
</template>

<script>
import Verify from 'vue2-verify'

export default {
  name: 'Vue2Verify',
  components: {
    Verify
  },
  methods: {
    onHandler(text) {
      this.$emit('on-verify', text === 'success')
    }
  }
}
</script>

<style lang="scss">
.verify-bar-area {
  width: calc(100% - 2px) !important;
  border-radius: 0px !important;
}
</style>
