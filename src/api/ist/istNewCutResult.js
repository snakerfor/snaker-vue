import { axios } from '@/utils/request'

const api = {
  istNewCutResult: '/system/new/cut'
}

export function getIstNewCutResultList (parameter) {
  return axios({
    url: api.istNewCutResult + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewCutResult (parameter) {
  return axios({
    url: api.istNewCutResult + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewCutResult (parameter) {
  return axios({
    url: api.istNewCutResult + '/remove',
    method: 'post',
    params: parameter
  })
}

export function submitIstNewCutResult (parameter) {
  return axios({
    url: api.istNewCutResult + '/submit',
    method: 'post',
    params: parameter
  })
}

export function getPreNoNullResult (parameter) {
  return axios({
    url: api.istNewCutResult + '/last?' + 'queueId=' + parameter.queueId + '&&id=' + parameter.id,
    method: 'get',
    parameter: parameter
  })
}
export const istNewCutResultExport = api.istNewCutResult + '/export'
export const istNewCutResultDownloadZip = api.istNewCutResult + '/downloadZip'
