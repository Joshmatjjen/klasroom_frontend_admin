<template>
  <div class="grid lg:grid-cols-12 gap-10">
    <div class="col-span-12 lg:col-span-5 px-4 lg:px-0 hidden md:block">
      <div
        class="banner-card text-center px-12 pt-40 pb-12"
        :style="{
          backgroundImage: webinar.webinar.image.signedUrl
            ? `url(${webinar.webinar.image.signedUrl})`
            : `url('/webinar-view-bg.jpg')`,
        }"
      >
        <nuxt-link
          v-if="!isPast && isStarted"
          :to="
            webinar.webinar.roomName
              ? `/webinars/start/${webinar.webinar.roomName}`
              : ``
          "
          ><button class="btn btn-primary mx-auto my-auto">
            Go to Webinar
          </button></nuxt-link
        >
        <button
          v-if="!isStarted"
          class="btn btn-primary mx-auto my-auto"
          @click.prevent="purchaseWebinar"
        >
          Reserve Slot Now
        </button>

        <div v-if="!isStarted" class="mt-6">
          <p class="font-semibold text-sm text-white">
            This webinar will start in
          </p>
          <div v-if="date" class="countdown-timer text-white mt-4">
            <span>{{ date.days }}</span>
            days
            <span>{{ date.hours }}</span>
            hours
            <span>{{ date.minutes }}</span>
            minutes
            <span>{{ date.seconds }}</span>
            seconds
          </div>
          <div v-else class="countdown-timer text-white mt-4">
            <span>Loading...</span>
          </div>
        </div>

        <div v-else-if="isStarted && !isPast" class="mb-8">
          <p class="font-semibold text-sm text-white">
            This webinar has started
          </p>
        </div>

        <div v-else class="mb-8">
          <p class="font-semibold text-sm text-white">This webinar has past</p>
        </div>
      </div>
    </div>
    <div class="lg:col-span-6">
      <h2 class="font-bold mb-8 leading-tight lg:pr-12">
        {{ webinar.webinar.title }}
      </h2>
      <p class="text-md md:text-md mb-8 text-gray-700 leading-normal">
        {{ webinar.webinar.subtitle }}
      </p>
      <div class="flex mb-10 md:mb-16">
        <img src="/avatar.jpg" class="rounded-full mr-3 w-8 h-8" />
        <span class="text-xs text-gray-700 block my-auto"> Joy Adeleke</span>
        <ul class="social-icons with-avatar my-auto">
          <li class="twitter">
            <a href="#"></a>
          </li>
          <li class="share">
            <a href="#"></a>
          </li>
        </ul>
      </div>
      <div class="grid grid-cols-12 gap-y-6">
        <div class="col-span-6 md:col-span-3">
          <span class="text-sm text-gray-700 block mb-1">{{
            formatDate(webinar.webinar.startDateTime)
          }}</span>
          <p class="text-xs text-gray-500 mb-0">Date</p>
        </div>
        <div class="col-span-6 md:col-span-2">
          <span class="text-sm text-gray-700 block mb-1">56</span>
          <p class="text-xs text-gray-500 mb-0">Signed up</p>
        </div>
        <div class="col-span-6 md:col-span-3">
          <span class="text-sm text-gray-700 block mb-1">{{
            webinar.price.price
              | currency(currencySymbols(webinar.price.currency), 0)
          }}</span>
          <p class="text-xs text-gray-500 mb-0">Price</p>
        </div>
        <!-- <div class="col-span-6 md:col-span-3">
          <span class="text-sm text-gray-700 block mb-1">104</span>
          <p class="text-xs text-gray-500 mb-0">Completions</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { currencySymbols } from '~/utils/index'

export default {
  props: {
    purchaseWebinar: { type: Function, required: false },
    webinar: { type: Object, required: false },
  },
  data: () => ({
    date: null,
    currencySymbols,
    timer: null,
    isPast: false,
    isStarted: false,
  }),
  methods: {
    addToCalendar() {},
    countdownTimer() {
      this.timer = setInterval(() => {
        if (this.webinar) {
          this.isPast = moment(this.webinar.webinar.endDateTime) < moment()
          this.isStarted = moment(this.webinar.webinar.startDateTime) < moment()
          const datetime = moment.duration(
            moment(this.webinar.webinar.startDateTime).diff(moment()),
            'milliseconds'
          )
          this.date = {
            days: datetime.days(),
            hours: datetime.hours(),
            minutes: datetime.minutes(),
            seconds: datetime.seconds(),
          }
        }
      }, 1000)
    },
    formatDate(date) {
      return moment(date).format('Do MMM. YYYY')
    },
  },
  mounted() {
    this.countdownTimer()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
}
</script>

<style scoped>
.banner-card {
  background-image: url('/webinar-view-bg.jpg');
  background-repeat: no-repeat;
  background-position: 0;
  background-size: cover;
  @apply bg-gray-200 overflow-hidden rounded-lg;
}

.countdown-timer {
  @apply text-xs text-white font-semibold;
}
.countdown-timer > span {
  @apply text-xl font-extrabold inline-block px-1;
}
</style>
