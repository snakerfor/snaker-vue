import { axios } from '@/utils/request'

const api = {
  istNewHardnessResult: '/system/new/hardness'
}

export function getIstNewHardnessResultList (parameter) {
  return axios({
    url: api.istNewHardnessResult + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewHardnessResult (parameter) {
  return axios({
    url: api.istNewHardnessResult + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewHardnessResult (parameter) {
  return axios({
    url: api.istNewHardnessResult + '/remove',
    method: 'post',
    params: parameter
  })
}

export function submitIstNewHardnessResult (parameter) {
  return axios({
    url: api.istNewHardnessResult + '/submit',
    method: 'post',
    params: parameter
  })
}

export function getPreNoNullResult (parameter) {
  return axios({
    url: api.istNewHardnessResult + '/last?' + 'queueId=' + parameter.queueId + '&&id=' + parameter.id,
    method: 'get',
    parameter: parameter
  })
}
export const istNewHardnessResultExport = api.istNewHardnessResult + '/export'
export const istNewHardnessResultAndDetailExport = api.istNewHardnessResult + '/exportDetail'
export const istNewHardnessResultDownloadZip = api.istNewHardnessResult + '/downloadZip'
