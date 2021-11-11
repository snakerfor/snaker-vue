import { axios } from '@/utils/request'

const api = {
  ipdBomPath: '/system/ipd/bom',
  ipdProductionVersionPath: '/system/ipd/productionVersion',
  ipdTechnologyPath: '/system/ipd/technology'
}
export function getIpdBomDataList (parameter) {
  return axios({
    url: api.ipdBomPath + '/list',
    method: 'get',
    params: parameter
  })
}
export function batchUploadDirApi (formData) {
  return axios({
    url: api.ipdTechnologyPath + '/batchSaveDir',
    method: 'post',
    data: formData
  })
}
export function listIpdProductionVersionApi (parameter) {
  return axios({
    url: api.ipdTechnologyPath + '/listProductionVersion',
    method: 'get',
    params: parameter
  })
}
export function listTechnologyFileApi (parameter) {
  return axios({
    url: api.ipdTechnologyPath + '/listTechnologyFile',
    method: 'get',
    params: parameter
  })
}
export function listIpdTechnologyDataApi (parameter) {
  return axios({
    url: api.ipdTechnologyPath + '/list',
    method: 'get',
    params: parameter
  })
}
export function listIpdTechnologyWayApi (parameter) {
  return axios({
    url: api.ipdTechnologyPath + '/listTechnologyWay',
    method: 'get',
    params: parameter
  })
}
export function updateTechnologyWayNoNullApi (parameter) {
  return axios({
    url: api.ipdTechnologyPath + '/updateTechnologyWay',
    method: 'post',
    data: parameter
  })
}
export function saveTechnologyFieldNullApi (parameter) {
  return axios({
    url: api.ipdTechnologyPath + '/saveTechnologyFieldNull',
    method: 'post',
    data: parameter
  })
}
export function listBomApi (parameter) {
  return axios({
    url: api.ipdTechnologyPath + '/listBom',
    method: 'get',
    params: parameter
  })
}
export function listBomTreeApi (parameter) {
  return axios({
    url: api.ipdTechnologyPath + '/listBomTree',
    method: 'get',
    params: parameter
  })
}
export function listBomTree2Api (parameter) {
  return axios({
    url: api.ipdTechnologyPath + '/listBomTree2',
    method: 'get',
    params: parameter
  })
}
export function syncTechnologyDataApi (parameter) {
  return axios({
    url: api.ipdTechnologyPath + '/syncTechnologyData',
    method: 'get',
    params: parameter
  })
}
export function submitTechnologyWayApi (parameter) {
  return axios({
    url: api.ipdTechnologyPath + '/submitTechnologyWay',
    method: 'post',
    data: parameter
  })
}
export function listIpdCurveCodeApi (parameter) {
  return axios({
    url: api.ipdTechnologyPath + '/listIpdCurveCode',
    method: 'get',
    params: parameter
  })
}
export function listIpdCurveCodeItemApi (parameter) {
  return axios({
    url: api.ipdTechnologyPath + '/listIpdCurveCodeItem',
    method: 'get',
    params: parameter
  })
}
export function saveIpdCurveCodeApi (parameter) {
  return axios({
    url: api.ipdTechnologyPath + '/saveIpdCurveCode',
    method: 'post',
    data: parameter
  })
}
export function saveIpdCurveCodeItemApi (parameter) {
  return axios({
    url: api.ipdTechnologyPath + '/saveIpdCurveCodeItem',
    method: 'post',
    data: parameter
  })
}
export function getForDoubleYAxisLineChartModalIpdCurveCodeApi (parameter) {
  return axios({
    url: api.ipdTechnologyPath + '/getForDoubleYAxisLineChartModalIpdCurveCode',
    method: 'get',
    params: parameter
  })
}

export function delIpdCurveCodeItemApi (parameter) {
  return axios({
    url: api.ipdTechnologyPath + '/delIpdCurveCodeItem',
    method: 'post',
    params: parameter
  })
}

export function delIpdCurveCodeApi (parameter) {
  return axios({
    url: api.ipdTechnologyPath + '/delIpdCurveCode',
    method: 'post',
    params: parameter
  })
}

export const exportUrl = api.ipdTechnologyPath + '/export'
export const exportCurveCodeUrl = api.ipdTechnologyPath + '/exportCurveCode'
