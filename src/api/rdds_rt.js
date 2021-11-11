import { axios } from '@/utils/request'

const api = {
  rtResearchTestDataPath: '/system/rt/researchTestData',
  rtOrderBaseInfo: '/system/rt/rtOrderBaseInfo',
  rtOrderTicketInfo: '/system/rt/rtOrderTicketInfo'
}
export function listRtResearchTestDataApi (parameter) {
  return axios({
    url: api.rtResearchTestDataPath + '/listRtResearchTestData',
    method: 'get',
    params: parameter
  })
}
export function listIstDataApi (parameter) {
  return axios({
    url: api.rtResearchTestDataPath + '/listIstData',
    method: 'get',
    params: parameter
  })
}
export function listProjectApi () {
  return axios({
    url: api.rtResearchTestDataPath + '/listProject',
    method: 'get'
  })
}
export function listRtResearchTestResultApi (parameter) {
  return axios({
    url: api.rtResearchTestDataPath + '/listRtResearchTestResult',
    method: 'get',
    params: parameter
  })
}
export function saveResearchTestDataApi (parameter) {
  return axios({
    url: api.rtResearchTestDataPath + '/saveResearchTestData',
    method: 'post',
    data: parameter
  })
}
export function batchSendApproveApi (parameter) {
  return axios({
    url: api.rtResearchTestDataPath + '/batchSendApprove',
    method: 'post',
    data: parameter
  })
}
export function batchDelRtResearchTestDataApi (parameter) {
  return axios({
    url: api.rtResearchTestDataPath + '/batchDelRtResearchTestData',
    method: 'post',
    data: parameter
  })
}
// --------------------研发实验需求-----------------
export function getRtOrderBaseInfoList (parameter) {
  return axios({
    url: api.rtOrderBaseInfo + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveRtOrderBaseInfo (parameter) {
  return axios({
    url: api.rtOrderBaseInfo + (parameter.id !== null && parameter.id !== undefined ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function saveBaseInfoData (parameter) {
  console.info(parameter)
  return axios({
    url: api.rtOrderBaseInfo + '/saveData',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delRtOrderBaseInfo (parameter) {
  return axios({
    url: api.rtOrderBaseInfo + '/remove',
    method: 'post',
    params: parameter
  })
}
// --------------------研发实验需求 工票明细-----------------
export function getRtOrderTicketInfoListByBaseId (baseInfoId) {
  return axios({
    url: api.rtOrderTicketInfo + '/list/' + `${baseInfoId}`,
    method: 'get'
  })
}

export function getRtOrderTicketInfoList (parameter) {
  return axios({
    url: api.rtOrderTicketInfo + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveRtOrderTicketInfo (parameter) {
  return axios({
    url: api.rtOrderTicketInfo + (parameter.id !== null && parameter.id !== undefined ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delRtOrderTicketInfo (parameter) {
  return axios({
    url: api.rtOrderTicketInfo + '/remove',
    method: 'post',
    params: parameter
  })
}
export const rtOrderBaseInfoExport = api.rtOrderBaseInfo + '/export'
export const rtOrderBaseInfoImport = api.rtOrderBaseInfo + '/import'
export const rtOrderTicketInfoExport = api.rtOrderTicketInfo + '/export'
export const rtOrderTicketInfoImport = api.rtOrderTicketInfo + '/import'
export const exportUrl = api.rtResearchTestDataPath + '/export'
