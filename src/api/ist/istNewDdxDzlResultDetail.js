import { axios } from '@/utils/request'

const api = {
  istNewDdxDzlResultDetail: '/system/new/ddx/dzl/detail'
}

export function getIstNewDdxDzlResultDetailList (parameter) {
  return axios({
    url: api.istNewDdxDzlResultDetail + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewDdxDzlResultDetail (parameter) {
  return axios({
    url: api.istNewDdxDzlResultDetail + (parameter.id > '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewDdxDzlResultDetail (parameter) {
  return axios({
    url: api.istNewDdxDzlResultDetail + '/remove',
    method: 'post',
    params: parameter
  })
}

export function getResultDetailList (resultId) {
  return axios({
    url: api.istNewDdxDzlResultDetail + '/list/' + `${resultId}`,
    method: 'get'
  })
}
export const istNewDdxDzlResultDetailExport = api.istNewDdxDzlResultDetail + '/export'
export const istNewDdxDzlResultDetailImport = api.istNewDdxDzlResultDetail + '/import'
