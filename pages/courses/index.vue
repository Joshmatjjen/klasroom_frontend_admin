<template>
  <div class="min-h-screen mb-24">
    <section class="bg-orange-100">
      <div class="container mx-auto mb-10 px-4 lg:px-0">
        <div class="md:grid grid-cols-4 gap-5 space-y-3 md:space-y-0">
          <dash-item-metrics
            title="12 courses"
            label="Published"
            link="/student/courses"
          />
          <dash-item-metrics
            title="2 courses"
            label="Draft"
            link="/student/courses"
          />
          <dash-item-metrics
            title="34,600"
            label="Course sales"
            link="/student/courses"
          />
          <dash-item-metrics
            title="3,540"
            label="Completions"
            link="/student/courses"
          />
        </div>
      </div>
    </section>

    <section>
      <div class="container mx-auto my-10 px-2 lg:px-0">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-full">
            <div class="col-span-12">
              <list-table-1
                :columns="columnsReviews"
                :rows="rowsReviews"
                type="Reviews"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const courses = require('@/static/json/courses.json')
const reviews = require('@/static/json/webinar-reviews.json')

export default {
  middleware: ['check-auth', 'auth'],
  fetch({ store }) {
    store.commit('app/SET_TITLE', 'Courses')
  },
  data: () => ({
    courses: _.take(courses, 4),
    undoneTasks: _.take(courses, 3),
    columnsReviews: [
      {
        label: 'Name',
        field: 'name',
      },
      {
        label: 'Date',
        field: 'date',
        type: 'date',
        dateInputFormat: 'yyyy-MM-dd',
        dateOutputFormat: 'MMM do yy',
      },
      {
        label: 'Review',
        field: 'review',
      },
      {
        label: 'Rating',
        field: 'rating',
      },
    ],
    rowsReviews: _.take(reviews, 10),
  }),
}
</script>
