import { axios } from '@/utils/request'

const api = {
  istNewPressResult: '/system/new/press'
}

export function getIstNewPressResultList (parameter) {
  return axios({
    url: api.istNewPressResult + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewPressResult (parameter) {
  return axios({
    url: api.istNewPressResult + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewPressResult (parameter) {
  return axios({
    url: api.istNewPressResult + '/remove',
    method: 'post',
    params: parameter
  })
}

export function submitIstNewPressResult (parameter) {
  return axios({
    url: api.istNewPressResult + '/submit',
    method: 'post',
    params: parameter
  })
}

export const istNewPressResultExport = api.istNewPressResult + '/export'
export const istNewVtlResultDownloadZip = api.istNewPressResult + '/downloadZip'
