import Cookie from 'js-cookie'
import { cookieFromRequest, getAccessTokenHeader, getAuthHeader } from '~/utils'

// state
export const state = () => ({
  webinars: null,
  previousWebinars: null,
  draftWebinars: null,
})

// getters
export const getters = {
  webinars: (state) => state.webinars,
  previousWebinars: (state) => state.previousWebinars,
  draftWebinars: (state) => state.draftWebinars,
}

// mutations
export const mutations = {
  FETCH_WEBINAR_SUCCESS(state, webinars) {
    state.webinars = webinars
  },
  FETCH_PREVIOUS_WEBINAR_SUCCESS(state, previousWebinars) {
    state.previousWebinars = previousWebinars
  },
  FETCH_DRAFT_WEBINAR_SUCCESS(state, draftWebinars) {
    state.draftWebinars = draftWebinars
  },
}

// actions
export const actions = {
  // async joinMeeting(vuexContext, webinarData) {
  //   try {
  //     console.log("creating webinar...")
  //     console.log(vuexContext.rootState.auth.user)
  //     const user = vuexContext.rootState.auth.user
  //     const { data: newData, message } = await this.$axios.$post('/webinars', webinarData, {
  //       headers: getAccessTokenHeader(user.accessToken)
  //     })
  //     console.log("newData: ", newData)
  //     return {newData, message}

  //   } catch (e) {
  //     console.log(e)
  //     return false
  //   }
  // },

  async createWebinar(vuexContext, webinarData) {
    try {
      console.log('creating webinar...')
      console.log(vuexContext.rootState.auth.user)
      const user = vuexContext.rootState.auth.user
      const { data, message } = await this.$axios.$post(
        `https://streaming.staging.klasroom.com/v1/webinars?publish_now=${webinarData.publishNow}`,
        webinarData,
        {
          headers: getAccessTokenHeader(user.accessToken),
        }
      )
      return { data, message }
    } catch (e) {
      console.log(e)
      return false
    }
  },

  async getUpcomingWebinars(vuexContext, page) {
    try {
      const data = await this.$axios.$get(
        page
          ? `https://streaming.staging.klasroom.com/v1/webinars?upcoming=${true}&publish_now=${true}&admin=${true}&page=${page}`
          : `https://streaming.staging.klasroom.com/v1/webinars?upcoming=${true}&publish_now=${true}&admin=${true}`
      )

      if (data) {
        console.log('getUpcomingWebinars success: ', data)
        vuexContext.commit('FETCH_WEBINAR_SUCCESS', data)

        localStorage.setItem('upcomingWebinars', JSON.stringify(data))

        // Cookie.set('students', JSON.stringify(data))

        return data
      }
      return false
    } catch (e) {
      console.log('fetch user failed: ', e)
      return false
    }
  },

  async getPreviousWebinars(vuexContext, page) {
    try {
      const data = await this.$axios.$get(
        page
          ? `https://streaming.staging.klasroom.com/v1/webinars?upcoming=${false}&publish_now=${true}&admin=${true}&page=${page}`
          : `https://streaming.staging.klasroom.com/v1/webinars?upcoming=${false}&publish_now=${true}&admin=${true}`
      )

      if (data) {
        console.log('getPreviousWebinars success: ', data)
        vuexContext.commit('FETCH_PREVIOUS_WEBINAR_SUCCESS', data)

        localStorage.setItem('previousWebinars', JSON.stringify(data))

        // Cookie.set('students', JSON.stringify(data))

        return data
      }
      return false
    } catch (e) {
      console.log('fetch user failed: ', e)
      return false
    }
  },

  async getDraftWebinars(vuexContext, page) {
    try {
      const data = await this.$axios.$get(
        page
          ? `https://streaming.staging.klasroom.com/v1/webinars?publish_now=${false}&admin=${true}&page=${page}`
          : `https://streaming.staging.klasroom.com/v1/webinars?publish_now=${false}&admin=${true}`
      )

      if (data) {
        console.log('getDraftWebinars success: ', data)
        vuexContext.commit('FETCH_DRAFT_WEBINAR_SUCCESS', data)

        localStorage.setItem('draftWebinars', JSON.stringify(data))

        // Cookie.set('students', JSON.stringify(data))

        return data
      }
      return false
    } catch (e) {
      console.log('getDraftWebinars failed: ', e)
      return false
    }
  },
}
