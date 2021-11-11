import { axios } from '@/utils/request'

const api = {
  pmProjectInfo: '/system/pm/info',
  pmPerson: '/system/pm/person',
  pmIncome: '/system/pm/income',
  pmEarnDetail: '/system/pm/earnDetail',
  pmExpense: '/system/pm/expense',
  pmExpDetail: '/system/pm/expenseDetail',
  pmMainRisk: '/system/pm/risk',
  pmChange: '/system/pm/change',
  pmFruit: '/system/pm/fruit',
  pmClosing: '/system/pm/closing',
  pmProcess: '/system/pm/process',
  pmProcessCompletion: '/system/pm/processCompletion',
  costCenter: '/system/costCenter',
  pmIpResult: '/system/pm/ip/result',
  pmIpPlan: '/system/pm/ip/plan',
  pmIpTractInfo: '/system/pm/ip/info',
  pmIpConditon: '/system/pm/ip/condition'
}
/** -----------------成本中心 start---------------- **/
export function getCostCenterByDeptId (deptId) {
  return axios({
    url: api.costCenter + '/getCostCenterByDeptId/' + `${deptId}`,
    method: 'get'
  })
}
/** -----------------成本中心 end---------------- **/
/** -----------------基本信息 start---------------- **/
export function getPmProjectInfoList (parameter) {
  return axios({
    url: api.pmProjectInfo + '/list',
    method: 'get',
    params: parameter
  })
}

