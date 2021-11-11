import { axios } from '@/utils/request'

const api = {
  istWeldHeatproofResult: '/system/new/weld'
}

export function getIstWeldHeatproofResultList (parameter) {
  return axios({
    url: api.istWeldHeatproofResult + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstWeldHeatproofResult (parameter) {
  return axios({
    url: api.istWeldHeatproofResult + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstWeldHeatproofResult (parameter) {
  return axios({
    url: api.istWeldHeatproofResult + '/remove',
    method: 'post',
    params: parameter
  })
}

export function submitIstWeldHeatproofResult (parameter) {
  return axios({
    url: api.istWeldHeatproofResult + '/submit',
    method: 'post',
    params: parameter
  })
}

export function getPreNoNullResult (parameter) {
  return axios({
    url: api.istWeldHeatproofResult + '/last?' + 'queueId=' + parameter.queueId + '&&id=' + parameter.id,
    method: 'get',
    parameter: parameter
  })
}
export const istWeldHeatproofResultExport = api.istWeldHeatproofResult + '/export'
export const istWeldHeatproofResultImport = api.istWeldHeatproofResult + '/import'
