<template>
  <div class="app-container">
    <tinymce-editor ref="tinymceEditor" v-model="editorValue" />
    <el-row class="editor_btn_row">
      <el-button type="danger" round @click="clearContent">清空</el-button>
      <el-button type="primary" round :loading="loadingSaveBtn" @click="saveContent">保存</el-button>
      <el-button type="success" round :loading="loadingPublishBtn" @click="publishContent">保存并发布</el-button>
    </el-row>
    {{ editorValue }}
  </div>
</template>

<script>
import TinymceEditor from '@/components/tinymce/index'
export default {
  components: {
    TinymceEditor
  },
  data() {
    return {
      editorValue: '',
      loadingClearBtn: false,
      loadingSaveBtn: false,
      loadingPublishBtn: false,
      blogId: ''
    }
  },
  created() {
    this.getBLogId()
  },
  methods: {
    getBLogId() {
      console.log(this.$route.path)
      this.blogId = this.$route.path.id
    },
    clearContent() {
      this.$refs.tinymceEditor.clear()
    },
    saveContent() {
      console.log(this.editorValue)
    },
    publishContent() {
      console.log(this.editorValue)
    }
  }
}
</script>

<style lang="scss" scpoed>
.editor_btn_row {
  text-align: center;
  margin-top: 1rem;
}
</style>
