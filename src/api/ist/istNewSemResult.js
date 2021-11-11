import { axios } from '@/utils/request'

const api = {
  istNewSemResult: '/system/new/sem'
}

export function getIstNewSemResultListApi (parameter) {
  return axios({
    url: api.istNewSemResult + '/listIstNewSemResult',
    method: 'get',
    params: parameter
  })
}

export function delIstNewSemOldResultApi (parameter) {
  return axios({
    url: api.istNewSemResult + '/delHistoryResult',
    method: 'post',
    params: parameter
  })
}

export function approvalPassByIdsApi (parameter) {
  return axios({
    url: api.istNewSemResult + '/approvalPassByIds',
    method: 'post',
    params: parameter
  })
}

export function saveIstNewSemResultApi (parameter) {
  return axios({
    url: api.istNewSemResult + '/saveIstNewSemResult',
    method: 'post',
    data: parameter
  })
}

export const istNewSemResultExportApi = api.istNewSemResult + '/export'
export const istNewSemResultImportApi = api.istNewSemResult + '/import'
