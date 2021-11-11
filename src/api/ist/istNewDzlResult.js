import { axios } from '@/utils/request'

const api = {
  istNewDzlResult: '/system/new/ddx/dzl'
}

export function getIstNewDzlResultList (parameter) {
  return axios({
    url: api.istNewDzlResult + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewDzlResult (parameter) {
  return axios({
    url: api.istNewDzlResult + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewDzlResult (parameter) {
  return axios({
    url: api.istNewDzlResult + '/remove',
    method: 'post',
    params: parameter
  })
}

export function submitIstNewDzlResult (parameter) {
  return axios({
    url: api.istNewDzlResult + '/submit',
    method: 'post',
    params: parameter
  })
}

export function getPreNoNullResult (queueId) {
  return axios({
    url: api.istNewDzlResult + '/last/' + `${queueId}`,
    method: 'get'
  })
}
export const istNewDzlResultExport = api.istNewDzlResult + '/export'
export const istNewDzlResultDetailExport = api.istNewDzlResult + '/exportDetail'
export const istNewDzlResultImport = api.istNewDzlResult + '/batchImport'
