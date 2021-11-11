import { axios } from '@/utils/request'

const api = {
  qsdMaterialCheckStandard: '/rdds/qsdMaterialCheckStandard'
}

export function getQsdMaterialCheckStandardList (parameter) {
  return axios({
    url: api.qsdMaterialCheckStandard + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveQsdMaterialCheckStandard (parameter) {
  return axios({
    url: api.qsdMaterialCheckStandard + (parameter.id > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delQsdMaterialCheckStandard (parameter) {
  return axios({
    url: api.qsdMaterialCheckStandard + '/remove',
    method: 'post',
    params: parameter
  })
}

export const qsdMaterialCheckStandardExport = api.qsdMaterialCheckStandard + '/export'
