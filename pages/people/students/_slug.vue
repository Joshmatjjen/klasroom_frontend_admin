<template>
  <div>
    <div
      class="min-h-screen mb-24"
      v-if="
        singleUser.user &&
        singleUser.user.userId === parseInt($route.params.slug)
      "
    >
      <section class="flex flex-row justify-between items-center">
        <div class="flex flex-row mb-8">
          <div
            class="course-image mr-3"
            :style="{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }"
          >
            <img
              class="profile-img rounded-xl"
              :src="
                singleUser.user.image ? singleUser.user.image : '/no-pic.webp'
              "
              alt="My profile"
            />
          </div>
          <div class="flex flex-col justify-end">
            <div>
              <span class="text-gray-700 font-semibold text-left text-md">{{
                singleUser.user.name
              }}</span>
              <span
                class="text-white rounded-full font-normal text-center text-sm py-1 px-2"
                :class="
                  singleUser.user.status === 'active'
                    ? 'bg-green-600'
                    : singleUser.user.status === 'inactive' ||
                      singleUser.user.status === 'dormant'
                    ? 'bg-gray-500'
                    : 'bg-red-600'
                "
                >{{
                  singleUser.user.status.charAt(0).toUpperCase() +
                  singleUser.user.status.slice(1)
                }}</span
              >
            </div>
            <span class="text-gray-700 font-normal text-left text-xs">{{
              singleUser.user.email
            }}</span>
          </div>
        </div>
        <div
          class="btn btn-primary h-12 flex flex-row align-middle rlative"
          @click="toggleActionOpt"
        >
          <p class="text-center pr-3">Action</p>
          <img src="/actions/arrow-down-light.svg" alt="" />
          <div
            :class="{
              hidden: actionOpt ? false : true,
            }"
            class="pop-up p-2 justify-around items-center absolute border-gray-500 bg-white rounded-lg shadow-lg"
            :style="{ zIndex: 100 }"
            @click.capture.stop="
              accountAction(
                singleUser.user.name,
                singleUser.user.status && singleUser.user.status === 'suspended'
                  ? 'Reactivate'
                  : 'Suspend',
                'Students',
                singleUser.user.tutorId
                  ? singleUser.user.tutorId
                  : singleUser.user.userId,
                1
              )
            "
            v-if="singleUser.user.isActive"
          >
            <p
              class="text-center md:text-gray-700 text-sm font-normal hover:text-gray-900 md:bg-transparent block md:inline-block mb-5 md:mb-0"
            >
              Suspend account
            </p>
          </div>

          <div
            :class="{
              hidden: actionOpt ? false : true,
            }"
            class="pop-up p-2 justify-around items-center absolute border-gray-500 bg-white rounded-lg shadow-lg"
            :style="{ zIndex: 100 }"
            @click.capture.stop="
              accountAction(
                singleUser.user.name,
                singleUser.user.status && singleUser.user.status === 'suspended'
                  ? 'Reactivate'
                  : 'Suspend',
                'Students',
                singleUser.user.tutorId
                  ? singleUser.user.tutorId
                  : singleUser.user.userId,
                1
              )
            "
            v-if="!singleUser.user.isActive"
          >
            <p
              class="text-center md:text-gray-700 text-sm font-normal hover:text-gray-900 md:bg-transparent block md:inline-block mb-5 md:mb-0"
            >
              Unsuspend account
            </p>
          </div>
        </div>
      </section>
      <section-switcher
        v-model="tab"
        :tabs="[
          `${
            singleStudent.currentCourses
              ? singleStudent.currentCourses.data.length
              : 0
          } Current Courses`,
          `${
            singleStudent.completedCourses
              ? singleStudent.completedCourses.data.length
              : 0
          } Completed Courses`,
          `${6} Upcoming Webinars`,
          `${6} Prev. Webinars`,
          `Activity log`,
          `Account summary`,
        ]"
      />
      <!-- Current Courses -->
      <section v-if="tab === 0 && singleStudent.currentCourses">
        <current-courses :tabs="tab" :data="singleStudent.currentCourses" />
      </section>

      <!-- Completed Courses -->
      <section v-if="tab === 1 && singleStudent.completedCourses">
        <completed-courses :tabs="tab" :data="singleStudent.completedCourses" />
      </section>

      <!-- Upcomming Webinars -->
      <section v-if="tab === 2">
        <upcoming-webinars :tabs="tab" />
      </section>

      <!-- Previous Webinars -->
      <section v-if="tab === 3">
        <previous-webinars :tabs="tab" />
      </section>

      <!-- Activity Log -->
      <section v-if="tab === 4">
        <activity-log :tabs="tab" :data="singleUser.activityLog" />
      </section>

      <!-- Account Summary -->
      <section v-if="tab === 5 && singleUser.user">
        <account-summary :tabs="tab" :data="singleUser.user" />
      </section>
    </div>
    <div v-else loader class="">
      <img class="spinner w-16 h-16" src="/spinner/spinner.svg" alt="" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import currentCourses from '../components/currentCourses.vue'
import completedCourses from '../components/completedCourses.vue'
import upcomingWebinars from '../components/upcomingWebinars.vue'
import previousWebinars from '../components/previousWebinars.vue'
import activityLog from '../components/activityLog.vue'
import accountSummary from '../components/accountSummary.vue'

