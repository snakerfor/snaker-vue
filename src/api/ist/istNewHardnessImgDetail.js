import { axios } from '@/utils/request'

const api = {
  istHotDilateImgDetail: '/system/new/hardness/img/detail'
}

export function getIstNewHardnessImgDetailList (parameter) {
  return axios({
    url: api.istHotDilateImgDetail + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewHardnessImgDetail (parameter) {
  return axios({
    url: api.istHotDilateImgDetail + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function preSaveDetail (parameter) {
  return axios({
    url: api.istHotDilateImgDetail + '/preSaveDetail',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstHotDilateResultDetail (parameter) {
  return axios({
    url: api.istHotDilateImgDetail + '/remove',
    method: 'post',
    params: parameter
  })
}
export const istHotDilateImgDetailExport = api.istHotDilateImgDetail + '/export'
export const istHotDilateImgDetailImport = api.istHotDilateImgDetail + '/import'
