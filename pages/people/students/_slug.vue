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
        `${6} Completed Webinars`,
        `Active log`,
        `Account summary`,
      ]"
    />
    <!-- Current Courses -->
    <section v-if="tabs === 0">
      <div class="container mx-auto my-10 px-2 lg:px-0">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <list-table-1
              :columns="currentCoursesColumns"
              :rows="currentCoursesRows"
              type="Students"
              :total="124322"
              route="/people/students/"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Completed Courses -->
    <section v-if="tabs === 1">
      <div class="container mx-auto my-10 px-2 lg:px-0">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <list-table-1
              :columns="completedCoursesColumns"
              :rows="completedCoursesRows"
              type="Previous Courses"
              :total="4"
              route="/people/students/"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Upcomming Webinars -->
    <section v-if="tabs === 2">
      <div class="container mx-auto my-10 px-2 lg:px-0">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <list-table-1
              :columns="upcomingWebinarsColumns"
              :rows="upcomingWebinarsRows"
              type="Upcoming Webinars"
              :total="6"
              route="/people/students/"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- <div
      v-if="!isCourses.students"
      class="container mt-5 mx-auto mb-10 px-4 lg:px-0"
    >
      <section class="grid grid-cols-12 gap-5">
        <div class="col-span-full lg:col-span-8 xl:col-span-8">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-full">
              <nuxt-link to="/">
                <div class="col-span-12">
                  <list-table-1
                    :columns="columnsStudents"
                    :rows="rowsStudents"
                    type="Reviews"
                  />
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
        <div class="col-span-full lg:col-span-4 xl:col-span-4">
          <div
            class="bg-white rounded-xl border border-gray-300 shadow-hover relative min-h-full"
          >
            <div class="block mb-2">
              <div class="big-avatar relative rounded-xl overflow-hidden">
                <img
                  src="https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png"
                  alt=""
                />
              </div>
            </div>
            <div class="px-4 md:px-5 lg:px-6 py-4">
              <ul class="text-gray-700">
                <li class="text-center">
                  <h5 class="name-text font-bold mb-2 capitalize">
                    {{ user ? user.name : '' }}
                  </h5>
                  <p class="text-sm text-gray-700">
                    Registered
                    {{ user ? user.createdAt : '' }}
                  </p>
                </li>
                <li>
                  <hr class="my-5" />
                  <label class="checkbox" @click="passwordReset">
                    <span class="text-sm">Initiate password reset</span>
                    <input type="checkbox" value="intermediate" disabled />
                    <span class="checkmark"></span>
                  </label>
                </li>
                <li>
                  <label class="checkbox" @click="suspendAccount">
                    <span class="text-sm">Suspend account</span>
                    <input type="checkbox" value="intermediate" disabled />
                    <span class="checkmark"></span>
                  </label>
                </li>
                <hr class="my-5" />
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

const courses = require('@/static/json/latest-courses.json')
const currentCourses = require('@/static/json/current-courses.json')
const completedCourses = require('@/static/json/completed-courses.json')
const upcomingWebinars = require('@/static/json/upcoming-webinars.json')
const webreviews = require('@/static/json/webinar-reviews.json')
const students = require('@/static/json/students.json')

export default {
  middleware: ['check-auth', 'auth'],
  fetch({ store }) {
    store.commit('app/SET_DARK_MENU', true)
    store.commit('app/SET_TITLE', 'Students')
  },
  data: () => ({
    home: 'home',
    course: courses[0],
    tabs: 0,
    actionOpt: false,
    isCourses: {
      preview: true,
      students: false,
      draft: false,
    },
    currentCoursesColumns: [
      {
        label: 'Course title',
        field: 'courseTitle',
      },
      {
        label: 'Status',
        field: 'status',
      },
      {
        label: 'Price',
        field: 'price',
      },
      {
        label: 'Sales',
        field: 'sales',
      },
      {
        label: 'Comp',
        field: 'comp',
      },
      {
        label: 'Rating',
        field: 'rating',
      },
      {
        label: 'Date started',
        field: 'dateStarted',
        type: 'date',
        dateInputFormat: 'yyyy-MM-dd',
        dateOutputFormat: 'MMM do yy',
      },
    ],
    currentCoursesRows: _.take(currentCourses, 10),
    completedCoursesColumns: [
      {
        label: 'Course title',
        field: 'courseTitle',
      },
      {
        label: 'Status',
        field: 'status',
      },
      {
        label: 'Price',
        field: 'price',
      },
      {
        label: 'Sales',
        field: 'sales',
      },
      {
        label: 'Comp',
        field: 'comp',
      },
      {
        label: 'Rating',
        field: 'rating',
      },
      {
        label: 'Date completed',
        field: 'dateCompleted',
        type: 'date',
        dateInputFormat: 'yyyy-MM-dd',
        dateOutputFormat: 'MMM do yy',
      },
    ],
    completedCoursesRows: _.take(completedCourses, 10),
    upcomingWebinarsColumns: [
      {
        label: 'Course title',
        field: 'courseTitle',
      },
      {
        label: 'Status',
        field: 'status',
      },
      {
        label: 'Price',
        field: 'price',
      },
      {
        label: 'Sales',
        field: 'sales',
      },
      {
        label: 'Attendance',
        field: 'attendance',
      },
      {
        label: 'Rating',
        field: 'rating',
      },
      {
        label: 'Date',
        field: 'date',
        type: 'date',
        dateInputFormat: 'yyyy-MM-dd',
        dateOutputFormat: 'MMM do yy',
      },
    ],
    upcomingWebinarsRows: _.take(upcomingWebinars, 10),

    columnsStudents: [
      {
        label: 'Name',
        field: 'name',
      },
      {
        label: 'Payment date',
        field: 'paymentDate',
      },
      {
        label: 'Last Active',
        field: 'lastActive',
      },
      {
        label: 'Course progress',
        field: 'progress',
      },
    ],
    rowsReviews: _.take(webreviews, 10),
    rowsStudents: _.take(students, 4),
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
