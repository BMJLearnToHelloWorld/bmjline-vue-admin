<template>
  <div v-loading="editLoading" class="app-container">
    <div class="edit_block">
      <div class="blog_inline_title">Blog Title:</div>
      <el-input
        v-model="blogDetail.blogName"
        class="blog_inline_input"
        size="medium"
        placeholder="Please input"
      />
    </div>
    <div class="edit_block">
      <div class="blog_inline_title">Blog Description:</div>
      <el-input
        v-model="blogDetail.blogDescr"
        class="blog_inline_input"
        size="medium"
        placeholder="Please input"
      />
    </div>
    <div class="edit_block">
      <div class="blog_inline_title">Blog Content:</div>
      <tinymce-editor
        ref="tinymceEditor"
        v-model="blogDetail.blogContent"
        class="blog_inline_input"
        @on-change-wordcount="onChangeWordCountHandler"
      />
    </div>
    <div class="edit_block">
      <div class="blog_inline_title">Blog Tags:</div>
      <el-tag
        v-for="(tag, index) in blogDetail.blogTag"
        :key="tag + index"
        closable
        type="info"
        effect="plain"
        :disable-transitions="false"
        @close="handleCloseTag(index)"
      >{{ tag }}
      </el-tag>
      <el-input
        v-if="inputTagVisible"
        ref="saveTagInputTag"
        v-model="inputTagValue"
        class="input-new-tag"
        size="small"
        @keyup.enter.native="handleInputTagConfirm"
        @blur="handleInputTagConfirm"
      />
      <el-button
        v-else
        class="button-new-tag"
        size="small"
        @click="showInputTag"
      >+ New Tag</el-button>
    </div>
    <div class="edit_block">
      <div class="blog_inline_title">Reading Time:</div>
      <div class="blog_inline_value">
        <el-input
          v-model="blogDetail.readingTime"
          size="small"
          placeholder="Please input"
        />
      </div>
    </div>
    <div class="edit_block">
      <div class="blog_inline_title">Created Time:</div>
      <div class="blog_inline_value">
        <i class="el-icon-time" />
        <span>{{ blogDetail.createdTime }}</span>
      </div>
    </div>
    <div class="edit_block">
      <div class="blog_inline_title">Updated Time:</div>
      <div class="blog_inline_value">
        <i class="el-icon-time" />
        <span>{{ blogDetail.updatedTime }}</span>
      </div>
    </div>
    <div v-if="blogDetail.publishedTime" class="edit_block">
      <div class="blog_inline_title">Published Time:</div>
      <div class="blog_inline_value">
        <i class="el-icon-time" />
        <span>{{ blogDetail.publishedTime }}</span>
      </div>
    </div>
    <div>
      <el-row class="editor_btn_row">
        <el-button type="danger" @click="clearHandler">清空</el-button>
        <el-button
          type="primary"
          :loading="loadingSaveBtn"
          :disabled="isGuest"
          @click="saveHandler"
        >保存</el-button>
        <el-button
          type="success"
          :loading="loadingPublishBtn"
          :disabled="isGuest"
          @click="saveAndPublishHandler"
        >保存并发布</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import TinymceEditor from '@/components/Tinymce/index'
import { getBlogDetailById, newBlog, updateBlog, saveAndPubishBlog } from '@/api/blog'
export default {
  components: {
    TinymceEditor
  },
  data() {
    return {
      // editorValue: '',
      editLoading: false,
      loadingClearBtn: false,
      loadingSaveBtn: false,
      loadingPublishBtn: false,
      blogDetail: {},
      inputTagVisible: false,
      inputTagValue: '',
      isGuest: this.$store.getters.roles.includes('guest')
    }
  },
  created() {
    this.initBlogDetail()
  },
  methods: {
    initBlogDetail() {
      // if there is blog id in query of route, then get blog detail by blog id, else blank
      if (this.$route.query.id !== undefined && this.$route.query.id !== '') {
        this.blogDetail.id = this.$route.query.id
        getBlogDetailById(this.blogDetail.id).then(res => {
          this.blogDetail = res.data
        })
      } else {
        this.blogDetail = {
          id: '',
          blogName: '',
          blogDescr: '',
          blogContent: '',
          blogTag: [],
          blogLength: 0,
          readingTime: '',
          createdTime: '',
          updatedTime: '',
          publishedTime: '',
          status: '0',
          contentType: 'RTF'
        }
      }
    },
    // clear tinymce component content
    clearHandler() {
      this.$refs.tinymceEditor.clear()
    },
    // save blog detail
    saveHandler() {
      if (this.blogDetail.id === '') {
        newBlog(this.blogDetail).then(res => {
          this.$notify({
            title: 'Success',
            message: 'New blog successfully!',
            type: 'success'
          })
          this.blogDetail.id = res.data
          this.$router.push({
            path: '/blog/editors/tinymce',
            query: {
              id: this.blogDetail.id
            }
          })
        })
      } else {
        updateBlog(this.blogDetail).then(res => {
          this.$notify({
            title: 'Success',
            message: res.data,
            type: 'success'
          })
        })
      }
    },
    // save and publish blog detail
    saveAndPublishHandler() {
      saveAndPubishBlog(this.blogDetail).then(res => {
        this.$notify({
          title: 'Success',
          message: res.data,
          type: 'success'
        })
        this.$router.push({
          path: '/blog/index'
        })
      })
    },
    // handler tag when use remove button
    handleCloseTag(index) {
      this.blogDetail.blogTag.splice(index, 1)
    },
    // handler tag when use add tag button
    showInputTag() {
      this.inputTagVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInputTag.$refs.input.focus()
      })
    },
    // handler new tag after input the tag name
    handleInputTagConfirm() {
      const inputTagValue = this.inputTagValue
      if (inputTagValue) {
        this.blogDetail.blogTag.push(inputTagValue)
      }
      this.inputTagVisible = false
      this.inputTagValue = ''
    },
    // listen the wordcount in tinymce, and estimate then reading time (normal people can read 300-500 words in 1 mintues)
    onChangeWordCountHandler(length) {
      this.blogDetail.blogLength = length
      this.blogDetail.readingTime = Math.ceil(length / 300) + 'min'
    }
  }
}
</script>

<style lang="scss" scpoed>
.editor_btn_row {
  text-align: center;
  margin-top: 1rem;
}
.edit_block {
  margin-bottom: 2vh;
}
.blog_inline_title {
  display: inline-block;
  margin-right: 1rem;
  width: 8%;
}
.blog_inline_input {
  display: inline-block;
  width: 91%;
}
.blog_inline_value {
  display: inline-block;
  color: #606266;
}
.el-input__inner {
  border-radius: 0px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  border-radius: 0px;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.el-tag--plain.el-tag--info {
  border-radius: 0px;
}
.el-button {
  border-radius: 0px;
}
</style>
