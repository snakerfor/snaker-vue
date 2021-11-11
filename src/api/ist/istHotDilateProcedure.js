import { axios } from '@/utils/request'

const api = {
  istHotDilateProcedure: '/system/new/hot/procedure'
}

export function getIstHotDilateProcedureList (parameter) {
  return axios({
    url: api.istHotDilateProcedure + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstHotDilateProcedureure (parameter) {
  return axios({
    url: api.istHotDilateProcedure + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstHotDilateProcedureure (parameter) {
  return axios({
    url: api.istHotDilateProcedure + '/remove',
    method: 'post',
    params: parameter
  })
}
