import { axios } from '@/utils/request'

const api = {
  istNewNmxVtlResultDetail: '/system/new/nmx/vtl/detail'
}

export function getIstNewNmxVtlResultDetailList (parameter) {
  return axios({
    url: api.istNewNmxVtlResultDetail + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewNmxVtlResultDetail (parameter) {
  return axios({
    url: api.istNewNmxVtlResultDetail + (parameter.id > '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewNmxVtlResultDetail (parameter) {
  return axios({
    url: api.istNewNmxVtlResultDetail + '/remove',
    method: 'post',
    params: parameter
  })
}

export function getIstNewNmxVtlDtReportData (parameter) {
  return axios({
    url: api.istNewNmxVtlResultDetail + '/dtReportData',
    method: 'get',
    params: parameter
  })
}

export function getIstNewNmxVtlDtPCDReportData (parameter) {
  return axios({
    url: api.istNewNmxVtlResultDetail + '/dtPCDReportData',
    method: 'get',
    params: parameter
  })
}

export function preSaveDetail (parameter) {
  return axios({
    url: api.istNewNmxVtlResultDetail + '/preSaveDetail',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export const istNewNmxVtlResultDetailExport = api.istNewNmxVtlResultDetail + '/export'
export const istNewNmxVtlResultDetailImport = api.istNewNmxVtlResultDetail + '/import'
