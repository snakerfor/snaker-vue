import { axios } from '@/utils/request'

const api = {
  ddDesignData: '/system/dd'
}

export function getDdDesignDataList (parameter) {
  return axios({
    url: api.ddDesignData + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveDdDesignData (parameter) {
  return axios({
    url: api.ddDesignData + '/saveDdDesignData',
    method: 'post',
    data: parameter
  })
}

export function submitDdDesignData (parameter) {
  return axios({
    url: api.ddDesignData + '/sumbit',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delDdDesignData (parameter) {
  return axios({
    url: api.ddDesignData + '/remove',
    method: 'post',
    params: parameter
  })
}

export function sendApprove (parameter) {
  return axios({
    url: api.ddDesignData + '/sendApprove',
    method: 'post',
    params: parameter
  })
}

export function getDrawingNoByFileIdApi (fileId) {
  return axios({
    url: api.ddDesignData + '/getDrawingNoByFileId/' + `${fileId}`,
    method: 'get'
  })
}

export const exportUrl = api.ddDesignData + '/export'
export const importUrl = api.ddDesignData + '/import'
