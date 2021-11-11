import { axios } from '@/utils/request'

const api = {
  istNewHjgcResult: '/system/new/hjgc'
}

export function getIstNewHjgcResultListApi (parameter) {
  return axios({
    url: api.istNewHjgcResult + '/listIstNewHjgcResult',
    method: 'get',
    params: parameter
  })
}

export function approvalPassByIdsApi (parameter) {
  return axios({
    url: api.istNewHjgcResult + '/approvalPassByIds',
    method: 'post',
    params: parameter
  })
}

export function saveIstNewHjgcResultApi (parameter) {
  return axios({
    url: api.istNewHjgcResult + '/saveIstNewHjgcResult',
    method: 'post',
    data: parameter
  })
}

export const istNewHjgcResultExportApi = api.istNewHjgcResult + '/export'
