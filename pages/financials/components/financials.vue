<template>
  <div>
    <!-- Activity Log -->
    <section>
      <div class="container mx-auto mb-10 px-2 lg:px-0">
        <p class="text-base font-extrabold mb-3">Financials</p>
        <div
          class="grid grid-cols-12 gap-4 bg-white rounded-xl border border-gray-300 shadow-hover relative"
        >
          <div class="col-span-12">
            <div class="flex flex-row justify-between px-5">
              <section-switcher
                v-model="tab"
                :tabs="[`All`, `Courses`, `Webinars`]"
              />
            </div>
            <hr class="border-gray-300 mx-4 md:mx-0" />

            <!-- All -->
            <section v-if="tab === 0" class="flex flex-row">
              <div class="chart w-4/6">
                <apexchart
                  width="100%"
                  height="250"
                  type="line"
                  :options="options"
                  :series="series"
                ></apexchart>
              </div>
              <div class="metrics w-2/6 flex flex-col pt-10 px-4">
                <p class="text-xs pb-5">
                  The data being shown is for Sep. 2020 - Oct. 2020.
                </p>
                <span class="text-xl font-bold">+ N34,000</span>
                <span class="text-xl font-bold">38 course sales</span>
                <span class="text-xl font-bold">41 webinar sales</span>
              </div>
            </section>

            <!-- Courses -->
            <section v-if="tab === 1" class="flex flex-row">
              <div class="chart w-4/6">
                <apexchart
                  width="100%"
                  height="250"
                  type="bar"
                  :options="courseOptions"
                  :series="courseSeries"
                ></apexchart>
              </div>
              <div class="metrics w-2/6 flex flex-col pt-10 px-4">
                <p class="text-xs pb-5">
                  The data being shown is for Sep. 2020 - Oct. 2020.
                </p>
                <span class="text-xl font-bold">+ N34,000</span>
                <span class="text-xl font-bold">38 course sales</span>
                <span class="text-xl font-bold">41 webinar sales</span>
              </div>
            </section>

            <!-- Webinars -->
            <section v-if="tab === 2" class="flex flex-row">
              <div class="chart w-4/6">
                <apexchart
                  width="100%"
                  height="250"
                  type="bar"
                  :options="webinarOptions"
                  :series="webinarSeries"
                ></apexchart>
              </div>
              <div class="metrics w-2/6 flex flex-col pt-10 px-4">
                <p class="text-xs pb-5">
                  The data being shown is for Sep. 2020 - Oct. 2020.
                </p>
                <span class="text-xl font-bold">+ N34,000</span>
                <span class="text-xl font-bold">38 course sales</span>
                <span class="text-xl font-bold">41 webinar sales</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // components: { tester },
  middleware: ['check-auth', 'auth'],
  props: {
    tabs: { type: Number, required: false },
    dataAll: { type: Array, required: false },
    dataCourses: { type: Array, required: false },
    dataWebinars: { type: Array, required: false },
  },
  name: 'completed-courses',
  fetch({ store }) {
    store.commit('app/SET_DARK_MENU', true)
    store.commit('app/SET_TITLE', 'Students')
  },
  data: () => ({
    tab: 0,
    home: 'home',
    actionOpt: false,
    isCourses: {
      preview: true,
      students: false,
      draft: false,
    },
    options: {
      chart: {
        id: 'financials',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#F99E42', '#0797CE'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [2, 2, 2],
        curve: 'straight',
        // dashArray: [0, 8, 5]
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
      legend: {
        show: false,
      },
    },
    series: [
      {
        name: 'Course sales',
        data: [3, 30, 24, 56, 49, 70, 30, 71],
      },
      {
        name: 'Webinar sales',
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
    courseOptions: {
      chart: {
        id: 'courses',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#F99E42'],
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20%',
          endingShape: 'rounded',
          borderRadius: 5,
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
        // dashArray: [0, 8, 5]
      },
      fill: {
        opacity: 1,
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
      legend: {
        show: false,
      },
    },
    courseSeries: [
      {
        name: 'Sales',
        data: [3, 30, 24, 56, 49, 70, 30, 71],
      },
    ],
    webinarOptions: {
      chart: {
        id: 'webinars',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#0797CE'],
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '20%',
          endingShape: 'rounded',
          borderRadius: 5,
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
        // dashArray: [0, 8, 5]
      },
      fill: {
        opacity: 1,
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
      legend: {
        show: false,
      },
    },
    webinarSeries: [
      {
        name: 'Sales',
        data: [3, 30, 24, 56, 49, 70, 30, 71],
      },
    ],
  }),
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      profileImage: (state) => state.auth.profileImage,
    }),
  },
  // mounted() {
  //   if (this.$device.isMobile) {
  //     this.tabs.unshift('Home')
  //   }
  // },
  watch: {
    tab: {
      handler(newValue, oldValue) {
        console.log(
          'Tab ->>',
          this.tab,
          'change in tab',
          'new ->',
          newValue,
          'old ->',
          oldValue
        )
        // if (newValue === 0) {
        //   this.$store
        //     .dispatch('financials/getFinanceAllSales', 1)
        //     .then((res) => {
        //       console.log('DAta In Auditing', res)
        //       this.loading = false
        //       // this.settings = res
        //       if (res) {
        //         // this.showSuccess(res)
        //       }
        //     })
        //     .catch((e) => console.log('e: ', e))
        // } else if (newValue === 1) {
        //   // Course sales
        //   this.$store
        //     .dispatch('financials/getFinanceCourseSales', 1)
        //     .then((res) => {
        //       console.log('DAta In Auditing', res)
        //       this.loading = false
        //       // this.settings = res
        //       if (res) {
        //         // this.showSuccess(res)
        //       }
        //     })
        //     .catch((e) => console.log('e: ', e))
        // } else if (newValue === 2) {
        //   // Webinar sales
        //   this.$store
        //     .dispatch('financials/getFinanceWebinarsSales', 1)
        //     .then((res) => {
        //       console.log('DAta In Auditing', res)
        //       this.loading = false
        //       // this.settings = res
        //       if (res) {
        //         // this.showSuccess(res)
        //       }
        //     })
        //     .catch((e) => console.log('e: ', e))
        // }
      },
    },
  },
  methods: {
    toggleActionOpt() {
      this.actionOpt = !this.actionOpt
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
