import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  install (Vue, options) {
    Vue.prototype.getPdf = function () {
      var title = this.htmlTitle
      var dom = document.querySelector('#pdfDom')
      var width = dom.offsetWidth // 获取dom 宽度
      var height = dom.offsetHeight // 获取dom 高度
      var canvas = document.createElement('canvas') // 创建一个canvas节点
      var scale = 2 // 定义任意放大倍数 支持小数
      canvas.width = width * scale // 定义canvas 宽度 * 缩放，在此我是把canvas放大了2倍
      canvas.height = height * scale // 定义canvas高度 *缩放
      canvas.getContext('2d').scale(scale, scale) // 获取context,设置scale
      html2Canvas(dom, {
        allowTaint: true
      }).then(function (canvas) {
        // 【重要】关闭抗锯齿
        var ctx = canvas.getContext('2d')
        ctx.mozImageSmoothingEnabled = false
        ctx.webkitImageSmoothingEnabled = false
        ctx.msImageSmoothingEnabled = false
        ctx.imageSmoothingEnabled = false
        var pdf = new JsPDF('p', 'mm', 'a4') // A4纸，纵向
        var a4w = 190; var a4h = 277 // A4大小，210mm x 297mm，四边各保留20mm的边距，显示区域170x257
        var imgHeight = Math.floor(a4h * canvas.width / a4w) // 按A4显示比例换算一页图像的像素高度
        var renderedHeight = 0
        while (renderedHeight < canvas.height) {
          var page = document.createElement('canvas')
          page.width = canvas.width
          page.height = Math.min(imgHeight, canvas.height - renderedHeight)// 可能内容不足一页

          // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
          page.getContext('2d').putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0)
          pdf.addImage(page.toDataURL('image/jpeg', 1.0), 'JPEG', 10, 10, a4w, Math.min(a4h, a4w * page.height / page.width)) // 添加图像到页面，保留10mm边距

          renderedHeight += imgHeight
          if (renderedHeight < canvas.height) { pdf.addPage() }// 如果后面还有内容，添加一个空页
          // delete page;
        }
        pdf.save(title + '.pdf')
      }
      )
    }
  }

}
