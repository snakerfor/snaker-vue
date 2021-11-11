import { axios } from '@/utils/request'

const api = {
  tpStressTestData: '/system/tpd'
}

export function getTpStressTestDataList (parameter) {
  return axios({
    url: api.tpStressTestData + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveTpStressTestData (parameter) {
  return axios({
    url: api.tpStressTestData + (parameter.id !== '0' ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function submitTpStressTestData (parameter) {
  return axios({
    url: api.tpStressTestData + '/sumbit',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function delTpStressTestData (parameter) {
  return axios({
    url: api.tpStressTestData + '/remove',
    method: 'post',
    params: parameter
  })
}

export function sendApprove (parameter) {
  return axios({
    url: api.tpStressTestData + '/sendApprove',
    method: 'post',
    params: parameter
  })
}

export function reset (parameter) {
  return axios({
    url: api.tpStressTestData + '/reset',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export const exportUrl = api.tpStressTestData + '/export'
export const importUrl = api.tpStressTestData + '/import'
