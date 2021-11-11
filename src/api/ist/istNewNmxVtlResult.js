import { axios } from '@/utils/request'

const api = {
  istNewNmxVtlResult: '/system/new/nmx/vtl',
  istNewNmxVtlProcedure: '/system/new/nmx/vtl/procedure'
}

export function getIstNewNmxVtlResultList (parameter) {
  return axios({
    url: api.istNewNmxVtlResult + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewNmxVtlResult (parameter) {
  return axios({
    url: api.istNewNmxVtlResult + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewNmxVtlResult (parameter) {
  return axios({
    url: api.istNewNmxVtlResult + '/remove',
    method: 'post',
    params: parameter
  })
}

export function submitIstNewNmxVtlResult (parameter) {
  return axios({
    url: api.istNewNmxVtlResult + '/submit',
    method: 'post',
    params: parameter
  })
}

export const istNewNmxVtlResultExport = api.istNewNmxVtlResult + '/export'
export const istNewNmxVtlResultImport = api.istNewNmxVtlResult + '/import'
export const istNewVtlResultDownloadZip = api.istNewNmxVtlResult + '/downloadZip'

export function getIstNewNmxVtlProcedureList (parameter) {
  return axios({
    url: api.istNewNmxVtlProcedure + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewNmxVtlProcedure (parameter) {
  return axios({
    url: api.istNewNmxVtlProcedure + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewNmxVtlProcedure (parameter) {
  return axios({
    url: api.istNewNmxVtlProcedure + '/remove',
    method: 'post',
    params: parameter
  })
}

export function checkVtlCobaltRemovalNo (cobaltRemovalNo) {
  return axios({
    url: api.istNewNmxVtlResult + '/check/' + `${cobaltRemovalNo}`,
    method: 'get'
  })
}
