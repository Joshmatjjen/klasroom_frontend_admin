<template>
  <div class="flex justify-center">
    <div class="flex justify-center items-center" style="height: 150px">
      <svg
        :style="{ width: '100px', height: '30px' }"
        :class="`animate-spin h-5 ml-2 rounded-full border-2 text-blue-500 border-orange-400 stroke-current stroke-2`"
        viewBox="0 0 50 50"
      >
        <circle className="path" cx="25" cy="25" r="20" fill="none"></circle>
      </svg>
    </div>
  </div>
</template>
