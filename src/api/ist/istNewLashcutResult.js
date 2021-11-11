import { axios } from '@/utils/request'

const api = {
  istNewLashcutResult: '/system/new/lashcut'
}

export function getIstNewLashcutResultList (parameter) {
  return axios({
    url: api.istNewLashcutResult + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveIstNewLashcutResult (parameter) {
  return axios({
    url: api.istNewLashcutResult + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delIstNewLashcutResult (parameter) {
  return axios({
    url: api.istNewLashcutResult + '/remove',
    method: 'post',
    params: parameter
  })
}

export function submitIstNewLashcutResult (parameter) {
  return axios({
    url: api.istNewLashcutResult + '/submit',
    method: 'post',
    params: parameter
  })
}
export const istNewLashcutResultExport = api.istNewLashcutResult + '/export'
