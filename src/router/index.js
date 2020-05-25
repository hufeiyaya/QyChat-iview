import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import iView from 'iview'
import 'iView/dist/styles/iview.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Login from '@/components/Login'
import Home from '@/components/Home'

Vue.use(Router)
Vue.use(VueResource)
Vue.use(iView)
Vue.use(VueQuillEditor)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/manager',
      component: Home
    }
  ]
})
