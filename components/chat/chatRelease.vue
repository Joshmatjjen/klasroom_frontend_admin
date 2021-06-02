<template>
  <div
    class="flex flex-col flex-1 bg-white rounded-xl border border-gray-300 shadow-hover h-full max-h-screen antialiased"
  >
    <div class="flex flex-col pt-4 px-4 md:pt-5 md:px-5">
      <div class="flex flex-row gap-6">
        <p class="text-sm font-bold text-gray-700">New Webinar Release</p>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.2784 13.2784C16.0872 10.4695 16.0872 5.91549 13.2784 3.10664C10.4695 0.297787 5.91549 0.297787 3.10664 3.10664C0.297787 5.91549 0.297787 10.4695 3.10664 13.2784C5.91549 16.0872 10.4695 16.0872 13.2784 13.2784ZM13.2784 13.2784L19 19" stroke="#8A8A8A" stroke-width="1.5"/>
        </svg>
      </div>
      <hr class="mt-4 border-gray-300" />
    </div>
    <div
      ref="scrollbar"
      class="mt-4 mb-3 mx-2 p-3 pt-1 flex flex-col space-y-4 overflow-y-auto scrollbar-thumb-orange scrollbar-thumb-rounded scrollbar-track-orange-lighter scrollbar-w-2 scrolling-touch"
    >
    <p class="text-sm">We are pleased to announce that our free webinar that teaches how to maximize the Klasroom platform. Please, follow this link to register.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
     
    }
  },
  mounted() {
    const el = this.$refs.scrollbar
    el.scrollTop = el.scrollHeight
  },
}
</script>

<style scoped>
@media (max-width: 640px) {
  h4 {
    @apply text-base;
  }
}
</style>
