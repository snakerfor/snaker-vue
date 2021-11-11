// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

/**
 * 这里不再保留原来默认的菜单asyncRouterMap
 * https://github.com/sendya/ant-design-pro-vue/blob/master/src/router/generator-routers.js
 */
export const defaultRouterMap = [
  {
    'title': '个人页',
    'key': 'account',
    'component': 'BlankLayout',
    // 'icon': bxAnaalyse,
    'hidden': true,
    'redirect': '/account/center',
    'children': [
      {
        'hiddenHeaderContent': true,
        'title': '个人中心',
        'key': 'center'
      },
      {
        'title': '个人设置',
        'key': 'settings',
        'hideChildrenInMenu': true,
        'redirect': '/account/settings/base',
        'children': [
          {
            'hiddenHeaderContent': true,
            'title': '基本设置',
            'key': 'base'
          },
          {
            'hiddenHeaderContent': true,
            'title': '安全设置',
            'key': 'security'
          },
          {
            'hiddenHeaderContent': true,
            'title': '个性化设置',
            'key': 'custom'
          },
          {
            'hiddenHeaderContent': true,
            'title': '账户绑定',
            'key': 'binding'
          },
          {
            'hiddenHeaderContent': true,
            'title': '新消息通知',
            'key': 'notification'
          }
        ]
      }
    ]
  }
]
// export const defaultRouterMap = []
/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },
  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: '/',
    component: PageView,
    redirect: '/act/businessList'
  },
  {
    path: '/pd',
    component: PageView,
    redirect: '/pm'
  },
  {
    path: '/preview',
    component: () => import('@/views/common/PreviewFile'),
    name: 'preview'
  },
  {
    path: '/previewImages',
    component: () => import('@/views/common/PreviewImage'),
    name: 'previewImages'
  },
  {
    path: '/pmView',
    component: () => import('@/views/rdds/modules/PmProjectInfoView'),
    name: 'pmView'
  },
  {
    path: '/pmAdd',
    component: () => import('@/views/rdds/modules/PmProjectInfoAdd'),
    name: 'pmAdd'
  },
  {
    path: '/pmEdit',
    component: () => import('@/views/rdds/modules/PmProjectInfoEdit'),
    name: 'pmEdit'
  },
  {
    path: '/pmEditFruit',
    component: () => import('@/views/rdds/modules/PmProjectInfoEditFruit'),
    name: 'pmEditFruit'
  },
  {
    path: '/pmEditProcess',
    component: () => import('@/views/rdds/modules/PmProjectInfoEditProcess'),
    name: 'pmEditProcess'
  },
  {
    path: '/pmEditIpInfo',
    component: () => import('@/views/rdds/modules/PmProjectInfoEditIpInfo'),
    name: 'pmEditIpInfo'
  }
]
