import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ccdb13b2 = () => interopDefault(import('..\\pages\\account\\index.vue' /* webpackChunkName: "pages/account/index" */))
const _42befd70 = () => interopDefault(import('..\\pages\\chat\\index.vue' /* webpackChunkName: "pages/chat/index" */))
const _b30ff088 = () => interopDefault(import('..\\pages\\courses\\index.vue' /* webpackChunkName: "pages/courses/index" */))
const _4f8ce4e0 = () => interopDefault(import('..\\pages\\dashboard\\index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _c0be013a = () => interopDefault(import('..\\pages\\faqs\\index.vue' /* webpackChunkName: "pages/faqs/index" */))
const _7088979e = () => interopDefault(import('..\\pages\\people\\index.vue' /* webpackChunkName: "pages/people/index" */))
const _295c309d = () => interopDefault(import('..\\pages\\settings\\index.vue' /* webpackChunkName: "pages/settings/index" */))
const _e9129e92 = () => interopDefault(import('..\\pages\\webinars\\index.vue' /* webpackChunkName: "pages/webinars/index" */))
const _778b6fe2 = () => interopDefault(import('..\\pages\\auth\\login.vue' /* webpackChunkName: "pages/auth/login" */))
const _7b2f498a = () => interopDefault(import('..\\pages\\dashboard\\account.vue' /* webpackChunkName: "pages/dashboard/account" */))
const _da78e20e = () => interopDefault(import('..\\pages\\dashboard\\my-courses.vue' /* webpackChunkName: "pages/dashboard/my-courses" */))
const _5dbceed8 = () => interopDefault(import('..\\pages\\dashboard\\my-webinars.vue' /* webpackChunkName: "pages/dashboard/my-webinars" */))
const _42101480 = () => interopDefault(import('..\\pages\\dashboard\\saved-courses.vue' /* webpackChunkName: "pages/dashboard/saved-courses" */))
const _2533c7c8 = () => interopDefault(import('..\\pages\\dashboard\\suggested-courses.vue' /* webpackChunkName: "pages/dashboard/suggested-courses" */))
const _576c0615 = () => interopDefault(import('..\\pages\\dashboard\\suggested-webinars.vue' /* webpackChunkName: "pages/dashboard/suggested-webinars" */))
const _550eb8e8 = () => interopDefault(import('..\\pages\\dashboard\\upcoming-webinars.vue' /* webpackChunkName: "pages/dashboard/upcoming-webinars" */))
const _76e821bb = () => interopDefault(import('..\\pages\\webinars\\create\\index.vue' /* webpackChunkName: "pages/webinars/create/index" */))
const _5f0f19c6 = () => interopDefault(import('..\\pages\\webinars\\new\\index.vue' /* webpackChunkName: "pages/webinars/new/index" */))
const _46392200 = () => interopDefault(import('..\\pages\\people\\components\\accountSummary.vue' /* webpackChunkName: "pages/people/components/accountSummary" */))
const _32c517fe = () => interopDefault(import('..\\pages\\people\\components\\activityLog.vue' /* webpackChunkName: "pages/people/components/activityLog" */))
const _00f69118 = () => interopDefault(import('..\\pages\\people\\components\\completedCourses.vue' /* webpackChunkName: "pages/people/components/completedCourses" */))
const _7c6c9746 = () => interopDefault(import('..\\pages\\people\\components\\currentCourses.vue' /* webpackChunkName: "pages/people/components/currentCourses" */))
const _7bf11b67 = () => interopDefault(import('..\\pages\\people\\components\\previousWebinars.vue' /* webpackChunkName: "pages/people/components/previousWebinars" */))
const _38116c95 = () => interopDefault(import('..\\pages\\people\\components\\sales.vue' /* webpackChunkName: "pages/people/components/sales" */))
const _8e2a4be8 = () => interopDefault(import('..\\pages\\people\\components\\upcomingWebinars.vue' /* webpackChunkName: "pages/people/components/upcomingWebinars" */))
const _618ee7b2 = () => interopDefault(import('..\\pages\\people\\components\\withdrawals.vue' /* webpackChunkName: "pages/people/components/withdrawals" */))
const _6af5a1af = () => interopDefault(import('..\\pages\\courses\\view\\_slug.vue' /* webpackChunkName: "pages/courses/view/_slug" */))
const _64fde236 = () => interopDefault(import('..\\pages\\people\\admins\\_slug.vue' /* webpackChunkName: "pages/people/admins/_slug" */))
const _416af611 = () => interopDefault(import('..\\pages\\people\\students\\_slug.vue' /* webpackChunkName: "pages/people/students/_slug" */))
const _3f0b004c = () => interopDefault(import('..\\pages\\people\\tutors\\_slug.vue' /* webpackChunkName: "pages/people/tutors/_slug" */))
const _4a5d0d2d = () => interopDefault(import('..\\pages\\webinars\\preview\\_slug.vue' /* webpackChunkName: "pages/webinars/preview/_slug" */))
const _0e12626a = () => interopDefault(import('..\\pages\\webinars\\view\\_slug.vue' /* webpackChunkName: "pages/webinars/view/_slug" */))
const _7c7677a0 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    path: "/account",
    component: _ccdb13b2,
    name: "account"
  }, {
    path: "/chat",
    component: _42befd70,
    name: "chat"
  }, {
    path: "/courses",
    component: _b30ff088,
    name: "courses"
  }, {
    path: "/dashboard",
    component: _4f8ce4e0,
    name: "dashboard"
  }, {
    path: "/faqs",
    component: _c0be013a,
    name: "faqs"
  }, {
    path: "/people",
    component: _7088979e,
    name: "people"
  }, {
    path: "/settings",
    component: _295c309d,
    name: "settings"
  }, {
    path: "/webinars",
    component: _e9129e92,
    name: "webinars"
  }, {
    path: "/auth/login",
    component: _778b6fe2,
    name: "auth-login"
  }, {
    path: "/dashboard/account",
    component: _7b2f498a,
    name: "dashboard-account"
  }, {
    path: "/dashboard/my-courses",
    component: _da78e20e,
    name: "dashboard-my-courses"
  }, {
    path: "/dashboard/my-webinars",
    component: _5dbceed8,
    name: "dashboard-my-webinars"
  }, {
    path: "/dashboard/saved-courses",
    component: _42101480,
    name: "dashboard-saved-courses"
  }, {
    path: "/dashboard/suggested-courses",
    component: _2533c7c8,
    name: "dashboard-suggested-courses"
  }, {
    path: "/dashboard/suggested-webinars",
    component: _576c0615,
    name: "dashboard-suggested-webinars"
  }, {
    path: "/dashboard/upcoming-webinars",
    component: _550eb8e8,
    name: "dashboard-upcoming-webinars"
  }, {
    path: "/webinars/create",
    component: _76e821bb,
    name: "webinars-create"
  }, {
    path: "/webinars/new",
    component: _5f0f19c6,
    name: "webinars-new"
  }, {
    path: "/people/components/accountSummary",
    component: _46392200,
    name: "people-components-accountSummary"
  }, {
    path: "/people/components/activityLog",
    component: _32c517fe,
    name: "people-components-activityLog"
  }, {
    path: "/people/components/completedCourses",
    component: _00f69118,
    name: "people-components-completedCourses"
  }, {
    path: "/people/components/currentCourses",
    component: _7c6c9746,
    name: "people-components-currentCourses"
  }, {
    path: "/people/components/previousWebinars",
    component: _7bf11b67,
    name: "people-components-previousWebinars"
  }, {
    path: "/people/components/sales",
    component: _38116c95,
    name: "people-components-sales"
  }, {
    path: "/people/components/upcomingWebinars",
    component: _8e2a4be8,
    name: "people-components-upcomingWebinars"
  }, {
    path: "/people/components/withdrawals",
    component: _618ee7b2,
    name: "people-components-withdrawals"
  }, {
    path: "/courses/view/:slug?",
    component: _6af5a1af,
    name: "courses-view-slug"
  }, {
    path: "/people/admins/:slug?",
    component: _64fde236,
    name: "people-admins-slug"
  }, {
    path: "/people/students/:slug?",
    component: _416af611,
    name: "people-students-slug"
  }, {
    path: "/people/tutors/:slug?",
    component: _3f0b004c,
    name: "people-tutors-slug"
  }, {
    path: "/webinars/preview/:slug?",
    component: _4a5d0d2d,
    name: "webinars-preview-slug"
  }, {
    path: "/webinars/view/:slug?",
    component: _0e12626a,
    name: "webinars-view-slug"
  }, {
    path: "/",
    component: _7c7677a0,
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
