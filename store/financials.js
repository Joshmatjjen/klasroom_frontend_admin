import Cookie from 'js-cookie'
import { cookieFromRequest, getAccessTokenHeader, getAuthHeader } from '~/utils'
import Swal from 'sweetalert2'

// state
export const state = () => ({
  financeSummary: null,
  sales: {
    all: null,
    courses: null,
    webinars: null,
  },
  payouts: null,
})

// getters
export const getters = {
  students: (state) => state.students,
  studentsSummary: (state) => state.studentsSummary,
}

// mutations
export const mutations = {
  FETCH_FINANCE_SUMMARY(state, data) {
    state.financeSummary = data
  },

  // SALES
  FETCH_FINANCE_ALL_SALES(state, data) {
    state.sales.all = data
  },

  FETCH_FINANCE_COURSES_SALES(state, data) {
    state.sales.courses = data
  },

  FETCH_FINANCE_WEBINARS_SALES(state, data) {
    state.sales.webinars = data
  },

  FETCH_FINANCE_PAYOUTS(state, data) {
    state.payouts = data
  },
}

// actions
export const actions = {
  // Student ANCHOR

  async getFinanceSummary(vuexContext) {
    try {
      const { data } = await this.$axios.$get('/finances/summary/admin')

      if (data) {
        console.log('Finance Summary', data)
        vuexContext.commit('FETCH_FINANCE_SUMMARY', data)

        localStorage.setItem('financeSummary', JSON.stringify(data))

        // Cookie.set('adminsSummary', JSON.stringify(data))

        return data
      }
      return false
    } catch (e) {
      // console.log('fetch user failed: ', e)
      return false
    }
  },

  async getFinanceAllSales(vuexContext, pagination) {
    try {
      const data = await this.$axios.$get(`/sales/all?page=${pagination}`)

      if (data) {
        console.log('Sales All', data)
        // vuexContext.commit('FETCH_FINANCE_ALL_SALES', data)

        // localStorage.setItem('tutorsSummary', JSON.stringify(data))

        // Cookie.set('tutorsSummary', JSON.stringify(data))

        return data
      }
      return false
    } catch (e) {
      // console.log('fetch user failed: ', e)
      return false
    }
  },

  async getFinanceCourseSales(vuexContext, pagination) {
    try {
      const data = await this.$axios.$get(
        `/sales/all?salesType=courses&page=${pagination}`
      )

      if (data) {
        console.log('Sales Courses', data)
        // vuexContext.commit('FETCH_FINANCE_COURSES_SALES', data)

        // localStorage.setItem('tutorsSummary', JSON.stringify(data))

        // Cookie.set('tutorsSummary', JSON.stringify(data))

        return data
      }
      return false
    } catch (e) {
      // console.log('fetch user failed: ', e)
      return false
    }
  },

  async getFinanceWebinarsSales(vuexContext, pagination) {
    try {
      const data = await this.$axios.$get(
        `/sales/all?salesType=webinars&page=${pagination}`
      )

      if (data) {
        console.log('Sales Webinars', data)
        // vuexContext.commit('FETCH_FINANCE_WEBINARS_SALES', data)

        // localStorage.setItem('tutorsSummary', JSON.stringify(data))

        // Cookie.set('tutorsSummary', JSON.stringify(data))

        return data
      }
      return false
    } catch (e) {
      // console.log('fetch user failed: ', e)
      return false
    }
  },

  async getFinancePayouts(vuexContext, pagination) {
    try {
      const data = await this.$axios.$get(
        `/finances/payouts?page=${pagination}`
      )

      if (data) {
        console.log('Get Payouts', data)
        // vuexContext.commit('FETCH_FINANCE_PAYOUTS', data)

        // localStorage.setItem('tutorsSummary', JSON.stringify(data))

        // Cookie.set('tutorsSummary', JSON.stringify(data))

        return data
      }
      return false
    } catch (e) {
      // console.log('fetch user failed: ', e)
      return false
    }
  },

  // Export CSV / XSL
  // async exportCsvData(vuexContext, type) {
  //   console.log('Type >>', type)
  //   try {
  //     const { data, message } = await this.$axios.$get(
  //       (type === 'Students' && '/users/students?export=true') ||
  //         (type === 'Tutors' && '/users/tutors?export=true') ||
  //         (type === 'Admins' && '/users/admins?export=true')
  //     )

  //     if (data && message) {
  //       console.log('Student Data', data)
  //       Swal.fire({
  //         position: 'top-end',
  //         width: '350px',
  //         text: message
  //           ? message
  //           : 'Successfully generated excel template url !!!',
  //         backdrop: false,
  //         allowOutsideClick: false,
  //         showConfirmButton: false,
  //         showCloseButton: true,
  //         timer: 10000,
  //       })

  //       this.$axios
  //         .$get(data.templateUrl, { responseType: 'blob' })
  //         .then((response) => {
  //           console.log('How fr---', response)
  //           const blob = new Blob([response.data], {
  //             type: 'application/xlsx',
  //           })
  //           const link = document.createElement('a')
  //           link.href = URL.createObjectURL(blob)
  //           link.download = label
  //           link.click()
  //           URL.revokeObjectURL(link.href)
  //         })
  //         .catch(console.error)

  //       return data
  //     }
  //     return false
  //   } catch (e) {
  //     // console.log('fetch user failed: ', e)
  //     return false
  //   }
  // },

  async filterPeople(vuexContext, item) {
    const { params, tableType } = item
    try {
      const data = await this.$axios.$get(
        `/users/${tableType.toLowerCase()}${params}`
      )

      if (data) {
        console.log('Filtered Student Data', data)
        vuexContext.commit(`FETCH_${tableType.toUpperCase()}_SUCCESS`, data)
        localStorage.setItem(tableType.toLowerCase(), JSON.stringify(data))
        // if (tableType === 'Students') {
        //   vuexContext.commit('FETCH_STUDENTS_SUCCESS', data)
        //   localStorage.setItem('students', JSON.stringify(data))
        // } else if (tableType === 'Tutors') {
        //   vuexContext.commit('FETCH_TUTORS_SUCCESS', data)
        //   localStorage.setItem('tutors', JSON.stringify(data))
        // } else if (tableType === 'Admins') {
        //   vuexContext.commit('FETCH_ADMINS_SUCCESS', data)
        //   localStorage.setItem('admins', JSON.stringify(data))
        // }

        // Cookie.set('students', JSON.stringify(data))

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
