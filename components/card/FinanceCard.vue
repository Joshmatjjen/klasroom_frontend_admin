<template>
  <div
    class="card bg-white rounded-xl border border-gray-300 shadow-hover relative"
  >
    <div class="px-4 md:px-5 lg:px-6 py-4">
      <div
        class="row-item flex py-3"
        :class="type === 'none' ? '' : 'divide-x divide-gray-300'"
      >
        <div class="flex-grow my-auto">
          <h5
            class="text-base font-extrabold"
            :class="greenBalance ? 'text-green-500' : 'text-gray-700'"
          >
            {{ title }}
          </h5>
          <p class="text-sm text-gray-600">{{ label }}</p>
        </div>
        <div v-if="type === 'none'"></div>
        <div v-else class="text-right pl-5">
          <!-- <span class="text-xs text-gray-700">Due 12th Oct. 2020</span> -->
          <nuxt-link
            to="/courses"
            class="text-gray-700 inline-block my-3"
            v-if="type === 'link' || type === 'withdraw'"
          >
            <span class="text-sm">{{ typeText }}</span>
          </nuxt-link>

          <div
            @click="
              filterData([{ name: 'status=', value: filterType }], tableType)
            "
            class="text-gray-700 inline-block my-3 cursor-pointer"
            v-else
          >
            <span class="text-sm">{{ 'Filter' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    label: { type: String, required: true },
    link: { type: String, default: null },
    type: { type: String, default: null },
    typeText: { type: String, default: null },
    tableType: { type: String, default: null },
    filterData: { type: Function, required: false },
    filterType: { type: String, default: null },
    greenBalance: { type: Boolean, required: null },
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
.card {
  min-width: 280px;
}
@media (max-width: 640px) {
  h4 {
    @apply text-base;
  }
}
</style>
