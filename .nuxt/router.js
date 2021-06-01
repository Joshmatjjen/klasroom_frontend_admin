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
const _4d6ba2a2 = () => interopDefault(import('../pages/people/students/components/accountSummary.vue' /* webpackChunkName: "pages/people/students/components/accountSummary" */))
const _7539e2a2 = () => interopDefault(import('../pages/people/students/components/activityLog.vue' /* webpackChunkName: "pages/people/students/components/activityLog" */))
const _7d3a4763 = () => interopDefault(import('../pages/people/students/components/completedCourses.vue' /* webpackChunkName: "pages/people/students/components/completedCourses" */))
const _78d356f5 = () => interopDefault(import('../pages/people/students/components/currentCourses.vue' /* webpackChunkName: "pages/people/students/components/currentCourses" */))
const _0cb2a954 = () => interopDefault(import('../pages/people/students/components/previousWebinars.vue' /* webpackChunkName: "pages/people/students/components/previousWebinars" */))
const _36a069fb = () => interopDefault(import('../pages/people/students/components/upcomingWebinars.vue' /* webpackChunkName: "pages/people/students/components/upcomingWebinars" */))
const _821ead58 = () => interopDefault(import('../pages/people/tutors/components/accountSummary.vue' /* webpackChunkName: "pages/people/tutors/components/accountSummary" */))
const _9833c3ac = () => interopDefault(import('../pages/people/tutors/components/activityLog.vue' /* webpackChunkName: "pages/people/tutors/components/activityLog" */))
const _d9a6a670 = () => interopDefault(import('../pages/people/tutors/components/completedCourses.vue' /* webpackChunkName: "pages/people/tutors/components/completedCourses" */))
const _5e79d19a = () => interopDefault(import('../pages/people/tutors/components/currentCourses.vue' /* webpackChunkName: "pages/people/tutors/components/currentCourses" */))
const _0f9910bb = () => interopDefault(import('../pages/people/tutors/components/previousWebinars.vue' /* webpackChunkName: "pages/people/tutors/components/previousWebinars" */))
const _4c92cf60 = () => interopDefault(import('../pages/people/tutors/components/upcomingWebinars.vue' /* webpackChunkName: "pages/people/tutors/components/upcomingWebinars" */))
const _51b2cc1a = () => interopDefault(import('../pages/courses/view/_slug.vue' /* webpackChunkName: "pages/courses/view/_slug" */))
const _68d1c1e7 = () => interopDefault(import('../pages/people/students/_slug.vue' /* webpackChunkName: "pages/people/students/_slug" */))
const _0adb7de8 = () => interopDefault(import('../pages/people/tutors/_slug.vue' /* webpackChunkName: "pages/people/tutors/_slug" */))
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
    path: "/people/students/components/accountSummary",
    component: _4d6ba2a2,
    name: "people-students-components-accountSummary"
  }, {
    path: "/people/students/components/activityLog",
    component: _7539e2a2,
    name: "people-students-components-activityLog"
  }, {
    path: "/people/students/components/completedCourses",
    component: _7d3a4763,
    name: "people-students-components-completedCourses"
  }, {
    path: "/people/students/components/currentCourses",
    component: _78d356f5,
    name: "people-students-components-currentCourses"
  }, {
    path: "/people/students/components/previousWebinars",
    component: _0cb2a954,
    name: "people-students-components-previousWebinars"
  }, {
    path: "/people/students/components/upcomingWebinars",
    component: _36a069fb,
    name: "people-students-components-upcomingWebinars"
  }, {
    path: "/people/tutors/components/accountSummary",
    component: _821ead58,
    name: "people-tutors-components-accountSummary"
  }, {
    path: "/people/tutors/components/activityLog",
    component: _9833c3ac,
    name: "people-tutors-components-activityLog"
  }, {
    path: "/people/tutors/components/completedCourses",
    component: _d9a6a670,
    name: "people-tutors-components-completedCourses"
  }, {
    path: "/people/tutors/components/currentCourses",
    component: _5e79d19a,
    name: "people-tutors-components-currentCourses"
  }, {
    path: "/people/tutors/components/previousWebinars",
    component: _0f9910bb,
    name: "people-tutors-components-previousWebinars"
  }, {
    path: "/people/tutors/components/upcomingWebinars",
    component: _4c92cf60,
    name: "people-tutors-components-upcomingWebinars"
  }, {
    path: "/courses/view/:slug?",
    component: _51b2cc1a,
    name: "courses-view-slug"
  }, {
    path: "/people/students/:slug?",
    component: _68d1c1e7,
    name: "people-students-slug"
  }, {
    path: "/people/tutors/:slug?",
    component: _0adb7de8,
    name: "people-tutors-slug"
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
