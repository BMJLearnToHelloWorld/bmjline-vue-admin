<template>
  <div id="Tinymce">
    <editor
      v-model="tinymceValue"
      api-key="no-api-key"
      :init="init"
      :disable="disabled"
      @onSelectionChange="onSelectionChangeHandler"
    />
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import plugins from './plugins'
import toolbar from './toolbar'
import minioClient from '@/utils/minio'

export default {
  name: 'Tinymce',
  components: {
    editor: Editor
  },
  props: {
    // 传入一个value，使组件支持v-model绑定
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default:
        'advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount'
    },
    toolbar: {
      type: [String, Array],
      default:
        'searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen'
    },
    height: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      init: {
        // language_url: '/public/tinymce/js/tinymce/langs/zh_CN.js',
        language: 'en',
        // skin_url: '/tinymce/skins/ui/oxide', // 主题样式
        height: this.height,
        menubar: false,
        plugins: plugins.length > 0 ? plugins : this.plugins,
        toolbar: toolbar.length > 0 ? toolbar : this.toolbar,
        browser_spellcheck: true, // 拼写检查
        statusbar: true, // 隐藏编辑器底部的状态栏
        end_container_on_empty_block: true,
        default_link_target: '_blank',
        paste_data_images: true, // 允许粘贴图像
        images_upload_handler: function(blobInfo, success, failure) {
          // const myDate = new Date()
          // const fullYear = myDate.getFullYear()
          const fullYear = 'test'
          minioClient.bucketExists(fullYear, function(err, exists) {
            if (err) {
              minioClient.makeBucket(fullYear, function(err) {
                if (err) {
                  failure(err)
                }
                minioClient.putObject(
                  fullYear,
                  blobInfo.filename(),
                  blobInfo.blob().stream(),
                  function(err, objInfo) {
                    if (err) {
                      failure(err) // err should be null
                    }
                    success(objInfo)
                  }
                )
              })
            }
            if (exists) {
              minioClient.putObject(
                fullYear,
                blobInfo.filename(),
                blobInfo.blob().stream(),
                function(err, objInfo) {
                  if (err) {
                    failure(err) // err should be null
                  }
                  success(objInfo)
                }
              )
            }
          })
        }
      },
      tinymceValue: this.value
    }
  },
  watch: {
    value(newValue) {
      this.tinymceValue = newValue
    },
    tinymceValue(newValue) {
      this.$emit('input', newValue)
    }
  },
  mounted() {
    tinymce.init({})
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    onClick(e) {
      this.$emit('onClick', e, tinymce)
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.tinymceValue = ''
    },
    onSelectionChangeHandler() {
      this.$emit(
        'on-change-wordcount',
        tinymce.activeEditor.plugins.wordcount.body.getCharacterCountWithoutSpaces()
      )
    }
  }
}
</script>
