import { axios } from '@/utils/request'

const api = {
  istNewInspectionQueue: '/system/istNewInspectionQueue'
}

export function getIstNewInspectionQueueList (parameter) {
  return axios({
    url: api.istNewInspectionQueue + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewInspectionQueue (parameter) {
  return axios({
    url: api.istNewInspectionQueue + (parameter.id > '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewInspectionQueue (parameter) {
  return axios({
    url: api.istNewInspectionQueue + '/remove',
    method: 'post',
    params: parameter
  })
}

export function changeStatus (parameter) {
  return axios({
    url: api.istNewInspectionQueue + '/change',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getLastInspectionQueue () {
  return axios({
    url: api.istNewInspectionQueue + '/getLastInspectionQueue',
    method: 'get'
  })
}

export function resetIstNewInspectionQueue (parameter) {
  return axios({
    url: api.istNewInspectionQueue + '/reset',
    method: 'post',
    params: parameter
  })
}

export function getSyntheticAndAssembly (parameter) {
  return axios({
    url: api.istNewInspectionQueue + '/getSyntheticAndAssembly',
    method: 'post',
    params: parameter
  })
}
export function getInspectionTypeDict (parameter) {
  return axios({
    url: api.istNewInspectionQueue + '/getInspectionTypeDict',
    method: 'get',
    params: parameter
  })
}

export const istNewInspectionQueueExport = api.istNewInspectionQueue + '/export'
export const istNewInspectionQueueImport = api.istNewInspectionQueue + '/import'
