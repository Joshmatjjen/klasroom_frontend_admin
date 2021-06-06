import Cookie from 'js-cookie'
import { cookieFromRequest, getAccessTokenHeader, getAuthHeader } from '~/utils'

// state
export const state = () => ({
  students: null,
})

// getters
export const getters = {
  students: (state) => state.students,
}

// mutations
export const mutations = {
  FETCH_STUDENTS_SUCCESS(state, students) {
    state.students = students
  },

  FETCH_STUDENTS_FAILURE(state) {
    state.students = null
  },
}

// actions
export const actions = {
  async getStudents(vuexContext, userData) {
    try {
      const data = await this.$axios.$get('/users/students')

      if (data) {
        console.log('Student Data', data)
        vuexContext.commit('FETCH_STUDENTS_SUCCESS', data)

        localStorage.setItem('students', JSON.stringify(data))

        Cookie.set('students', JSON.stringify(data))

        return data
      }
      return false
    } catch (e) {
      // console.log('fetch user failed: ', e)
      return false
    }
  },

  // initStudentsData(vuexContext, req) {
  //   let token
  //   let expirationDate
  //   let user
  //   let profileImage
  //   let settings
  //   if (req) {
  //     if (!req.headers.cookie) {
  //       return
  //     }

  //     token = cookieFromRequest(req, 'jwt')
  //     if (!token) {
  //       return
  //     }
  //     expirationDate = cookieFromRequest(req, 'expirationDate')
  //     user = cookieFromRequest(req, 'user')
  //     expirationDate = cookieFromRequest(req, 'tokenExpiration')
  //     profileImage = cookieFromRequest(req, 'profileImage')
  //     settings = cookieFromRequest(req, 'settings')
  //   } else {
  //     token = localStorage.getItem('token')
  //     user = localStorage.getItem('user')
  //     expirationDate = localStorage.getItem('tokenExpiration')
  //     profileImage = localStorage.getItem('profileImage')
  //     settings = localStorage.getItem('settings')
  //   }
  //   if (new Date().getTime() > +expirationDate || !token) {
  //     console.log('No token or invalid token')
  //     vuexContext.dispatch('auth/logout')
  //     return
  //   }

  //   vuexContext.commit('SET_TOKEN', token)
  //   vuexContext.commit('FETCH_USER_SUCCESS', JSON.parse(user))
  //   vuexContext.commit('SET_EXPIRATION_DATE', expirationDate)
  //   vuexContext.commit('SET_PROFILE_IMAGE', profileImage)
  //   vuexContext.commit('SET_PROFILE_SETTINGS', JSON.parse(settings))
  // },
}
