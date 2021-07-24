<template>
  <section>
    <div v-if="financeSummary && allSales" class="min-h-screen mb-24">
      <section class="bg-orange-100">
        <!-- <div class="container mx-auto mb-10 px-4 lg:px-0"> -->
        <div class="md:grid grid-cols-3 gap-5 space-y-3 md:space-y-0">
          <finance-card
            :title="'₦' + financeSummary.totalEarnings"
            label="Total earnings"
            type="withdraw"
            typeText="Withdraw"
            tableType="Balance"
            filterType="active"
            :greenBalance="true"
          />
          <finance-card
            :title="financeSummary.salesNos"
            label="Total Sales"
            type="none"
            tableType="unPublished"
            filterType="active"
            @click="switcher('unpublished')"
          />
          <finance-card
            :title="financeSummary.payOuts"
            label="Total Payout"
            type="withdraw"
            typeText="See more"
            tableType="completions"
            filterType="active"
          />
          <!-- <finance-card
            :title="'305*****72'"
            label="Bank account"
            type="withdraw"
            typeText="Edit"
            tableType="CourseSales"
            filterType="active"
          /> -->
        </div>
        <!-- </div> -->
      </section>
      <section class="mt-10">
        <sales
          :dataAll="{ data: [] }"
          :dataCourses="{ data: [] }"
          :dataWebinars="{ data: [] }"
        />
      </section>

      <section class="mt-10">
        <sales
          :dataAll="{ data: [] }"
          :dataCourses="{ data: [] }"
          :dataWebinars="{ data: [] }"
        />
      </section>

      <section class="mt-10">
        <payout :data="payouts" />
      </section>
    </div>
    <loader-2 v-else />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Loader2 from '~/components/loader/Loader2.vue'
import sales from './components/sales.vue'
import payout from './components/payout.vue'
export default {
  components: { Loader2, sales, payout },
  middleware: ['check-auth', 'auth'],
  async fetch() {
    this.$store.commit('app/SET_TITLE', 'Financials')
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
  }),
  computed: {
    ...mapState({
      courses: (state) => state.courses.courses,
      financeSummary: (state) => state.financials.financeSummary,
      allSales: (state) => state.financials.sales.all,
      courseSales: (state) => state.financials.sales.courses,
      webinarSales: (state) => state.financials.sales.webinars,
      payouts: (state) => state.financials.payouts,
      // liveCourses: (state) => state.financials.coursesData.liveCourses,
    }),
  },
  created() {
    this.$store
      .dispatch('financials/getFinanceSummary')
      .then((res) => {
        console.log(res)
        this.loading = false
      })
      .catch((e) => console.log('e: ', e))

    this.$store
      .dispatch('financials/getFinanceAllSales')
      .then((res) => {
        console.log(res)
        this.loading = false
      })
      .catch((e) => console.log('e: ', e))

    this.$store
      .dispatch('financials/getFinanceCourseSales')
      .then((res) => {
        console.log(res)
        this.loading = false
      })
      .catch((e) => console.log('e: ', e))

    this.$store
      .dispatch('financials/getFinanceWebinarsSales')
      .then((res) => {
        console.log(res)
        this.loading = false
      })
      .catch((e) => console.log('e: ', e))

    this.$store
      .dispatch('financials/getFinancePayouts')
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
