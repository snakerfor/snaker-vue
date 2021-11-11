import { axios } from '@/utils/request'

const api = {
  istNewCompressionResult: '/system/new/compression'
}

export function getIstNewCompressionResultList (parameter) {
  return axios({
    url: api.istNewCompressionResult + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewCompressionResult (parameter) {
  return axios({
    url: api.istNewCompressionResult + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewCompressionResult (parameter) {
  return axios({
    url: api.istNewCompressionResult + '/remove',
    method: 'post',
    params: parameter
  })
}

export function submitIstNewCompressionResult (parameter) {
  return axios({
    url: api.istNewCompressionResult + '/submit',
    method: 'post',
    params: parameter
  })
}

export function getPreNoNullResult (parameter) {
  return axios({
    url: api.istNewCompressionResult + '/last?' + 'queueId=' + parameter.queueId + '&&id=' + parameter.id,
    method: 'get',
    parameter: parameter
  })
}
export const istNewCompressionResultExport = api.istNewCompressionResult + '/export'
export const istNewCompressionResultDownloadZip = api.istNewCompressionResult + '/downloadZip'
