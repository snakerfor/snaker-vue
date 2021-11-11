import { axios } from '@/utils/request'

const api = {
  dm: '/system/file/dm'

}
export function updateDmfile (parameter) {
  return axios({
    url: api.dm + '/update',
    method: 'post',
    data: parameter
  })
}

export function submitDmfile (parameter) {
  return axios({
    url: api.dm + '/submit',
    method: 'post',
    data: parameter
  })
}

export function sendApprove (parameter) {
  return axios({
    url: api.dm + '/sendApprove',
    method: 'post',
    params: parameter
  })
}

export function getDmFileVersionList (parameter) {
  return axios({
    url: api.dm + '/fileVersionList',
    method: 'get',
    params: parameter
  })
}

export function delDmFiles (parameter) {
  return axios({
    url: api.dm + '/remove',
    method: 'post',
    params: parameter
  })
}

export function getDmBusinessFilResList (parameter) {
  return axios({
    url: api.dm + '/businessFilResList',
    method: 'get',
    params: parameter
  })
}

export function delDmFileVersion (parameter) {
  return axios({
    url: api.dm + '/file_version/remove',
    method: 'post',
    params: parameter
  })
}

export function uploadDmSourceFile (parameter) {
  return axios({
    url: api.dm + '/uploadDmSourceFile',
    method: 'post',
    data: parameter
  })
}

export const exportUrl = api.dm + '/export'
