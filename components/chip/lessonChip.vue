<template>
  <!-- Choices -->
  <div class="form-group mb-5">
    <label for="input-choice"
      >{{ 'Lesson ' + (id + 1) }}
      <img
        class="w-4 h-4 inline ml-3 mb-1 cursor-pointer"
        src="/icon/delete.svg"
        @click="deleteItem(id)"
        v-if="id > 1"
      />
    </label>
    <div>
      <input
        id="input-choice"
        type="text"
        class="form-input"
        :placeholder="`Enter lesson ${id + 1} name`"
        v-model="lesson"
        @input="checkFormError('polls')"
      />
    </div>
    <div class="mt-5">
        <label for="textarea-name"
        >{{ 'Lesson ' + (id + 1) + ' description' }}
        <img
            class="w-4 h-4 inline ml-3 mb-1 cursor-pointer"
            src="/icon/delete.svg"
            @click="deleteItem(id)"
            v-if="id > 1"
        />
        </label>
        <textarea
            id="textarea-name"
            type="text"
            class="form-textarea"
            v-model="_textarea"
            placeholder="Anyone who lived in the time of legends such as Henry Ford, Alexander Graham Bell, Thomas Edison and Albert Einstein could be forgiven for thinking everything that can be invented already has been invented. Of course, if we’d stopped there, we wouldn’t have the computer or the internet. The past century of our history stands as a testament to human ingenuity and our persistence to make things better."
            @input="checkFormError('co_host')"
        />
    </div>
     <div class="px-4 md:px-5 lg:px-6 mt-4">
    <resource-chip
        v-for="(item, key) in fileResources"
        :key="key"
        :file="{ filename: item.name }"
        :id="key"
        :deleteItem="deleteResItem"
    />
    <resource-chip
        v-for="(item, key) in linkResources"
        :key="key"
        :link="item"
        :id="key"
        :deleteItem="deleteResItem"
    />
    <div class="flex flex-row justify-center gap-5">
    <div
        class="flex flex-row bg-white rounded-md border border-orange-400 shadow-hover mt-2 mb-5 py-1 px-2 cursor-pointer"
        @click.prevent="showFileChooser"
        >
        <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6 8.0001L1.39998 14.4001V1.6001L12.6 8.0001Z" stroke="#8A8A8A" stroke-width="1.5"/>
        </svg>
        <p
            class="text-xs text-center font-thin text-gray-600 pl-2"
        >
            Add lesson video
        </p>
        </div>
        <div
        class="flex flex-row bg-white rounded-md border border-orange-400 shadow-hover mt-2 mb-5 py-1 px-2 cursor-pointer"
        @click.prevent="showFileChooser"
        >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.4323 3.24273V1.48682H1.09131V14.5134H13.4323V9.21275" stroke="#8A8A8A" stroke-width="1.5"/>
            <path d="M3.83105 7.87307L7.7178 11.7598L15.4913 3.98633" stroke="#8A8A8A" stroke-width="1.5"/>
        </svg>
        <p
            class="text-xs text-center font-thin text-gray-600 pl-2"
        >
            Add assignment
        </p>
        </div>
        <div
        class="flex flex-row bg-white rounded-md border border-orange-400 shadow-hover mt-2 mb-5 py-1 px-2 cursor-pointer"
        @click.prevent="showFileChooser"
        >
        <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            d="M1.3291 6.28682V14.5134H13.6701V9.21275V1.48682H5.8996M1.3291 6.28682L5.8996 1.48682M1.3291 6.28682H5.8996V1.48682"
            stroke="#8A8A8A"
            stroke-width="1.5"
            />
        </svg>
        <p
            class="text-xs text-center font-thin text-gray-600 pl-2"
        >
            Add resource
        </p>
        </div>
        <div
        class="flex flex-row bg-white rounded-md border border-orange-400 shadow-hover mt-2 mb-5 py-1 px-2 cursor-pointer"
        @click.prevent="showAddLink"
        >
        <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            d="M9.57731 10.6644C9.5512 10.6386 9.51595 10.6241 9.47921 10.6241C9.44248 10.6241 9.40722 10.6386 9.38112 10.6644L7.36366 12.6819C6.42959 13.616 4.85312 13.7149 3.82182 12.6819C2.78878 11.6489 2.88775 10.0741 3.82182 9.14006L5.83928 7.1226C5.8931 7.06878 5.8931 6.98023 5.83928 6.92641L5.14827 6.2354C5.12217 6.20955 5.08692 6.19505 5.05018 6.19505C5.01344 6.19505 4.97819 6.20955 4.95208 6.2354L2.93462 8.25286C1.4658 9.72168 1.4658 12.0985 2.93462 13.5656C4.40345 15.0327 6.7803 15.0344 8.24738 13.5656L10.2648 11.5482C10.3187 11.4943 10.3187 11.4058 10.2648 11.352L9.57731 10.6644ZM14.0671 2.43487C12.5983 0.966046 10.2214 0.966046 8.75435 2.43487L6.73516 4.45233C6.70931 4.47843 6.69481 4.51369 6.69481 4.55042C6.69481 4.58716 6.70931 4.62241 6.73516 4.64852L7.42443 5.33779C7.47825 5.39161 7.56679 5.39161 7.62062 5.33779L9.63808 3.32033C10.5721 2.38625 12.1486 2.28729 13.1799 3.32033C14.213 4.35336 14.114 5.92809 13.1799 6.86217L11.1625 8.87963C11.1366 8.90573 11.1221 8.94099 11.1221 8.97772C11.1221 9.01446 11.1366 9.04971 11.1625 9.07582L11.8535 9.76682C11.9073 9.82065 11.9958 9.82065 12.0497 9.76682L14.0671 7.74936C15.5342 6.28054 15.5342 3.90369 14.0671 2.43487ZM10.2041 5.57565C10.178 5.5498 10.1427 5.5353 10.106 5.5353C10.0692 5.5353 10.034 5.5498 10.0079 5.57565L6.0754 9.5064C6.04955 9.5325 6.03505 9.56775 6.03505 9.60449C6.03505 9.64123 6.04955 9.67648 6.0754 9.70259L6.76294 10.3901C6.81676 10.4439 6.9053 10.4439 6.95913 10.3901L10.8899 6.45937C10.9437 6.40555 10.9437 6.317 10.8899 6.26318L10.2041 5.57565Z"
            fill="#8A8A8A"
            />
        </svg>
        <p
            class="text-xs text-center font-thin text-gray-600 pl-2"
        >
            Add link
        </p>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lesson: { type: String, required: false },
    textarea: { type: String, required: false },
    id: { type: Number, required: false },
    deleteItem: { type: Function, required: false },
    checkFormError: { type: Function, required: false },
  },
  computed: {
    _lesson: {
      get: function () {
        return this.lesson
      },
      set: function (newValue) {
        this.$emit('update:choice', newValue)
      },
    },
    _textarea: {
      get: function () {
        return this.textarea
      },
      set: function (newValue) {
        this.$emit('update:textarea', newValue)
      },
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
