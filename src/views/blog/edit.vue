<template>
  <div class="app-container">
    <tinymce-editor ref="tinymceEditor" v-model="blogDetail.blogContent" />
    <el-row class="editor_btn_row">
      <el-button type="danger" round @click="clearHandler">清空</el-button>
      <el-button type="primary" round :loading="loadingSaveBtn" @click="saveHandler">保存</el-button>
      <el-button type="success" round :loading="loadingPublishBtn" @click="saveAndPublishHandler">保存并发布</el-button>
    </el-row>
    {{ editorValue }}
  </div>
</template>

<script>
import TinymceEditor from '@/components/tinymce/index'
import { getBlogDetailById, saveBlog } from '@/api/blog'
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
      blogId: '',
      blogDetail: {}
    }
  },
  created() {
    this.initBlogDetail()
  },
  methods: {
    initBlogDetail() {
      if (this.$route.query.id !== undefined && this.$route.query.id !== '') {
        this.blogId = this.$route.query.id
        getBlogDetailById(this.blogId).then(res => {
          this.blogDetail = res.data
        })
      }
    },
    clearHandler() {
      this.$refs.tinymceEditor.clear()
    },
    saveHandler() {
      saveBlog(this.blogDetail).then(res => {
        if (res.data.code === 200) {
          this.$notify({
            title: 'Success',
            message: res.data.message,
            type: 'success'
          });
        } else {
          this.$notify.error({
            title: 'Error',
            message: res.data.message
          });
        }
      })
    },
    saveAndPublishHandler() {
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
