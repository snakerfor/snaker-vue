import { axios } from '@/utils/request'

const api = {
  istNewLccjResult: '/system/new/lccj'
}

export function getIstNewLccjResultList (parameter) {
  return axios({
    url: api.istNewLccjResult + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewLccjResult (parameter) {
  return axios({
    url: api.istNewLccjResult + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewLccjResult (parameter) {
  return axios({
    url: api.istNewLccjResult + '/remove',
    method: 'post',
    params: parameter
  })
}

export function submitIstNewLccjResult (parameter) {
  return axios({
    url: api.istNewLccjResult + '/submit',
    method: 'post',
    params: parameter
  })
}

export function getPreNoNullResult (parameter) {
  return axios({
    url: api.istNewLccjResult + '/last?' + 'queueId=' + parameter.queueId + '&&id=' + parameter.id,
    method: 'get',
    parameter: parameter
  })
}

// 大文件上传
export function handBigFileApi (parameter) {
  return axios({
    url: api.istNewLccjResult + '/handBigFile',
    method: 'post',
    params: parameter
  })
}

export function getInspectionTypeDict (parameter) {
  return axios({
    url: api.istNewLccjResult + '/getInspectionTypeDict',
    method: 'get',
    params: parameter
  })
}

export const istNewLccjResultExport = api.istNewLccjResult + '/export'
export const istNewLccjResultDownloadZip = api.istNewLccjResult + '/downloadZip'
export const istNewLccjResultImport = api.istNewLccjResult + '/import'
