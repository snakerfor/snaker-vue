import { axios } from '@/utils/request'

const api = {
  istNewNmxCtrResult: '/system/new/nmx/ctr'
}

export function getIstNewNmxCtrResultList (parameter) {
  return axios({
    url: api.istNewNmxCtrResult + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewNmxCtrResult (parameter) {
  return axios({
    url: api.istNewNmxCtrResult + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewNmxCtrResult (parameter) {
  return axios({
    url: api.istNewNmxCtrResult + '/remove',
    method: 'post',
    params: parameter
  })
}

export function submitIstNewNmxCtrResult (parameter) {
  return axios({
    url: api.istNewNmxCtrResult + '/submit',
    method: 'post',
    params: parameter
  })
}

export const istNewNmxCtrResultExport = api.istNewNmxCtrResult + '/export'
export const istNewNmxCtrResultImport = api.istNewNmxCtrResult + '/import'
