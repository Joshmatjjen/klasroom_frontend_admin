<template>
  <section>
    <div v-if="courseSummary && liveCourses" class="min-h-screen mb-24">
      <section class="bg-orange-100">
        <div class="container mx-auto mb-10 px-4 lg:px-0">
          <div class="md:grid grid-cols-4 gap-5 space-y-3 md:space-y-0">
            <dash-item-metrics
              :title="
                courseSummary.publishedCourses.toLocaleString() + ' courses'
              "
              label="Published"
              type="filter"
              tableType="published"
              filterType="active"
            />
            <dash-item-metrics
              :title="
                courseSummary.unPublishedCourses.toLocaleString() + ' courses'
              "
              label="Unpublished"
              type="filter"
              tableType="unPublished"
              filterType="active"
              @click="switcher('unpublished')"
            />
            <dash-item-metrics
              :title="courseSummary.courseSales.toLocaleString() + ' courses'"
              label="Course sales"
              type="filter"
              tableType="CourseSales"
              filterType="active"
            />
            <dash-item-metrics
              :title="courseSummary.completions.toLocaleString() + ' courses'"
              label="Completions"
              type="filter"
              tableType="completions"
              filterType="active"
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
        <div class="relative" v-if="isCourses.live">
          <div class="container mx-auto my-10 px-2 lg:px-0">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12">
                <courses-table
                  :columns="columnLive"
                  :rows="liveCourses ? liveCourses.data : []"
                  type="live courses"
                  :deleteItem="deleteCourse"
                />
              </div>
            </div>
          </div>
          <span class="absolute right-0">
            <loader v-if="loading" color="black" />
          </span>
          <t-pagination
            :total-items="liveCourses.pagination.count"
            :per-page="liveCourses.pagination.limit"
            :limit="4"
            :variant="'roundedSmall'"
            :value="liveCourses.pagination.currentPage"
            @change="changePage"
          />
        </div>

        <!-- Unpublished -->
        <div class="relative" v-if="isCourses.unpublished">
          <div class="container mx-auto my-10 px-2 lg:px-0">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12">
                <courses-table
                  :columns="columnsUnpublished"
                  :rows="unPublishedCourses ? unPublishedCourses.data : []"
                  type="unpublished courses"
                  :deleteItem="deleteCourse"
                />
              </div>
            </div>
          </div>
          <span class="absolute right-0">
            <loader v-if="loading" color="black" />
          </span>
          <t-pagination
            :total-items="unPublishedCourses.pagination.count"
            :per-page="unPublishedCourses.pagination.limit"
            :limit="4"
            :variant="'roundedSmall'"
            :value="unPublishedCourses.pagination.currentPage"
            @change="changePage"
          />
        </div>

        <!-- Archived -->
        <div class="relative" v-if="isCourses.archived">
          <div class="container mx-auto my-10 px-2 lg:px-0">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12">
                <courses-table
                  :columns="columnsArchived"
                  :rows="archivedCourses ? archivedCourses.data : []"
                  :onDraft="true"
                  :deleteItem="deleteCourse"
                  type="archived courses"
                />
              </div>
            </div>
          </div>
          <span class="absolute right-0">
            <loader v-if="loading" color="black" />
          </span>
          <t-pagination
            :total-items="archivedCourses.pagination.count"
            :per-page="archivedCourses.pagination.limit"
            :limit="4"
            :variant="'roundedSmall'"
            :value="archivedCourses.pagination.currentPage"
            @change="changePage"
          />
        </div>
      </section>
    </div>
    <loader-2 v-else />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Loader2 from '~/components/loader/Loader2.vue'
export default {
  components: { Loader2 },
  middleware: ['check-auth', 'auth'],
  async fetch() {
    this.$store.commit('app/SET_TITLE', 'Courses')
    try {
      await this.$store.dispatch('courses/getLiveCourses')
      await this.$store.dispatch('courses/getCoursesSummary')
      await this.$store.dispatch('courses/getUnPublishedCourses')
      await this.$store.dispatch('courses/getArchivedCourses')
    } catch (err) {
      console.log(err)
    }
  },
  // call fetch only on client-side
  fetchOnServer: false,
  data: () => ({
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
    columnsArchived: [
      {
        label: 'Course title',
        field: 'courseTitle',
      },
    ],
    isCourses: {
      live: true,
      unpublished: false,
      archived: false,
    },
    loading: false,
  }),
  computed: {
    ...mapState({
      courses: (state) => state.courses.courses,
      courseSummary: (state) => state.courses.courseSummary,
      liveCourses: (state) => state.courses.coursesData.liveCourses,
      unPublishedCourses: (state) =>
        state.courses.coursesData.unPublishedCourses,
      archivedCourses: (state) => state.courses.coursesData.archived,
    }),
  },
  created() {
    this.$store
      .dispatch('courses/getCoursesSummary')
      .then((res) => {
        console.log(res)
        this.loading = false
      })
      .catch((e) => console.log('e: ', e))
  },
  methods: {
    async deleteCourse(id) {
      try {
        await this.$store.dispatch('courses/deleteCourses', id)
      } catch (err) { 
        console.log(err)
      }
    },
    async changePage(pagination) {
      console.log('This is the pagination page -->', pagination)
      this.loading = true
      if (this.isCourses.live) {
        try {
          await this.$store.dispatch('courses/getLiveCourses', pagination)
          this.loading = false
        } catch (err) {
          console.log(err)
          this.loading = false
        }
      }

      if (this.isCourses.unpublished) {
        try {
          await this.$store.dispatch(
            'courses/getUnPublishedCourses',
            pagination
          )
          this.loading = false
        } catch (err) {
          console.log(err)
          this.loading = false
        }
      }

      if (this.isCourses.archived) {
        try {
          await this.$store.dispatch('courses/getArchivedCourses', pagination)
          this.loading = false
        } catch (err) {
          console.log(err)
          this.loading = false
        }
      }
    },
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
