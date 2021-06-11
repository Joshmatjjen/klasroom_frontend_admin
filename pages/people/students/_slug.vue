<template>
  <div class="min-h-screen mb-24">
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
            src="/profile.jpg"
            alt="My profile"
          />
        </div>
        <div class="flex flex-col justify-end">
          <span class="text-gray-700 font-semibold text-left text-md">{{
            'Chidimma Ugwu'
          }}</span
          ><span class="text-gray-700 font-normal text-left text-xs">{{
            'chidimmaugwu@gmail.com'
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
          @click.capture.stop="texting"
        >
          <p
            class="text-center md:text-gray-700 text-sm font-normal hover:text-gray-900 md:bg-transparent block md:inline-block mb-5 md:mb-0"
          >
            Suspend account
          </p>
        </div>
      </div>
    </section>
    <section-switcher
      v-model="tabs"
      :tabs="[
        `${2} Current Courses`,
        `${4} Completed Courses`,
        `${6} Upcoming Webinars`,
        `${6} Prev. Webinars`,
        `Active log`,
        `Account summary`,
      ]"
    />
    <!-- Current Courses -->
    <section v-if="tabs === 0">
      <current-courses :tabs="tabs" />
    </section>

    <!-- Completed Courses -->
    <section v-if="tabs === 1">
      <completed-courses :tabs="tabs" />
    </section>

    <!-- Upcomming Webinars -->
    <section v-if="tabs === 2">
      <upcoming-webinars :tabs="tabs" />
    </section>

    <!-- Previous Webinars -->
    <section v-if="tabs === 3">
      <previous-webinars :tabs="tabs" />
    </section>

    <!-- Activity Log -->
    <section v-if="tabs === 4">
      <activity-log :tabs="tabs" />
    </section>

    <!-- Account Summary -->
    <section v-if="tabs === 5">
      <account-summary :tabs="tabs" />
    </section>
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
      profileImage: (state) => state.auth.profileImage,
    }),
  },
  mounted() {
    if (this.$device.isMobile) {
      this.tabs.unshift('Home')
    }
    console.log('Just opened students', this.$route.params)
    if (this.$route.params) {
      this.$store
        .dispatch('people/getStudentCurrentCourses', this.$route.params.id)
        .then((res) => {
          console.log('DAta In Slug', res)
          this.loading = false
          // this.settings = res
          if (res) {
            // this.showSuccess(res)
          }
        })
        .catch((e) => console.log('e: ', e))
    }
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
