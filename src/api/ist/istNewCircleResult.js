import { axios } from '@/utils/request'

const api = {
  istNewCircleResult: '/system/new/circle'
}

export function getIstNewCircleResultList (parameter) {
  return axios({
    url: api.istNewCircleResult + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewCircleResult (parameter) {
  return axios({
    url: api.istNewCircleResult + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function submitIstNewCircleResult (parameter) {
  return axios({
    url: api.istNewCircleResult + '/submit',
    method: 'post',
    params: parameter
  })
}

export function delIstNewCircleResult (parameter) {
  return axios({
    url: api.istNewCircleResult + '/remove',
    method: 'post',
    params: parameter
  })
}

export function getPreNoNullResult (parameter) {
  return axios({
    url: api.istNewCircleResult + '/last?' + 'queueId=' + parameter.queueId + '&&id=' + parameter.id,
    method: 'get',
    parameter: parameter
  })
}
export const istNewCircleResultExport = api.istNewCircleResult + '/export'
export const istNewCircleResultImport = api.istNewCircleResult + '/import'
