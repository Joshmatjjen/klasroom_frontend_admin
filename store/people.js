import Cookie from 'js-cookie'
import { cookieFromRequest, getAccessTokenHeader, getAuthHeader } from '~/utils'
import Swal from 'sweetalert2'

// state
export const state = () => ({
  students: null,
  studentsSummary: null,
})

// getters
export const getters = {
  students: (state) => state.students,
  studentsSummary: (state) => state.studentsSummary,
}

// mutations
export const mutations = {
  //STUDENTS
  FETCH_STUDENTS_SUCCESS(state, students) {
    state.students = students
  },

  FETCH_STUDENTS_FAILURE(state) {
    state.students = null
  },

  FETCH_STUDENTS_SUMMARY_SUCCESS(state, students) {
    state.studentsSummary = students
  },

  FETCH_STUDENTS_SUMMARY_FAILURE(state) {
    state.studentsSummary = null
  },

  //TUTORS

  FETCH_TUTORS_SUCCESS(state, tutors) {
    state.tutors = tutors
  },

  FETCH_TUTORS_FAILURE(state) {
    state.tutors = null
  },

  FETCH_TUTORS_SUMMARY_SUCCESS(state, tutors) {
    state.tutorsSummary = tutors
  },

  FETCH_TUTORS_SUMMARY_FAILURE(state) {
    state.tutorsSummary = null
  },

  //ADMINS

  FETCH_ADMINS_SUCCESS(state, admins) {
    state.admins = admins
  },

  FETCH_ADMINS_FAILURE(state) {
    state.admins = null
  },

  FETCH_ADMINS_SUMMARY_SUCCESS(state, admins) {
    state.adminsSummary = admins
  },

  FETCH_ADMINS_SUMMARY_FAILURE(state) {
    state.adminsSummary = null
  },
}

// actions
export const actions = {
  async getStudents(vuexContext, page) {
    try {
      const data = await this.$axios.$get(
        page ? `/users/students?page=${page}` : '/users/students'
      )

      if (data) {
        console.log('Student Data', data)
        vuexContext.commit('FETCH_STUDENTS_SUCCESS', data)

        localStorage.setItem('students', JSON.stringify(data))

        // Cookie.set('students', JSON.stringify(data))

        return data
      }
      return false
    } catch (e) {
      // console.log('fetch user failed: ', e)
      return false
    }
  },

  async getStudents(vuexContext, page) {
    try {
      const data = await this.$axios.$get(
        page ? `/users/students?page=${page}` : '/users/students'
      )

      if (data) {
        console.log('Student Data', data)
        vuexContext.commit('FETCH_STUDENTS_SUCCESS', data)

        localStorage.setItem('students', JSON.stringify(data))

        // Cookie.set('students', JSON.stringify(data))

        return data
      }
      return false
    } catch (e) {
      // console.log('fetch user failed: ', e)
      return false
    }
  },

  async getStudentsSummary(vuexContext) {
    try {
      const { data } = await this.$axios.$get('/users/students/summary')

      if (data) {
        console.log('Student Summary', data)
        vuexContext.commit('FETCH_STUDENTS_SUMMARY_SUCCESS', data)

        localStorage.setItem('studentsSummary', JSON.stringify(data))

        // Cookie.set('studentsSummary', JSON.stringify(data))

        return data
      }
      return false
    } catch (e) {
      // console.log('fetch user failed: ', e)
      return false
    }
  },

  async exportCsvData(vuexContext, type) {
    console.log('Type >>', type)
    try {
      const { data, message } = await this.$axios.$get(
        (type === 'Students' && '/users/students?export=true') ||
          (type === 'Tutors' && '/users/tutors?export=true') ||
          (type === 'Admins' && '/users/admins?export=true')
      )

      if (data && message) {
        console.log('Student Data', data)
        Swal.fire({
          position: 'top-end',
          width: '350px',
          text: message
            ? message
            : 'Successfully generated excel template url !!!',
          backdrop: false,
          allowOutsideClick: false,
          showConfirmButton: false,
          showCloseButton: true,
          timer: 10000,
        })

        this.$axios
          .$get(data.templateUrl, { responseType: 'blob' })
          .then((response) => {
            const blob = new Blob([response.data], {
              type: 'application/pdf',
            })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = label
            link.click()
            URL.revokeObjectURL(link.href)
          })
          .catch(console.error)

        return data
      }
      return false
    } catch (e) {
      // console.log('fetch user failed: ', e)
      return false
    }
  },

  // TUTORS
  async getTutors(vuexContext, page) {
    try {
      const data = await this.$axios.$get(
        page ? `/users/tutors?page=${page}` : '/users/tutors'
      )

      if (data) {
        console.log('Tutors Data', data)
        vuexContext.commit('FETCH_TUTORS_SUCCESS', data)

        localStorage.setItem('tutors', JSON.stringify(data))

        // Cookie.set('tutors', JSON.stringify(data))

        return data
      }
      return false
    } catch (e) {
      // console.log('fetch user failed: ', e)
      return false
    }
  },

  async getTutorsSummary(vuexContext) {
    try {
      const { data } = await this.$axios.$get('/users/tutors/summary')

      if (data) {
        console.log('Student Summary', data)
        vuexContext.commit('FETCH_TUTORS_SUMMARY_SUCCESS', data)

        localStorage.setItem('tutorsSummary', JSON.stringify(data))

        // Cookie.set('tutorsSummary', JSON.stringify(data))

        return data
      }
      return false
    } catch (e) {
      // console.log('fetch user failed: ', e)
      return false
    }
  },

  // ADMINS
  async getAdmins(vuexContext, page) {
    try {
      const data = await this.$axios.$get(
        page ? `/users/admins?page=${page}` : '/users/admins'
      )

      if (data) {
        console.log('Student Data', data)
        vuexContext.commit('FETCH_ADMINS_SUCCESS', data)

        localStorage.setItem('admins', JSON.stringify(data))

        // Cookie.set('admins', JSON.stringify(data))

        return data
      }
      return false
    } catch (e) {
      // console.log('fetch user failed: ', e)
      return false
    }
  },

  async getAdminsSummary(vuexContext) {
    try {
      const { data } = await this.$axios.$get('/users/admins/summary')

      if (data) {
        console.log('Student Summary', data)
        vuexContext.commit('FETCH_ADMINS_SUMMARY_SUCCESS', data)

        localStorage.setItem('adminsSummary', JSON.stringify(data))

        // Cookie.set('adminsSummary', JSON.stringify(data))

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
