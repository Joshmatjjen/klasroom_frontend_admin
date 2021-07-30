<template>
  <div>
    <!-- <video-frame class="rounded-t-none rounded-b-none mb-4" /> -->
    <!-- <video
      class="video-js vjs-default-skin rounded-t-none rounded-b-none mb-4"
      controls
      data-type="application/dash+xml"
      :data-src="course ? course.introductoryVideo.publicUrl : ''"
      style="width: 100%"
    ></video> -->
    <div class="px-4 md:px-5 lg:px-6 pt-4">
      <div>
        <h5 class="font-bold mb-3 leading-tight text-gray-700">
          {{
            course ? course.title : 'How to Build Multiple Sources of Income'
          }}
        </h5>
        <p class="text-xs mb-4 text-gray-700 leading-normal">
          {{
            course
              ? course.subtitle
              : `Learn how to build and manage multiple sources of income that leads to
          sustainable wealth`
          }}
        </p>
        <div class="flex mb-4">
          <img src="/avatar.jpg" class="rounded-full mr-3 w-8 h-8" />
          <span class="text-xs text-gray-700 block my-auto">
            {{ course ? course.tutorName : 'Joy Adeleke' }}</span
          >
          <ul class="social-icons with-avatar my-auto">
            <li class="twitter">
              <a href="#"></a>
            </li>
            <li class="share">
              <a href="#"></a>
            </li>
          </ul>
        </div>
        <hr class="-mx-4 md:-mx-5 lg:-mx-6" />
        <div class="flex flex-col md:flex-row md:gap-4 text-gray-700 mt-5">
          <h5 class="font-bold mb-3 leading-tight text-gray-700">
            Part {{ partId ? partId + 1 : 1 }} -
            {{ lesson ? lesson.part : 'Understanding Money' }}
          </h5>
        </div>
        <div class="flex flex-col md:flex-row md:gap-4 text-gray-700 mt-5">
          <span class="text-base font-semibold my-auto">{{
            lesson ? lesson.lessons[lessonId].lesson : 'Starting a business'
          }}</span>
          <span class="text-xs my-auto"
            >Lesson {{ lessonId ? lessonId + 1 : 1 }}</span
          >
        </div>
        <p class="text-xs mt-4 text-gray-700 leading-normal">
          {{
            lesson
              ? lesson.lessons[lessonId].description
              : `Anyone who lived in the time of legends such as Henry Ford, Alexander
          Graham Bell, Thomas Edison and Albert Einstein could be forgiven for
          thinking everything that can be invented already has been invented. Of
          course, if we’d stopped there, we wouldn’t have the computer or the
          internet. The past century of our history stands as a testament to
          human ingenuity and our persistence to make things better.`
          }}
        </p>

        <div class="flex flex-col md:flex-row md:gap-4 text-gray-700 mt-5">
          <span class="text-base font-semibold my-auto">Lesson</span>
        </div>

        <div class="text-xs mt-4">
          <div
            v-html="lesson ? lesson.lessons[lessonId].content : '<p></p>'"
          ></div>
        </div>

        <div class="flex flex-col md:flex-row md:gap-4 text-gray-700 mt-5">
          <span class="text-base font-semibold my-auto">Assignment</span>
        </div>

        <div
          v-if="lesson && lesson.lessons[lessonId].assignments"
          class="text-xs mt-4"
        >
          <assignment-list
            v-for="(item, key) in lesson.lessons[lessonId].assignments"
            :key="item"
            :id="key"
            :title="item.title"
            :desc="item.description"
            :edit="false"
            :setAssignmentData="setAssignmentData"
          />
        </div>
        <assignment-modal v-if="showModal" :closeModal="close" :data="data" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    course: { type: Object, required: false },
    lesson: { type: Object, required: false },
    lessonId: { type: Number, required: false },
    partId: { type: Number, required: false },
  },

  data: () => ({
    showModal: false,
    data: null,
  }),

  methods: {
    close() {
      this.showModal = false
      this.data = null
    },
    setAssignmentData(data) {
      this.data = data
      this.showModal = true
    },
  },
}
</script>
