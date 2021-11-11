import { axios } from '@/utils/request'

const api = {
  istWeldHeatproofResultDetail: '/system/new/weld/detail'
}

export function getistWeldHeatproofResultDetailList (parameter) {
  return axios({
    url: api.istWeldHeatproofResultDetail + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewLccjResultDetail (parameter) {
  return axios({
    url: api.istWeldHeatproofResultDetail + (parameter.id > '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewLccjResultDetail (parameter) {
  return axios({
    url: api.istWeldHeatproofResultDetail + '/remove',
    method: 'post',
    params: parameter
  })
}

export function getIstNewLccjDtReportData (parameter) {
  return axios({
    url: api.istWeldHeatproofResultDetail + '/dtReportData',
    method: 'get',
    params: parameter
  })
}

export function getIstNewLccjDtPCDReportData (parameter) {
  return axios({
    url: api.istWeldHeatproofResultDetail + '/dtPCDReportData',
    method: 'get',
    params: parameter
  })
}
export const istNewLccjResultDetailExport = api.istWeldHeatproofResultDetail + '/export'
export const istNewLccjResultDetailImport = api.istWeldHeatproofResultDetail + '/import'
