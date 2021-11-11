import { axios } from '@/utils/request'

const api = {
  istHotDilateResultDetail: '/system/new/hot/detail'
}

export function getIstHotDilateResultDetailList (parameter) {
  return axios({
    url: api.istHotDilateResultDetail + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstHotDilateResultDetail (parameter) {
  return axios({
    url: api.istHotDilateResultDetail + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstHotDilateResultDetail (parameter) {
  return axios({
    url: api.istHotDilateResultDetail + '/remove',
    method: 'post',
    params: parameter
  })
}

export function preSaveDetail (parameter) {
  return axios({
    url: api.istHotDilateResultDetail + '/preSaveDetail',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export const istHotDilateResultDetailExport = api.istHotDilateResultDetail + '/export'
export const istHotDilateResultDetailImport = api.istHotDilateResultDetail + '/import'
