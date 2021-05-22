import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _41a641e9 = () => interopDefault(import('../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _c4a8ff40 = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _d8c2cbf8 = () => interopDefault(import('../pages/dashboard/account.vue' /* webpackChunkName: "pages/dashboard/account" */))
const _031d62de = () => interopDefault(import('../pages/dashboard/chat.vue' /* webpackChunkName: "pages/dashboard/chat" */))
const _7fa0155c = () => interopDefault(import('../pages/dashboard/courses/index.vue' /* webpackChunkName: "pages/dashboard/courses/index" */))
const _41eeae54 = () => interopDefault(import('../pages/dashboard/faqs.vue' /* webpackChunkName: "pages/dashboard/faqs" */))
const _6b5020e0 = () => interopDefault(import('../pages/dashboard/my-courses.vue' /* webpackChunkName: "pages/dashboard/my-courses" */))
const _18b4a121 = () => interopDefault(import('../pages/dashboard/my-webinars.vue' /* webpackChunkName: "pages/dashboard/my-webinars" */))
const _1de45889 = () => interopDefault(import('../pages/dashboard/saved-courses.vue' /* webpackChunkName: "pages/dashboard/saved-courses" */))
const _7cbe3d48 = () => interopDefault(import('../pages/dashboard/settings.vue' /* webpackChunkName: "pages/dashboard/settings" */))
const _7df733a5 = () => interopDefault(import('../pages/dashboard/suggested-courses.vue' /* webpackChunkName: "pages/dashboard/suggested-courses" */))
const _4e0440a8 = () => interopDefault(import('../pages/dashboard/suggested-webinars.vue' /* webpackChunkName: "pages/dashboard/suggested-webinars" */))
const _34c05f1e = () => interopDefault(import('../pages/dashboard/upcoming-webinars.vue' /* webpackChunkName: "pages/dashboard/upcoming-webinars" */))
const _75260785 = () => interopDefault(import('../pages/dashboard/webinars/index.vue' /* webpackChunkName: "pages/dashboard/webinars/index" */))
const _28d1b39c = () => interopDefault(import('../pages/dashboard/webinars/create/index.vue' /* webpackChunkName: "pages/dashboard/webinars/create/index" */))
const _3ad5e856 = () => interopDefault(import('../pages/dashboard/webinars/new/index.vue' /* webpackChunkName: "pages/dashboard/webinars/new/index" */))
const _8d361760 = () => interopDefault(import('../pages/dashboard/courses/view/_slug.vue' /* webpackChunkName: "pages/dashboard/courses/view/_slug" */))
const _a0baac94 = () => interopDefault(import('../pages/dashboard/webinars/preview/_slug.vue' /* webpackChunkName: "pages/dashboard/webinars/preview/_slug" */))
const _871d6c06 = () => interopDefault(import('../pages/dashboard/webinars/view/_slug.vue' /* webpackChunkName: "pages/dashboard/webinars/view/_slug" */))
const _b103c7b8 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/dashboard",
    component: _41a641e9,
    name: "dashboard"
  }, {
    path: "/auth/login",
    component: _c4a8ff40,
    name: "auth-login"
  }, {
    path: "/dashboard/account",
    component: _d8c2cbf8,
    name: "dashboard-account"
  }, {
    path: "/dashboard/chat",
    component: _031d62de,
    name: "dashboard-chat"
  }, {
    path: "/dashboard/courses",
    component: _7fa0155c,
    name: "dashboard-courses"
  }, {
    path: "/dashboard/faqs",
    component: _41eeae54,
    name: "dashboard-faqs"
  }, {
    path: "/dashboard/my-courses",
    component: _6b5020e0,
    name: "dashboard-my-courses"
  }, {
    path: "/dashboard/my-webinars",
    component: _18b4a121,
    name: "dashboard-my-webinars"
  }, {
    path: "/dashboard/saved-courses",
    component: _1de45889,
    name: "dashboard-saved-courses"
  }, {
    path: "/dashboard/settings",
    component: _7cbe3d48,
    name: "dashboard-settings"
  }, {
    path: "/dashboard/suggested-courses",
    component: _7df733a5,
    name: "dashboard-suggested-courses"
  }, {
    path: "/dashboard/suggested-webinars",
    component: _4e0440a8,
    name: "dashboard-suggested-webinars"
  }, {
    path: "/dashboard/upcoming-webinars",
    component: _34c05f1e,
    name: "dashboard-upcoming-webinars"
  }, {
    path: "/dashboard/webinars",
    component: _75260785,
    name: "dashboard-webinars"
  }, {
    path: "/dashboard/webinars/create",
    component: _28d1b39c,
    name: "dashboard-webinars-create"
  }, {
    path: "/dashboard/webinars/new",
    component: _3ad5e856,
    name: "dashboard-webinars-new"
  }, {
    path: "/dashboard/courses/view/:slug?",
    component: _8d361760,
    name: "dashboard-courses-view-slug"
  }, {
    path: "/dashboard/webinars/preview/:slug?",
    component: _a0baac94,
    name: "dashboard-webinars-preview-slug"
  }, {
    path: "/dashboard/webinars/view/:slug?",
    component: _871d6c06,
    name: "dashboard-webinars-view-slug"
  }, {
    path: "/",
    component: _b103c7b8,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
