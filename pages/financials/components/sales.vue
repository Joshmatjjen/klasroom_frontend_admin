<template>
  <div>
    <!-- Activity Log -->
    <section>
      <div class="container mx-auto mb-10 px-2 lg:px-0">
        <p class="text-base font-extrabold mb-3">Sales</p>
        <div
          class="grid grid-cols-12 gap-4 bg-white rounded-xl border border-gray-300 shadow-hover relative"
        >
          <div class="col-span-12">
            <div class="flex flex-row justify-between px-5">
              <section-switcher
                v-model="tab"
                :tabs="[`All`, `Courses`, `Webinars`]"
              />
              <div
                class="top-right self-center flex flex-row gap-5 align-middle items-center justify-center"
              >
                <p class="text-xs font-medium">Export CSV</p>
                <div class="vl -py-5"></div>
                <!-- <div class="flex flex-row items-center">
                  <p class="text-xs font-medium pr-3">Filter</p>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.4356 1.66675H1.56278C1.00127 1.66675 0.650609 2.27868 0.932509 2.76685L6.26341 11.8289V17.3432C6.26341 17.7488 6.58886 18.0766 6.99223 18.0766L13.0061 17.2433C13.4095 17.2433 13.7349 16.9155 13.7349 16.5099V11.8289L19.0681 2.76685C19.3477 2.27868 18.9971 1.66675 18.4356 1.66675ZM12.094 15.8334L7.9044 16.4264V12.8511H12.0962V15.5931L12.094 15.8334ZM12.314 11.0039L12.0962 11.3843H7.90211L7.68438 11.0039L3.13959 3.3169H16.8588L12.314 11.0039Z"
                      fill="#545454"
                    />
                  </svg>
                </div> -->
              </div>
            </div>
            <section v-if="dataAll && tab === 0">
              <list-table-2
                :columns="allSalesColumns"
                :rows="dataAll ? dataAll.data : []"
                type="Students"
                :total="124322"
                route="/people/students/"
              />
            </section>
            <section v-if="dataCourses && tab === 1">
              <list-table-2
                :columns="allSalesColumns"
                :rows="dataCourses ? dataCourses.data : []"
                type="Students"
                :total="124322"
                route="/people/students/"
              />
            </section>
            <section v-else-if="dataWebinars && tab === 2">
              <list-table-2
                :columns="allSalesColumns"
                :rows="dataWebinars ? dataWebinars.data : []"
                type="Students"
                :total="124322"
                route="/people/students/"
              />
            </section>
            <!-- <list-table-2
              v-if="tab === 1"
              :columns="allSalesColumns"
              :rows="dataCourses && tab === 1 ? dataCourses.data : []"
              type="Students"
              :total="124322"
              route="/people/students/"
            /> -->

            <!-- <list-table-2
              v-if="
                (dataAll && tab === 0) ||
                (dataCourses && tab === 1) ||
                (dataWebinars && tab === 2)
              "
              :columns="allSalesColumns"
              :rows="
                dataAll && tab === 0
                  ? dataAll.data
                  : dataCourses && tab === 1
                  ? dataCourses.data
                  : dataWebinars && tab === 2
                  ? dataWebinars.data
                  : []
              "
              type="Students"
              :total="124322"
              route="/people/students/"
            /> -->
          </div>
        </div>
      </div>
    </section>

    <section v-if="dataAll && dataCourses && dataWebinars">
      <!-- <t-pagination
        :total-items="
          (tab === 0 && dataAll.pagination.count) ||
          (tab === 1 && dataCourses.pagination.count) ||
          (tab === 2 && dataWebinars.pagination.count)
        "
        :per-page="
          (tab === 0 && dataAll.pagination.limit) ||
          (tab === 1 && dataCourses.pagination.limit) ||
          (tab === 2 && dataWebinars.pagination.limit)
        "
        :limit="4"
        :variant="'roundedSmall'"
        :value="
          (tab === 0 && dataAll.pagination.currentPage) ||
          (tab === 1 && dataCourses.pagination.currentPage) ||
          (tab === 2 && dataWebinars.pagination.currentPage)
        "
        @change="changePage"
      /> -->
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const allSales = require('@/static/json/all-sales.json')

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
    allSalesColumns: [
      {
        label: 'Title',
        field: 'title',
      },
      {
        label: 'Student',
        field: 'student',
      },
      {
        label: 'Type',
        field: 'type',
      },
      {
        label: 'Date',
        field: 'date',
        type: 'date',
        dateInputFormat: 'yyyy-MM-dd',
        dateOutputFormat: 'MMM do yy',
      },
      {
        label: 'Time',
        field: 'time',
      },
      {
        label: 'Price',
        field: 'price',
      },
    ],
    allSalesRows: _.take(allSales, 10),
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
        if (newValue === 0) {
          this.$store
            .dispatch('people/getTutorAllSales', {
              id: this.$route.params.slug.split('-')[1],
              pagination: 1,
            })
            .then((res) => {
              console.log('DAta In Auditing', res)
              this.loading = false
              // this.settings = res
              if (res) {
                // this.showSuccess(res)
              }
            })
            .catch((e) => console.log('e: ', e))
        } else if (newValue === 1) {
          // Course sales
          this.$store
            .dispatch('people/getTutorCourseSales', {
              id: this.$route.params.slug.split('-')[1],
              pagination: 1,
            })
            .then((res) => {
              console.log('DAta In Auditing', res)
              this.loading = false
              // this.settings = res
              if (res) {
                // this.showSuccess(res)
              }
            })
            .catch((e) => console.log('e: ', e))
        } else if (newValue === 2) {
          // Webinar sales
          this.$store
            .dispatch('people/getTutorWebinarsSales', {
              id: this.$route.params.slug.split('-')[1],
              pagination: 1,
            })
            .then((res) => {
              console.log('DAta In Auditing', res)
              this.loading = false
              // this.settings = res
              if (res) {
                // this.showSuccess(res)
              }
            })
            .catch((e) => console.log('e: ', e))
        }
      },
    },
  },
  methods: {
    toggleActionOpt() {
      this.actionOpt = !this.actionOpt
    },
    changePage(pagination) {
      this.$store
        .dispatch(
          (this.tab === 0 && 'people/getTutorAllSales') ||
            (this.tab === 1 && 'people/getTutorCourseSales') ||
            (this.tab === 2 && 'people/getTutorWebinarsSales'),
          {
            id: this.$route.params.slug.split('-')[1],
            pagination,
          }
        )
        .then((res) => {
          console.log(res)
          this.loading = false
          // this.settings = res
          if (res) {
            // this.showSuccess(res)
          }
        })
        .catch((e) => console.log('e: ', e))
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
