import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _38bd920e = () => interopDefault(import('../pages/chat/index.vue' /* webpackChunkName: "pages/chat/index" */))
const _5d5936e6 = () => interopDefault(import('../pages/courses/index.vue' /* webpackChunkName: "pages/courses/index" */))
const _41a641e9 = () => interopDefault(import('../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _2c49ed04 = () => interopDefault(import('../pages/faqs/index.vue' /* webpackChunkName: "pages/faqs/index" */))
const _e4ef29f8 = () => interopDefault(import('../pages/settings/index.vue' /* webpackChunkName: "pages/settings/index" */))
const _ef1f00ac = () => interopDefault(import('../pages/webinars/index.vue' /* webpackChunkName: "pages/webinars/index" */))
const _c4a8ff40 = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _d8c2cbf8 = () => interopDefault(import('../pages/dashboard/account.vue' /* webpackChunkName: "pages/dashboard/account" */))
const _6b5020e0 = () => interopDefault(import('../pages/dashboard/my-courses.vue' /* webpackChunkName: "pages/dashboard/my-courses" */))
const _18b4a121 = () => interopDefault(import('../pages/dashboard/my-webinars.vue' /* webpackChunkName: "pages/dashboard/my-webinars" */))
const _1de45889 = () => interopDefault(import('../pages/dashboard/saved-courses.vue' /* webpackChunkName: "pages/dashboard/saved-courses" */))
const _7df733a5 = () => interopDefault(import('../pages/dashboard/suggested-courses.vue' /* webpackChunkName: "pages/dashboard/suggested-courses" */))
const _4e0440a8 = () => interopDefault(import('../pages/dashboard/suggested-webinars.vue' /* webpackChunkName: "pages/dashboard/suggested-webinars" */))
const _34c05f1e = () => interopDefault(import('../pages/dashboard/upcoming-webinars.vue' /* webpackChunkName: "pages/dashboard/upcoming-webinars" */))
const _3edbb7d7 = () => interopDefault(import('../pages/webinars/create/index.vue' /* webpackChunkName: "pages/webinars/create/index" */))
const _362dc5fb = () => interopDefault(import('../pages/webinars/new/index.vue' /* webpackChunkName: "pages/webinars/new/index" */))
const _96865c16 = () => interopDefault(import('../pages/courses/view/_slug.vue' /* webpackChunkName: "pages/courses/view/_slug" */))
const _5ad92cdb = () => interopDefault(import('../pages/webinars/preview/_slug.vue' /* webpackChunkName: "pages/webinars/preview/_slug" */))
const _2c1520f8 = () => interopDefault(import('../pages/webinars/view/_slug.vue' /* webpackChunkName: "pages/webinars/view/_slug" */))
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
    path: "/chat",
    component: _38bd920e,
    name: "chat"
  }, {
    path: "/courses",
    component: _5d5936e6,
    name: "courses"
  }, {
    path: "/dashboard",
    component: _41a641e9,
    name: "dashboard"
  }, {
    path: "/faqs",
    component: _2c49ed04,
    name: "faqs"
  }, {
    path: "/settings",
    component: _e4ef29f8,
    name: "settings"
  }, {
    path: "/webinars",
    component: _ef1f00ac,
    name: "webinars"
  }, {
    path: "/auth/login",
    component: _c4a8ff40,
    name: "auth-login"
  }, {
    path: "/dashboard/account",
    component: _d8c2cbf8,
    name: "dashboard-account"
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
    path: "/webinars/create",
    component: _3edbb7d7,
    name: "webinars-create"
  }, {
    path: "/webinars/new",
    component: _362dc5fb,
    name: "webinars-new"
  }, {
    path: "/courses/view/:slug?",
    component: _96865c16,
    name: "courses-view-slug"
  }, {
    path: "/webinars/preview/:slug?",
    component: _5ad92cdb,
    name: "webinars-preview-slug"
  }, {
    path: "/webinars/view/:slug?",
    component: _2c1520f8,
    name: "webinars-view-slug"
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
