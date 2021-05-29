<template>
  <div class="min-h-screen mb-24">
    <section-switcher v-model="tab" :tabs="[`Students`, `Tutors`, `Admins`]" />
    <section class="bg-orange-100">
      <div class="container mx-auto mb-10 px-4 mt-8 lg:px-0">
        <div class="md:grid grid-cols-3 gap-5 space-y-3 md:space-y-0">
          <dash-item-metrics
            title="16,000"
            label="Active Student"
            link="/courses"
            type="filter"
          />
          <dash-item-metrics
            title="600"
            label="Dormant Students"
            link="/webinars"
            type="filter"
          />
          <dash-item-metrics
            title="540"
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
            />
          </div>
        </div>
      </div>
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
}
</script>
