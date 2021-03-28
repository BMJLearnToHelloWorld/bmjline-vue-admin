import request from '@/utils/request'

export function getVerifyImage(data) {
  return request({
    url: '/admin/verifyImage/' + data,
    method: 'get'
  })
}

export function login(data) {
  return request({
    url: '/admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/admin/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/admin/user/logout',
    method: 'post'
  })
}
