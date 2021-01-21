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
        'code lists image media table textcolor colorpicker wordcount contextmenu emoticons link insertdatetime charmap fullscreen searchreplace'
    },
    toolbar: {
      type: [String, Array],
      default:
        'newdocument code | undo redo | formatselect visualaid | fontsizeselect | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent blockquote | lists image media table link unlink | emoticons insertdatetime charmap | fullscreen searchreplace | removeformat'
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
        // language: 'zh_CN',
        // skin_url: '/tinymce/skins/ui/oxide', // 主题样式
        height: this.height,
        menubar: false,
        plugins: this.plugins,
        toolbar: this.toolbar,
        browser_spellcheck: true, // 拼写检查
        statusbar: true, // 隐藏编辑器底部的状态栏
        paste_data_images: true, // 允许粘贴图像
        images_upload_handler: function(blobInfo, success, failure) {
          console.log(blobInfo.filename())
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
      this.$emit('on-change-wordcount', tinymce.activeEditor.plugins.wordcount.body.getCharacterCountWithoutSpaces())
    }
  }
}
</script>
