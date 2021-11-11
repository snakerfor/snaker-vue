import { axios } from '@/utils/request'

const api = {
  istInspectionItems: '/system/ist'
}

export function getIstInspectionItemsList (parameter) {
  return axios({
    url: api.istInspectionItems + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstInspectionItems (parameter) {
  return axios({
    url: api.istInspectionItems + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstInspectionItems (parameter) {
  return axios({
    url: api.istInspectionItems + '/remove',
    method: 'post',
    params: parameter
  })
}

export const istInspectionItemsExport = api.istInspectionItems + '/export'
export const istInspectionItemsImport = api.istInspectionItems + '/import'
