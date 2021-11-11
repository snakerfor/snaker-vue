import { axios } from '@/utils/request'

const api = {
  rtOaFiledConfig: '/system/rtOaFiledConfig'
}

export function getRtOaFiledConfigList (parameter) {
  return axios({
    url: api.rtOaFiledConfig + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveRtOaFiledConfig (parameter) {
  return axios({
    url: api.rtOaFiledConfig + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delRtOaFiledConfig (parameter) {
  return axios({
    url: api.rtOaFiledConfig + '/remove',
    method: 'post',
    params: parameter
  })
}
export function disableRtOaFiledConfig (parameter) {
  return axios({
    url: api.rtOaFiledConfig + '/disable',
    method: 'post',
    params: parameter
  })
}
export const rtOaFiledConfigExport = api.rtOaFiledConfig + '/export'
export const rtOaFiledConfigImport = api.rtOaFiledConfig + '/import'
