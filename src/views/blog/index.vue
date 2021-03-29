<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      stripe
      height="86vh"
      :header-cell-style="{'text-align':'center'}"
    >
      <el-table-column type="index" :index="indexMethod" align="center" fixed />
      <el-table-column label="Title" align="left">
        <template slot-scope="scope">
          {{ scope.row.blogName }}
        </template>
      </el-table-column>
      <el-table-column label="Descr" align="left">
        <template slot-scope="scope">
          <span>{{ scope.row.blogDescr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Author" align="center" width="100">
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template> -->
        <span>bmj</span>
      </el-table-column>
      <!-- <el-table-column label="Pageviews" align="center" width="50">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column> -->
      <el-table-column
        class-name="status-col"
        label="Status"
        align="center"
        width="120"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="publishedTime"
        label="Publish_time"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.publishedTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="updatedTime"
        label="Update_time"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updatedTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Action" align="center" width="140">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            circle
            @click="editHandler(scope.row)"
          />
          <el-button
            v-show="scope.row.status !== '1'"
            type="success"
            size="mini"
            icon="el-icon-check"
            circle
            :disabled="isGuest"
            @click="publishHandler(scope.row)"
          />
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            circle
            :disabled="isGuest"
            @click="deleteHandler(scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllBlogList, publishBlogById, deleteBlogById } from '@/api/blog'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: '',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    statusLabel(status) {
      const labelMap = {
        '1': 'published',
        '0': 'draft',
        '-1': 'deleted'
      }
      return labelMap[status]
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      isGuest: this.$store.getters.roles.includes('guest')
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    indexMethod(index) {
      return index + 1
    },
    fetchData() {
      this.listLoading = true
      const labelFilter = this.$options.filters['statusLabel']
      getAllBlogList({ page: 1 }).then(res => {
        this.list = res.data
        this.list.forEach(item => {
          item.status = labelFilter(item.status)
        })
        this.listLoading = false
      })
    },
    editHandler(rowData) {
      if (rowData.contentType === 'RTF') {
        this.$router.push({
          path: '/blog/editors/tinymce',
          query: {
            id: rowData.id
          }
        })
      } else if (rowData.contentType === 'MD') {
        this.$router.push({
          path: '/blog/editors/markdown',
          query: {
            id: rowData.id
          }
        })
      }
    },
    publishHandler(rowData) {
      publishBlogById(rowData.id).then(res => {
        this.fetchData()
        this.$notify({
          title: 'Success',
          message: res.data,
          type: 'success'
        })
      })
    },
    deleteHandler(rowData) {
      deleteBlogById(rowData.id).then(res => {
        this.$notify({
          title: 'Success',
          message: res.data,
          type: 'success'
        })
      })
    }
  }
}
</script>
