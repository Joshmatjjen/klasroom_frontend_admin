<template>
  <div class="px-4 md:px-5 lg:px-6 py-4">
    <!-- Question -->
    <div class="form-group mb-5">
      <label for="input-name">Part {{ id + 1 }}</label>
      <div>
        <input
          id="input-name"
          type="text"
          class="form-input"
          :placeholder="`Enter part ${ id + 1} name`"
          v-model="item.question"
          @input="checkFormError('polls')"
        />
      </div>
    </div>
    <hr class="mb-5" />

    <div class="grid grid-cols-1 gap-x-5 gap-y-0">
      <lesson-chip
        v-for="(i, key) in item.lesson"
        :key="key"
        :id="key"
        :choice="i"
        @update:choice="
          (value) => {
            item.lesson[key] = value
          }
        "
        :deleteItem="removeChoice"
        :checkFormError="checkFormError"
      />
    </div>
    <!-- Add New Choice Button -->
    <div
      @click="addChoice"
      class="relative flex items-center justify-center my-10 cursor-pointer"
    >
      <hr class="w-full" />
      <empty-chip :isAbsolute="true">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0)">
            <path
              d="M-2.18262 8H7.99972V-2.18234"
              stroke="#8A8A8A"
              stroke-width="1.5"
            />
            <path
              d="M8 18.1821V7.99979H18.1823"
              stroke="#8A8A8A"
              stroke-width="1.5"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <p class="text-xs text-center font-thin text-gray-600 pl-2">
          Add new lesson
        </p>
      </empty-chip>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: false },
    id: { type: Number, required: false },
    deleteItem: { type: Function, required: false },
    polls: { type: Array, required: false },
    checkFormError: { type: Function, required: false },
  },
  methods: {
    addChoice() {
      this.item.lesson = [...this.item.lesson, '']
    },
    removeChoice(id) {
      this.item.lesson = this.item.lesson.filter((i, index) => index !== id)
    },
  },
}
</script>

<style scoped>
.container {
  height: 4.5rem;
}
.action-icon {
  width: 1.3rem;
  height: 1.3rem;
}
.top-tag {
  background-color: rgba(0, 0, 0, 0.25);
  padding: 4px 20px 4px 8px;
  font-size: 12px;
  line-height: 22px;
  color: #ffffff;
  border-radius: 12px;
  position: relative;
}
.top-tag::after {
  content: '';
  display: inline-block;
  border-radius: 4px;
  width: 8px;
  height: 8px;
  right: 6px;
  top: 8px;
  background: #0797ce;
  position: absolute;
}
</style>
