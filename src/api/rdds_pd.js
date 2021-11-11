import { axios } from '@/utils/request'

const api = {
  pdProduct: '/system/pd'
}

export function getPdProductList (parameter) {
  return axios({
    url: api.pdProduct + '/list',
    method: 'get',
    params: parameter
  })
}

export function savePdProduct (parameter) {
  return axios({
    url: api.pdProduct + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function savePdProductStandard (parameter) {
  return axios({
    url: api.pdProduct + '/update',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delPdProduct (parameter) {
  return axios({
    url: api.pdProduct + '/remove',
    method: 'post',
    params: parameter
  })
}

export function getTypeRelationList (parameter) {
  return axios({
    url: api.pdProduct + '/typeRelationList',
    method: 'get',
    params: parameter
  })
}

export function getByMaterialNoApi (materialNo) {
  return axios({
    url: api.pdProduct + '/getByMaterialNoAll/' + `${materialNo}`,
    method: 'get'
  })
}

export const exportUrl = api.pdProduct + '/export'
