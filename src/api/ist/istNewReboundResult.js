import { axios } from '@/utils/request'

const api = {
  istNewReboundResult: '/system/new/rebound'
}

export function getIstNewReboundResultList (parameter) {
  return axios({
    url: api.istNewReboundResult + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewReboundResult (parameter) {
  return axios({
    url: api.istNewReboundResult + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewReboundResult (parameter) {
  return axios({
    url: api.istNewReboundResult + '/remove',
    method: 'post',
    params: parameter
  })
}

export function submitIstNewReboundResult (parameter) {
  return axios({
    url: api.istNewReboundResult + '/submit',
    method: 'post',
    params: parameter
  })
}

export function getPreNoNullResult (parameter) {
  return axios({
    url: api.istNewReboundResult + '/last?' + 'queueId=' + parameter.queueId + '&&id=' + parameter.id,
    method: 'get',
    parameter: parameter
  })
}
export const istNewReboundResultExport = api.istNewReboundResult + '/export'
export const istNewReboundResultDownloadZip = api.istNewReboundResult + '/downloadZip'
