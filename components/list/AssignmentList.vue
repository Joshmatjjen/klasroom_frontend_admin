<template>
  <div
    class="flex flex-row rounded-xl bg-white border border-gray-300 divide-x divide-gray-300 my-4"
  >
    <div class="flex flex-col mr-auto my-auto text-gray-700 py-4 px-5">
      <span class="block text-xs font-semibold">{{ title }}</span>
      <p class="text-xs md:truncate">{{ desc }}</p>
    </div>
    <button class="text-sm py-4 px-5 text-gray-700 focus:outline-none">
      <img
        @click="deleteAssignment(id)"
        v-if="edit"
        class="w-6 h-6 mx-auto"
        src="/icon/delete.svg"
      />
      <span v-else>See more</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    edit: { type: Boolean, required: false },
    deleteAssignment: { type: Function, required: false },
  },
  mounted() {
    console.log('edit: ', this.edit)
  },
}
</script>

<style scoped>
button {
  width: 144px;
}
</style>
