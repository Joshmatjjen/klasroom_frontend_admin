<template>
  <div class="min-h-screen mb-24">
    <section-switcher v-model="tab" :tabs="[`Students`, `Tutors`, `Admins`]" />
    <!-- Students Section -->
    <section v-if="tab === 0">
      <section class="bg-orange-100" v-if="studentsSummary">
        <div class="container mx-auto mb-10 px-4 mt-8 lg:px-0">
          <div class="md:grid grid-cols-3 gap-5 space-y-3 md:space-y-0">
            <dash-item-metrics
              :title="studentsSummary.activeStudentsNo.toLocaleString()"
              label="Active Student"
              type="filter"
              tableType="Students"
              :filterData="filterData"
              filterType="active"
            />
            <dash-item-metrics
              :title="studentsSummary.dormantStudentsNo.toLocaleString()"
              label="Dormant Students"
              link="/webinars"
              type="filter"
              tableType="Students"
              :filterData="filterData"
              filterType="inactive"
            />
            <dash-item-metrics
              :title="studentsSummary.suspendedStudentsNo.toLocaleString()"
              label="Suspended Students"
              type="filter"
              tableType="Students"
              :filterData="filterData"
              filterType="inactive"
            />
          </div>
        </div>
      </section>
      <section v-if="students">
        <div class="container mx-auto my-10 px-2 lg:px-0">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12">
              <list-table-1
                :columns="studentColumns"
                :rows="students ? students.data : []"
                type="Students"
                :total="students ? students.pagination.count : 0"
                route="/people/students/"
                :exportCSV="exportCSV"
              />
            </div>
          </div>
        </div>
      </section>
      <section v-if="students">
        <t-pagination
          :total-items="students.pagination.count"
          :per-page="students.pagination.limit"
          :limit="4"
          :variant="'roundedSmall'"
          :value="students.pagination.currentPage"
          @change="changePage"
        />
      </section>
    </section>

    <!-- Tutors Section -->
    <section v-if="tab === 1">
      <section class="bg-orange-100" v-if="tutorsSummary">
        <div class="container mx-auto mb-10 px-4 mt-8 lg:px-0 place-self-end">
          <div class="md:grid grid-cols-3 gap-5 space-y-3 md:space-y-0">
            <dash-item-metrics
              :title="tutorsSummary.activeTutorsNo.toLocaleString()"
              label="Active Tutor"
              type="filter"
              tableType="Tutors"
              :filterData="filterData"
              filterType="active"
            />
            <dash-item-metrics
              :title="tutorsSummary.dormantTutorsNo.toLocaleString()"
              label="Dormant Tutors"
              type="filter"
              tableType="Tutors"
              :filterData="filterData"
              filterType="inactive"
            />
            <dash-item-metrics
              :title="tutorsSummary.suspendedTutorsNo.toLocaleString()"
              label="Suspended Tutors"
              type="filter"
              tableType="Tutors"
              :filterData="filterData"
              filterType="inactive"
            />
          </div>
        </div>
      </section>
      <section v-if="tutors">
        <div class="container mx-auto my-10 px-2 lg:px-0">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12">
              <list-table-1
                :columns="studentColumns"
                :rows="tutors ? tutors.data : []"
                type="Tutors"
                :total="tutors ? tutors.pagination.count : 0"
                route="/people/tutors/"
                :exportCSV="exportCSV"
              />
            </div>
          </div>
        </div>
      </section>
      <section v-if="tutors">
        <t-pagination
          :total-items="tutors.pagination.count"
          :per-page="tutors.pagination.limit"
          :limit="4"
          :variant="'roundedSmall'"
          :value="tutors.pagination.currentPage"
          @change="changePage"
        />
      </section>
    </section>

    <!-- Admins Section -->
    <section v-if="tab === 2">
      <section class="bg-orange-100" v-if="adminsSummary">
        <div class="container mx-auto mb-10 px-4 mt-8 lg:px-0">
          <div class="md:grid grid-cols-3 gap-5 space-y-3 md:space-y-0">
            <dash-item-metrics
              :title="adminsSummary.activeAdminsNo.toLocaleString()"
              label="Active Admin"
              type="filter"
              tableType="Admins"
              :filterData="filterData"
              filterType="active"
            />
            <dash-item-metrics
              :title="adminsSummary.dormantAdminsNo.toLocaleString()"
              label="Dormant Admins"
              type="filter"
              tableType="Admins"
              :filterData="filterData"
              filterType="inactive"
            />
            <dash-item-metrics
              :title="adminsSummary.suspendedAdminsNo.toLocaleString()"
              label="Suspended Admins"
              type="filter"
              tableType="Admins"
              :filterData="filterData"
              filterType="inactive"
            />
          </div>
        </div>
      </section>
      <section v-if="admins">
        <div class="container mx-auto my-10 px-2 lg:px-0">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12">
              <list-table-1
                :columns="studentColumns"
                :rows="admins ? admins.data : []"
                type="Admins"
                :total="admins ? admins.pagination.count : 0"
                route="/people/admins/"
                :exportCSV="exportCSV"
              />
            </div>
          </div>
        </div>
      </section>
      <section v-if="admins">
        <t-pagination
          :total-items="admins.pagination.count"
          :per-page="admins.pagination.limit"
          :limit="4"
          :variant="'roundedSmall'"
          :value="admins.pagination.currentPage"
          @change="changePage"
        />
      </section>
    </section>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import { mapState } from 'vuex'
