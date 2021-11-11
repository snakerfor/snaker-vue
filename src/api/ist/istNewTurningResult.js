import { axios } from '@/utils/request'

const api = {
  istNewTurningResult: '/system/new/turning'
}

export function getIstNewTurningProgramConfigByIdApi (id) {
  return axios({
    url: api.istNewTurningResult + '/getIstNewTurningProgramConfigById/' + `${id}`,
    method: 'get'
  })
}

export function getIstNewTurningProgramConfigListApi (parameter) {
  return axios({
    url: api.istNewTurningResult + '/listIstNewTurningProgramConfig',
    method: 'get',
    params: parameter
  })
}

export function delIstNewTurningProgramConfigApi (parameter) {
  return axios({
    url: api.istNewTurningResult + '/delIstNewTurningProgramConfigByIds',
    method: 'post',
    params: parameter
  })
}

export function saveIstNewTurningProgramConfigApi (parameter) {
  return axios({
    url: api.istNewTurningResult + '/saveIstNewTurningProgramConfig',
    method: 'post',
    data: parameter
  })
}

export function getIstNewTurningResultListApi (parameter) {
  return axios({
    url: api.istNewTurningResult + '/listIstNewTurningResult',
    method: 'get',
    params: parameter
  })
}

export function approvalIstNewTurningResultPassByIdsApi (parameter) {
  return axios({
    url: api.istNewTurningResult + '/approvalIstNewTurningResultPassByIds',
    method: 'post',
    params: parameter
  })
}

export function saveIstNewTurningResultApi (parameter) {
  return axios({
    url: api.istNewTurningResult + '/saveIstNewTurningResult',
    method: 'post',
    data: parameter
  })
}

export function addCuttingEdgeApi (parameter) {
  return axios({
    url: api.istNewTurningResult + '/addCuttingEdge',
    method: 'post',
    params: parameter
  })
}

export function buildCommonLineChartModalForIstNewTurningResultApi (parameter) {
  return axios({
    url: api.istNewTurningResult + '/buildCommonLineChartModalForIstNewTurningResult',
    method: 'get',
    params: parameter
  })
}

export const istNewTurningResultExportApi = api.istNewTurningResult + '/export'
