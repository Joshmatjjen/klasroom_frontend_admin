<template>
  <div
    v-if="webinars && previousWebinars && draftWebinars"
    class="min-h-screen mb-24"
  >
    <section class="bg-orange-100">
      <div class="container mx-auto mb-10 px-4 lg:px-0">
        <div class="md:grid grid-cols-4 gap-5 space-y-3 md:space-y-0">
          <dash-item-metrics
            title="3 webinars"
            label="Published"
            link="/student/webinars"
          />
          <dash-item-metrics
            title="34,600"
            label="Archived"
            link="/student/webinars"
          />
          <dash-item-metrics title="3,540" label="webinar sales" />
          <dash-item-metrics title="20 webinars" label="Attendees" />
        </div>
      </div>
    </section>

    <section>
      <div
        class="flex flex-row gap-10 place-items-start px-10 border-b-2 border-gray-200"
      >
        <button
          v-on:click="switcher('upcoming')"
          v-bind:class="{ active: isWebinars.upcoming }"
          class="menu-btn"
        >
          <p class="text-xs text-gray-700">Upcoming webinars</p>
        </button>
        <button
          v-on:click="switcher('previous')"
          v-bind:class="{ active: isWebinars.previous }"
          class="menu-btn"
        >
          <p class="text-xs text-gray-700">Previous webinars</p>
        </button>
        <!-- <button
          v-on:click="switcher('klasroomUpcom')"
          v-bind:class="{ active: isWebinars.klasroomUpcom }"
          class="menu-btn"
        >
          <p class="text-xs text-gray-700">Klasroom upcoming webinars</p>
        </button>
        <button
          v-on:click="switcher('klasroomPrev')"
          v-bind:class="{ active: isWebinars.klasroomPrev }"
          class="menu-btn"
        >
          <p class="text-xs text-gray-700">Klasroom previous webinars</p>
        </button> -->
        <button
          v-on:click="switcher('archived')"
          v-bind:class="{ active: isWebinars.archived }"
          class="menu-btn"
        >
          <p class="text-xs text-gray-700">Archived webinars</p>
        </button>
      </div>
    </section>

    <section>
      <!-- Upcoming -->
      <div v-if="isWebinars.upcoming" class="relative">
        <div class="container mx-auto my-10 px-2 lg:px-0">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12">
              <webinar-table
                :columns="columnsUpcoming"
                :rows="webinars.data"
                type="Upcoming webinars"
              />
            </div>
          </div>
        </div>
        <span class="absolute right-0">
          <loader v-if="loading" color="black" />
        </span>
        <t-pagination
          :total-items="webinars.pagination.count"
          :per-page="webinars.pagination.limit"
          :limit="4"
          :variant="'roundedSmall'"
          :value="webinars.pagination.currentPage"
          @change="changePage"
        />
      </div>

      <!-- previous -->
      <div v-if="isWebinars.previous" class="relative">
        <div class="container mx-auto my-10 px-2 lg:px-0">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12">
              <webinar-table
                :columns="columnPrevious"
                :rows="previousWebinars.data"
                type="Previous Webinars"
              />
            </div>
          </div>
        </div>
        <span class="absolute right-0">
          <loader v-if="loading" color="black" />
        </span>
        <t-pagination
          :total-items="previousWebinars.pagination.count"
          :per-page="previousWebinars.pagination.limit"
          :limit="4"
          :variant="'roundedSmall'"
          :value="previousWebinars.pagination.currentPage"
          @change="changePage"
        />
      </div>

      <!-- klasroom upcoming -->
      <!-- <div v-if="isWebinars.klasroomUpcom" class="container mx-auto my-10 px-2 lg:px-0">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <webinar-table
              :columns="columnsDraft"
              :rows="rowsDraft"
              :onDraft="true"
            />
          </div>
        </div>
      </div> -->

      <!-- klasroom previous -->
      <!-- <div v-if="isWebinars.klasroomPrev" class="container mx-auto my-10 px-2 lg:px-0">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <webinar-table
              :columns="columnsDraft"
              :rows="rowsDraft"
              :onDraft="true"
            />
          </div>
        </div>
      </div> -->

      <!-- webimar archived -->
      <div v-if="isWebinars.archived" class="relative">
        <div class="container mx-auto my-10 px-2 lg:px-0">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12">
              <webinar-table
                :columns="columnsDraft"
                :rows="draftWebinars.data"
                type="Archived Webinars"
                :onDraft="true"
              />
            </div>
          </div>
        </div>

        <span class="absolute right-0">
          <loader v-if="loading" color="black" />
        </span>
        <t-pagination
          :total-items="draftWebinars.pagination.count"
          :per-page="draftWebinars.pagination.limit"
          :limit="4"
          :variant="'roundedSmall'"
          :value="draftWebinars.pagination.currentPage"
          @change="changePage"
        />
      </div>
    </section>
  </div>
  <loader-2 v-else />
</template>

<script>
import { mapState } from 'vuex'

