import { axios } from '@/utils/request'

const api = {
  istNewCompressionResultDetail: '/system/new/compression/detail'
}

export function getIstNewCompressionResultDetailList (parameter) {
  return axios({
    url: api.istNewCompressionResultDetail + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewCompressionResultDetail (parameter) {
  return axios({
    url: api.istNewCompressionResultDetail + (parameter.id > '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewCompressionResultDetail (parameter) {
  return axios({
    url: api.istNewCompressionResultDetail + '/remove',
    method: 'post',
    params: parameter
  })
}

export function preSaveDetail (parameter) {
  return axios({
    url: api.istNewCompressionResultDetail + '/preSaveDetail',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
