import { pureAxios, axios } from '@/utils/request'

const downloadUrl = '/system/common/download'

const downloadTemplateUrl = '/system/file/ftp/downloadByPath'

const importErrorUrl = '/system/common/download/error'

const mimeMap = {
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  zip: 'application/zip',
  xml: 'application/xml'
}

export function exportExcel (url, params) {
  axios({
    url: url,
    method: 'post',
    params: params
  }).then(res => {
    if (res.code === 0) {
      downloadXlsx(res.msg)
    }
  })
}

export function exportExcelMuti (url, params) {
  axios({
    url: url,
    method: 'get',
    params: params
  }).then(res => {
    if (res.code === 0) {
      downloadXlsx(res.msg)
    }
  })
}

/**
 * 下载.xlsx文件
 * @param {String} filename 文件名
 */
export function downloadXlsx (filename) {
  pureAxios({
    url: downloadUrl,
    method: 'get',
    params: { fileName: filename, delete: true },
    responseType: 'blob'
  }).then(res => {
    resolveBlob(res, mimeMap.xlsx)
  })
}

/**
 * 下载导入模板文件
 * @param {String} filePath 文件名
 */
export function downloadTemplate (filePath) {
  pureAxios({
    url: downloadTemplateUrl,
    method: 'get',
    params: { path: filePath },
    responseType: 'blob'
  }).then(res => {
    resolveBlob(res, mimeMap.xlsx)
  })
}

/**
 * 下载批量导入错误信息
 * @param {String} filename 文件名
 */
export function downloadError (key) {
  pureAxios({
    url: importErrorUrl,
    method: 'get',
    params: { key: key },
    responseType: 'blob'
  }).then(res => {
    resolveBlob(res, mimeMap.xlsx)
  })
}

/**
 * 代码生成并下载为zip
 * @param {String} url 链接
 * @param {String} tables 表名
 */
export function genCodeZip (url, tables) {
  pureAxios({
    url: url,
    method: 'get',
    params: { tables: tables },
    responseType: 'blob'
  }).then(res => {
    resolveBlob(res, mimeMap.zip)
  })
}

/**
 * 文件下载为zip
 * @param {String} url 链接
 * @param {String} tables 表名
 */
export function downloadZip (url, params) {
  pureAxios({
    url: url,
    method: 'get',
    params: params,
    responseType: 'blob'
  }).then(res => {
    resolveBlob(res, mimeMap.zip)
  })
}

/**
 * 解析blob响应内容并下载
 * @param {*} res blob响应内容
 * @param {String} mimeType MIME类型
 */
export function resolveBlob (res, mimeType) {
  const aLink = document.createElement('a')
  // var blob = new Blob([res.data], { type: mimeType })
  var blob = mimeType ? new Blob([res.data], { type: mimeType }) : new Blob([res.data])
  // //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
  var patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
  var contentDisposition = decodeURI(res.headers['content-disposition'])
  var result = patt.exec(contentDisposition)
  var fileName = result[1]
  aLink.href = URL.createObjectURL(blob)
  aLink.setAttribute('download', fileName) // 设置下载文件名称
  document.body.appendChild(aLink)
  aLink.click()
  document.body.removeChild(aLink)
  window.URL.revokeObjectURL(aLink.href)
}
