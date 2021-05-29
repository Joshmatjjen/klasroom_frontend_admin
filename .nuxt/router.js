import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4699dcf7 = () => interopDefault(import('../pages/chat/index.vue' /* webpackChunkName: "pages/chat/index" */))
const _36d015cf = () => interopDefault(import('../pages/courses/index.vue' /* webpackChunkName: "pages/courses/index" */))
const _3abbaaab = () => interopDefault(import('../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _4cd3af7c = () => interopDefault(import('../pages/faqs/index.vue' /* webpackChunkName: "pages/faqs/index" */))
const _3a4b126e = () => interopDefault(import('../pages/people/index.vue' /* webpackChunkName: "pages/people/index" */))
const _50bc3bfc = () => interopDefault(import('../pages/settings/index.vue' /* webpackChunkName: "pages/settings/index" */))
const _5aec12b0 = () => interopDefault(import('../pages/webinars/index.vue' /* webpackChunkName: "pages/webinars/index" */))
const _00a4265e = () => interopDefault(import('../pages/auth/login.vue' /* webpackChunkName: "pages/auth/login" */))
const _c6064b74 = () => interopDefault(import('../pages/dashboard/account.vue' /* webpackChunkName: "pages/dashboard/account" */))
const _0d209fe4 = () => interopDefault(import('../pages/dashboard/my-courses.vue' /* webpackChunkName: "pages/dashboard/my-courses" */))
const _66d61f3a = () => interopDefault(import('../pages/dashboard/my-webinars.vue' /* webpackChunkName: "pages/dashboard/my-webinars" */))
const _5aeddf4b = () => interopDefault(import('../pages/dashboard/saved-courses.vue' /* webpackChunkName: "pages/dashboard/saved-courses" */))
const _797b8967 = () => interopDefault(import('../pages/dashboard/suggested-courses.vue' /* webpackChunkName: "pages/dashboard/suggested-courses" */))
const _4e04422a = () => interopDefault(import('../pages/dashboard/suggested-webinars.vue' /* webpackChunkName: "pages/dashboard/suggested-webinars" */))
const _3db7b39a = () => interopDefault(import('../pages/dashboard/upcoming-webinars.vue' /* webpackChunkName: "pages/dashboard/upcoming-webinars" */))
const _1a87f1ce = () => interopDefault(import('../pages/webinars/create/index.vue' /* webpackChunkName: "pages/webinars/create/index" */))
const _58978df9 = () => interopDefault(import('../pages/webinars/new/index.vue' /* webpackChunkName: "pages/webinars/new/index" */))
const _51b2cc1a = () => interopDefault(import('../pages/courses/view/_slug.vue' /* webpackChunkName: "pages/courses/view/_slug" */))
const _68d1c1e7 = () => interopDefault(import('../pages/people/students/_slug.vue' /* webpackChunkName: "pages/people/students/_slug" */))
const _2302c5d9 = () => interopDefault(import('../pages/webinars/preview/_slug.vue' /* webpackChunkName: "pages/webinars/preview/_slug" */))
const _56e458ba = () => interopDefault(import('../pages/webinars/view/_slug.vue' /* webpackChunkName: "pages/webinars/view/_slug" */))
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
    path: "/chat",
    component: _4699dcf7,
    name: "chat"
  }, {
    path: "/courses",
    component: _36d015cf,
    name: "courses"
  }, {
    path: "/dashboard",
    component: _3abbaaab,
    name: "dashboard"
  }, {
    path: "/faqs",
    component: _4cd3af7c,
    name: "faqs"
  }, {
    path: "/people",
    component: _3a4b126e,
    name: "people"
  }, {
    path: "/settings",
    component: _50bc3bfc,
    name: "settings"
  }, {
    path: "/webinars",
    component: _5aec12b0,
    name: "webinars"
  }, {
    path: "/auth/login",
    component: _00a4265e,
    name: "auth-login"
  }, {
    path: "/dashboard/account",
    component: _c6064b74,
    name: "dashboard-account"
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
    path: "/webinars/create",
    component: _1a87f1ce,
    name: "webinars-create"
  }, {
    path: "/webinars/new",
    component: _58978df9,
    name: "webinars-new"
  }, {
    path: "/courses/view/:slug?",
    component: _51b2cc1a,
    name: "courses-view-slug"
  }, {
    path: "/people/students/:slug?",
    component: _68d1c1e7,
    name: "people-students-slug"
  }, {
    path: "/webinars/preview/:slug?",
    component: _2302c5d9,
    name: "webinars-preview-slug"
  }, {
    path: "/webinars/view/:slug?",
    component: _56e458ba,
    name: "webinars-view-slug"
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
