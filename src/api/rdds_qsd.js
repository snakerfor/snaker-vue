import { axios } from '@/utils/request'

const api = {
  qsdCheckProjectConfig: '/system/qsd/cpc',
  qsdMaterialCheckStandard: '/system/qsd'
}

export function getQsdCheckProjectConfigList (parameter) {
  return axios({
    url: api.qsdCheckProjectConfig + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveQsdCheckProjectConfig (parameter) {
  return axios({
    url: api.qsdCheckProjectConfig + (parameter.id != null ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delQsdCheckProjectConfig (parameter) {
  return axios({
    url: api.qsdCheckProjectConfig + '/remove',
    method: 'post',
    params: parameter
  })
}

export function getQsdMaterialCheckStandardList (parameter) {
  return axios({
    url: api.qsdMaterialCheckStandard + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveQsdMaterialCheckStandard (parameter) {
  return axios({
    url: api.qsdMaterialCheckStandard + '/update',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function submitQsdMaterialCheckStandard (parameter) {
  return axios({
    url: api.qsdMaterialCheckStandard + '/submit',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getQsdCheckItemList (parameter) {
  return axios({
    url: api.qsdCheckProjectConfig + '/checkItemList',
    method: 'get',
    params: parameter
  })
}
// 获取原材料列表
export function getMaterialList (parameter) {
  return axios({
    url: api.qsdMaterialCheckStandard + '/materialList',
    method: 'get',
    params: parameter
  })
}
// 通过参照标准快速生成对应标准
export function quickAddStandardByReferTo (parameter) {
  return axios({
    url: api.qsdMaterialCheckStandard + '/quickAddStandardByReferTo',
    method: 'get',
    params: parameter
  })
}

// 通过选择某个物料作为参照生成对应标准
export function quickAddStandardByReferTo2 (parameter) {
  return axios({
    url: api.qsdMaterialCheckStandard + '/quickAddStandardByReferTo2',
    method: 'get',
    params: parameter
  })
}

export function materiellistBomTree (parameter) {
  return axios({
    url: api.qsdMaterialCheckStandard + '/materielRefProductlistBomTree',
    method: 'get',
    params: parameter
  })
}

export function sendApprove (parameter) {
  return axios({
    url: api.qsdMaterialCheckStandard + '/sendApprove',
    method: 'post',
    params: parameter
  })
}

export function updateQsdProductLargeType (parameter) {
  return axios({
    url: api.qsdMaterialCheckStandard + '/updateQsdProductLargeType',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delProductLargeType (parameter) {
  return axios({
    url: api.qsdMaterialCheckStandard + '/delProductLargeType',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export const qsdCheckProjectConfigExport = api.qsdCheckProjectConfig + '/export'
export const exportUrl = api.qsdMaterialCheckStandard + '/export'
