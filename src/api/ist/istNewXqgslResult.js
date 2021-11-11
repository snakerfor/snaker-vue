import { axios } from '@/utils/request'

const api = {
  istNewXqgslResult: '/system/new/ddx/xqgsl'
}

export function getIstNewXqgslResultList (parameter) {
  return axios({
    url: api.istNewXqgslResult + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewXqgslResult (parameter) {
  return axios({
    url: api.istNewXqgslResult + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewXqgslResult (parameter) {
  return axios({
    url: api.istNewXqgslResult + '/remove',
    method: 'post',
    params: parameter
  })
}

export function submitIstNewXqgslResult (parameter) {
  return axios({
    url: api.istNewXqgslResult + '/submit',
    method: 'post',
    params: parameter
  })
}

export function getPreNoNullResult (queueId) {
  return axios({
    url: api.istNewXqgslResult + '/last/' + `${queueId}`,
    method: 'get'
  })
}
export const istNewXqgslResultExport = api.istNewXqgslResult + '/export'
export const istNewXqgslResultImport = api.istNewXqgslResult + '/batchImport'
