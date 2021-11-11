import { axios } from '@/utils/request'

const api = {
  file: '/dfs/file'
}

export default api

// file
export function getFileList (parameter) {
  return axios({
    url: api.file + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveFile (parameter) {
  return axios({
    url: api.file + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getPictureApi (parameter) {
  return axios({
    url: api.file + '/getPicture',
    method: 'get',
    params: parameter
  })
}
