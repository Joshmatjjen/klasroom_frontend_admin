<template>
  <div class="min-h-screen mb-12">
    <section class="bg-orange-100">
      <div class="container sm:mx-0 lg:mx-auto px-4 lg:px-0">
        <div class="grid grid-cols-12 gap-5">
          <!-- Left Add Image -->
          <div class="col-span-full lg:col-span-7 xl:col-span-8">
            <section>
              <div
                class="switcher whitespace-no-wrap flex flex-row gap-10 place-items-start px-5 border-b-2 border-gray-200 overflow-scroll scrollbar-thumb-orange"
              >
                <button
                  @click="switcher(0)"
                  :class="{ active: isCourseSwitch === 0 }"
                  class="menu-btn"
                >
                  <p class="text-xs text-gray-700">Preliminary</p>
                </button>
                <button
                  @click="courseStates.lessons ? switcher(1) : null"
                  :class="{ active: isCourseSwitch === 1 }"
                  class="menu-btn"
                >
                  <p class="text-xs text-gray-700">Lessons</p>
                </button>
                <button
                  @click="courseStates.settings ? switcher(2) : null"
                  :class="{ active: isCourseSwitch === 2 }"
                  class="menu-btn"
                >
                  <p class="text-xs text-gray-700">Settings</p>
                </button>
              </div>
            </section>

            <!-- Preliminary -->
            <section v-if="isCourseSwitch === 0">
              <!-- Preliminary section -->
              <section>
                <div class="container mx-auto my-10 px-2 lg:px-0">
                  <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12">
                      <dash-items-section-group
                        title="Preliminary"
                        :edit="false"
                      >
                        <div
                          class="bg-white rounded-xl border border-gray-300 shadow-hover relative h-full"
                        >
                          <div class="px-4 md:px-5 lg:px-6 py-4">
                            <!-- course name -->
                            <div class="form-group mb-5">
                              <label for="input-name">Course name</label>
                              <div>
                                <input
                                  id="input-name"
                                  type="text"
                                  class="form-input"
                                  placeholder="Enter course name here"
                                  v-model="createCourse.title"
                                />
                              </div>
                            </div>
                            <!-- course subtitle -->
                            <div class="form-group mb-5">
                              <label for="input-name">Course subtitle</label>
                              <div>
                                <input
                                  id="input-name"
                                  type="text"
                                  class="form-input"
                                  placeholder="Enter course subtitle here"
                                  v-model="createCourse.subtitle"
                                />
                              </div>
                            </div>
                            <div class="form-group mb-5">
                              <label for="input-name"
                                >Course introduction</label
                              >
                              <div>
                                <input
                                  id="input-name"
                                  type="text"
                                  class="form-input"
                                  placeholder="Enter course introduction here"
                                  v-model="createCourse.introduction"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </dash-items-section-group>
                    </div>
                  </div>
                </div>
              </section>
            </section>

            <!-- Course Part -->
            <section v-if="isCourseSwitch === 1">
              <section>
                <div class="container mx-auto my-10 px-2 lg:px-0">
                  <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12">
                      <!-- Part 1 -->
                      <dash-items-section-group title="Lessons" :edit="false">
                        <!-- course part -->

                        <div
                          class="bg-white rounded-xl border border-gray-300 shadow-hover relative h-full items-center mb-8"
                        >
                          <course-chip
                            v-for="(item, key) in lesson"
                            :key="key"
                            :id="key"
                            :item="item"
                            :deleteItem="removePart"
                            :lesson="lesson"
                            :checkFormError="checkFormError"
                          />
                        </div>

                        <div class="relative flex items-center justify-center">
                          <div
                            class="btn btn-primary absolute flex flex-row bottom-0 mb-2"
                            @click="addLessonPart"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0)">
                                <path
                                  d="M-2.18262 8H7.99972V-2.18234"
                                  stroke="#FFFFFF"
                                  stroke-width="1.5"
                                />
                                <path
                                  d="M8 18.1821V7.99979H18.1823"
                                  stroke="#FFFFFF"
                                  stroke-width="1.5"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                            <p
                              class="text-sm text-center font-thin text-white pl-2"
                            >
                              Create part
                            </p>
                          </div>
                        </div>

                        <span v-if="pollsError" class="text-sm text-red-700"
                          >Fill all polls input field</span
                        >
                      </dash-items-section-group>

                      <div class="mb-8"></div>
                    </div>
                  </div>
                </div>
              </section>
            </section>

            <!-- settings -->
            <section v-if="isCourseSwitch === 2">
                <dash-items-section-group title="Graduation Criteria" :edit="false">
                <div
                    class="bg-white rounded-xl border border-gray-300 shadow-hover relative h-full"
                >
                    <div class="px-4 md:px-5 lg:px-6 py-4">
                    <div class="border-b border-gray-300 pb-5 mb-4">
                    <p class="text-base font-bold text-gray-700 mb-3">Course completion</p>
                    <div class="grid grid-cols-12 mb-3">
                        <div class="col-span-7">
                            <p class="text-sm text-gray-700">All lessons must be completed</p>
                        </div>
                        <div class="col-span-5 text-right">
                        <input-toggle-switch/>
                        </div>
                    </div>
                    <div class="grid grid-cols-12">
                        <div class="col-span-7">
                        <p class="text-sm text-gray-700">Students must complete at least</p>
                        </div>
                        <div class="col-span-5 text-right">
                        <v-select
                            class="form-input style-chooser cursor-pointer capitalize"
                            placeholder="70% of lessons"
                            :options="['60% of lessons', '50% of lessons', '40% of lessons']"
                        />
                        </div>
                    </div>
                    </div>
                    <!-- Assignment -->
                    <div class="border-b border-gray-300 pb-5 mb-4">
                    <p class="text-base font-bold text-gray-700 mb-3">Assignment</p>
                    <div class="grid grid-cols-12">
                        <div class="col-span-7 my-auto">
                        <p class="text-sm text-gray-700">
                            All assignments are compulsory
                        </p>
                        </div>
                        <div class="col-span-5 text-right">
                        <input-toggle-switch/>
                        </div>
                    </div>
                    <div class="grid grid-cols-12 mt-4">
                        <div class="col-span-7">
                        <p class="text-sm text-gray-700">Students must submit at least</p>
                        </div>
                        <div class="col-span-5 text-right">
                        <v-select
                            class="form-input style-chooser cursor-pointer capitalize"
                            placeholder="70% of assignments"
                            :options="['60% of assignments', '50% of assignments', '40% of assignments']"
                        />
                        </div>
                    </div>
                    </div>
                    <!-- Resources -->
                    <div class="border-b border-gray-300 pb-5 mb-4">
                    <p class="text-base font-bold text-gray-700 mb-3">
                        Resources
                    </p>
                    <div class="grid grid-cols-12">
                        <div class="col-span-7 lg:col-span-8 my-auto">
                        <p class="text-sm text-gray-700">All resources must be downloaded</p>
                        </div>
                        <div class="col-span-5 lg:col-span-4 text-right">
                        <input-toggle-switch />
                        </div>
                    </div>
                    </div>
                    <!-- Certificate -->
                    <div class="border-b border-gray-300 pb-5 mb-4">
                    <p class="text-base font-bold text-gray-700 mb-3">Certificate</p>
                    <div class="grid grid-cols-12">
                        <div class="col-span-7 lg:col-span-8 my-auto">
                        <p class="text-sm text-gray-700">
                            Automatically generate certificate
                        </p>
                        </div>
                        <div class="col-span-5 lg:col-span-4 text-right">
                        <input-toggle-switch/>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
                </dash-items-section-group>

                <dash-items-section-group class="mt-8" title="Pricing" :edit="false">
                <div
                    class="bg-white rounded-xl border border-gray-300 shadow-hover relative h-full"
                >
                    <div class="px-4 md:px-5 lg:px-6 py-4">
                    <div class="border-b border-gray-300 pb-5 mb-4">
                    <p class="text-base font-bold text-gray-700 mb-3">Enter course price</p>
                    <div class="grid grid-cols-12 mb-3">
                        <div class="col-span-7">
                            <p class="text-sm text-gray-700">Price in Nigerian Naira</p>
                        </div>
                        <div
                            class="form-input px-4 currency-box flex flex-row text-center justify-center items-center"
                        >
                            <p
                            class="text-sm font-bold text-gray-600 text-center py-1"
                            >
                            ₦
                            </p>
                            <input
                            type="number"
                            class="currency-input"
                            placeholder="price"
                            v-model="price"
                            />
                            <p
                            class="percentage-chip bg-orange-500 rounded-xl text-sm font-medium text-white text-center"
                            >
                            15% off
                            </p>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
                </dash-items-section-group>
                <dash-items-section-group class="mt-5" title="Promotion" :edit="false">
                <div
                    class="bg-white rounded-xl border border-gray-300 shadow-hover relative h-full items-center mb-8"
                >
                    <div class="px-4 md:px-5 lg:px-6 py-4">
                    <!-- promotion -->
                    <div class="form-group mb-5">
                        <p
                        class="text-sm text-left font-bold text-gray-800"
                        >
                        Price off
                        </p>
                        <div class="flex flex-row justify-between my-4">
                        <div class="col-span-7">
                            <p class="text-sm text-gray-700">
                            Run price off promotion
                            </p>
                        </div>
                        <div class="col-span-5 text-right">
                            <input-toggle-switch
                            v-model="runPricePromotion"
                            />
                        </div>
                        </div>
                        <div class="flex flex-row justify-between my-4">
                        <div
                            class="flex col-span-7 items-center justify-center"
                        >
                            <p class="text-sm text-gray-700 text-center">
                            Reduce price by
                            </p>
                        </div>

                        <div
                            class="px-3 currency-box flex flex-row text-center justify-center items-center"
                        >
                            <v-select
                            class="style-chooser cursor-pointer capitalize"
                            placeholder="15%"
                            :value="promo.percentageOff"
                            :options="['15%', '20%', '40%']"
                        />
                        </div>
                        </div>

                        <div class="flex flex-row justify-between my-4">
                        <div
                            class="flex col-span-7 items-center justify-center"
                        >
                            <p class="text-sm text-gray-700 text-center">
                            Starting from
                            </p>
                        </div>

                        <div
                            class="form-input currency-box flex flex-row text-center justify-center items-center"
                        >
                            <input
                            type="date"
                            class="promotion-input"
                            placeholder="date"
                            v-model="promo.startDate"
                            />
                        </div>
                        </div>

                        <div class="flex flex-row justify-between my-4">
                        <div
                            class="flex col-span-7 items-center justify-center"
                        >
                            <p class="text-sm text-gray-700 text-center">
                            Until
                            </p>
                        </div>

                        <div
                            class="form-input currency-box flex flex-row text-center justify-center items-center"
                        >
                            <input
                            type="date"
                            class="promotion-input"
                            placeholder="date"
                            v-model="promo.endDate"
                            />
                        </div>
                        </div>
                    </div>
                    <hr class="mb-5" />
                    </div>
                </div>
                </dash-items-section-group>
            </section>

            <!-- End for Switchers -->
          </div>
          <!-- Right Add Image -->
          <div
            v-if="isCourseSwitch !== 0"
            class="col-span-full lg:col-span-5 xl:col-span-4"
          >
            <div
              class="bg-white rounded-xl border border-gray-300 shadow-hover relative min-h-full"
            >
              <div class="block mb-2">
                <div
                  class="big-avatar h-64 relative rounded-xl overflow-hidden"
                  :style="{
                    backgroundImage: createCourse.image
                      ? `url(${createCourse.image.signedUrl})`
                      : `url('/webinar-view-bg.jpg')`,
                  }"
                >
                  <div
                    class="w-full h-full bg-black opacity-50 absolute top-0"
                  ></div>
                </div>
              </div>
              <div class="px-4 md:px-5 lg:px-6 py-4">
                <ul class="text-gray-700">
                  <li class="text-left">
                    <h5 class="font-bold mb-2"> Title
                    </h5>
                    <p class="text-xs text-gray-700">introduction
                    </p>
                  </li>
                  <li>
                    <hr class="my-5" />
                    <label class="checkbox" @click="$router.push('/')">
                      <span class="text-sm">Preview course</span>
                      <input type="checkbox" value="intermediate" disabled />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                  <hr class="my-5" />
                  <li class="lg:pb-8 flex flex-row justify-between">
                    <span class="text-sm">Link: https://klasro..</span>

                    <div class="flex items-center mr-5 mb-3 cursor-pointer">
                      <img class="w-6 h-4" src="/icon/copy.svg" />
                      <span class="text-xs">Copy</span>
                    </div>
                  </li>
                  <li class="lg:pb-8 flex flex-row justify-between relative">
                    <button
                      class="btn btn-primary mr-5 flex flex-row justify-between align-middle items-center"
                      @click="
                        $router.push(
                          `/${userDash}/course/preview/${course.id}`
                        )
                      "
                    >
                      <span class="text-xs">Preview course</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                    <div
                      v-if="publishOpt"
                      class="pop-up flex flex-col gap-5 items-start px-4 py-5 justify-around pop-up absolute top-0 left-0 mt-12 ml-5 border-gray-500 bg-white rounded-lg shadow-lg"
                      :style="{ zIndex: 3 }"
                    >
                      <a
                        href="#"
                        class="pop-up-item lg:mr-0 md:text-gray-700 text-left text-sm font-normal hover:text-gray-900 md:bg-transparent block md:inline-block mb-5 md:mb-0"
                      >
                        <p>Publish now</p>
                      </a>
                      <a
                        href="#"
                        class="pop-up-item lg:mr-0 md:text-gray-700 text-sm font-normal hover:text-gray-900 md:bg-transparent block md:inline-block mb-5 md:mb-0"
                      >
                        <p>Schedule for later</p>
                      </a>
                    </div>
                    <button class="btn btn-light">
                      <span class="text-xs">Save </span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div v-else class="col-span-full lg:col-span-5 xl:col-span-4">
            <div
              class="bg-white rounded-xl border border-gray-300 shadow-hover relative min-h-full"
            >
              <div class="block mb-2">
                <div
                  class="big-avatar h-64 relative rounded-xl overflow-hidden"
                  :style="{
                    backgroundImage: createCourse.image
                      ? `url(${createCourse.image.signedUrl})`
                      : `url('/webinar-view-bg.jpg')`,
                  }"
                >
                  <div class="grid grid-cols-12 place-items-center h-64 py-32">
                    <div
                      class="change-picture col-span-12 text-white mx-auto my-auto"
                    >
                      <input
                        ref="image"
                        type="file"
                        name="image"
                        accept="image/*"
                        multiple
                        @change="setWebinarImage"
                      />
                      <button
                        @click.prevent="showFileChooser('webinarImage')"
                        class="focus:outline-none"
                      >
                        Add Picture
                      </button>
                    </div>
                  </div>
                  <div
                    class="w-full h-full bg-black opacity-50 absolute top-0"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom navigation -->
          <div class="col-span-full lg:col-span-7 xl:col-span-8">
            <hr class="my-5" />
            <div class="flex flex-row justify-between">
              <button
                class="btn btn-sm lg:mt-0"
                :class="isCourseSwitch === 0 ? 'btn-disable' : 'btn-primary'"
                @click="
                  isCourseSwitch <= 0 ? null : switcher(isCourseSwitch - 1)
                "
              >
                Previous
              </button>
              <button
                class="btn btn-sm lg:mt-0 btn-primary"
                @click="
                  () => {
                    goNext(isCourseSwitch)
                  }
                "
              >
                {{ isCourseSwitch === 2 ? 'Publish Webinar' : 'Next' }}
                <loader v-if="loading" color="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserChip from '~/components/chip/UserChip.vue'
