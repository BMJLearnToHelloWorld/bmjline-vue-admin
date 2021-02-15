<template>
  <div class="components-container">
    <div class="editor-container">
      <markdown-editor
        ref="markdownEditor"
        v-model="mdContent"
        height="500px"
      />
    </div>
    <!-- <el-button type="primary" @click="getHtml">getHtml</el-button>
    <el-button type="success" @click="getValue">getValue</el-button> -->
  </div>
</template>

<script>
import MarkdownEditor from '@/components/Markdown'

export default {
  name: 'MarkdownDemo',
  components: { MarkdownEditor },
  data() {
    return {
      mdContent: '',
      mdValue: '',
      mdHtml: '',
      languageTypeList: {
        en: 'en_US',
        zh: 'zh_CN'
      }
    }
  },
  computed: {
    language() {
      return this.languageTypeList['en']
    }
  },
  methods: {
    getHtml() {
      this.mdHtml = this.$refs.markdownEditor.getHtml()
    },
    getValue() {
      this.mdValue = this.$refs.markdownEditor.getValue()
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-container {
  margin-bottom: 30px;
}
</style>
