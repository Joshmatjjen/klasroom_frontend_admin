<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-start justify-center min-h-screen pt-4 px-4 pb-4 lg:pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span
      >&#8203;
      <div
        class="inline-block align-top bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full sm:max-w-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white relative px-4 pt-5 pb-4 sm:p-8 sm:pb-5">
          <!-- Close button -->
          <div
            class="absolute top-0 right-0 -ml-8 pt-3 pr-3 flex sm:-ml-10 sm:pr-3"
          >
            <button
              aria-label="Close panel"
              class="text-gray-700 hover:text-gray-500 focus:outline-none transition ease-in-out duration-150"
              @click="closeModal"
            >
              <!-- Heroicon name: x -->
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="block">
            <div class="mt-3 sm:mt-0 sm:ml-0">
              <h2
                id="modal-headline"
                class="text-xl text-center sm:text-4xl leading-none font-bold text-gray-800 mb-4"
              >
                Schedule for Later
              </h2>
            </div>
            <div class="mt-3 sm:mt-0 sm:ml-0">
              <!-- Purchase form -->

              <!-- Sign up form -->
              <form id="signup-form">
                <hr class="mt-3 mb-5" />
                <p class="text-xs text-center text-gray-700">
                  When do you want your course to be published? Please enter the
                  date and time below
                </p>
                <div class="">
                  <div class="form-group mb-5">
                    <label for="input-name">Date</label>
                    <div>
                      <input
                        id="input-name"
                        type="date"
                        class="form-input"
                        v-model="scheduleForm.date"
                        placeholder="Enter webinar date"
                        @input="checkScheduleFormError('date')"
                      />
                    </div>
                    <span
                      v-if="scheduleFormError.find((i) => i === 'date')"
                      class="text-sm text-red-700"
                      >Date is required</span
                    >
                  </div>
                  <div class="form-group mb-5">
                    <label for="input-name">Time</label>
                    <div>
                      <input
                        id="input-name"
                        type="time"
                        class="form-input"
                        v-model="scheduleForm.time"
                        placeholder="Enter webinar startTime"
                        @input="checkScheduleFormError('time')"
                      />
                    </div>
                    <span
                      v-if="scheduleFormError.find((i) => i === 'time')"
                      class="text-sm text-red-700"
                      >Time is required</span
                    >
                  </div>
                </div>
                <div class="flex text-center pt-8 pb-4 sm:pb-4">
                  <span class="flex mx-auto">
                    <button
                      @click.prevent="publish"
                      type="button"
                      class="btn btn-primary shadow"
                    >
                      Schedule Publishing
                      <loader v-if="loading" color="white" />
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- End login card -->
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data: () => ({
    isActive: false,
    scheduleForm: {
      time: '',
      date: '',
    },
    scheduleFormError: [],
  }),
  props: {
    closeModal: { type: Function, required: false },
    publishCourse: { type: Function, required: false },
    loading: { type: Boolean, required: false },
  },
  computed: {},
  methods: {
    checkScheduleFormError(value) {
      this.scheduleFormError = this.scheduleFormError.filter((i) => i !== value)
    },
    publish() {
      const { date, time } = this.scheduleForm

      for (let i in this.scheduleForm) {
        if (this.scheduleForm[i].length === 0) {
          this.scheduleFormError.push(i)
        }
      }

      if (!this.scheduleFormError.length) {
        const _date = moment(date).format('YYYY-MM-DD')
        const dateTime = { date: _date, time }
        console.log('dateTime: ', dateTime)
        this.publishCourse(dateTime)
        this.closeModal()
      }
    },
  },
}
</script>
