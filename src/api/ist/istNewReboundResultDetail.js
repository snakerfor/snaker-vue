import { axios } from '@/utils/request'

const api = {
  istNewReboundResultDetail: '/system/new/rebound/detail'
}

export function getIstNewReboundResultDetailList (parameter) {
  return axios({
    url: api.istNewReboundResultDetail + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewReboundResultDetail (parameter) {
  return axios({
    url: api.istNewReboundResultDetail + (parameter.id > '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewReboundResultDetail (parameter) {
  return axios({
    url: api.istNewReboundResultDetail + '/remove',
    method: 'post',
    params: parameter
  })
}

export function preSaveDetail (parameter) {
  return axios({
    url: api.istNewReboundResultDetail + '/preSaveDetail',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
