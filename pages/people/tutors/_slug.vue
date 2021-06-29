<template>
  <div>
    <div
      class="min-h-screen mb-24"
      v-if="
        singleUser.user &&
        singleUser.user.userId === parseInt($route.params.userData.userId)
      "
    >
      <div
        v-if="singleUser.user.status === 'suspended'"
        class="bg-red-200 border rounded-2xl px-5 py-5 mb-5"
      >
        <p class="text-gray-700 font-normal text-left text-sm">
          This account is suspended. Click “Actions” to reactivate this account.
        </p>
      </div>
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
        <!-- <div> -->
        <div
          class="btn btn-primary h-12 flex flex-row align-middle relative"
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
            @click.capture.stop="texting"
          >
            <p
              class="text-center md:text-gray-700 text-sm font-normal whitespace-no-wrap hover:text-gray-900 md:bg-transparent block md:inline-block mb-5 md:mb-0"
            >
              Suspend account
            </p>
            <!-- <p
            class="text-center md:text-gray-700 text-sm font-normal whitespace-no-wrap hover:text-gray-900 md:bg-transparent block md:inline-block mb-5 md:mb-0"
          >
            Unsuspend account
          </p> -->
          </div>
        </div>
        <!-- </div> -->
      </section>
      <section-switcher
        v-model="tabs"
        :tabs="[
          `${12} Courses`,
          `${6} Webinars`,
          `Activity log`,
          `Account summary`,
          `${4006} Sales`,
          `${46} Withdrawals`,
        ]"
      />
      <!-- Courses -->
      <section v-if="tabs === 0">
        <current-courses :tabs="tabs" :data="singleTutor.courses" />
      </section>

      <!-- Webinars -->
      <section v-if="tabs === 1">
        <previous-webinars :tabs="tabs" />
      </section>

      <!-- Activity Logs -->
      <section v-if="tabs === 2">
        <activity-log
          :tabs="tabs"
          :data="singleUser.activityLog"
          :id="singleUser.user.userId"
        />
      </section>

      <!-- Account Summary  -->
      <section v-if="tabs === 3">
        <account-summary :tabs="tabs" type="tutors" />
      </section>

      <!--  Sales -->
      <section v-if="tabs === 4">
        <sales :tabs="tabs" />
      </section>

      <!-- Withdrawals -->
      <section v-if="tabs === 5">
        <withdrawals :tabs="tabs" />
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
import sales from '../components/sales.vue'
import withdrawals from '../components/withdrawals.vue'

export default {
  components: {
    currentCourses,
    completedCourses,
    upcomingWebinars,
    previousWebinars,
    activityLog,
    accountSummary,
    sales,
    withdrawals,
  },
  middleware: ['check-auth', 'auth'],
  fetch({ store }) {
    store.commit('app/SET_DARK_MENU', true)
    store.commit('app/SET_TITLE', 'Tutors')
  },
  data: () => ({
    home: 'home',
    tabs: 0,
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
      singleTutor: (state) => state.people.singleTutor,
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

      // Courses
      this.$store
        .dispatch('people/getTutorCourses', this.$route.params.userData.userId)
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
          id: this.$route.params.userData.userId,
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
              'people/getTutorCourses',
              this.$route.params.userData.userId
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
        } else if (newValue === 2) {
          this.$store
            .dispatch('people/getActivityLog', {
              id: this.$route.params.userData.userId,
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
    },
  },

  methods: {
    toggleActionOpt() {
      this.actionOpt = !this.actionOpt
    },
    texting() {
      console.log('Testing!!!!!')
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
  top: 3.5rem;
  right: 0.5rem;
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
