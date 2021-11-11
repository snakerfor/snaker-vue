import { axios } from '@/utils/request'

const api = {
  istNewLccjResultDetail: '/system/new/lccj/detail'
}

export function getIstNewLccjResultDetailList (parameter) {
  return axios({
    url: api.istNewLccjResultDetail + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewLccjResultDetail (parameter) {
  return axios({
    url: api.istNewLccjResultDetail + (parameter.id > '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewLccjResultDetail (parameter) {
  return axios({
    url: api.istNewLccjResultDetail + '/remove',
    method: 'post',
    params: parameter
  })
}

export function getIstNewLccjDtReportData (parameter) {
  return axios({
    url: api.istNewLccjResultDetail + '/dtReportData',
    method: 'get',
    params: parameter
  })
}

export function getIstNewLccjDtPCDReportData (parameter) {
  return axios({
    url: api.istNewLccjResultDetail + '/dtPCDReportData',
    method: 'get',
    params: parameter
  })
}
export function preSaveDetail (parameter) {
  return axios({
    url: api.istNewLccjResultDetail + '/preSaveDetail',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export const istNewLccjResultDetailExport = api.istNewLccjResultDetail + '/export'
export const istNewLccjResultDetailImport = api.istNewLccjResultDetail + '/import'
