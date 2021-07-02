import Cookie from 'js-cookie'
import { cookieFromRequest, getAccessTokenHeader, getAuthHeader } from '~/utils'
import Swal from 'sweetalert2'

// state
export const state = () => ({
  courseCategory: [],
  courseCateg: [],
  courses: null,
  courseSummary: null,
  coursesData: {
    liveCourses: null,
    unPublishedCourses: null,
    archived: null,
  },
})

// getters
export const getters = {
  students: (state) => state.students,
  studentsSummary: (state) => state.studentsSummary,
}

// mutations
export const mutations = {
  //COURSE CATEGORY
  SET_COURSE_CATEGORY(state, courseCategory) {
    state.courseCategory = courseCategory
  },
  SET_A_COURSE_CATEGORY(state, courseCateg) {
    state.courseCateg = courseCateg.data
  },
  SET_DELETE_COURSE_CATEGORY(state, id) {
    const catgeory = state.courseCategory.filter((x) => x.categoryId !== id)
    state.courseCategory = catgeory
  },
  SET_UPDATED_COURSE_CATEGORY(state, index) {
    state.courseCategory.forEach((x) => {
      if (x.categoryId === index.categoryId) {
        x = index
      }
    })
  },
  FETCH_COURSES_SUMMARY_SUCCESS(state, courses) {
    state.courseSummary = courses
  },

  //live courses
  FETCH_LIVE_COURSES (state, data) {
    state.coursesData.liveCourses = data.data
  },
  //unpublished courses
  FETCH_UNPUBLISHED_COURSES (state, data) {
    state.coursesData.unPublishedCourses = data.data
  },
  //archived courses
  FETCH_ARCHIVED_COURSES (state, data) {
    state.coursesData.archived = data.data
  },
}

// actions
export const actions = {
  // get course category
  async getCourseCategory(vuexContext) {
    try {
      const data = await this.$axios.$get('https://streaming.staging.klasroom.com/v1/courses/categories')
      if (data) {
        console.log('course category Data', data)
        vuexContext.commit('SET_COURSE_CATEGORY', data)
        localStorage.setItem('courseCategory', JSON.stringify(data))
        return data
      }
      return false
    } catch (e) {
      return false
    }
  },

  // get single course category
  async getAcourseCategory(vuexContext, id) {
    try {
      const {data} = await this.$axios.$get(`https://streaming.staging.klasroom.com/v1/courses/categories/${id}`)
      if (data) {
        console.log('course category Data', data)
        vuexContext.commit('SET_A_COURSE_CATEGORY', data)
        localStorage.setItem('courseCategory', JSON.stringify(data))
        return data
      }
      return false
    } catch (e) {
      return false
    }
  },

  //add course category
  async addCourseCategory(vuexContext, formData) {
    try {
      const {data, message}  = await this.$axios.$post('https://streaming.staging.klasroom.com/v1/courses/categories', formData)
      if(data && message) {
        Swal.fire({
          position: 'top-end',
          width: '350px',
          text: message
            ? message
            : 'Course category created succesfully.',
          backdrop: false,
          allowOutsideClick: false,
          showConfirmButton: false,
          showCloseButton: true,
          timer: 10000,
        })
        // vuexContext.commit('SET_COURSE_CATEGORY', data)
        // localStorage.setItem('courseCategory', JSON.stringify(data))
        return data
      }
      return false
    } catch (e) {
      console.log('Data failed: ', e)
    }
  },
   // update course category
   async updateCourseCategory(vuexContext,{name, id}) {
    try {
      const {data, message } = await this.$axios.$put(`https://streaming.staging.klasroom.com/v1/courses/categories/${id}`, {
        name
      })
      if (data && message) {
        Swal.fire({
          position: 'top-end',
          width: '350px',
          text: message
            ? message
            : 'Course category updated succesfully.',
          backdrop: false,
          allowOutsideClick: false,
          showConfirmButton: false,
          showCloseButton: true,
          timer: 10000,
        })
        vuexContext.commit('SET_A_COURSE_CATEGORY', data)
        return data
      }
    } catch (e) {
      console.log('Data failed: ', e)
    }
  },
  // delete course category
  async deleteCourseCategory(vuexContext, {id, name}) {
    try {
      const data  = await this.$axios.$delete(`https://streaming.staging.klasroom.com/v1/courses/categories/${id}`, {
        name
      })
      vuexContext.commit('SET_DELETE_COURSE_CATEGORY', data)
    } catch (e) {
      console.log('Data failed: ', e)
    }
  },

  //get live courses
  async getLiveCourses(vuexContext) {
    try {
      const data = await this.$axios.$get('/courses?status=live')

      if (data) {
        console.log('courses live', data)
        vuexContext.commit('FETCH_LIVE_COURSES', data)
        return data
      }
      return false
    } catch (e) {
      return false
    }
  },
  //get unpublished courses
  async getUnPublishedCourses(vuexContext) {
    try {
      const data = await this.$axios.$get('/courses?status=unpublished')

      if (data) {
        console.log('courses unpublished', data)
        vuexContext.commit('FETCH_UNPUBLISHED_COURSES', data)
        return data
      }
      return false
    } catch (e) {
      return false
    }
  },

    //get archived courses
    async getArchivedCourses(vuexContext) {
      try {
        const data = await this.$axios.$get('/courses?status=archived')
  
        if (data) {
          console.log('archived courses', data)
          vuexContext.commit('FETCH_ARCHIVED_COURSES', data)
          return data
        }
        return false
      } catch (e) {
        return false
      }
    },

  async getCoursesSummary(vuexContext) {
    try {
      const { data } = await this.$axios.$get('courses/summary')

      if (data) {
        console.log('course Summary', data)
        vuexContext.commit('FETCH_COURSES_SUMMARY_SUCCESS', data)
        localStorage.setItem('courseSummary', JSON.stringify(data))
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
