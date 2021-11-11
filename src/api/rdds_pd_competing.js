import { axios } from '@/utils/request'

const api = {
  pdCompetingProduct: '/system/competing'
}

export function getPdCompetingProductList (parameter) {
  return axios({
    url: api.pdCompetingProduct + '/list',
    method: 'get',
    params: parameter
  })
}

export function savePdCompetingProduct (parameter) {
  return axios({
    url: api.pdCompetingProduct + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delPdCompetingProduct (parameter) {
  return axios({
    url: api.pdCompetingProduct + '/remove',
    method: 'post',
    params: parameter
  })
}
export const pdCompetingProductExport = api.pdCompetingProduct + '/export'
export const pdCompetingProductImport = api.pdCompetingProduct + '/import'
