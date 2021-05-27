<template>
  <div class="bg-white rounded-xl border border-gray-300 shadow-hover relative">
    <div class="p-4 md:p-5 lg:p-6 pb-16 md:pb-18 lg:pb-20">
      <div class="flex flex-row cursor-pointer">
        <p
          class="text-left text-xs md:text-sm text-gray-500 font-normal leading-snug pr-2"
        >
          This week
        </p>
        <img src="~/static/actions/arrow-down.svg" v-on:click="toggleMenu" />
        <div
          :class="{
            hidden: opt ? false : true,
          }"
          class="pop-up flex flex-col items-start p-2 justify-around pop-up absolute top-0 mt-10 border-gray-500 bg-white rounded-lg h-32 w-32 shadow-lg"
          :style="{ zIndex: 3 }"
        >
          <a
            href="#"
            class="pop-up-item lg:mr-4 md:text-gray-700 text-sm font-normal hover:text-gray-900 md:bg-transparent block md:inline-block mb-8 md:mb-0"
          >
            <p>Today</p>
          </a>
          <a
            href="#"
            class="pop-up-item lg:mr-4 md:text-gray-700 text-sm font-normal hover:text-gray-900 md:bg-transparent block md:inline-block mb-8 md:mb-0"
          >
            <p>This week</p>
          </a>
          <a
            href="#"
            class="pop-up-item lg:mr-4 md:text-gray-700 text-sm font-normal hover:text-gray-900 md:bg-transparent block md:inline-block mb-8 md:mb-0"
          >
            <p>This month</p>
          </a>
          <a
            href="#"
            class="pop-up-item lg:mr-4 md:text-gray-700 text-sm font-normal hover:text-gray-900 md:bg-transparent block md:inline-block mb-8 md:mb-0"
          >
            <p>This year</p>
          </a>
          <a
            href="#"
            class="pop-up-item lg:mr-4 md:text-gray-700 text-sm font-normal hover:text-gray-900 md:bg-transparent block md:inline-block mb-8 md:mb-0"
          >
            <p>All time</p>
          </a>
        </div>
      </div>

      <div class="grid grid-cols-2 items-end">
        <h4
          class="text-left text-gray-700 font-extrabold leading-snug mt-0 md:mt-5 mb-4"
        >
          ₦{{ amount }}
        </h4>
        <p
          class="text-right text-xs md:text-sm text-gray-500 font-normal leading-snug mt-0 md:mt-5 mb-4"
        >
          current bal.
        </p>
      </div>
      <div class="block">
        <p class="text-xs md:text-sm text-green-500">
          +₦{{ weekSales }} this week
        </p>
        <p class="text-xs md:text-sm text-gray-700">
          {{ planSales }} total plan sales
        </p>
        <p class="text-xs md:text-sm text-gray-700">
          {{ productSales }} total product sales
        </p>
      </div>
      <div class="grid grid-cols-2 gap-5 mt-8">
        <button class="btn btn-light btn-sm lg:mt-0">Open wallet</button>
        <button class="btn btn-light btn-sm lg:mt-0">Withdraw</button>
      </div>
    </div>
    <div v-if="more" class="absolute text-center bottom-0 mb-5 w-full px-5">
      <hr data-v-6cf0f546="" class="mb-4" />
      <nuxt-link :to="more" class="text-gray-700 inline-block">
        <span class="text-xs">View all sales</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    amount: { type: String, required: true },
    items: { type: Array, required: true },
    weekSales: { type: String, required: true },
    planSales: { type: String, required: true },
    productSales: { type: String, required: true },
    more: { type: String, default: null },
  },
  data: () => ({
    opt: false,
  }),
  methods: {
    toggleMenu() {
      this.opt = !this.opt
    },
  },
}
</script>

<style scoped>
.course-stacks {
  display: inline-block;
  width: 52px;
  height: 52px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  @apply bg-gray-300;
}
@media (max-width: 640px) {
  h4 {
    @apply text-base;
  }
}
</style>
