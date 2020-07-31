import Vue from 'vue'
import Login from '@/views/login/index.vue'
import '@testing-library/jest-dom/extend-expect'
import Vant from 'vant'
Vue.use(Vant)
describe('vue.vue', () => {
  const Constructor = Vue.extend(Login)
  const vm = new Constructor().$mount()
  it('test', () => {
    console.log(document.querySelector('[data-testid="text-login"]'), 'lllllllll')
  })
})
