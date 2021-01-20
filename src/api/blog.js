import request from '@/utils/request'

export function getAllBlogList(params) {
  return request({
    url: '/blog/query/all',
    method: 'post',
    data: params
  })
}

export function getBlogDetailById(id) {
  return request({
    url: '/blog/detail/' + id,
    method: 'get'
  })
}

export function publishBlogById(id) {
  return request({
    url: '/blog/publish/' + id,
    method: 'post'
  })
}

export function deleteBlogById(id) {
  return request({
    url: '/blog/delete/' + id,
    method: 'delete'
  })
}

export function saveBlog(params) {
  return request({
    url: '/blog/save',
    method: 'post',
    data: params
  })
}
