import { axios } from '@/utils/request'

const api = {
  istNewPendResult: '/system/new/pend'
}

export function getIstNewPendResultList (parameter) {
  return axios({
    url: api.istNewPendResult + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewPendResult (parameter) {
  return axios({
    url: api.istNewPendResult + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function submitIstNewPendResult (parameter) {
  return axios({
    url: api.istNewPendResult + '/submit',
    method: 'post',
    params: parameter
  })
}

export function delIstNewPendResult (parameter) {
  return axios({
    url: api.istNewPendResult + '/remove',
    method: 'post',
    params: parameter
  })
}

export function getPreNoNullResult (parameter) {
  return axios({
    url: api.istNewPendResult + '/last?' + 'queueId=' + parameter.queueId + '&&id=' + parameter.id,
    method: 'get',
    parameter: parameter
  })
}
export const istNewPendResultExport = api.istNewPendResult + '/export'
export const istNewPendResultImport = api.istNewPendResult + '/import'
