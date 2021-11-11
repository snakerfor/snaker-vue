import { axios } from '@/utils/request'

const api = {
  tStudentScore: '/system/score'
}

export function getTStudentScoreList (parameter) {
  return axios({
    url: api.tStudentScore + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveTStudentScore (parameter) {
  return axios({
    url: api.tStudentScore + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delTStudentScore (parameter) {
  return axios({
    url: api.tStudentScore + '/remove',
    method: 'post',
    params: parameter
  })
}
export const tStudentScoreExport = api.tStudentScore + '/export'
export const tStudentScoreImport = api.tStudentScore + '/import'
