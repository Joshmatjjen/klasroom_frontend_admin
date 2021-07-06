<template>
  <div class="bg-white rounded-xl border-gray-300 shadow-hover relative">
    <div
      class="fixed"
      :class="{ hidden: !opt }"
      :style="{
        width: '100%',
        height: '100vh',
        zIndex: 2,
        marginTop: '-22rem',
        marginLeft: '-130px',
      }"
      @click="toggleMenu"
    ></div>

    <hr />
    <div
      class="pb-1 md:pb-2 lg:pb-2 overflow-x-auto overflow-y-auto scrollbar-thumb-orange scrollbar-thumb-rounded scrollbar-track-orange-lighter scrollbar-w-2 scrolling-touch"
    >
      <vue-good-table
        :columns="columns"
        :rows="rows"
        row-style-class="vgt-checkbox-col table-row"
        :select-options="{
          enabled: false,
        }"
        :search-options="{ enabled: false }"
        styleClass="vgt-table vgt-wrap vgt-left-align vgt-right-align striped"
      >
        <template slot="table-row" slot-scope="props">
          <nuxt-link
            :to="
              props.row.name ? route + props.row.name : route + props.row.title
            "
            class="relative"
          >
            <span
              v-if="
                props.column.field == 'name' ||
                props.column.field == 'webinarTitle' ||
                props.column.field == 'courseTitle'
              "
              class="flex flex-row"
            >
              <div class="flex flex-row items-center">
                <img
                  v-if="!onDraft"
                  :src="props.row.imageUrl"
                  alt="My profile"
                  class="course-image mr-3 rounded-lg"
                />
                <div
                  v-if="!props.row.imageUrl"
                  class="course-image mr-3"
                  :style="{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }"
                >
                  <img src="/icon/empty-pics-icon.svg" alt="My profile" />
                </div>
                <div class="flex flex-col" v-if="props.row.name">
                  <span class="text-gray-700 font-semibold text-left text-md">{{
                    props.row.name
                  }}</span>
                </div>
                <div class="flex flex-col" v-else>
                  <span class="text-gray-700 font-semibold text-left text-md">{{
                    props.row.title
                  }}</span>
                  <span class="text-gray-700 font-normal text-left text-xs">{{
                    props.row.desc
                  }}</span>
                </div>
              </div>
              <!-- Draft for webinar Start -->
              <!-- <div
              v-if="onDraft && props.column.field == 'name'"
              class="flex flex-row gap-5 items-center justify-end relative"
            >
              <div class="bg-gray-300 w-16 h-5 rounded-xl"></div>
              <div class="bg-gray-300 w-16 h-5 rounded-xl"></div>
              <div class="bg-gray-300 w-16 h-5 rounded-xl"></div>
            </div> -->

              <!-- Draft for webinar End -->
            </span>

            <span v-else-if="props.column.field == 'title'">
              <span class="text-gray-700 text-left">{{
                props.row.courseName || props.row.webinarName
              }}</span>
            </span>
            <span v-else-if="props.column.field == 'student'">
              <span class="text-gray-700 text-left">{{
                props.row.studentName
              }}</span>
            </span>

            <span v-else-if="props.column.field == 'date'">
              <span class="text-gray-700 text-left">{{
                props.row.purchasedAt.substring(0, 12)
              }}</span>
            </span>

            <span v-else-if="props.column.field == 'time'">
              <span class="text-gray-700 text-left">{{
                props.row.purchasedAt.substring(13)
              }}</span>
            </span>
            <!-- //end          ;   -->
            <span v-else-if="props.column.field == 'price'">
              <span class="text-gray-700 font-semibold"
                >₦{{ props.row.price }}</span
              >
            </span>
            <span v-else-if="props.column.field == 'amount'">
              <span class="text-gray-700 font-semibold"
                >₦{{ props.row.amount }}</span
              >
            </span>
            <span v-else-if="props.column.field == 'newBalance'">
              <span class="text-gray-700 font-semibold"
                >₦{{ props.row.newBalance }}</span
              >
            </span>
            <span v-else-if="props.column.field == 'attendance'">
              <span class="text-gray-700 font-normal">{{
                props.row.attendance
                  ? props.row.attendance.toLocaleString()
                  : '-----'
              }}</span>
            </span>
            <span
              v-else-if="
                props.column.field == 'rating' && props.row.rating !== ''
              "
              class="flex flex-row"
            >
              <rating :grade="props.row.rating" :viewOnly="true" />
              <span class="pl-2">{{ ' ' + props.row.rating + ' stars' }}</span>
            </span>
            <span
              class="items-center relative"
              v-else-if="props.column.field == 'status'"
            >
              <span
                class="dot absolute rounded-full"
                :class="
                  props.row.status === 'Active' ||
                  props.row.status === 'Completed'
                    ? 'bg-green-500'
                    : props.row.status === 'Upcoming'
                    ? 'bg-gray-500'
                    : props.row.status === 'Success'
                    ? ''
                    : 'bg-gray-500'
                "
              ></span>
              <span class="text-gray-700 text-center">{{
                props.row.status
              }}</span>
            </span>
            <span
              v-else-if="props.column.field == 'progress'"
              class="flex flex-row"
            >
              <progress-bar :percentage="props.row.progress" />
              <span class="pl-2">{{ ' ' + props.row.progress + '%' }}</span>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
            <span
              v-if="
                (props.column.field === 'lastActive' &&
                  !rows.some((obj) => Object.keys(obj).includes('status')) &&
                  !rows.some((obj) =>
                    Object.keys(obj).includes('dateStarted')
                  )) ||
                (props.column.field === 'status' &&
                  !rows.some((obj) => Object.keys(obj).includes('date')) &&
                  !rows.some((obj) =>
                    Object.keys(obj).includes('dateStarted')
                  ) &&
                  !rows.some((obj) =>
                    Object.keys(obj).includes('dateCompleted')
                  )) ||
                (props.column.field === 'status' &&
                  rows.some((obj) => Object.keys(obj).includes('action'))) ||
                props.column.field === 'dateStarted' ||
                props.column.field === 'dateCompleted' ||
                (props.column.field == 'rating' &&
                  !rows.some((obj) => Object.keys(obj).includes('date')) &&
                  !rows.some((obj) =>
                    Object.keys(obj).includes('dateStarted')
                  ) &&
                  !rows.some((obj) =>
                    Object.keys(obj).includes('dateCompleted')
                  ))
              "
            >
              <div class="absolute right-0 -mr-4">
                <span
                  v-on:click.prevent="toggleMenu(props.row.id)"
                  class="absolute z-50 bottom-0 -mb-1 right-0 -mr-2 text-gray-600 cursor-pointer hover:text-gray-900 font-extrabold text-left text-lg"
                  >&#xFE19;</span
                >
                <div
                  :class="{
                    hidden: opt && props.row.id === optId ? false : true,
                  }"
                  class="pop-up flex flex-col items-start p-2 justify-around pop-up absolute top-0 right-1/2 mt-2 border-gray-500 bg-white rounded-lg h-32 w-32 shadow-lg"
                  :style="{ zIndex: 100 }"
                >
                  <a
                    href="#"
                    class="pop-up-item lg:mr-4 md:text-gray-700 text-sm font-normal hover:text-gray-900 md:bg-transparent block md:inline-block mb-5 md:mb-0"
                  >
                    <p>Edit webinar</p>
                  </a>
                  <a
                    href="#"
                    class="pop-up-item lg:mr-4 md:text-gray-700 text-sm font-normal hover:text-gray-900 md:bg-transparent block md:inline-block mb-5 md:mb-0"
                  >
                    <p>Delete</p>
                  </a>
                  <a
                    href="#"
                    class="pop-up-item lg:mr-4 md:text-gray-700 text-sm font-normal hover:text-gray-900 md:bg-transparent block md:inline-block mb-5 md:mb-0"
                  >
                    <p>Share</p>
                  </a>
                  <a
                    href="#"
                    class="pop-up-item lg:mr-4 md:text-gray-700 text-sm font-normal hover:text-gray-900 md:bg-transparent block md:inline-block mb-5 md:mb-0"
                  >
                    <p>Preview</p>
                  </a>
                </div>
              </div>
            </span>
          </nuxt-link>
        </template>
      </vue-good-table>
    </div>
    <!-- <div v-if="more" class="absolute text-center bottom-0 mb-5 w-full px-5">
      <hr data-v-6cf0f546="" class="mb-4" />
      <nuxt-link :to="more" class="text-gray-700 inline-block">
        <span class="text-xs">See more</span>
      </nuxt-link>
    </div> -->
  </div>
  <!-- <img
    v-for="(item, key) in items"
    :key="key"
    src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
    alt="My profile"
    class="course-stacks mr-3"
  /> -->
