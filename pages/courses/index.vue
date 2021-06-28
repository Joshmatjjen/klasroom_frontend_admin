<template>
  <div class="min-h-screen mb-24">
    <section class="bg-orange-100">
      <div class="container mx-auto mb-10 px-4 lg:px-0">
        <div class="md:grid grid-cols-4 gap-5 space-y-3 md:space-y-0">
          <dash-item-metrics
            :title="courseSummary.publishedCourses.toLocaleString() + ' courses'"
            label="Published"
            link="/student/courses"
          />
          <dash-item-metrics
            :title="courseSummary.unPublishedCourses.toLocaleString() + ' courses'"
            label="Unpublished"
            @click="switcher('unpublished')"
            more="/student/courses"
          />
          <dash-item-metrics
            :title="courseSummary.courseSales.toLocaleString() + ' courses'"
            label="Course sales"
            link="/student/courses"
          />
          <dash-item-metrics
            :title="courseSummary.completions.toLocaleString() + ' courses'"
            label="Completions"
            link="/student/courses"
          />
        </div>
      </div>
    </section>
    <section>
      <div
        class="flex flex-row gap-10 place-items-start px-10 border-b-2 border-gray-200"
      >
        <button
          v-on:click="switcher('live')"
          v-bind:class="{ active: isCourses.live }"
          class="menu-btn"
        >
          <p class="text-xs text-gray-700">Live Courses</p>
        </button>
        <button
          v-on:click="switcher('unpublished')"
          v-bind:class="{ active: isCourses.unpublished }"
          class="menu-btn"
        >
          <p class="text-xs text-gray-700">Unpublished courses</p>
        </button>
        <button
          v-on:click="switcher('archived')"
          v-bind:class="{ active: isCourses.archived }"
          class="menu-btn"
        >
          <p class="text-xs text-gray-700">Archived courses</p>
        </button>
      </div>
    </section>

    <section>
      <!-- live -->
      <div v-if="isCourses.live" class="container mx-auto my-10 px-2 lg:px-0">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <courses-table
              :columns="columnLive"
              :rows="courses"
              type="live courses"
            />
          </div>
        </div>
      </div>
      <!-- unpublished -->
      <div
        v-if="isCourses.unpublished"
        class="container mx-auto my-10 px-2 lg:px-0"
      >
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <simple-table
              :columns="columnsUnpublished"
              :rows="rowsUnpublished"
              type="unpublished courses"
            />
          </div>
        </div>
      </div>

      <!-- Archived -->
      <div
        v-if="isCourses.archived"
        class="container mx-auto my-10 px-2 lg:px-0"
      >
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <simple-table
              :columns="columnsArchived"
              :rows="rowsArchived"
              type="archived courses"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// const courses = require('@/static/json/courses.json')
const unPublished = require('@/static/json/unpublished-courses.json')
const webinars = require('@/static/json/webinars.json')
const liveCourses = require('@/static/json/live-courses.json')

export default {
  middleware: ['check-auth', 'auth'],
  fetch({ store }) {
    store.commit('app/SET_TITLE', 'Courses')
  },
  data: () => ({
    // courses: _.take(courses, 4),
    webinars: _.take(webinars, 4),
    // undoneTasks: _.take(courses, 3),
    // live
    columnLive: [
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
        label: 'Comp.',
        field: 'comp',
      },
      {
        label: 'Rating',
        field: 'rating',
      },
      {
        label: 'Date',
        field: 'createdAt',
        type: 'createdAt',
        dateInputFormat: 'yyyy-MM-dd',
        dateOutputFormat: 'MMM do yy',
      },
    ],
    rowsLive: _.take(liveCourses, 4),
    // unpublished
    columnsUnpublished: [
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
        label: 'Comp.',
        field: 'comp',
      },
      {
        label: 'Rating',
        field: 'rating',
      },
      {
        label: 'Date',
        field: 'createdAt',
        type: 'createdAt',
        dateInputFormat: 'yyyy-MM-dd',
        dateOutputFormat: 'MMM do yy',
      },
    ],
    rowsUnpublished: _.take(unPublished, 3),
    columnsArchived: [
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
        label: 'Comp.',
        field: 'comp',
      },
      {
        label: 'Rating',
        field: 'rating',
      },
      {
        label: 'Date',
        field: 'createdAt',
        type: 'createdAt',
        dateInputFormat: 'yyyy-MM-dd',
        dateOutputFormat: 'MMM do yy',
      },
    ],
    rowsArchived: _.take(liveCourses, 4),

    isCourses: {
      live: true,
      unpublished: false,
      archived: false,
    },
  }),
  computed: {
    ...mapState({
      courses: (state) => state.courses.courses,
      courseSummary: (state) => state.courses.courseSummary,
    }),
  },
  created() {
    this.$store
      .dispatch('courses/getCourses')
      .then((res) => {
        console.log('COURSES:', res)
        this.loading = false
      })
      .catch((e) => console.log('e: ', e))
    this.$store
      .dispatch('courses/getCoursesSummary')
      .then((res) => {
        console.log(res)
        this.loading = false
      })
      .catch((e) => console.log('e: ', e))
  },
  methods: {
    switcher: function (value) {
      switch (value) {
        case 'live':
          this.isCourses.live = true
          this.isCourses.unpublished = false
          this.isCourses.archived = false
          break
        case 'unpublished':
          this.isCourses.live = false
          this.isCourses.unpublished = true
          this.isCourses.archived = false
          break
        case 'archived':
          this.isCourses.live = false
          this.isCourses.unpublished = false
          this.isCourses.archived = true
          break
        default:
          this.isCourses.live = true
          this.isCourses.unpublished = false
          this.isCourses.archived = false
      }
      // some code to filter users
    },
  },
}
</script>
<style scoped>
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
</style>
