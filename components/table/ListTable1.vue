<template>
  <div class="bg-white rounded-xl border border-gray-300 shadow-hover relative">
    <!-- <div
      class="fixed"
      :class="{ hidden: !opt }"
      :style="{
        width: '100%',
        height: '100vh',
        zIndex: 2,
        marginTop: '-22rem',
        marginLeft: '-130px',
      }"
      @click="
        () => {
          toggleMenu()
          filterOpt && toggleFilter()
        }
      "
    ></div> -->
    <div class="flex flex-row justify-between px-5 my-5">
      <p class="text-sm font-semibold">
        {{ total ? total.toLocaleString() : row ? rows.length : 0 }} {{ type }}
      </p>
      <div class="flex flex-row gap-5">
        <p @click="exportCSV(type)" class="text-xs font-medium cursor-pointer">
          Export CSV
        </p>
        <div class="vl"></div>
        <div class="flex relative">
          <div class="flex flex-row cursor-pointer" @click="toggleFilter">
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
          <div
            :class="{
              hidden: filterOpt ? false : true,
            }"
            class="pop-up2 flex flex-col items-start px-3 absolute top-0 mt-8 pt-2 right-0 border-gray-500 bg-white rounded-lg min-h-100 shadow-lg"
            :style="{ zIndex: 100 }"
          >
            <!-- Status Filter -->
            <p class="text-xs md:text-sm text-gray-900 w-full text-center mb-2">
              Status
            </p>
            <img
              @click="toggleFilter()"
              class="absolute top-0 left-0 h-3 mt-3 ml-3 cursor-pointer"
              src="/close-orange.svg"
              alt=""
            />
            <t-radio-group
              name="radio"
              variant="filter1"
              :options="[
                { key: 'active', description: 'Filter by active' },
                { key: 'dormant', description: 'Filter by dormant' },
                { key: 'inactive', description: 'Filter by inactive' },
                { key: 'suspended', description: 'Filter by suspended' },
              ]"
              v-model="filter.status"
              value-attribute="key"
              text-attribute="description"
            ></t-radio-group>
            <hr data-v-56a57272="" class="mt-1 mb-2 w-full" />
            <!-- Date Filter -->
            <p class="text-xs md:text-sm text-gray-900 w-full text-center mb-2">
              Date
            </p>
            <div class="flex flex-col lg:flex-row gap-3">
              <div class="form-group mb-5">
                <span
                  for="filter-input"
                  class="text-xs md:text-sm mb-2 text-left text-gray-600 lg:text-right"
                  >From</span
                >
                <div>
                  <input
                    id="filter-input"
                    type="date"
                    class="form-input text-xs md:text-sm w-5"
                    v-model="filter.from"
                  />
                </div>
              </div>
              <div class="form-group mb-5">
                <span
                  for="filter-input"
                  class="text-xs md:text-sm mb-2 text-left text-gray-600 lg:text-right"
                  >To</span
                >
                <div>
                  <input
                    id="filter-input"
                    type="date"
                    class="form-input"
                    v-model="filter.to"
                  />
                </div>
              </div>
            </div>
            <!-- Last Active -->
            <div class="form-group mb-5">
              <span
                for="filter-input"
                class="text-xs md:text-sm mb-2 text-left text-gray-600 lg:text-right"
                >Last active</span
              >
              <div>
                <input
                  id="filter-input"
                  type="date"
                  class="form-input text-xs md:text-sm"
                  v-model="filter.lastActive"
                />
              </div>
            </div>
            <hr data-v-56a57272="" class="mt-1 mb-2 w-full" />
            <!-- Location -->
            <p class="text-xs md:text-sm text-gray-800 w-full text-center mb-2">
              Location
            </p>
            <div class="form-group mb-5">
              <span
                for="filter-input"
                class="text-xs md:text-sm mb-2 text-left text-gray-600 lg:text-right"
                >Filter location</span
              >
              <div>
                <input
                  id="filter-input"
                  type="text"
                  class="form-input text-xs md:text-sm"
                  placeholder="Enter location"
                  v-model="filter.location"
                />
              </div>
            </div>
            <div class="flex flex-row w-full justify-center mt-2 mb-4 gap-5">
              <button
                @click="clearFilter"
                class="btn2 btn2-primary text-xs px-10 py-2"
              >
                Clear
              </button>
              <button
                @click="sumitFilter"
                class="btn2 btn2-primary text-xs px-10 py-2"
              >
                Filter
              </button>
            </div>
          </div>
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
        styleClass="vgt-table vgt-wrap vgt-left-align vgt-right-align striped "
      >
        <template slot="table-row" slot-scope="props">
          <!-- <nuxt-link
            :to="
              props.row.userId
                ? route + props.row.userId
                : route + props.row.title
            "
            class="relative"
          > -->
          <nuxt-link
            :to="{
              name: route,
              params: {
                slug: props.row.tutorId
                  ? props.row.tutorId + '-' + props.row.userId
                  : props.row.userId
                  ? props.row.userId
                  : props.row.title,
                userData: props.row,
                type: type.toLowerCase(),
              },
            }"
            class="relative flex flex-row"
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
                  v-if="!onDraft && props.row.image"
                  :src="props.row.image"
                  alt="My profile"
                  class="course-image mr-3 rounded-lg"
                />
                <div
                  v-if="!props.row.image"
                  class="course-image mr-3"
                  :style="{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }"
                >
                  <img src="/icon/empty-pics-icon.svg" alt="" />
                </div>
                <div
                  class="flex flex-col"
                  v-if="props.row.name || props.row.user"
                >
                  <span class="text-gray-700 font-semibold text-left text-md">{{
                    props.row.name || props.row.user
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
            <span v-else-if="props.column.field == 'createdAt'">
              <span class="text-gray-700 font-normal">{{
                props.row.createdAt.indexOf('T')
                  ? props.row.createdAt.split('T')[0]
                  : props.row.createdAt.substring(0, 12)
              }}</span>
            </span>
            <span v-else-if="props.column.field == 'attendance'">
              <span class="text-gray-700 font-normal">{{
                props.row.attendance
                  ? props.row.attendance.toLocaleString()
                  : '-----'
              }}</span>
            </span>
            <span v-else-if="props.column.field == 'date'">
              <span class="text-gray-700 text-left">{{
                formatDate(props.row.createdAt)
              }}</span>
            </span>

            <span v-else-if="props.column.field == 'time'">
              <span class="text-gray-700 text-left">{{
                formaTime(props.row.createdAt)
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
              class="items-center relative last-col"
              v-else-if="props.column.field == 'status'"
            >
              <span
                class="dot absolute rounded-full"
                :class="
                  props.row.status === 'active' ||
                  props.row.status === 'completed'
                    ? 'bg-green-500'
                    : props.row.status === 'upcoming'
                    ? 'bg-gray-500'
                    : props.row.status === 'suspended'
                    ? 'bg-red-500'
                    : props.row.status === 'success'
                    ? ''
                    : 'bg-gray-500'
                "
              ></span>
              <span class="text-gray-700 text-center">{{
                props.row.status.charAt(0).toUpperCase() +
                props.row.status.slice(1)
              }}</span>
            </span>
            <span
              class="items-center relative"
              v-else-if="props.column.field === 'isActive'"
            >
              <span
                class="dot absolute rounded-full"
                :class="props.row.isActive ? 'bg-green-500' : 'bg-gray-500'"
              ></span>
              <span class="text-gray-700 text-center">{{
                props.row.isActive ? 'Active' : 'Deactive'
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
                  !rows.some((obj) => Object.keys(obj).includes('isActive'))) ||
                (props.column.field === 'status' &&
                  !rows.some((obj) => Object.keys(obj).includes('date')) &&
                  !rows.some((obj) =>
                    Object.keys(obj).includes('dateStarted')
                  ) &&
                  !rows.some((obj) =>
                    Object.keys(obj).includes('dateCompleted')
                  ) &&
                  !rows.some((obj) => Object.keys(obj).includes('user'))) ||
                (props.column.field === 'isActive' &&
                  !rows.some((obj) => Object.keys(obj).includes('date')) &&
                  !rows.some((obj) =>
                    Object.keys(obj).includes('dateStarted')
                  ) &&
                  !rows.some((obj) =>
                    Object.keys(obj).includes('dateCompleted')
                  )) ||
                (props.column.field === 'status' &&
                  rows.some((obj) => Object.keys(obj).includes('action')) &&
                  !rows.some((obj) => Object.keys(obj).includes('user'))) ||
                (props.column.field === 'isActive' &&
                  rows.some((obj) => Object.keys(obj).includes('action'))) ||
                (props.column.field === 'date' &&
                  !rows.some((obj) => Object.keys(obj).includes('action')) &&
                  !rows.some((obj) => Object.keys(obj).includes('time')) &&
                  !rows.some((obj) => Object.keys(obj).includes('user'))) ||
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
              <div class="absolute bottom-0 right-0">
                <span
                  v-on:click.prevent="
                    toggleMenu(
                      props.row.id
                        ? props.row.id
                        : props.row.userId || props.row.tutorId
                    )
                  "
                  class="absolute z-50 bottom-0 -mb-1 right-0 -mr-2 text-gray-600 cursor-pointer hover:text-gray-900 font-extrabold text-left text-lg"
                  >&#xFE19;</span
                >
                <div
                  :class="{
                    hidden:
                      opt && props.row.id
                        ? props.row.id === optId
                          ? false
                          : true
                        : (opt &&
                            props.row.userId &&
                            props.row.userId === optId) ||
                          (opt &&
                            props.row.tutorId &&
                            props.row.tutorId === optId)
                        ? false
                        : true,
                    'bottom-0': props.index > 5 ? true : false,
                    'top-0': props.index <= 5 ? true : false,
                    'mt-2': props.index <= 5 ? true : false,
                    'mb-5': props.index > 5 ? true : false,
                  }"
                  class="pop-up flex flex-col items-start px-2 absolute pt-2 right-1/2 border-gray-500 bg-white rounded-lg min-h-100 w-32 shadow-lg"
                  :style="{ zIndex: 100 }"
                >
                  <div
                    class="pop-up-item lg:mr-4 md:text-gray-700 text-sm font-normal hover:text-gray-900 md:bg-transparent block md:inline-block mb-1"
                    v-for="({ name, action }, key) in popUpProps"
                    :key="key"
                  >
                    <p
                      v-if="
                        name === 'Approve' && props.row.status === 'inactive'
                      "
                      v-on:click.prevent="
                        () => {
                          action(props.row.userId)
                          toggleMenu(
                            props.row.id ? props.row.id : props.row.userId
                          )
                        }
                      "
                    >
                      {{ name }}
                    </p>
                    <p
                      v-if="
                        name === 'Action' && props.row.status !== 'inactive'
                      "
                      v-on:click.prevent="
                        () => {
                          action(
                            props.row.name,
                            props.row.status && props.row.status === 'suspended'
                              ? 'Reactivate'
                              : 'Suspend',
                            type,
                            props.row.tutorId
                              ? props.row.tutorId
                              : props.row.userId,
                            currentPage
                          )
                          toggleMenu(
                            props.row.id ? props.row.id : props.row.userId
                          )
                        }
                      "
                    >
                      {{
                        name === 'Action'
                          ? props.row.status && props.row.status === 'suspended'
                            ? 'Unsuspend'
                            : 'Suspend'
                          : name
                      }}
                    </p>
                    <nuxt-link
                      v-if="name === 'Preview'"
                      :to="{
                        name: route,
                        params: {
                          slug: props.row.tutorId
                            ? props.row.tutorId
                            : props.row.userId
                            ? props.row.userId
                            : props.row.title,
                          userData: props.row,
                          type: type.toLowerCase(),
                        },
                      }"
                      class="relative"
                      >Preview</nuxt-link
                    >
                  </div>
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
    exportCSV: { type: Function, required: false },
    popUpProps: { type: Array, required: false },
    filterData: { type: Function, required: false },
    currentPage: { type: Number, required: false },
    // more: { type: String, default: null },
  },
  name: 'list-table1',
  data: () => ({
    opt: false,
    optId: null,
    filterOpt: false,
    filter: {
      status: '',
      from: '',
      to: '',
      lastActive: '',
      location: '',
    },
  }),
  methods: {
    clearFilter() {
      this.filter = {
        status: '',
        from: '',
        to: '',
        lastActive: '',
        location: '',
      }
    },
    sumitFilter() {
      const arrFilter = [
        { name: 'status=', value: this.filter.status },
        { name: 'from=', value: this.filter.from },
        { name: 'to=', value: this.filter.to },
        { name: 'lastActive=', value: this.filter.lastActive },
        { name: 'location=', value: this.filter.location },
      ]
      let newFilter = arrFilter.filter((f) => f.value)
      this.filterData(newFilter, this.type)
      this.filterOpt = !this.filterOpt
    },
    toggleFilter() {
      this.filterOpt = !this.filterOpt
    },
    toggleMenu(optId) {
      this.opt = !this.opt
      if (optId) this.optId = optId
    },
    checkKeyPresenceInArray(arr, key) {
      return arr.some((obj) => Object.keys(obj).includes(key))
    },
    formatDate(date) {
      return moment(date).format('DD MMM YYYY')
    },
    formaTime(time) {
      return moment(time).format('h:mm:ss a')
    },
  },
}
</script>

<style scoped>
.last-col {
  min-width: 5.8rem;
}

#filter-input {
  width: 9.8rem;
  padding: 8px;
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

.pop-up2 {
  border-width: 0.1rem;
  min-width: 17rem;
}

.vgt-table > thead > th {
  @apply font-normal text-xs;
}
.vgt-wrap {
  min-width: 60rem;
  min-height: 33rem;
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
