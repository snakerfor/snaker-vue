import { axios } from '@/utils/request'

const api = {
  istNewPressResultDetail: '/system/new/press/detail'
}

export function getIstNewPressResultDetailList (parameter) {
  return axios({
    url: api.istNewPressResultDetail + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewPressResultDetail (parameter) {
  return axios({
    url: api.istNewPressResultDetail + (parameter.id > '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewPressResultDetail (parameter) {
  return axios({
    url: api.istNewPressResultDetail + '/remove',
    method: 'post',
    params: parameter
  })
}
export function preSaveDetail (parameter) {
  return axios({
    url: api.istNewPressResultDetail + '/preSaveDetail',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export const istNewPressResultDetailExport = api.istNewPressResultDetail + '/export'
