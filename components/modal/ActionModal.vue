<template>
  <!--
    Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
    Read the documentation to get started: https://tailwindui.com/documentation
  -->
  <div v-if="actionModal" class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!--
        Background overlay, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      -->
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span
      >&#8203;
      <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
            >
              <!-- Heroicon name: exclamation -->
              <svg
                class="h-6 w-6 text-red-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                id="modal-headline"
                class="text-lg leading-6 font-medium text-gray-900"
              >
                {{ actionModal.title }}
              </h3>
              <div class="mt-2">
                <p class="text-sm leading-5 text-gray-500">
                  {{ actionModal.desc }}
                </p>
              </div>
              <div
                class="form-group mt-5"
                v-if="actionModal.actionType === 'Suspend'"
              >
                <div>
                  <input
                    id="comment"
                    type="text"
                    multiple
                    class="form-input"
                    placeholder="Type your reason for this suspension"
                    v-model="comment"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button
              v-if="!loading"
              @click="
                comment.length > 5 || actionModal.actionType === 'Reactivate'
                  ? submit()
                  : null
              "
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 text-base leading-6 font-medium text-white shadow-sm sm:text-sm sm:leading-5"
              :class="
                comment.length > 5 || actionModal.actionType === 'Reactivate'
                  ? 'bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150'
                  : 'bg-red-300'
              "
            >
              {{ capitalizeFirstLetter(actionModal.actionName) }}
            </button>

            <button
              v-if="loading"
              @click="null"
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 text-base leading-6 font-mediu shadow-sm sm:text-sm sm:leading-5"
              :class="
                comment.length > 5 || actionModal.actionType === 'Reactivate'
                  ? 'bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150'
                  : 'bg-red-300'
              "
            >
              <img src="/spinner/white-loader.svg" class="w-5 h-5" alt="" />
            </button>
          </span>
          <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
            <button
              type="button"
              class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              @click="$store.commit('app/ACTION_MODAL', null)"
            >
              Cancel
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    comment: '',
    loading: false,
  }),
  computed: {
    ...mapState({
      actionModal: (state) => state.app.actionModal,
    }),
  },
  methods: {
    submit() {
      this.loading = true
      this.$store
        .dispatch('people/accountActions', {
          actionType: this.actionModal.actionType.toLowerCase(),
          type: this.actionModal.type.toLowerCase(),
          userId: this.actionModal.userId,
          comment: this.comment,
        })
        .then((res) => {
          console.log('TYperes', this.actionModal.type)
          console.log(
            'Current Page In Action Modal',
            this.actionModal.currentPage
          )
          this.loading = false
          // this.settings = res
          if (this.actionModal.currentPage) {
            this.$store
              .dispatch(
                `people/get${this.actionModal.type}`,
                this.actionModal.currentPage
              )
              .then((res) => {
                console.log(res)
                this.loading = false
                // this.settings = res
                if (res) {
                  // this.showSuccess(res)
                }
              })
              .catch((e) => console.log('e: ', e))
          }
          this.$store.commit('app/ACTION_MODAL', null)
        })
        .catch((e) => {
          console.log('e: ', e)
          this.$store.commit('app/ACTION_MODAL', null)
        })
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
  },
}
</script>
