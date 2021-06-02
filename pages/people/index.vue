<template>
  <div class="min-h-screen mb-24">
    <section-switcher v-model="tab" :tabs="[`Students`, `Tutors`, `Admins`]" />

    <!-- Students Section -->
    <section v-if="tab === 0">
      <section class="bg-orange-100">
        <div class="container mx-auto mb-10 px-4 mt-8 lg:px-0">
          <div class="md:grid grid-cols-3 gap-5 space-y-3 md:space-y-0">
            <dash-item-metrics
              :title="(16000).toLocaleString()"
              label="Active Student"
              link="/courses"
              type="filter"
            />
            <dash-item-metrics
              :title="(600).toLocaleString()"
              label="Dormant Students"
              link="/webinars"
              type="filter"
            />
            <dash-item-metrics
              :title="(5400).toLocaleString()"
              label="Suspended Students"
              link="/courses"
              type="filter"
            />
          </div>
        </div>
      </section>
      <section>
        <div class="container mx-auto my-10 px-2 lg:px-0">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12">
              <list-table-1
                :columns="studentColumns"
                :rows="studentRows"
                type="Students"
                :total="124322"
                route="/people/students/"
              />
            </div>
          </div>
        </div>
      </section>
    </section>

    <!-- Tutors Section -->
    <section v-if="tab === 1">
      <section class="bg-orange-100">
        <div class="container mx-auto mb-10 px-4 mt-8 lg:px-0">
          <div class="md:grid grid-cols-3 gap-5 space-y-3 md:space-y-0">
            <dash-item-metrics
              :title="(15000).toLocaleString()"
              label="Active Tutor"
              link="/courses"
              type="filter"
            />
            <dash-item-metrics
              :title="(600).toLocaleString()"
              label="Dormant Tutors"
              link="/webinars"
              type="filter"
            />
            <dash-item-metrics
              :title="(5400).toLocaleString()"
              label="Suspended Tutors"
              link="/courses"
              type="filter"
            />
          </div>
        </div>
      </section>
      <section>
        <div class="container mx-auto my-10 px-2 lg:px-0">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12">
              <list-table-1
                :columns="studentColumns"
                :rows="studentRows"
                type="Tutors"
                :total="124322"
                route="/people/tutors/"
              />
            </div>
          </div>
        </div>
      </section>
    </section>

    <!-- Admins Section -->
    <section v-if="tab === 2">
      <section class="bg-orange-100">
        <div class="container mx-auto mb-10 px-4 mt-8 lg:px-0">
          <div class="md:grid grid-cols-3 gap-5 space-y-3 md:space-y-0">
            <dash-item-metrics
              :title="(14).toLocaleString()"
              label="Active Admin"
              link="/courses"
              type="filter"
            />
            <dash-item-metrics
              :title="(6).toLocaleString()"
              label="Dormant Admins"
              link="/webinars"
              type="filter"
            />
            <dash-item-metrics
              :title="(5).toLocaleString()"
              label="Suspended Admins"
              link="/courses"
              type="filter"
            />
          </div>
        </div>
      </section>
      <section>
        <div class="container mx-auto my-10 px-2 lg:px-0">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12">
              <list-table-1
                :columns="studentColumns"
                :rows="studentRows"
                type="Admins"
                :total="124322"
                route="/people/admins/"
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
const courses = require('@/static/json/courses.json')
const webinarCourse = require('@/static/json/live-courses.json')
const studentsData = require('@/static/json/people-student.json')

export default {
  middleware: ['check-auth', 'auth'],
  fetch({ store }) {
    store.commit('app/SET_TITLE', 'People')
  },
  data: () => ({
    courses: _.take(courses, 4),
    undoneTasks: _.take(courses, 3),
    tab: 0,
    // tabs: ['Lessons', 'Chat', 'Assignment', 'Resources'],
    studentColumns: [
      {
        label: 'Name',
        field: 'name',
      },
      {
        label: 'Email',
        field: 'email',
      },
      {
        label: 'Phone',
        field: 'phone',
      },
      {
        label: 'Location',
        field: 'location',
      },
      {
        label: 'Last active',
        field: 'lastActive',
      },
      {
        label: 'Member since',
        field: 'memberSince',
        type: 'date',
        dateInputFormat: 'yyyy-MM-dd',
        dateOutputFormat: 'MMM do yy',
      },
      {
        label: 'Status',
        field: 'status',
      },
    ],
    studentRows: _.take(studentsData, 10),
  }),

  created() {
    if (
      this.$route.params &&
      Object.keys(this.$route.params).length !== 0 &&
      this.$route.params.constructor === Object
    ) {
      console.log(this.$route.params)
      this.tab = this.$route.params.tab
    } else this.tab = 0
  },

  mounted() {
    if (this.$device.isMobile) {
      this.tabs.unshift('Home')
    }
  },
  methods: {
    isEmptyObject(value) {
      return (
        value && Object.keys(value).length === 0 && value.constructor === Object
      )
    },
  },
}
</script>
