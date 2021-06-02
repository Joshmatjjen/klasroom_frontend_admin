<template>
  <div
    class="flex flex-col gap-1 items-start p-2 justify-around absolute pop-up border-gray-500 bg-white rounded-lg min-h-32 min-w-32 shadow-lg"
    :class="[
      styles,
      {
        hidden: mainOpt ? false : true,
      },
    ]"
    :style="{ zIndex: 300000000 }"
  >
    <div v-if="type === 'route'" class="pr-12">
      <nuxt-link
        :to="{ name: 'people', params: { tab: option.tab } }"
        v-for="(option, key) in options"
        :key="key"
        class="lg:mr-4 md:text-gray-700 text-sm hover:text-gray-900 md:bg-transparent md:mb-0"
      >
        <p class="-mb-2">{{ option.name }}</p>
      </nuxt-link>
    </div>
    <div v-else>
      <div
        to="#"
        v-for="(option, key) in options"
        :key="key"
        class="pop-up-item truncate lg:mr-4 md:text-gray-700 text-sm font-normal hover:text-gray-900 md:bg-transparent mb-2 md:mb-0 cursor-pointer"
      >
        <p>{{ option.name }}</p>
      </div>
    </div>
  </div>
  <!-- <div v-if="more" class="absolute text-center bottom-0 mb-5 w-full px-5">
      <hr data-v-6cf0f546="" class="mb-4" />
      <nuxt-link :to="more" class="text-gray-700 inline-block">
        <span class="text-xs">See more</span>
      </nuxt-link>
    </div> -->
</template>

<script>
export default {
  props: {
    type: { type: String, requited: false },
    options: { type: Array, required: false },
    mainOpt: { type: Boolean, required: false },
    action: { type: Function, required: false },
    styles: { type: String, requited: false },
  },
  name: 'simple-table',
  // data: () => ({
  //   opt: false,
  //   optId: null,
  // }),
  // methods: {
  //   toggleMenu(optId) {
  //     this.opt = !this.opt
  //     if (optId) this.optId = optId
  //   },
  // },
}
</script>

<style scoped>
.course-image {
  display: inline-block;
  width: 91px;
  height: 60px;
  @apply bg-gray-300;

  /* border: 1px solid rgba(0, 0, 0, 0.1); */
}

.pop-up {
  border-width: 0.1rem;
}

@media (max-width: 640px) {
  h4 {
    @apply text-base;
  }
}
</style>
