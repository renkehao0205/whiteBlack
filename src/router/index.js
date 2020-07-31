import Vue from 'vue'
import Router from 'vue-router'
import cookie from 'js-cookie'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/views'
import Home from '@/views/home'
import Detail from '@/components/detail.vue'
import ShopLists from '@/components/shopLists.vue'
import CommodityClassification from '@/views/CommodityClassification'
import ShopCar from '@/views/shopCar'
import My from '@/views/my'
import Login from '@/views/login'
import Register from '@/views/register'
import Address from '@/components/my/address.vue'
import AddEditAddress from '@/components/my/addEditAddress.vue'

import scrollbar from '@/views/scrollbar.vue'
import Service from '@/views/noService'
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(Router)
let token = cookie.get('token')
let userName = cookie.get('userName')
console.log(token, userName, 'lllll')
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        flag: false
      },
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
          meta: {
            flag: true
          }
        },
        {
          path: '/CommodityClassification',
          name: 'CommodityClassification',
          component: CommodityClassification,
          meta: {
            flag: false
          }
        },
        {
          path: '/my',
          name: 'my',
          component: My,
          meta: {
            flag: false
          }
        },
        {
          path: '/shopCar',
          name: 'shopCar',
          component: ShopCar,
          meta: {
            flag: false
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        flag: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        flag: false
      }
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail,
      meta: {
        flag: false
      }
    },
    {
      path: '/shopLists',
      name: 'ShopLists',
      component: ShopLists,
      meta: {
        flag: false
      }
    },
    {
      path: '/address',
      name: 'Address',
      component: Address,
      meta: {
        flag: false
      }
    },
    {
      path: '/addEditAddress',
      name: 'AddEditAddress',
      component: AddEditAddress,
      meta: {
        flag: false
      }
    },
    {
      path: '/service',
      name: 'Service',
      component: Service,
      meta: {
        flag: false
      }
    },
    {
      path: '/scrollbar',
      name: 'scrollbar',
      component: scrollbar,
      meta: {
        flag: false
      }
    }
  ]
})

const whiteList = ['/login', '/register', '/service', '/scrollbar']

router.beforeEach((to, from, next) => {
  if (token) { // 未登录
    if (to.path === '/login') { // 跳转到登录页
      return next({path: '/home'})
    } else {
      return next()
    }
  } else { // 已登录
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login`) // 否则全部重定向到登录页
    }
  }
})
export default router