const courses = require('@/static/json/courses.json')
const webinars = require('@/static/json/webinars.json')
const webinarUpcoming = require('@/static/json/upcoming-webinars.json')
const webinarRecorded = require('@/static/json/webinar-recorded.json')
const webinarDraft = require('@/static/json/webinar-draft.json')

export default {
  middleware: ['check-auth', 'auth'],
  async fetch() {
    this.$store.commit('app/SET_TITLE', 'Webinars')
    try {
      await this.$store.dispatch('webinar/getUpcomingWebinars')
      await this.$store.dispatch('webinar/getPreviousWebinars')
      await this.$store.dispatch('webinar/getDraftWebinars')
    } catch (err) {
      console.log(err)
    }
  },
  // call fetch only on client-side
  fetchOnServer: false,
  data: () => ({
    courses: _.take(courses, 4),
    // webinars: _.take(webinars, 4),
    undoneTasks: _.take(courses, 3),
    // Upcoming
    columnsUpcoming: [
      {
        label: 'Webinar title',
        field: 'webinarTitle',
      },
      {
        label: 'owner',
        field: 'owner',
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
        label: 'Type',
        field: 'webinarType',
      },
      {
        label: 'Date',
        field: 'date',
        type: 'date',
        dateInputFormat: 'yyyy-MM-dd',
        dateOutputFormat: 'MMM do yy',
      },
    ],
    rowsUpcoming: _.take(webinarUpcoming, 4),
    // Recorded
    columnPrevious: [
      {
        label: 'Webinar title',
        field: 'webinarTitle',
      },
      {
        label: 'Owner',
        field: 'owner',
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
        label: 'Type',
        field: 'webinarType',
      },
      {
        label: 'Rating',
        field: 'rating',
      },
      {
        label: 'Date',
        field: 'date',
        type: 'date',
        dateInputFormat: 'yyyy-MM-dd',
        dateOutputFormat: 'MMM do yy',
      },
    ],
    rowsRecorded: _.take(webinarRecorded, 4),
    columnsDraft: [
      {
        label: 'Webinal title',
        field: 'webinarTitle',
      },
    ],
    rowsDraft: _.take(webinarDraft, 4),

    isWebinars: {
      upcoming: true,
      previous: false,
      klasroomUpcom: false,
      klasroomPrev: false,
      archived: false,
    },

    loading: false,
  }),
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      token: (state) => state.auth.token,
      webinars: (state) => state.webinar.webinars,
      previousWebinars: (state) => state.webinar.previousWebinars,
      draftWebinars: (state) => state.webinar.draftWebinars,
    }),
  },
  methods: {
    switcher: function (value) {
      switch (value) {
        case 'upcoming':
          this.isWebinars.upcoming = true
          this.isWebinars.previous = false
          this.isWebinars.klasroomUpcom = false
          this.isWebinars.klasroomPrev = false
          this.isWebinars.archived = false
          break
        case 'previous':
          this.isWebinars.upcoming = false
          this.isWebinars.previous = true
          this.isWebinars.klasroomUpcom = false
          this.isWebinars.klasroomPrev = false
          this.isWebinars.archived = false
          break
        // case 'klasroomUpcom':
        //   this.isWebinars.upcoming = false
        //   this.isWebinars.previous = false
        //   this.isWebinars.klasroomUpcom = true
        //   this.isWebinars.klasroomPrev = false
        //   this.isWebinars.archived = false
        //   break
        // case 'klasroomPrev':
        //   this.isWebinars.upcoming = false
        //   this.isWebinars.previous = false
        //   this.isWebinars.klasroomUpcom = false
        //   this.isWebinars.klasroomPrev = true
        //   this.isWebinars.archived = false
        //   break
        case 'archived':
          this.isWebinars.upcoming = false
          this.isWebinars.previous = false
          this.isWebinars.klasroomUpcom = false
          this.isWebinars.klasroomPrev = false
          this.isWebinars.archived = true
          break
        default:
          this.isWebinars.upcoming = true
          this.isWebinars.previous = false
          this.isWebinars.klasroomUpcom = false
          this.isWebinars.klasroomPrev = false
          this.isWebinars.archived = false
      }
      // some code to filter users
    },

    async changePage(pagination) {
      console.log('This is the pagination page -->', pagination)
      this.loading = true
      if (this.isWebinars.upcoming) {
        try {
          await this.$store.dispatch('webinar/getUpcomingWebinars', pagination)
          this.loading = false
        } catch (err) {
          console.log(err)
          this.loading = false
        }
      }

      if (this.isWebinars.previous) {
        try {
          await this.$store.dispatch('webinar/getPreviousWebinars', pagination)
          this.loading = false
        } catch (err) {
          console.log(err)
          this.loading = false
        }
      }

      if (this.isWebinars.archived) {
        try {
          await this.$store.dispatch('webinar/getDraftWebinars', pagination)
          this.loading = false
        } catch (err) {
          console.log(err)
          this.loading = false
        }
      }
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
