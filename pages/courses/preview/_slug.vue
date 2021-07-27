<template>
  <div v-if="course" class="min-h-screen mb-24">
    <section class="bg-orange-100">
      <section>
        <div
          class="flex flex-row gap-10 place-items-start px-10 border-b-2 border-gray-200"
        >
          <button
            v-on:click="switcher('preview')"
            v-bind:class="{ active: isCourses.preview }"
            class="menu-btn"
          >
            <p class="text-xs text-gray-700">Course preview</p>
          </button>
          <button
            v-on:click="switcher('students')"
            v-bind:class="{ active: isCourses.students }"
            class="menu-btn"
          >
            <p class="text-xs text-gray-700">Course students</p>
          </button>
          <button
            v-on:click="switcher('ratings')"
            v-bind:class="{ active: isCourses.ratings }"
            class="menu-btn"
          >
            <p class="text-xs text-gray-700">Ratings and reviews</p>
          </button>
        </div>
      </section>
      <div
        v-if="isCourses.preview"
        class="container mt-6 mx-auto mb-10 px-4 lg:px-0"
      >
        <div class="container mx-auto mb-4 px-4 lg:px-0">
          <div class="md:grid grid-cols-3 gap-5 space-y-3 md:space-y-0">
            <course-metrics :title="0" label="Course sales" text="Filter" />
            <course-metrics
              :title="0"
              label="Course completions"
              text="Filter"
            />
            <course-metrics
              :title="0"
              label="Rating"
              text="Open reviews"
              @click="switcher('ratings')"
            />
          </div>
        </div>
        <edit-chip
          :desc="
            !course.isActive
              ? 'This course has not been approved and is not live for purchase. Click “Take action” to publish.'
              : `This is a preview of your course. To make changes, please click “Edit course`
          "
          :name="!course.isActive ? 'Take action' : 'Edit course'"
          link="/courses/edit/"
          :id="$route.params.slug"
        />
        <div class="grid grid-cols-12 gap-5">
          <!-- v-if="!$device.isMobile" -->
          <div class="col-span-full lg:col-span-8 xl:col-span-8">
            <div
              class="bg-white rounded-xl border border-gray-300 shadow-hover overflow-hidden relative"
            >
              <div v-if="showIntro" class="">
                <video
                  class="video-js vjs-default-skin rounded-t-none rounded-b-none mb-4"
                  controls
                  data-type="application/dash+xml"
                  :data-src="
                    course.introductoryVideo
                      ? course.introductoryVideo.publicUrl
                      : ''
                  "
                  style="width: 100%"
                ></video>
                <div class="mb-12 px-4 md:px-5 lg:px-6 pb-4">
                  <div class="flex flex-row gap-4 text-gray-700 mt-5 mb-2">
                    <span class="text-base font-semibold my-auto"
                      >Introduction</span
                    >
                  </div>
                  <div class="space-y-3">
                    <p class="text-xs mb-4 text-gray-700 leading-normal">
                      {{ course.introductoryText }}
                    </p>
                  </div>
                </div>
              </div>

              <div v-else>
                <course-view-details
                  :course="course"
                  :lessonId="lessonId"
                  :partId="partId"
                  :lesson="lesson"
                />
                <div class="px-4 md:px-5 lg:px-6 pb-4">
                  <div class="mb-12">
                    <div class="flex flex-row gap-4 text-gray-700 mt-5 mb-2">
                      <span class="text-base font-semibold my-auto"
                        >Assignment</span
                      >
                    </div>
                    <div class="space-y-3">
                      <assignment-list
                        title="Business Research"
                        desc="Conduct a business research for a conceptual business in any industry of your ch..."
                        link="#"
                      />
                    </div>
                  </div>
                  <hr class="-mx-4 md:-mx-5 lg:-mx-6" />
                  <div class="flex flex-row space-x-5 mt-5 mb-2">
                    <div
                      class="flex flex-row text-xs text-gray-700 gap-5 my-auto mr-auto"
                    >
                      <div>
                        <span class="inline-block align-middle"
                          >Course Video</span
                        >
                        <span class="item-status active ml-1 align-middle" />
                      </div>
                      <div>
                        <span class="inline-block align-middle"
                          >Assignment</span
                        >
                        <span class="item-status active ml-1 align-middle" />
                      </div>
                    </div>
                    <div
                      @click="
                        nextTitle !== 'End'
                          ? changeLesson('next')
                          : $router.push('/courses')
                      "
                      class="flex"
                    >
                      <button
                        class="btn"
                        :class="
                          nextTitle === 'End' ? 'btn-light' : 'btn-primary'
                        "
                      >
                        {{ nextTitle }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-full lg:col-span-4 xl:col-span-4">
            <div
              class="flex flex-col flex-1 bg-white rounded-xl border border-gray-300"
            >
              <tabs-menu v-model="tab" :tabs="tabs" />
              <!-- <div
                v-if="$device.isMobile && tab === 0 && tabs.length === 5"
                class="pb-10"
              >
                <course-view-details
                  :course="course"
                  :lessonId="lessonId"
                  :partId="partId"
                  :lesson="lesson"
                />
              </div> -->
              <div
                v-if="
                  (tab === 0 && tabs.length === 4) ||
                  (tab === 1 && tabs.length === 5)
                "
                class="px-4 md:px-5 lg:px-6 py-4"
              >
                <div>
                  <h5 class="font-bold text-gray-700 pt-2 mb-4">
                    {{ course.title }}
                  </h5>
                  <!-- For Users -->
                  <!-- <div class="mb-4">
                    <progress-bar :percentage="30" />
                  </div>
                  <p class="text-xs text-gray-700">6 lessons completed</p>
                  <p class="text-xs text-gray-700">12 lessons to go</p> -->
                </div>
                <hr class="mt-4" />
                <div class="mt-6 mb-4">
                  <h6
                    @click="selectLesson(null, 'intro')"
                    class="cursor-pointer text-sm text-gray-800 font-bold mb-5"
                  >
                    Introduction
                  </h6>
                </div>
                <hr class="mt-4" />
                <div
                  v-for="(item, key) in lessons"
                  :key="key"
                  class="mt-6 mb-4"
                >
                  <h6
                    @click="selectLesson(key, 'part')"
                    class="cursor-pointer text-sm text-gray-800 font-bold mb-5"
                  >
                    Part {{ key + 1 }} - {{ item.part }}
                  </h6>
                  <ul class="text-xs text-gray-700">
                    <li
                      v-for="(item, key) in item.lessons"
                      :key="key"
                      class="flex flex-row leading-tight mb-4 cursor-pointer"
                    >
                      <span @click="selectLesson(key, 'lesson')">{{
                        item.lesson
                      }}</span>
                      <!-- <span class="item-status active align-bottom ml-auto" /> -->
                    </li>

                    <!-- Sample lesson with start staus -->
                    <!-- <li class="flex flex-row leading-tight mb-4">
                      <nuxt-link to="/">Residual income sources</nuxt-link>
                      <span
                        class="text-xs text-orange-500 font-semibold align-bottom ml-auto cursor-pointer"
                        >Start</span
                      >
                    </li> -->
                  </ul>
                </div>
                <hr />
              </div>
              <div
                v-if="
                  (tab === 1 && tabs.length === 4) ||
                  (tab === 2 && tabs.length === 5)
                "
              >
                <chat-messages no-card />
              </div>
              <div
                v-if="
                  (tab === 2 && tabs.length === 4) ||
                  (tab === 3 && tabs.length === 5)
                "
                class="px-4 md:px-5 lg:px-6 py-4 pb-10"
              >
                <div class="space-y-4">
                  <assignment-submission-list
                    v-for="(item, key) in [
                      'Business research assignment.doc',
                      'Business research assignment 2.doc',
                    ]"
                    :key="key"
                    :name="item"
                    link="#"
                  />
                </div>
              </div>
              <div
                v-if="
                  (tab === 3 && tabs.length === 4) ||
                  (tab === 4 && tabs.length === 5)
                "
                class="px-4 md:px-5 lg:px-6 py-4 pb-10"
              >
                <div class="space-y-4">
                  <resource-list
                    v-for="(item, key) in []"
                    :key="key"
                    :resource="item"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="isCourses.students"
        class="container mt-5 mx-auto mb-10 px-4 lg:px-0"
      >
        <section class="grid grid-cols-12 gap-5">
          <div class="col-span-full lg:col-span-8 xl:col-span-8">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-full">
                <nuxt-link to="/">
                  <div class="col-span-12">
                    <list-table-1
                      :columns="columnsStudents"
                      :rows="rowsStudents"
                      type="Reviews"
                    />
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="col-span-full lg:col-span-4 xl:col-span-4">
            <div
              class="bg-white rounded-xl border border-gray-300 shadow-hover relative min-h-full"
            >
              <div class="block mb-2">
                <div class="big-avatar relative rounded-xl overflow-hidden">
                  <img
                    src="https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png"
                    alt=""
                  />
                </div>
              </div>
              <div class="px-4 md:px-5 lg:px-6 py-4">
                <ul class="text-gray-700">
                  <li class="text-center">
                    <h5 class="name-text font-bold mb-2 capitalize">
                      {{ user ? user.name : '' }}
                    </h5>
                    <p class="text-sm text-gray-700">
                      Registered
                      {{ user ? user.createdAt : '' }}
                    </p>
                  </li>
                  <li>
                    <hr class="my-5" />
                    <label class="checkbox" @click="passwordReset">
                      <span class="text-sm">Initiate password reset</span>
                      <input type="checkbox" value="intermediate" disabled />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                  <li>
                    <label class="checkbox" @click="suspendAccount">
                      <span class="text-sm">Suspend account</span>
                      <input type="checkbox" value="intermediate" disabled />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                  <hr class="my-5" />
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div v-if="isCourses.ratings">
        <section>
          <div class="container mx-auto my-10 px-2 lg:px-0">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-full">
                <div class="col-span-12">
                  <list-table-1
                    :columns="columnsReviews"
                    :rows="rowsReviews"
                    type="Reviews"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
  <loader-2 v-else />
