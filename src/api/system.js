import { axios } from '@/utils/request'

const api = {
  user: '/system/user',
  role: '/system/role',
  permission: '/system/menu',
  dept: '/system/dept',
  fileCategory: '/system/fileCategory',
  dictType: '/system/dict/type',
  dictData: '/system/dict/data',
  dist: '/system/districts',
  config: '/system/config',
  oss: '/system/oss',
  sysProcess: '/system/sysProcess',
  sysUserFavor: '/system/sysUserFavor'
}

export default api

// user
export function getUserList (parameter) {
  return axios({
    url: api.user + '/list',
    method: 'get',
    params: parameter
  })
}

export function getUser (userId) {
  return axios({
    url: api.user + '/get/' + `${userId}`,
    method: 'get'
  })
}
export function saveUser (parameter) {
  return axios({
    url: api.user + (parameter.userId > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function delUser (parameter) {
  return axios({
    url: api.user + '/remove',
    method: 'post',
    params: parameter
  })
}
export function changUserStatus (parameter) {
  return axios({
    url: api.user + '/status',
    method: 'post',
    data: parameter
  })
}
export function resetPwd (parameter) {
  return axios({
    url: api.user + '/resetPwd',
    method: 'post',
    data: parameter
  })
}
export function modifyPwd (parameter) {
  return axios({
    url: api.user + '/modifyPwd',
    method: 'post',
    data: parameter
  })
}
export const importUserList = api.user + '/import'
// role
export function getRoleList (parameter) {
  return axios({
    url: api.role + '/list',
    method: 'get',
    params: parameter
  })
}
export function getRoleAll () {
  return axios({
    url: api.role + '/all',
    method: 'get'
  })
}

export function saveRole (parameter) {
  return axios({
    url: api.role + (parameter.roleId > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delRole (parameter) {
  return axios({
    url: api.role + '/remove',
    method: 'post',
    params: parameter
  })
}
export function changRoleStatus (parameter) {
  return axios({
    url: api.role + '/status',
    method: 'post',
    data: parameter
  })
}
export function authDataScope (parameter) {
  return axios({
    url: api.role + '/authDataScope',
    method: 'post',
    data: parameter
  })
}

// menu
export function getPermissionAll (parameter) {
  return axios({
    url: api.permission + '/all',
    method: 'get',
    params: parameter
  })
}
export function getPermissions (parameter) {
  return axios({
    url: api.permission + '/list',
    method: 'get',
    params: parameter
  })
}
export function getRolePermIds (roleId) {
  return axios({
    url: api.permission + '/role/' + `${roleId}`,
    method: 'get'
  })
}

export function savePerm (parameter) {
  return axios({
    url: api.permission + (parameter.menuId > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delPerm (deptId) {
  return axios({
    url: api.permission + '/remove/' + `${deptId}`,
    method: 'post'
  })
}

// dept
export function getDeptList (parameter) {
  return axios({
    url: api.dept + '/list',
    method: 'get',
    params: parameter
  })
}
export function getDeptListEnable (parameter) {
  return axios({
    url: api.dept + '/list/enable',
    method: 'get',
    params: parameter
  })
}
export function getRoleDeptIds (roleId) {
  return axios({
    url: api.dept + '/role/' + `${roleId}`,
    method: 'get'
  })
}
export function saveDept (parameter) {
  return axios({
    url: api.dept + (parameter.deptId > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delDept (deptId) {
  return axios({
    url: api.dept + '/remove/' + `${deptId}`,
    method: 'post'
  })
}
// dictType
export function getDictTypeList (parameter) {
  return axios({
    url: api.dictType + '/list',
    method: 'get',
    params: parameter
  })
}
export function saveDictType (parameter) {
  return axios({
    url: api.dictType + (parameter.dictId > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function delDictType (parameter) {
  return axios({
    url: api.dictType + '/remove',
    method: 'post',
    params: parameter
  })
}

// dictData
export function getDictDataList (parameter) {
  return axios({
    url: api.dictData + '/list',
    method: 'get',
    params: parameter
  })
}
export function saveDictData (parameter) {
  return axios({
    url: api.dictData + (parameter.dictCode > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function delDictData (parameter) {
  return axios({
    url: api.dictData + '/remove',
    method: 'post',
    params: parameter
  })
}

export function getDictDataByType (dictType) {
  return axios({
    url: api.dictData + '/type/' + `${dictType}`,
    method: 'get'
  })
}
// dist 地区
export function getDistList (parameter) {
  return axios({
    url: api.dist + '/list',
    method: 'get',
    params: parameter
  })
}
export function saveDist (parameter) {
  return axios({
    url: api.dist + (parameter.id > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function delDist (parameter) {
  return axios({
    url: api.dist + '/remove',
    method: 'post',
    params: parameter
  })
}
// config 配置
export function getConfigList (parameter) {
  return axios({
    url: api.config + '/list',
    method: 'get',
    params: parameter
  })
}
export function saveConfig (parameter) {
  return axios({
    url: api.config + (parameter.configId > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function delConfig (parameter) {
  return axios({
    url: api.config + '/remove',
    method: 'post',
    params: parameter
  })
}
// oss
export function getOssList (parameter) {
  return axios({
    url: api.oss + '/list',
    method: 'get',
    params: parameter
  })
}
export function saveOss (parameter) {
  return axios({
    url: api.oss + (parameter.id > 0 ? '/update' : '/save'),
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function delOss (parameter) {
  return axios({
    url: api.oss + '/remove',
    method: 'post',
    params: parameter
  })
}
export function getOssConfig () {
  return axios({
    url: api.oss + '/config',
    method: 'get'
  })
}
export function saveOssConfig (parameter) {
  return axios({
    url: api.oss + '/saveConfig',
    method: 'post',
    params: parameter
  })
}

export function refreshDeptUserApi () {
  return axios({
    url: api.dept + '/syncDeptUser',
    method: 'get'
  })
}

export function getSysProcessApi (sysProcessId) {
  return axios({
    url: api.sysProcess + '/get/' + `${sysProcessId}`,
    method: 'get'
  })
}

export function handBigFileApi (parameter) {
  return axios({
    url: api.sysProcess + '/handBigFile',
    method: 'post',
    params: parameter
  })
}

export function getSysProcessListApi (parameter) {
  return axios({
    url: api.sysProcess + '/listSysProcess',
    method: 'get',
    params: parameter
  })
}

export function sysProcessTypesApi (parameter) {
  return axios({
    url: api.sysProcess + '/sysProcessTypes',
    method: 'get',
    params: parameter
  })
}

export function getSysUserFavorList (parameter) {
  return axios({
    url: api.sysUserFavor + '/list',
    method: 'get',
    params: parameter
  })
}

export function getUserFavor (parameter) {
  return axios({
    url: api.sysUserFavor + '/getUserFavor',
    method: 'get',
    params: parameter
  })
}

export function saveSysUserFavor (parameter) {
  return axios({
    url: api.sysUserFavor + '/submit',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delSysUserFavor (parameter) {
  return axios({
    url: api.sysUserFavor + '/remove',
    method: 'post',
    params: parameter
  })
}

export function getFileCategoryList (parameter) {
  return axios({
    url: api.fileCategory + '/list',
    method: 'get',
    params: parameter
  })
}

export function saveFileCategory (parameter) {
  return axios({
    url: api.fileCategory + '/save',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function delFileCategory (id) {
  return axios({
    url: api.fileCategory + '/remove/' + `${id}`,
    method: 'post'
  })
}

export function getFileCategoryApi (id) {
  return axios({
    url: api.fileCategory + '/get/' + `${id}`,
    method: 'get'
  })
}

export function getSysMenuApi (menuId) {
  return axios({
    url: api.permission + '/get/' + `${menuId}`,
    method: 'get'
  })
}

export function getSysMenuApiByPerms (perms) {
  return axios({
    url: api.permission + '/getSysMenuApiByPerms?perms=' + perms,
    method: 'get'
  })
}
