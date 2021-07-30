<template>
  <div class="px-4 md:px-5 lg:px-6 py-4">
    <!-- Part -->
    <div
      :class="
        collapsedPartIds.find((i) => i === id) !== undefined
          ? 'h-10 overflow-hidden border-b border-dashed'
          : ''
      "
    >
      <div class="form-group mb-5">
        <div class="flex justify-between items-center">
          <label for="input-name"
            >Part {{ id + 1 }}
            <img
              class="w-4 h-4 inline ml-3 mb-1 cursor-pointer"
              src="/icon/delete.svg"
              @click="deleteItem(id)"
              v-if="id > 0"
            />
          </label>
          <span @click="collapsedPart(id)" class="collapse text-xs mb-3"
            >Collapse</span
          >
        </div>
        <div>
          <input
            id="input-name"
            type="text"
            class="form-input"
            :placeholder="`Enter part ${id + 1} name`"
            v-model="item.part"
            @input="checkFormError('part')"
          />
        </div>
      </div>
      <hr class="mb-5" />

      <div class="grid grid-cols-1 gap-x-5 gap-y-0">
        <lesson-chip
          v-for="(i, key) in item.lessons"
          :key="key"
          :id="key"
          :lesson="i"
          @update:lesson="
            (value) => {
              i.lesson = value
            }
          "
          @update:description="
            (value) => {
              i.description = value
            }
          "
          @update:content="
            (value) => {
              i.content = value
            }
          "
          @update:assignments="
            (value) => {
              i.assignments = value
            }
          "
          :deleteItem="removeLesson"
          :updateAssignment="updateAssignment"
          :checkFormError="checkFormError"
        />
      </div>
    </div>
    <!-- Add New Lesson Button -->
    <div
      @click="addLesson"
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
    checkFormError: { type: Function, required: false },
  },
  data: () => ({
    collapsedPartIds: [],
  }),
  methods: {
    addLesson() {
      this.item.lessons = [
        ...this.item.lessons,
        {
          lesson: '',
          description: '',
          content: '',
          assignments: [],
        },
      ]
    },
    removeLesson(id) {
      this.item.lessons = this.item.lessons.filter((_i, index) => index !== id)
    },
    updateAssignment(id, type, item) {
      switch (type) {
        case 'add':
          if (this.item.lessons.find((_i, index) => index == id).assignments)
            this.item.lessons
              .find((i, index) => index == id)
              .assignments.push(item)
          else
            this.item.lessons.find((_i, index) => index == id).assignments = [
              item,
            ]
          break

        case 'remove':
          this.item.lessons
            .find((_i, index) => index == id)
            .assignments.splice(item, 1)
          break

        default:
          break
      }
    },
    collapsedPart(id) {
      console.log(this.collapsedPartIds.find((i) => i === id))
      if (this.collapsedPartIds.find((i) => i === id) !== undefined) {
        this.collapsedPartIds = this.collapsedPartIds.filter((i) => i !== id)
      } else this.collapsedPartIds = [...this.collapsedPartIds, id]
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
.collapse {
  background-image: url('/icon/dash-user-drop.svg');
  color: rgba(113, 128, 150, 1);
  background-repeat: no-repeat;
  background-position: top 50% right 8px;
  padding: 5px;
  @apply border border-gray-400 rounded-xl pr-12;
  @apply align-bottom;
}
</style>
