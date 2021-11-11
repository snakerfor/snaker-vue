import { axios } from '@/utils/request'
import html2Canvas from 'html2canvas'

const api = {
  file: '/system/file',
  approve: '/system/approve',
  fileCategory: '/system/fileCategory'
}

export function delFile (parameter) {
  return axios({
    url: api.file + '/remove',
    method: 'post',
    params: parameter
  })
}

export function getFileById (id) {
  return axios({
    url: api.file + '/get/' + `${id}`,
    method: 'get'
  })
}

export function getDfsFileApi (id) {
  return axios({
    url: api.file + '/getDfsFile/' + `${id}`,
    method: 'get'
  })
}

export function startBuildPdfFileApi (id) {
  return axios({
    url: api.file + '/startBuildPdfFile/' + `${id}`,
    method: 'get'
  })
}

export function getZipDfsFileByIdApi (id) {
  return axios({
    url: api.file + '/getZipDfsFile/' + `${id}`,
    method: 'get'
  })
}

export function batchGetDfsFileByIds (parameter) {
  return axios({
    url: api.file + '/batchGetDfsFileByIds',
    method: 'post',
    data: parameter
  })
}

export function listFileCategoryTreeApi (parameter) {
  return axios({
    url: api.fileCategory + '/fileCategoryTree',
    method: 'get',
    params: parameter
  })
}

export function getCategoryFileList (parameter) {
  if (parameter.sortField === 'createTime') {
    parameter.sortField = 'f.createTime'
  }
  if (parameter.sortField === 'fileCategoryName') {
    parameter.sortField = 'c.name'
  }
  return axios({
    url: api.file + '/categoryFileList',
    method: 'get',
    params: parameter
  })
}
export function reportToImage (ref, imageName) {
  var canvas2 = document.createElement('canvas')
  const _canvas = document.querySelector(ref)
  var w = parseInt(window.getComputedStyle(_canvas).width)
  var h = parseInt(window.getComputedStyle(_canvas).height)
  // 将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
  canvas2.width = w * 2
  canvas2.height = h * 2
  canvas2.style.width = w + 'px'
  canvas2.style.height = h + 'px'
  canvas2.scrollY = 0
  canvas2.allowTaint = true
  canvas2.useCORS = true

  // 可以按照自己的需求，对context的参数修改,translate指的是偏移量
  var context = canvas2.getContext('2d')
  context.scale(2, 2)
  var dom = document.querySelector(ref)
  html2Canvas(dom, canvas2).then(function (canvas) {
    // 转成图片，生成图片地址
    var imgurl = canvas.toDataURL('image/png')
    // 创建隐藏的可下载链接
    var eleLink = document.createElement('a')
    eleLink.href = imgurl // 转换后的图片地址
    eleLink.download = imageName
    // 触发点击
    document.body.appendChild(eleLink)
    eleLink.click()
    // 然后移除
    document.body.removeChild(eleLink)
  }
  )
}
