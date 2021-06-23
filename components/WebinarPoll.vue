<template>
  <div class="d-block">
    <div class="vote">
      <!-- <div class="flex cursor-pointer">
        <img src="/avatar.jpg" class="rounded-lg w-10 h-10 mr-3" />
        <div class="flex-grow my-auto">
          <p class="text-xs text-gray-700 font-bold">Olumide</p>
          <p class="text-xs leading-tight">Admin</p>
        </div>
      </div> -->
      <p class="text-xs text-gray-700 mt-3">
        {{ poll.question }}
      </p>
      <div class="border border-gray-300 rounded-xl pt-4 px-4 pb-1 mt-5">
        <ul class="mb-0">
          <li
            v-for="(item, key) in poll.choices"
            :key="key"
            :class="{ 'mb-5': key + 1 < poll.choices.length }"
          >
            <label class="checkbox">
              <span class="text-sm">{{ item }}</span>
              <input disabled v-model="option" type="radio" :value="item" />
              <span class="checkmark"></span>
            </label>
          </li>
        </ul>
      </div>
      <div class="flex flex-row mt-4 justify-between">
        <div>
          <!-- <button
            class="bg-orange-500 py-1 px-4 text-white rounded-md text-xs font-bold"
          >
            Vote
          </button> -->
        </div>
        <div class="flex flex-row divide-x divide-gray-300 gap-3">
          <span class="text-xs text-gray-600 my-auto">Duration:</span>
          <span class="text-xs text-gray-600 my-auto pl-3"
            >{{ poll.duration }} mins</span
          >
        </div>
      </div>
    </div>
    <hr v-if="length > 1" class="my-5" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: '',
      votes: [
        {
          name: 'Nigeria',
          score: 8,
        },
        {
          name: 'France',
          score: 50,
        },
        {
          name: 'United States',
          score: 32,
        },
      ],
    }
  },
  props: {
    poll: { type: Object, required: true },
    length: { type: Number, required: true },
  },
}
</script>
