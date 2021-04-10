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

export function newBlog(params) {
  return request({
    url: '/blog/new',
    method: 'post',
    data: params
  })
}

export function updateBlog(params) {
  return request({
    url: '/blog/update',
    method: 'post',
    data: params
  })
}

export function saveAndPubishBlog(params) {
  return request({
    url: '/blog/save-publish',
    method: 'post',
    data: params
  })
}
