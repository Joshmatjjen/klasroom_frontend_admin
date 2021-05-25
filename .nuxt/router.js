import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3abbaaab = () => interopDefault(import('../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _00a4265e = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _c6064b74 = () => interopDefault(import('../pages/dashboard/account.vue' /* webpackChunkName: "pages/dashboard/account" */))
const _488ac58f = () => interopDefault(import('../pages/dashboard/chat.vue' /* webpackChunkName: "pages/dashboard/chat" */))
const _058d07d8 = () => interopDefault(import('../pages/dashboard/courses/index.vue' /* webpackChunkName: "pages/dashboard/courses/index" */))
const _29221fd4 = () => interopDefault(import('../pages/dashboard/faqs.vue' /* webpackChunkName: "pages/dashboard/faqs" */))
const _0d209fe4 = () => interopDefault(import('../pages/dashboard/my-courses.vue' /* webpackChunkName: "pages/dashboard/my-courses" */))
const _66d61f3a = () => interopDefault(import('../pages/dashboard/my-webinars.vue' /* webpackChunkName: "pages/dashboard/my-webinars" */))
const _5aeddf4b = () => interopDefault(import('../pages/dashboard/saved-courses.vue' /* webpackChunkName: "pages/dashboard/saved-courses" */))
const _37eaad4c = () => interopDefault(import('../pages/dashboard/settings.vue' /* webpackChunkName: "pages/dashboard/settings" */))
const _797b8967 = () => interopDefault(import('../pages/dashboard/suggested-courses.vue' /* webpackChunkName: "pages/dashboard/suggested-courses" */))
const _4e04422a = () => interopDefault(import('../pages/dashboard/suggested-webinars.vue' /* webpackChunkName: "pages/dashboard/suggested-webinars" */))
const _3db7b39a = () => interopDefault(import('../pages/dashboard/upcoming-webinars.vue' /* webpackChunkName: "pages/dashboard/upcoming-webinars" */))
const _4d654dfa = () => interopDefault(import('../pages/dashboard/webinars/index.vue' /* webpackChunkName: "pages/dashboard/webinars/index" */))
const _7ad1585e = () => interopDefault(import('../pages/dashboard/webinars/create/index.vue' /* webpackChunkName: "pages/dashboard/webinars/create/index" */))
const _a0476a58 = () => interopDefault(import('../pages/dashboard/webinars/new/index.vue' /* webpackChunkName: "pages/dashboard/webinars/new/index" */))
const _2e6b56ce = () => interopDefault(import('../pages/dashboard/courses/view/_slug.vue' /* webpackChunkName: "pages/dashboard/courses/view/_slug" */))
const _c4d0c598 = () => interopDefault(import('../pages/dashboard/webinars/preview/_slug.vue' /* webpackChunkName: "pages/dashboard/webinars/preview/_slug" */))
const _2f919182 = () => interopDefault(import('../pages/dashboard/webinars/view/_slug.vue' /* webpackChunkName: "pages/dashboard/webinars/view/_slug" */))
const _ebcda134 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _3abbaaab,
    name: "dashboard"
  }, {
    path: "/auth/login",
    component: _00a4265e,
    name: "auth-login"
  }, {
    path: "/dashboard/account",
    component: _c6064b74,
    name: "dashboard-account"
  }, {
    path: "/dashboard/chat",
    component: _488ac58f,
    name: "dashboard-chat"
  }, {
    path: "/dashboard/courses",
    component: _058d07d8,
    name: "dashboard-courses"
  }, {
    path: "/dashboard/faqs",
    component: _29221fd4,
    name: "dashboard-faqs"
  }, {
    path: "/dashboard/my-courses",
    component: _0d209fe4,
    name: "dashboard-my-courses"
  }, {
    path: "/dashboard/my-webinars",
    component: _66d61f3a,
    name: "dashboard-my-webinars"
  }, {
    path: "/dashboard/saved-courses",
    component: _5aeddf4b,
    name: "dashboard-saved-courses"
  }, {
    path: "/dashboard/settings",
    component: _37eaad4c,
    name: "dashboard-settings"
  }, {
    path: "/dashboard/suggested-courses",
    component: _797b8967,
    name: "dashboard-suggested-courses"
  }, {
    path: "/dashboard/suggested-webinars",
    component: _4e04422a,
    name: "dashboard-suggested-webinars"
  }, {
    path: "/dashboard/upcoming-webinars",
    component: _3db7b39a,
    name: "dashboard-upcoming-webinars"
  }, {
    path: "/dashboard/webinars",
    component: _4d654dfa,
    name: "dashboard-webinars"
  }, {
    path: "/dashboard/webinars/create",
    component: _7ad1585e,
    name: "dashboard-webinars-create"
  }, {
    path: "/dashboard/webinars/new",
    component: _a0476a58,
    name: "dashboard-webinars-new"
  }, {
    path: "/dashboard/courses/view/:slug?",
    component: _2e6b56ce,
    name: "dashboard-courses-view-slug"
  }, {
    path: "/dashboard/webinars/preview/:slug?",
    component: _c4d0c598,
    name: "dashboard-webinars-preview-slug"
  }, {
    path: "/dashboard/webinars/view/:slug?",
    component: _2f919182,
    name: "dashboard-webinars-view-slug"
  }, {
    path: "/",
    component: _ebcda134,
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
