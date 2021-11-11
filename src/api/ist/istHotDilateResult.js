import { axios } from '@/utils/request'

const api = {
  istHotDilateResult: '/system/new/hot'
}

export function getIstHotDilateResultList (parameter) {
  return axios({
    url: api.istHotDilateResult + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstHotDilateResult (parameter) {
  return axios({
    url: api.istHotDilateResult + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstHotDilateResult (parameter) {
  return axios({
    url: api.istHotDilateResult + '/remove',
    method: 'post',
    params: parameter
  })
}

export function submitIstHotDilateResult (parameter) {
  return axios({
    url: api.istHotDilateResult + '/submit',
    method: 'post',
    params: parameter
  })
}

export function getPreNoNullResult (parameter) {
  return axios({
    url: api.istHotDilateResult + '/last?' + 'queueId=' + parameter.queueId + '&&id=' + parameter.id,
    method: 'get',
    parameter: parameter
  })
}

export const istHotDilateResultExport = api.istHotDilateResult + '/export'
export const istHotDilateResultImport = api.istHotDilateResult + '/import'