import { getAccessTokenHeader } from '~/utils'
// import PollChip from '~/components/chip/PollChip.vue'

const courses = require('@/static/json/courses.json')

export default {
  components: { UserChip },
  layout: 'dashboard',
  middleware: ['check-auth', 'auth', 'isTutor'],
  fetch({ store }) {
    store.commit('app/SET_TITLE', 'Create webinar')
  },
  data: () => ({
    courses: _.take(courses, 4),
    undoneTasks: _.take(courses, 3),

    course: null,
    settingId: null,
    priceId: null,
    promotionId: null,

    courseStates: {
      prem: false,
      lessons: false,
      settings: false,
    },

    isCourseSwitch: 0,
    createCourse: {
      title: '',
      subtitle: '',
      introduction: '',
      date: '',
      startTime: '',
      endTime: '',
      tags: [],
      image: null,
    },
    lesson: [
      {
        question: '',
        lesson: ['', ''],
        textarea: '',
      },
    ],
    settings: {
      tutors: 1,
      moderators: 1,
      students: 50,
    },
    price: 0,
    promo: {
      percentageOff: 0,
      startDate: '',
      endDate: '',
    },
    runPricePromotion: false,
    pollsError: false,
    publishOpt: false,
    loading: false,
    fileResources: [],
    linkResources: [],
  }),
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      token: (state) => state.auth.token,
      userType: (state) =>
        state.auth.user && state.auth.user.isTutor ? 'tutor' : 'student',
    }),
    userDash() {
      return this.$route.path.split('/')[1]
    },
  },
  watch: {
    async fileResources(value) {
      console.log('fileResources: ', value)
      // await this.$nextTick()
    },
    async polls(value) {
      await this.$nextTick()
      console.log('polls: ', value)
    },
    async runPricePromotion(value) {
      console.log('runPricePromotion: ', value)
      // await this.$nextTick()
    },
  },
  methods: {
    switcher: function (value) {
      this.isCourseSwitch = value
      // some code to filter users
    },
    togglePubOptMenu() {
      this.publishOpt = !this.publishOpt
    },
    callLog() {
      console.log('adding new')
    },
    async goNext(isCourseSwitch) {
      switch (isCourseSwitch) {
        case 0:
            isCourseSwitch >= 2 ? null : this.switcher(isCourseSwitch + 1)
          break
        case 1:
            isCourseSwitch >= 2 ? null : this.switcher(isCourseSwitch + 1)
          break
        case 2:
            isCourseSwitch >= 2 ? null : this.switcher(isCourseSwitch + 1)
        break
        default:
            break
      }
    },
    addLink(link) {
      this.linkResources = [...this.linkResources, link]
    },
    showAddLink() {
      this.$store.commit('app/ADD_LINK_MODAL', {
        status: true,
        addLink: this.addLink,
      })
    },
    showFileChooser(type) {
      if (type === 'webinarImage') this.$refs.image.click()
      else this.$refs.input.click()
    },
    checkFormError(type) {
      if (type === 'lesson') this.pollsError = false
      else if (type === 'co_host') this.coHostFormError = false
      else this.moderatorFormError = false
    },
    async setWebinarImage(e) {
      console.log('Uploading__')
      const file = e.target.files[0]
      console.log('file: ', file)

      const formData = new FormData()
      formData.append('webinar_image', file, '.' + file.type.split('/')[1])
      try {
        const { data, message } = await this.$axios.$post(
          `/uploads`,
          formData,
          {
            headers: getAccessTokenHeader(this.token),
          }
        )
        console.log('uploaded: ', message, data)

        this.createCourse.image = data.webinar_image
      } catch (e) {
        console.log(e)
        return
      }
    },
    async setImage(e) {
      console.log('Uploading__')
      const files = e.target.files
      console.log('files: ', files)

      this.fileResources = [...this.fileResources, ...files]
    },
    deleteResItem(id, type) {
      if (type === 'link')
        this.linkResources = this.linkResources.filter(
          (i, index) => index !== id
        )
      else
        this.fileResources = this.fileResources.filter(
          (i, index) => index !== id
        )
    },
    addLessonPart() {
      this.lesson = [
        ...this.lesson,
        {
          question: '',
          lesson: ['', ''],
          textarea: '',
        },
      ]
    },
    removePart(id) {
      this.lesson = this.lesson.filter((i, index) => index !== id)
    },
  },
}
</script>

<style scoped>
.promotion-input {
  padding: 0.1rem 0.1rem;
  border: none !important;
}
.percentage-chip {
  min-width: 4.1rem;
  padding: 0.1rem 0;
}
.currency-box {
  width: 16rem;
}
.currency-input {
  border: none !important;
  background: #f5f5f3 !important;
}
.switcher {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
.switcher::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
.big-avatar {
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  @apply bg-gray-200;
}
.change-picture {
  z-index: 1;
}
.change-picture > button {
  background-image: url('/icon/camera.svg');
  background-repeat: no-repeat;
  padding: 5px 5px 5px 32px;
  line-height: 20px;
}
.add-btn {
  padding: 2px;
  background: 'red';
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
</style>