</template>

<script>
import moment from 'moment'

export default {
  props: {
    title: { type: String, required: false },
    columns: { type: Array, required: false },
    rows: { type: Array, required: false },
    type: { type: String, required: false },
    total: { type: Number, required: false },
    onDraft: { type: Boolean, required: false },
    route: { type: String, required: false },
    // more: { type: String, default: null },
  },
  name: 'list-table1',
  data: () => ({
    opt: false,
    optId: null,
  }),

  methods: {
    toggleMenu(optId) {
      this.opt = !this.opt
      if (optId) this.optId = optId
    },
    formatTime(date) {
      return moment(date).format('LT')
    },
    formatDate(date) {
      return moment(date).format('ll')
    },
  },
}
</script>

<style scoped>
.top-right {
  height: 80%;
}
.dot {
  top: 0.3rem;
  left: -0.8rem;
  width: 0.3rem;
  height: 0.3rem;
}
.course-image {
  display: inline-block;
  width: 40px;
  height: 30px;
  @apply bg-gray-300;

  /* border: 1px solid rgba(0, 0, 0, 0.1); */
}

.pop-up {
  border-width: 0.1rem;
}
.vgt-table > thead > th {
  @apply font-normal text-xs;
}
.vgt-wrap {
  min-width: 60rem;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 0.5rem;
}
.vgt-left-align > span {
  /* pr-10 */
  @apply text-gray-700 font-normal text-left text-xs pr-5;
}
.vgt-right-align > span {
  /* pr-10 */
  @apply text-gray-700 font-normal text-left text-xs pr-5;
}

@media (max-width: 640px) {
  h4 {
    @apply text-base;
  }
}
</style>
