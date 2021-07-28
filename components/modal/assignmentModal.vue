<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-start justify-center min-h-screen pt-4 px-4 pb-4 lg:pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span
      >&#8203;
      <div
        class="inline-block align-top bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full sm:max-w-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white relative px-4 pt-5 pb-4 sm:p-8 sm:pb-5">
          <!-- Close button -->
          <div
            class="absolute top-0 right-0 -ml-8 pt-3 pr-3 flex sm:-ml-10 sm:pr-3"
          >
            <button
              aria-label="Close panel"
              class="text-gray-700 hover:text-gray-500 focus:outline-none transition ease-in-out duration-150"
              @click="closeModal"
            >
              <!-- Heroicon name: x -->
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="block">
            <div class="mt-3 sm:mt-0 sm:ml-0">
              <h2
                id="modal-headline"
                class="text-xl text-center sm:text-4xl leading-none font-bold text-gray-800 mb-4"
              >
               Create assignment
              </h2>
            </div>
            <div class="mt-3 sm:mt-0 sm:ml-0">
              <!-- Purchase form -->

              <!-- Sign up form -->
              <form id="signup-form">
                <hr class="mt-3 mb-5" />
                <div class="">
                    <div class="form-group mb-5">
                    <label for="input-name">Assignment title</label>
                    <div>
                        <input
                        id="input-name"
                        type="text"
                        class="form-input"
                        placeholder="Enter assignment title here"
                        />
                    </div>
                    </div>
                    <div class="form-group mb-5">
                    <label for="input-name">Assignment description</label
                    >
                    <div>
                        <textarea
                        id="input-text"
                        type="text"
                        class="form-input"
                        placeholder="Anyone who lived in the time of legends such as Henry Ford, Alexander Graham Bell, Thomas Edison and Albert Einstein could be forgiven for thinking everything that can be invented already has been invented."
                        />
                    </div>
                    </div>
                </div>
                <div class="flex text-center pt-8 pb-4 sm:pb-4">
                  <span class="flex mx-auto">
                    <button
                      @click.prevent="$emit('click')"
                      type="button"
                      class="btn btn-primary shadow"
                    >
                    Add assignment
                      <loader v-if="loading" color="white" />
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- End login card -->
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isActive: false,
    // loading: false,
  }),
  props: {
    closeModal: { type: Function, required: false },
    loading: {type: Boolean, required: false}
  },
  computed: {
    
  },
  methods: {
  },
}
</script>