const courses = require('@/static/json/courses.json')

export default {
  middleware: ['check-auth', 'auth'],
  fetch({ store }) {
    store.commit('app/SET_TITLE', 'People')
  },
  data: () => ({
    undoneTasks: _.take(courses, 3),
    tab: 0,
    current: 1,
    perPage: 2,
    total: 20,
    currentTotal: 20,
    currentPage: 1,
    limit: 4,

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
        field: 'createdAt',
      },
      {
        label: 'Status',
        field: 'isActive',
      },
    ],
  }),

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      students: (state) => state.people.students,
      studentsSummary: (state) => state.people.studentsSummary,
      tutors: (state) => state.people.tutors,
      tutorsSummary: (state) => state.people.tutorsSummary,
      admins: (state) => state.people.admins,
      adminsSummary: (state) => state.people.adminsSummary,
    }),
  },

  created() {
    console.log('Checking Created')

    this.$store
      .dispatch('people/getStudentsSummary')
      .then((res) => {
        console.log(res)
        this.loading = false
        // this.settings = res
        if (res) {
          // this.showSuccess(res)
        }
      })
      .catch((e) => console.log('e: ', e))

    this.$store
      .dispatch('people/getStudents')
      .then((res) => {
        console.log(res)
        this.loading = false
        // this.settings = res
        if (res) {
          // this.showSuccess(res)
        }
      })
      .catch((e) => console.log('e: ', e))

    //Tutors
    this.$store
      .dispatch('people/getTutors')
      .then((res) => {
        console.log(res)
        // this.loading = false
        // this.settings = res
        if (res) {
          // this.showSuccess(res)
        }
      })
      .catch((e) => console.log('e: ', e))

    this.$store
      .dispatch('people/getTutorsSummary')
      .then((res) => {
        console.log(res)
        this.loading = false
        // this.settings = res
        if (res) {
          // this.showSuccess(res)
        }
      })
      .catch((e) => console.log('e: ', e))

    // Admins

    this.$store
      .dispatch('people/getAdmins')
      .then((res) => {
        console.log(res)
        // this.loading = false
        // this.settings = res
        if (res) {
          // this.showSuccess(res)
        }
      })
      .catch((e) => console.log('e: ', e))

    this.$store
      .dispatch('people/getAdminsSummary')
      .then((res) => {
        console.log(res)
        this.loading = false
        // this.settings = res
        if (res) {
          // this.showSuccess(res)
        }
      })
      .catch((e) => console.log('e: ', e))

    if (
      this.$route.params &&
      Object.keys(this.$route.params).length !== 0 &&
      this.$route.params.constructor === Object
    ) {
      console.log(this.$route.params)
      this.tab = this.$route.params.tab
    } else this.tab = 0
  },

  watch: {
    tab: {
      handler(newValue, oldValue) {
        console.log('change in tab', 'new ->', newValue, 'old ->', oldValue)
        if (newValue === 0) {
          this.$store
            .dispatch('people/getStudents')
            .then((res) => {
              console.log(res)
              // this.loading = false
              // this.settings = res
              if (res) {
                // this.showSuccess(res)
              }
            })
            .catch((e) => console.log('e: ', e))

          this.$store
            .dispatch('people/getStudentsSummary')
            .then((res) => {
              console.log(res)
              this.loading = false
              // this.settings = res
              if (res) {
                // this.showSuccess(res)
              }
            })
            .catch((e) => console.log('e: ', e))
        } else if (newValue === 1) {
          this.$store
            .dispatch('people/getTutors')
            .then((res) => {
              console.log(res)
              // this.loading = false
              // this.settings = res
              if (res) {
                // this.showSuccess(res)
              }
            })
            .catch((e) => console.log('e: ', e))

          this.$store
            .dispatch('people/getTutorsSummary')
            .then((res) => {
              console.log(res)
              this.loading = false
              // this.settings = res
              if (res) {
                // this.showSuccess(res)
              }
            })
            .catch((e) => console.log('e: ', e))
        } else if (newValue === 2) {
          this.$store
            .dispatch('people/getAdmins')
            .then((res) => {
              console.log(res)
              // this.loading = false
              // this.settings = res
              if (res) {
                // this.showSuccess(res)
              }
            })
            .catch((e) => console.log('e: ', e))

          this.$store
            .dispatch('people/getAdminsSummary')
            .then((res) => {
              console.log(res)
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

  mounted() {
    // if (this.$device.isMobile) {
    //   this.tabs.unshift('Home')
    // }
  },
  methods: {
    changePage(pagination) {
      console.log(pagination, 'tab -> ', this.tab)
      if (this.tab === 0) {
        this.$store
          .dispatch('people/getStudents', pagination)
          .then((res) => {
            console.log(res)
            this.loading = false
            // this.settings = res
            if (res) {
              // this.showSuccess(res)
            }
          })
          .catch((e) => console.log('e: ', e))
      }
      if (this.tab === 1) {
        console.log('this is tab 1', this.tab)
        this.$store
          .dispatch('people/getTutors', pagination)
          .then((res) => {
            console.log(res)
            this.loading = false
            // this.settings = res
            if (res) {
              // this.showSuccess(res)
            }
          })
          .catch((e) => console.log('e: ', e))
        // this.currentPage = pagination.page
      }
      if (this.tab === 2) {
        this.$store
          .dispatch('people/getAdmins', pagination)
          .then((res) => {
            console.log(res)
            this.loading = false
            // this.settings = res
            if (res) {
              // this.showSuccess(res)
            }
          })
          .catch((e) => console.log('e: ', e))
        // this.currentPage = pagination.page
      }
    },
    async filterData(type, tableType) {
      console.log(type)
      this.$store
        .dispatch('people/filterPeople', { type, tableType })
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
    exportCSV(type) {
      this.$store
        .dispatch('people/exportCsvData', type)
        .then((res) => {
          console.log('downloaded')
          // if (res) {
          // }
        })
        .catch((e) => console.log('e: ', e))
    },
    isEmptyObject(value) {
      return (
        value && Object.keys(value).length === 0 && value.constructor === Object
      )
    },
  },
}
</script>
