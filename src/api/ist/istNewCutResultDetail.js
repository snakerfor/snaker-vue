import { axios } from '@/utils/request'

const api = {
  istNewCutResultDetail: '/system/new/cut/detail'
}

export function getIstNewCutResultDetailList (parameter) {
  return axios({
    url: api.istNewCutResultDetail + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewCutResultDetail (parameter) {
  return axios({
    url: api.istNewCutResultDetail + (parameter.id > '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewCutResultDetail (parameter) {
  return axios({
    url: api.istNewCutResultDetail + '/remove',
    method: 'post',
    params: parameter
  })
}

export function preSaveDetail (parameter) {
  return axios({
    url: api.istNewCutResultDetail + '/preSaveDetail',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
