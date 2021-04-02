import request from '@/utils/request'

export function uploadObj(params) {
  return request({
    url: '/oss/upload',
    method: 'post',
    data: params
  })
}