</template>

<script>
import { mapState } from 'vuex'
// import Swal from 'sweetalert2'
import { getAccessTokenHeader } from '~/utils'

const courses = require('@/static/json/latest-courses.json')
const videos = require('@/static/json/videos-list.json')
const youLearn = require('@/static/json/courses-you-learn.json')
const reviews = require('@/static/json/reviews.json')
const webreviews = require('@/static/json/webinar-reviews.json')
const students = require('@/static/json/students.json')

export default {
  middleware: ['check-auth', 'auth'],
  async fetch() {
    this.$store.commit('app/SET_DARK_MENU', true)
    this.$store.commit('app/SET_TITLE', 'Courses')
    // this.location = location.origin
    try {
      const { data } = await this.$axios.$get(
        `https://api.staging.klasroom.com/v1/courses/${this.$route.params.slug}`,
        {
          headers: getAccessTokenHeader(this.token),
        }
      )
      console.log('course: ', data)

      const { lessons, gradCriteria, price, promotions } = data

      this.course = data

      console.log('introductoryVideo: ', this.course.introductoryVideo.fileName)

      // this.createCourse = {
      //   title: this.course.title,
      //   subtitle: this.course.subtitle,
      //   introductory_text: this.course.introductoryText,
      //   introductory_video: null,
      //   introductory_video_file: null,
      //   tutor_email: this.course.tutorEmail,
      //   category_ids: this.course.categories,
      //   tags: this.course.tags,
      //   image: this.course.image,
      //   course_benefits: this.course.courseBenefits,
      // }

      if (lessons && Object.keys(lessons).length) {
        this.lessons = lessons.lessons
        // TODO Check for users last viewed lesson later
        this.lesson = this.lessons[0]
        this.getNextTitle(this.lesson)
      }

      if (gradCriteria && Object.keys(gradCriteria).length) {
        this.gradCriteria = gradCriteria
      }
      if (price && Object.keys(price).length) {
        this.price = price.price
      }
      if (promotions && Object.keys(promotions).length) {
        this.promotions = promotions
      }
    } catch (err) {
      console.log(err)
    }
  },
  fetchOnServer: false,
  data: () => ({
    home: 'home',
    videos,
    course: null,
    courses: _.take(courses, 3),
    youLearn,
    reviews,

    lessonId: 0,
    partId: 0,
    lessons: null,
    lesson: null,
    gradCriteria: null,
    price: null,
    promotions: null,
    nextTitle: 'Next Lesson',
    showIntro: true,

    tab: 0,
    tabs: ['Lessons', 'Chat', 'Assignment', 'Resources'],
    isCourses: {
      preview: true,
      students: false,
      draft: false,
    },
    columnsReviews: [
      {
        label: 'Name',
        field: 'name',
      },
      {
        label: 'Date',
        field: 'date',
        type: 'date',
        dateInputFormat: 'yyyy-MM-dd',
        dateOutputFormat: 'MMM do yy',
      },
      {
        label: 'Review',
        field: 'review',
      },
      {
        label: 'Rating',
        field: 'rating',
      },
    ],
    columnsStudents: [
      {
        label: 'Name',
        field: 'name',
      },
      {
        label: 'Payment date',
        field: 'paymentDate',
      },
      {
        label: 'Last Active',
        field: 'lastActive',
      },
      {
        label: 'Course progress',
        field: 'progress',
      },
    ],
    rowsReviews: _.take(webreviews, 10),
    rowsStudents: _.take(students, 4),
  }),
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      token: (state) => state.auth.token,
      profileImage: (state) => state.auth.profileImage,
    }),
  },
  mounted() {
    if (this.$device.isMobile) {
      this.tabs.unshift('Home')
    }
    setTimeout(() => {
      this.playDashVideos()
    }, 10000)
  },
  methods: {
    playDashVideos() {
      // NodeList of video-js elements
      console.log('playDashVideos')
      const dashVideos = document.querySelectorAll('.video-js')
      for (let video of dashVideos) {
        // console.log('dashVideos id: ', video.id, video.dataset)
        const player = videojs(video)
        const { src, type } = video.dataset
        player.reset()
        player.src({
          src,
          type,
        })
      }
    },
    getNextTitle(pageCourse) {
      console.log('pageCourse: ', pageCourse)
      console.log('lessons: ', this.lessons)
      if (this.lessonId + 1 < pageCourse.lessons.length)
        this.nextTitle = 'Next Lesson'
      else if (this.partId + 1 < this.lessons.length) {
        this.nextTitle = 'Next Part'
      } else this.nextTitle = 'End'
    },
    changeLesson(type) {
      try {
        if (this.lesson) {
          if (type === 'next') {
            // Check if next lesson exit
            if (this.lesson.lessons[this.lessonId + 1]) {
              this.lessonId += 1

              this.getNextTitle(this.lesson)
              return
            } else if (this.lessons[this.partId + 1]) {
              this.lesson = this.lessons[this.partId + 1]
              this.partId += 1
              this.lessonId = 0

              this.getNextTitle(this.lesson)
              return
            }
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    selectLesson(id, type) {
      if (type === 'part') {
        this.lesson = this.lessons[id]
        this.partId = id
        this.lessonId = 0
        this.showIntro = false

        this.getNextTitle(this.lesson)
      } else if (type === 'lesson') {
        this.lessonId = id
        this.showIntro = false

        this.getNextTitle(this.lesson)
      } else {
        this.showIntro = true
      }
      setTimeout(() => {
        this.playDashVideos()
      }, 2000)
    },
    purchaseCourse() {
      this.$store.commit('app/SET_MODAL', 'purchase-modal')
      this.$store.commit('app/SET_VIEW_DATA', {
        type: 'Course',
        title: 'How to Build Multiple Sources of Income',
        desc: `Learn how to build and manage multiple sources of 
          income that leads to sustainable wealth`,
        price: 2500,
      })
    },
    switcher: function (value) {
      switch (value) {
        case 'preview':
          this.isCourses.preview = true
          this.isCourses.students = false
          this.isCourses.ratings = false
          break
        case 'students':
          this.isCourses.preview = false
          this.isCourses.students = true
          this.isCourses.ratings = false
          break
        case 'ratings':
          this.isCourses.preview = false
          this.isCourses.students = false
          this.isCourses.ratings = true
          break
        default:
          this.isCourses.preview = true
          this.isCourses.students = false
          this.isCourses.ratings = false
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
.big-avatar {
  background-image: url(https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png);
}
</style>
