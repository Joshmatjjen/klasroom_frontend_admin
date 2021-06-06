<template>
  <div class="bg-white rounded-xl border border-gray-300 shadow-hover relative">
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
    <div class="flex flex-row justify-between px-5 my-5">
      <p class="text-sm font-semibold">
        {{ total ? total.toLocaleString() : row ? rows.length : 0 }} {{ type }}
      </p>
      <div class="flex flex-row gap-5">
        <p class="text-xs font-medium">Export CSV</p>
        <div class="vl"></div>
        <div class="flex flex-row">
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
        </div>
      </div>
    </div>
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
                (props.column.field == 'name' &&
                  !rows.some((obj) => Object.keys(obj).includes('time'))) ||
                props.column.field == 'webinarTitle' ||
                props.column.field == 'courseTitle'
              "
              class="flex flex-row"
            >
              <div class="flex flex-row items-center">
                <img
                  v-if="!onDraft && props.row.imageUrl"
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
                  <img src="/icon/empty-pics-icon.svg" alt="" />
                </div>
                <div class="flex flex-col" v-if="props.row.name">
                  <span class="text-gray-700 font-semibold text-left text-md">{{
                    props.row.name
                  }}</span>
                </div>
                <div class="flex flex-col" v-else>
                  <span class="text-gray-700 font-semibold text-left text-md">{{
                    props.row.title
                  }}</span
                  ><span class="text-gray-700 font-normal text-left text-xs">{{
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
            <div
              class="flex flex-col"
              v-else-if="
                props.column.field == 'name' &&
                checkKeyPresenceInArray(rows, 'time') === true
              "
            >
              <span class="text-gray-700 font-semibold text-left text-md">{{
                props.row.name
              }}</span>
            </div>
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
              <span class="text-gray-700 font-medium"
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
                (props.column.field === 'date' &&
                  !rows.some((obj) => Object.keys(obj).includes('action')) &&
                  !rows.some((obj) => Object.keys(obj).includes('time'))) ||
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
    checkKeyPresenceInArray(arr, key) {
      return arr.some((obj) => Object.keys(obj).includes(key))
    },
  },
}
</script>

<style scoped>
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