export function savePmProjectInfo (parameter) {
  return axios({
    url: api.pmProjectInfo + '/save',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delPmProjectInfo (parameter) {
  return axios({
    url: api.pmProjectInfo + '/remove',
    method: 'post',
    params: parameter
  })
}

export function getDataById (id) {
  return axios({
    url: api.pmProjectInfo + '/get/' + `${id}`,
    method: 'get'
  })
}
export function changeProStatus (parameter) {
  return axios({
    url: api.pmProjectInfo + '/changeProStatus',
    method: 'post',
    data: parameter
  })
}
/** -----------------基本信息 end---------------- **/
/** -----------------项目成员 start---------------- **/
export function getPmPersonList (parameter) {
  return axios({
    url: api.pmPerson + '/list',
    method: 'get',
    params: parameter
  })
}

export function getPmPersonListByPmId (pmId) {
  return axios({
    url: api.pmPerson + '/list/' + `${pmId}`,
    method: 'get'
  })
}

export function savePmPerson (parameter) {
  return axios({
    url: api.pmPerson + (parameter.id > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delPmPerson (parameter) {
  return axios({
    url: api.pmPerson + '/remove',
    method: 'post',
    params: parameter
  })
}
/** -----------------项目成员 end---------------- **/
/** -----------------项目过程 start---------------- **/
export function getPmProcessListByPmId (pmId) {
  return axios({
    url: api.pmProcess + '/list/' + `${pmId}`,
    method: 'get'
  })
}

export function getPmProcessList (parameter) {
  return axios({
    url: api.pmProcess + '/list',
    method: 'get',
    params: parameter
  })
}

export function getPmProcessTreeList () {
  return axios({
    url: api.pmProcess + '/list/tree',
    method: 'get'
  })
}

export function savePmProcess (parameter) {
  return axios({
    url: api.pmProcess + (parameter.id > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delPmProcess (parameter) {
  return axios({
    url: api.pmProcess + '/remove',
    method: 'post',
    params: parameter
  })
}

export function startTask (id) {
  return axios({
    url: api.pmProcess + '/startProcess/' + `${id}`,
    method: 'get'
  })
}
/** -----------------项目过程 end---------------- **/
/** -----------------任务信息 start---------------- **/
export function getPmProcessCompletionListByTaskId (taskId) {
  return axios({
    url: api.pmProcessCompletion + '/getByTaskId/' + `${taskId}`,
    method: 'get'
  })
}
export function getPmProcessCompletionListByPmId (parameter) {
  return axios({
    url: api.pmProcessCompletion + '/list/',
    params: parameter,
    method: 'get'
  })
}
export function savePmProcessCompletion (parameter) {
  return axios({
    url: api.pmProcessCompletion + '/subPmProcessCompletion',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function updatePmProcessBusinessRef (parameter) {
  return axios({
    url: api.pmProcessCompletion + '/updatePmProcessBusinessRef',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
/** -----------------任务信息 end---------------- **/
/** -----------------项目变更 start---------------- **/
export function getPmChangeByPmId (pmId) {
  return axios({
    url: api.pmChange + '/list/' + `${pmId}`,
    method: 'get'
  })
}

export function getPmChangeList (parameter) {
  return axios({
    url: api.pmChange + '/list',
    method: 'get',
    params: parameter
  })
}

export function savePmChange (parameter) {
  return axios({
    url: api.pmChange + (parameter.id > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delPmChange (parameter) {
  return axios({
    url: api.pmChange + '/remove',
    method: 'post',
    params: parameter
  })
}
/** -----------------项目变更 end---------------- **/
/** -----------------项目成果 start---------------- **/
export function getPmFruitByPmId (pmId) {
  return axios({
    url: api.pmFruit + '/getByPmId/' + `${pmId}`,
    method: 'get'
  })
}

export function getPmFruitList (parameter) {
  return axios({
    url: api.pmFruit + '/list',
    method: 'get',
    params: parameter
  })
}

export function savePmFruit (parameter) {
  return axios({
    url: api.pmFruit + '/subPmFruit',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delPmFruit (parameter) {
  return axios({
    url: api.pmFruit + '/remove',
    method: 'post',
    params: parameter
  })
}
/** -----------------项目成果 end---------------- **/
/** -----------------项目结项 start---------------- **/
export function getPmClosingByPmId (pmId) {
  return axios({
    url: api.pmClosing + '/getByPmId/' + `${pmId}`,
    method: 'get'
  })
}
export function savePmClosing (parameter) {
  return axios({
    url: api.pmClosing + '/subPmClosing',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
/** -----------------项目结项 end---------------- **/
/** -----------------项目收益 start---------------- **/
export function getPmIncomeList (parameter) {
  return axios({
    url: api.pmIncome + '/list',
    method: 'get',
    params: parameter
  })
}

export function getPmIncomeByPmId (pmId) {
  return axios({
    url: api.pmIncome + '/getByPmId/' + `${pmId}`,
    method: 'get'
  })
}

export function savePmIncome (parameter) {
  return axios({
    url: api.pmIncome + (parameter.id > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delPmIncome (parameter) {
  return axios({
    url: api.pmIncome + '/remove',
    method: 'post',
    params: parameter
  })
}
/** -----------------项目收益 end---------------- **/
/** -----------------项目收益明细 start---------------- **/
export function getPmEarnDetailByPmId (pmId) {
  return axios({
    url: api.pmEarnDetail + '/list/' + `${pmId}`,
    method: 'get'
  })
}

export function getPmEarnDetailList (parameter) {
  return axios({
    url: api.pmEarnDetail + '/list',
    method: 'get',
    params: parameter
  })
}

export function savePmEarnDetail (parameter) {
  return axios({
    url: api.pmEarnDetail + (parameter.id > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delPmEarnDetail (parameter) {
  return axios({
    url: api.pmEarnDetail + '/remove',
    method: 'post',
    params: parameter
  })
}
/** -----------------项目收益明细 end---------------- **/
/** -----------------项目风险 start---------------- **/
export function getPmMainRiskByPmId (pmId) {
  return axios({
    url: api.pmMainRisk + '/getByPmId/' + `${pmId}`,
    method: 'get'
  })
}

export function getPmMainRiskList (parameter) {
  return axios({
    url: api.pmMainRisk + '/list',
    method: 'get',
    params: parameter
  })
}

export function savePmMainRisk (parameter) {
  return axios({
    url: api.pmMainRisk + (parameter.id > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delPmMainRisk (parameter) {
  return axios({
    url: api.pmMainRisk + '/remove',
    method: 'post',
    params: parameter
  })
}
/** -----------------项目风险 end---------------- **/
/** -----------------项目费用 start---------------- **/
export function getPmExpenseByPmId (pmId) {
  return axios({
    url: api.pmExpense + '/getByPmId/' + `${pmId}`,
    method: 'get'
  })
}

export function getPmExpenseList (parameter) {
  return axios({
    url: api.pmExpense + '/list',
    method: 'get',
    params: parameter
  })
}

export function savePmExpense (parameter) {
  return axios({
    url: api.pmExpense + (parameter.id > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delPmExpense (parameter) {
  return axios({
    url: api.pmExpense + '/remove',
    method: 'post',
    params: parameter
  })
}
/** -----------------项目费用 end---------------- **/
/** -----------------项目费用明细 start---------------- **/
export function getPmExpDetailByPmId (pmId) {
  return axios({
    url: api.pmExpDetail + '/list/' + `${pmId}`,
    method: 'get'
  })
}

export function getPmExpDetailList (parameter) {
  return axios({
    url: api.pmExpDetail + '/list',
    method: 'get',
    params: parameter
  })
}

export function savePmExpDetail (parameter) {
  return axios({
    url: api.pmExpDetail + (parameter.id > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delPmExpDetail (parameter) {
  return axios({
    url: api.pmExpDetail + '/remove',
    method: 'post',
    params: parameter
  })
}
/** -----------------项目费用明细 end---------------- **/
/** -----------------项目知识产权 start---------------- **/
export function getPmIpSearchResultListByPmId (pmId) {
  return axios({
    url: api.pmIpResult + '/list/' + `${pmId}`,
    method: 'get'
  })
}
export function getPmIpPlanListByPmId (pmId) {
  return axios({
    url: api.pmIpPlan + '/list/' + `${pmId}`,
    method: 'get'
  })
}
export function getPmIpTrackInfoListByPmId (pmId) {
  return axios({
    url: api.pmIpTractInfo + '/list/' + `${pmId}`,
    method: 'get'
  })
}
export function getPmIpSearchConditionByPmId (pmId) {
  return axios({
    url: api.pmIpConditon + '/getByPmId/' + `${pmId}`,
    method: 'get'
  })
}
export function savePmIpTractInfo (parameter) {
  return axios({
    url: api.pmIpTractInfo + '/subPmIpTractInfo',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
/** -----------------项目知识产权 start---------------- **/
export const exportUrl = api.pmProjectInfo + '/export'
export const importUrl = api.pmProjectInfo + '/import'
export const importIncomeUrl = api.pmIncome + '/batchImportIncome'
export const importExpUrl = api.pmExpense + '/batchImportExpense'
