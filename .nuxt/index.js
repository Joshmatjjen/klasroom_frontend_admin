import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '..\\layouts\\error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_55fb358f from 'nuxt_plugin_plugin_55fb358f' // Source: .\\components\\plugin.js (mode: 'all')
import nuxt_plugin_clipboard_41b4c292 from 'nuxt_plugin_clipboard_41b4c292' // Source: .\\clipboard.js (mode: 'client')
import nuxt_plugin_nuxtsocketio_7577b770 from 'nuxt_plugin_nuxtsocketio_7577b770' // Source: .\\nuxt-socket-io.js (mode: 'all')
import nuxt_plugin_srcplugin08e929f8_66f455fc from 'nuxt_plugin_srcplugin08e929f8_66f455fc' // Source: .\\src.plugin.08e929f8.js (mode: 'client')
import nuxt_plugin_pluginclient_5a9936c5 from 'nuxt_plugin_pluginclient_5a9936c5' // Source: .\\content\\plugin.client.js (mode: 'client')
import nuxt_plugin_pluginserver_7f5aaf66 from 'nuxt_plugin_pluginserver_7f5aaf66' // Source: .\\content\\plugin.server.js (mode: 'server')
import nuxt_plugin_workbox_547b0e64 from 'nuxt_plugin_workbox_547b0e64' // Source: .\\workbox.js (mode: 'client')
import nuxt_plugin_metaplugin_38728164 from 'nuxt_plugin_metaplugin_38728164' // Source: .\\pwa\\meta.plugin.js (mode: 'all')
import nuxt_plugin_iconplugin_2f23367c from 'nuxt_plugin_iconplugin_2f23367c' // Source: .\\pwa\\icon.plugin.js (mode: 'all')
import nuxt_plugin_axios_a0b96f9c from 'nuxt_plugin_axios_a0b96f9c' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_libplugin1098d5c3_22c7cf57 from 'nuxt_plugin_libplugin1098d5c3_22c7cf57' // Source: .\\lib.plugin.1098d5c3.js (mode: 'all')
import nuxt_plugin_vform_f95cee7a from 'nuxt_plugin_vform_f95cee7a' // Source: ..\\plugins\\vform (mode: 'all')
import nuxt_plugin_axios_fb9c9a02 from 'nuxt_plugin_axios_fb9c9a02' // Source: ..\\plugins\\axios (mode: 'all')
import nuxt_plugin_vue2filters_021c5ff1 from 'nuxt_plugin_vue2filters_021c5ff1' // Source: ..\\plugins\\vue2-filters (mode: 'all')
import nuxt_plugin_webrtcadaptor_51a88cdc from 'nuxt_plugin_webrtcadaptor_51a88cdc' // Source: ..\\plugins\\webrtc-adaptor (mode: 'all')
import nuxt_plugin_vueadvancedcropper_188974c0 from 'nuxt_plugin_vueadvancedcropper_188974c0' // Source: ..\\plugins\\vue-advanced-cropper (mode: 'all')
import nuxt_plugin_validate_c1ca0c26 from 'nuxt_plugin_validate_c1ca0c26' // Source: ..\\plugins\\validate (mode: 'client')
import nuxt_plugin_datepicker_d123f65a from 'nuxt_plugin_datepicker_d123f65a' // Source: ..\\plugins\\datepicker (mode: 'client')
import nuxt_plugin_vueselect_93678b8c from 'nuxt_plugin_vueselect_93678b8c' // Source: ..\\plugins\\vue-select (mode: 'client')
import nuxt_plugin_paystack_46971bb7 from 'nuxt_plugin_paystack_46971bb7' // Source: ..\\plugins\\paystack (mode: 'client')
import nuxt_plugin_vuegoodtable_6479f65b from 'nuxt_plugin_vuegoodtable_6479f65b' // Source: ..\\plugins\\vue-good-table (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    return this.$root.$options.$nuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule
const baseStoreOptions = { preserveState: process.client }

function registerModule (path, rawModule, options = {}) {
  return originalRegisterModule.call(this, path, rawModule, { ...baseStoreOptions, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"KlasroomAdminApp","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"## Build Setup"},{"http-equiv":"Content-Security-Policy","content":"img-src 'self' data: *; default-src 'self' data: 'unsafe-inline' 'unsafe-eval' https:\u002F\u002F*; connect-src 'self' http:\u002F\u002F* https:\u002F\u002F* ws:\u002F\u002F* wss:\u002F\u002F*"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"}],"script":[{"src":"https:\u002F\u002Fwebrtc.github.io\u002Fadapter\u002Fadapter-latest.js"}],"style":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_55fb358f === 'function') {
    await nuxt_plugin_plugin_55fb358f(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_clipboard_41b4c292 === 'function') {
    await nuxt_plugin_clipboard_41b4c292(app.context, inject)
  }

  if (typeof nuxt_plugin_nuxtsocketio_7577b770 === 'function') {
    await nuxt_plugin_nuxtsocketio_7577b770(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_srcplugin08e929f8_66f455fc === 'function') {
    await nuxt_plugin_srcplugin08e929f8_66f455fc(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_pluginclient_5a9936c5 === 'function') {
    await nuxt_plugin_pluginclient_5a9936c5(app.context, inject)
  }

  if (process.server && typeof nuxt_plugin_pluginserver_7f5aaf66 === 'function') {
    await nuxt_plugin_pluginserver_7f5aaf66(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_547b0e64 === 'function') {
    await nuxt_plugin_workbox_547b0e64(app.context, inject)
  }

  if (typeof nuxt_plugin_metaplugin_38728164 === 'function') {
    await nuxt_plugin_metaplugin_38728164(app.context, inject)
  }

  if (typeof nuxt_plugin_iconplugin_2f23367c === 'function') {
    await nuxt_plugin_iconplugin_2f23367c(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_a0b96f9c === 'function') {
    await nuxt_plugin_axios_a0b96f9c(app.context, inject)
  }

  if (typeof nuxt_plugin_libplugin1098d5c3_22c7cf57 === 'function') {
    await nuxt_plugin_libplugin1098d5c3_22c7cf57(app.context, inject)
  }

  if (typeof nuxt_plugin_vform_f95cee7a === 'function') {
    await nuxt_plugin_vform_f95cee7a(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_fb9c9a02 === 'function') {
    await nuxt_plugin_axios_fb9c9a02(app.context, inject)
  }

  if (typeof nuxt_plugin_vue2filters_021c5ff1 === 'function') {
    await nuxt_plugin_vue2filters_021c5ff1(app.context, inject)
  }

  if (typeof nuxt_plugin_webrtcadaptor_51a88cdc === 'function') {
    await nuxt_plugin_webrtcadaptor_51a88cdc(app.context, inject)
  }

  if (typeof nuxt_plugin_vueadvancedcropper_188974c0 === 'function') {
    await nuxt_plugin_vueadvancedcropper_188974c0(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_validate_c1ca0c26 === 'function') {
    await nuxt_plugin_validate_c1ca0c26(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_datepicker_d123f65a === 'function') {
    await nuxt_plugin_datepicker_d123f65a(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueselect_93678b8c === 'function') {
    await nuxt_plugin_vueselect_93678b8c(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_paystack_46971bb7 === 'function') {
    await nuxt_plugin_paystack_46971bb7(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuegoodtable_6479f65b === 'function') {
    await nuxt_plugin_vuegoodtable_6479f65b(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, (err) => {
        // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
        if (!err._isRouter) return reject(err)
        if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
