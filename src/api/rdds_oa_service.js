import { axios } from '@/utils/request'

const api = {
  oaKmReviewServicePath: '/system/oa/webservice'
}

export function startKmReview (id) {
  return axios({
    url: api.oaKmReviewServicePath + '/startKmReview/' + `${id}`,
    method: 'get'
  })
}

export function sendApprove (parameter) {
  return axios({
    url: api.oaKmReviewServicePath + '/sendApprove',
    method: 'post',
    params: parameter
  })
}