export default {
  components: {
    currentCourses,
    completedCourses,
    upcomingWebinars,
    previousWebinars,
    activityLog,
    accountSummary,
  },
  middleware: ['check-auth', 'auth'],
  fetch({ store }) {
    store.commit('app/SET_DARK_MENU', true)
    store.commit('app/SET_TITLE', 'Students')
  },
  data: () => ({
    home: 'home',
    tab: 0,
    actionOpt: false,
    isCourses: {
      preview: true,
      students: false,
      draft: false,
    },
  }),
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      singleUser: (state) => state.people.singleUser,
      singleStudent: (state) => state.people.singleStudent,
    }),
  },

  mounted() {
    // if (this.$device.isMobile) {
    //   this.tabs.unshift('Home')
    // }
    console.log('Just opened students', this.$route.params)
    if (this.$route.params) {
      // getUser
      this.$store
        .dispatch('people/getUser', {
          id: this.$route.params.slug,
          type: this.$route.params.type,
        })
        .then((res) => {
          console.log('User Data', res)
          this.loading = false
          // this.settings = res
          if (res) {
            // this.showSuccess(res)
          }
        })
        .catch((e) => console.log('e: ', e))

      // CurrentCourses
      this.$store
        .dispatch('people/getStudentCurrentCourses', this.$route.params.slug)
        .then((res) => {
          console.log('DAta In Slug', res)
          this.loading = false
          // this.settings = res
          if (res) {
            // this.showSuccess(res)
          }
        })
        .catch((e) => console.log('e: ', e))

      // CompletedCourses
      this.$store
        .dispatch('people/getStudentCompletedCourses', this.$route.params.slug)
        .then((res) => {
          console.log('DAta In Slug', res)
          this.loading = false
          // this.settings = res
          if (res) {
            // this.showSuccess(res)
          }
        })
        .catch((e) => console.log('e: ', e))

      // Get Activity Log
      this.$store
        .dispatch('people/getActivityLog', {
          id: this.$route.params.slug,
          pagination: 1,
        })
        .then((res) => {
          console.log('DAta In Auditing', res)
          this.loading = false
          // this.settings = res
          if (res) {
            // this.showSuccess(res)
          }
        })
        .catch((e) => console.log('e: ', e))
    }
  },

  watch: {
    tab: {
      handler(newValue, oldValue) {
        console.log('change in tab', 'new ->', newValue, 'old ->', oldValue)
        if (newValue === 0) {
          this.$store
            .dispatch(
              'people/getStudentCurrentCourses',
              this.$route.params.slug
            )
            .then((res) => {
              console.log('DAta In Slug', res)
              this.loading = false
              // this.settings = res
              if (res) {
                // this.showSuccess(res)
              }
            })
            .catch((e) => console.log('e: ', e))
        } else if (newValue === 1) {
          this.$store
            .dispatch(
              'people/getStudentCompletedCourses',
              this.$route.params.slug
            )
            .then((res) => {
              console.log('DAta In Slug', res)
              this.loading = false
              // this.settings = res
              if (res) {
                // this.showSuccess(res)
              }
            })
            .catch((e) => console.log('e: ', e))
        } else if (newValue === 4) {
          this.$store
            .dispatch('people/getActivityLog', {
              id: this.$route.params.slug,
              pagination: 1,
            })
            .then((res) => {
              console.log('DAta In Auditing', res)
              this.loading = false
              // this.settings = res
              if (res) {
                // this.showSuccess(res)
              }
            })
            .catch((e) => console.log('e: ', e))
        } else if (newValue === 5) {
          this.$store
            .dispatch('people/getUser', {
              id: this.$route.params.slug,
              type: this.$route.params.type,
            })
            .then((res) => {
              console.log('User Data', res)
              this.loading = false
              // this.settings = res
              if (res) {
                // this.showSuccess(res)
              }
            })
            .catch((e) => console.log('e: ', e))
        }
      },
    },
  },

  methods: {
    toggleActionOpt() {
      this.actionOpt = !this.actionOpt
    },
    texting() {
      console.log('Testing!!!!!')
    },
    accountAction(name, actionType, type, userId, currentPage) {
      console.log('Current Page', currentPage)
      console.log(name, 'toggleAcctAction', type)
      this.$store.commit('app/ACTION_MODAL', {
        status: true,
        title: actionType,
        desc: `Are you sure you want to ${actionType.toLowerCase()} ${name} account? Remember this action would make ${name} unable to enter into the platform.`,
        actionName: actionType,
        actionType,
        type,
        userId,
        currentPage,
      })
    },
    purchaseCourse() {
      this.$store.commit('app/SET_MODAL', 'purchase-modal')
      this.$store.commit('app/SET_VIEW_DATA', {
        type: 'Course',
        title: 'How to Build Multiple Sources of Income',
        desc: `Learn how to build and manage multiple sources of
          income that leads to sustainable wealth`,
        price: 2500,
      })
    },
  },
}
</script>
<style scoped>
.spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.pop-up {
  min-width: 9rem;
  top: 12.5rem;
  right: 2rem;
}
.profile-img {
  height: 70px;
  width: 70px;
  object-fit: cover;
}
.menu-btn {
  border-top: 5px solid;
  border-bottom: 5px solid;
  padding: 0.938rem 0;
  display: inline-block;
  border-color: transparent;
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.menu-btn.active {
  border-bottom-color: #f99e42;
  font-weight: 700;
}
.big-avatar {
  background-image: url(https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png);
}
</style>
