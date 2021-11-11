import { axios } from '@/utils/request'

const api = {
  istNewDdxXqgslResultDetail: '/system/new/ddx/xqgsl/detail'
}

export function getIstNewDdxXqgslResultDetailList (parameter) {
  return axios({
    url: api.istNewDdxXqgslResultDetail + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewDdxXqgslResultDetail (parameter) {
  return axios({
    url: api.istNewDdxXqgslResultDetail + (parameter.id > '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewDdxXqgslResultDetail (parameter) {
  return axios({
    url: api.istNewDdxXqgslResultDetail + '/remove',
    method: 'post',
    params: parameter
  })
}

export function getIstNewDdxXqgslDtReportData (parameter) {
  return axios({
    url: api.istNewDdxXqgslResultDetail + '/dtReportData',
    method: 'get',
    params: parameter
  })
}

export function getIstNewDdxXqgslDtPCDReportData (parameter) {
  return axios({
    url: api.istNewDdxXqgslResultDetail + '/dtPCDReportData',
    method: 'get',
    params: parameter
  })
}

export function getResultDetailList (resultId) {
  return axios({
    url: api.istNewDdxXqgslResultDetail + '/list/' + `${resultId}`,
    method: 'get'
  })
}
export const istNewDdxXqgslResultDetailExport = api.istNewDdxXqgslResultDetail + '/export'
export const istNewDdxXqgslResultDetailImport = api.istNewDdxXqgslResultDetail + '/import'
