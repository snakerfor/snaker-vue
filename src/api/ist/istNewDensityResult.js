import { axios } from '@/utils/request'

const api = {
  istNewDensityResult: '/system/new/density'
}

export function getIstNewDensityResultList (parameter) {
  return axios({
    url: api.istNewDensityResult + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewDensityResult (parameter) {
  return axios({
    url: api.istNewDensityResult + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewDensityResult (parameter) {
  return axios({
    url: api.istNewDensityResult + '/remove',
    method: 'post',
    params: parameter
  })
}

export function submitIstNewDensityResult (parameter) {
  return axios({
    url: api.istNewDensityResult + '/submit',
    method: 'post',
    params: parameter
  })
}

export function getPreNoNullResult (parameter) {
  return axios({
    url: api.istNewDensityResult + '/last?' + 'queueId=' + parameter.queueId + '&&id=' + parameter.id,
    method: 'get',
    parameter: parameter
  })
}
export const istNewDensityResultExport = api.istNewDensityResult + '/export'
export const istNewDensityResultAndDetailExport = api.istNewDensityResult + '/exportDetail'
export const istNewDensityResultImport = api.istNewDensityResult + '/import'
