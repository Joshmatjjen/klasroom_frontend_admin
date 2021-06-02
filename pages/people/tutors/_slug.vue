<template>
  <div class="min-h-screen mb-24">
    <div class="bg-red-200 border rounded-2xl px-5 py-5 mb-5">
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
            src="/profile.jpg"
            alt="My profile"
          />
        </div>
        <div class="flex flex-col justify-end">
          <div>
            <span class="text-gray-700 font-semibold text-left text-md">{{
              'Chidimma Ugwu'
            }}</span>
            <span
              class="text-white bg-green-600 rounded-full font-normal text-center text-sm py-1 px-2"
              >{{ 'Active' }}</span
            >
          </div>
          <span class="text-gray-700 font-normal text-left text-xs">{{
            'chidimmaugwu@gmail.com'
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
        `Active log`,
        `Account summary`,
        `${4006} Sales`,
        `${46} Withdrawals`,
      ]"
    />
    <!-- Courses -->
    <section v-if="tabs === 0">
      <current-courses :tabs="tabs" />
    </section>

    <!-- Webinars -->
    <section v-if="tabs === 1">
      <previous-webinars :tabs="tabs" />
    </section>

    <!-- Activity Logs -->
    <section v-if="tabs === 2">
      <activity-log :tabs="tabs" />
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
      profileImage: (state) => state.auth.profileImage,
    }),
  },
  mounted() {
    if (this.$device.isMobile) {
      this.tabs.unshift('Home')
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
