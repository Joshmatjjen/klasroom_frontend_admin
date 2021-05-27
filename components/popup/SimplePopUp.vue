<template>
  <div
    class="flex flex-col gap-1 items-start p-2 justify-around absolute pop-up border-gray-500 bg-white rounded-lg min-h-32 min-w-32 shadow-lg"
    :class="[
      styles,
      {
        hidden: createOpt ? false : true,
      },
    ]"
    :style="{ zIndex: 300000000 }"
  >
    <!-- <div v-for="(option, key) in options" :key="key"> -->
    <a
      href="#"
      v-for="(option, key) in options"
      :key="key"
      class="pop-up-item truncate lg:mr-4 md:text-gray-700 text-sm font-normal hover:text-gray-900 md:bg-transparent mb-2 md:mb-0"
    >
      <p>{{ option.name }}</p>
    </a>
    <!-- </div> -->
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
    options: { type: Array, required: false },
    createOpt: { type: Boolean, required: false },
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
