import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/bmjling-vue-admin/blog/list',
    method: 'get',
    params
  })
}
