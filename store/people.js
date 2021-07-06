import Cookie from 'js-cookie'
import { cookieFromRequest, getAccessTokenHeader, getAuthHeader } from '~/utils'
import Swal from 'sweetalert2'

// state
export const state = () => ({
  students: null,
  studentsSummary: null,
  tutors: null,
  tutorsSummary: null,
  admins: null,
  adminsSummary: null,
  singleUser: {
    user: null,
    activityLog: null,
  },
  singleStudent: {
    currentCourses: null,
    completedCourses: null,
    upcomingWebinars: null,
    prevWebinars: null,
  },
  singleTutor: {
    courses: null,
    webinars: null,
    sales: {
      all: null,
      courses: null,
      webinars: null,
    },
    withdrawals: null,
  },
})

// getters
export const getters = {
  students: (state) => state.students,
  studentsSummary: (state) => state.studentsSummary,
}

// mutations
export const mutations = {
  // ALL users
  FETCH_USER_SUCCESS(state, user) {
    state.singleUser.user = user
  },

  FETCH_ACTIVE_LOG_SUCCESS(state, log) {
    state.singleUser.activityLog = log
  },

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

  // Single Student
  FETCH_STUDENT_CURRENT_COURSES_SUCCESS(state, data) {
    state.singleStudent.currentCourses = data
  },

  FETCH_STUDENT_COMPLETED_COURSES_SUCCESS(state, data) {
    state.singleStudent.completedCourses = data
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

  // Single Tutor
  FETCH_TUTOR_COURSES_SUCCESS(state, data) {
    state.singleTutor.courses = data
  },

  FETCH_TUTOR_WEBINARS_SUCCESS(state, data) {
    state.singleTutor.webinars = data
  },

  FETCH_TUTOR_ALL_SALES_SUCCESS(state, data) {
    state.singleTutor.sales.all = data
  },

  FETCH_TUTOR_COURSES_SALES_SUCCESS(state, data) {
    state.singleTutor.sales.courses = data
  },

  FETCH_TUTOR_WEBINARS_SALES_SUCCESS(state, data) {
    state.singleTutor.sales.webinars = data
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
  // Student ANCHOR
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

  async getUser(vuexContext, params) {
    const { id, type } = params
    try {
      const { data } = await this.$axios.$get(
        type === 'tutors'
          ? `/users/${type.substring(0, type.length - 1)}/${id}`
          : `/users/${id}`
      )

      if (data) {
        console.log('User Data', data)
        vuexContext.commit('FETCH_USER_SUCCESS', data)

        // localStorage.setItem('students', JSON.stringify(data))

        // Cookie.set('students', JSON.stringify(data))

        return data
      }
      return false
    } catch (e) {
      // console.log('fetch user failed: ', e)
      return false
    }
  },

  async getStudentCurrentCourses(vuexContext, id) {
    try {
      const data = await this.$axios.$get(
        '/courses/students/' + id + '?status=current'
      )

      if (data) {
        console.log('Student Data', data)
        vuexContext.commit('FETCH_STUDENT_CURRENT_COURSES_SUCCESS', data)

        // localStorage.setItem('students', JSON.stringify(data))

        // Cookie.set('students', JSON.stringify(data))

        return data
      }
      return false
    } catch (e) {
      // console.log('fetch user failed: ', e)
      return false
    }
  },

  async getStudentCompletedCourses(vuexContext, id) {
    try {
      const data = await this.$axios.$get(
        '/courses/students/' + id + '?status=completed'
      )

      if (data) {
        console.log('Completed Course Data', data)
        vuexContext.commit('FETCH_STUDENT_COMPLETED_COURSES_SUCCESS', data)

        // localStorage.setItem('students', JSON.stringify(data))

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

  // TUTORS  ANCHOR
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

  async getTutorCourses(vuexContext, userId) {
    try {
      const data = await this.$axios.$get(`/courses/tutors/${userId}`)

      if (data) {
        console.log('Tutor Courses', data)
        vuexContext.commit('FETCH_TUTOR_COURSES_SALES_SUCCESS', data)

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

  async getTutorWebinars(vuexContext, userId) {
    try {
      const data = await this.$axios.$get(`/webinars/tutors/${userId}`)

      if (data) {
        console.log('Tutor Webinars', data)
        vuexContext.commit('FETCH_TUTOR_WEBINARS_SALES_SUCCESS', data)

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

  async getTutorAllSales(vuexContext, datas) {
    const { id, pagination } = datas
    try {
      const data = await this.$axios.$get(`/sales/${id}?page=${pagination}`)

      if (data) {
        console.log('Sales All', data)
        vuexContext.commit('FETCH_TUTOR_ALL_SALES_SUCCESS', data)

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

  async getTutorCourseSales(vuexContext, datas) {
    const { id, pagination } = datas
    try {
      const data = await this.$axios.$get(
        `/sales/courses/${id}?page=${pagination}`
      )

      if (data) {
        console.log('Sales Courses', data)
        vuexContext.commit('FETCH_TUTOR_COURSES_SALES_SUCCESS', data)

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

  async getTutorWebinarsSales(vuexContext, datas) {
    const { id, pagination } = datas
    try {
      const data = await this.$axios.$get(
        `/sales/webinars/${id}?page=${pagination}`
      )

      if (data) {
        console.log('Sales Webinars', data)
        vuexContext.commit('FETCH_TUTOR_WEBINARS_SALES_SUCCESS', data)

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

  async approveTutor(vuexContext, userId) {
    try {
      const { data, message } = await this.$axios.$get(
        `/users/approve/tutor/${userId}`
      )

      if (data && message) {
        console.log('Tutor Approval message', message)
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
        vuexContext.commit('FETCH_USER_SUCCESS', data)

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

  // ADMINS  ANCHOR
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

  // Export CSV / XSL
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
            console.log('How fr---', response)
            const blob = new Blob([response.data], {
              type: 'application/xlsx',
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

  async accountActions(vuexContext, props) {
    // /users/students/suspend/{userId}
    console.log('Type >>', props)
    const { actionType, type, userId, comment } = props
    try {
      const { data, message } = await this.$axios.$post(
        `/users/${type}/${actionType}/${userId}`,
        actionType === 'suspend' && {
          reasonForDeactivation: comment,
        }
      )

      if (data && message) {
        console.log('Student Data', data)
        Swal.fire({
          position: 'top-end',
          width: '350px',
          text: message ? message : `Successfully ${actionType} account`,
          backdrop: false,
          allowOutsideClick: false,
          showConfirmButton: false,
          showCloseButton: true,
          timer: 10000,
        })

        return data
      }
      return false
    } catch (e) {
      // console.log('fetch user failed: ', e)
      return false
    }
  },

  async getCourses(vuexContext, id) {
    try {
      const data = await this.$axios.$get('/courses/categories')

      if (data) {
        console.log('All Courses Data', data)
        vuexContext.commit('FETCH_STUDENT_COMPLETED_COURSES_SUCCESS', data)

        // localStorage.setItem('students', JSON.stringify(data))

        // Cookie.set('students', JSON.stringify(data))

        return data
      }
      return false
    } catch (e) {
      // console.log('fetch user failed: ', e)
      return false
    }
  },

  async getActivityLog(vuexContext, data) {
    const { id, pagination } = data
    try {
      const data = await this.$axios.$get(
        `/audit/logs/${id}?page=${pagination}`
      )

      if (data) {
        console.log('All Auditing Data', data)
        vuexContext.commit('FETCH_ACTIVE_LOG_SUCCESS', data)

        // localStorage.setItem('students', JSON.stringify(data))

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
