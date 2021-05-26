<template>
  <div class="min-h-screen mb-24">
    <section class="bg-orange-100">
      <div class="container mx-auto mb-10 px-4 lg:px-0">
        <div class="md:grid grid-cols-3 gap-5 space-y-3 md:space-y-0">
          <dash-wallet-status
            amount="12,330,055.24"
            :items="courses"
            weekSales="32,420"
            planSales="82,000"
            productSales="105,000"
            more="/dashboard"
          />
          <dash-items-status
            title="Courses"
            :items="courses"
            weekSales="+13 sales this week"
            :sold="314 + ' courses sold'"
            :published="102 + ' courses published this week'"
            :total="12420 + ' total courses'"
            more="/courses"
          />
          <dash-items-status
            title="Webinars"
            :items="courses"
            weekSales="+28 sales this week"
            :sold="314 + ' courses sold'"
            :published="102 + ' courses published this week'"
            :total="12420 + ' total webinars'"
            more="/webinars"
          />
        </div>
      </div>
    </section>

    <section class="bg-orange-100">
      <div class="container mx-auto mb-10 px-4 lg:px-0">
        <div class="md:grid grid-cols-4 gap-5 space-y-3 md:space-y-0">
          <dash-item-metrics title="16,000" label="Student" more="/courses" />
          <dash-item-metrics
            title="600"
            label="Webinar tutors"
            more="/webinars"
          />
          <dash-item-metrics
            title="540"
            label="Course tutors"
            more="/courses"
          />
          <dash-item-metrics title="12" label="Admins" more="/courses" />
        </div>
      </div>
    </section>

    <section-switcher
      v-model="tab"
      :tabs="[
        `${(23443).toLocaleString()}  Live Courses`,
        `${(14).toLocaleString()} Klasroom courses`,
        `${(301).toLocaleString()} Unapproved courses`,
        `${(23434).toLocaleString()} Live webinars`,
      ]"
    />

    <section>
      <div class="container mx-auto my-10 px-2 lg:px-0">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <simple-table :columns="columns" :rows="rows" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const courses = require('@/static/json/courses.json')
const webinarCourse = require('@/static/json/live-courses.json')

export default {
  middleware: ['check-auth', 'auth'],
  fetch({ store }) {
    store.commit('app/SET_TITLE', 'Dashboard')
  },
  data: () => ({
    courses: _.take(courses, 4),
    undoneTasks: _.take(courses, 3),
    tab: 0,
    // tabs: ['Lessons', 'Chat', 'Assignment', 'Resources'],
    columns: [
      {
        label: 'Course title',
        field: 'courseTitle',
      },
      {
        label: 'Tutor',
        field: 'tutor',
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
        label: 'Created On',
        field: 'createdAt',
        type: 'date',
        dateInputFormat: 'yyyy-MM-dd',
        dateOutputFormat: 'MMM do yy',
      },
    ],
    rows: _.take(webinarCourse, 10),
  }),
}
</script>
