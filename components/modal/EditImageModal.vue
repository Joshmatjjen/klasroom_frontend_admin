<template>
  <!--
    Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
    Read the documentation to get started: https://tailwindui.com/documentation
  -->
  <div v-if="showEditImage" class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-start justify-center align-middle min-h-screen pt-4 px-4 pb-4 lg:pb-20 text-center sm:block sm:p-0"
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
        class="modal inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full sm:max-w-lg"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div class="bg-white relative pt-5 pb-3">
          <!-- Close button -->
          <div
            class="absolute px-8 top-0 right-0 -ml-8 pt-3 pr-3 flex sm:-ml-10 sm:pr-3"
          >
            <button
              aria-label="Close panel"
              class="text-gray-700 hover:text-gray-500 focus:outline-none transition ease-in-out duration-150"
              @click="
                () => {
                  close()
                }
              "
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
            <div class="sm:ml-0">
              <p
                id="modal-headline"
                class="px-8 text-sm font-semibold text-left text-gray-800"
              >
                Change Picture
              </p>
              <hr class="mt-8 mb-5" />
              <!-- Login form -->
              <form id="login-form">
                <div class="form-group mb-5">
                  <div class="px-0 lg:px-8">
                    <input
                      ref="input"
                      type="file"
                      name="image"
                      accept="image/*"
                      @change="setImage"
                    />

                    <div class="flex justify-center">
                      <cropper
                        class="cropper"
                        :src="imgSrc || profileImage"
                        :transitions="true"
                        image-restriction="fill-area"
                        default-boundaries="fill"
                        @change="change"
                        imageClass="vue-advanced-cropper__image"
                      ></cropper>
                    </div>
                    <div class="flex justify-center mt-5">
                      <p
                        id="modal-headline"
                        class="px-8 text-sm font-medium text-left text-gray-800"
                      >
                        Drag to reposition picture
                      </p>
                    </div>
                    <!-- <input
                      id="input-name"
                      type="text"
                      class="form-input"
                      placeholder="Enter your name here"
                      :value="(editProfileForm.name = user.name)"
                      @input="editProfileForm.name = $event.target.value"
                    /> -->
                  </div>
                  <span
                    v-if="editProfileFormError.find((i) => i === 'name')"
                    class="text-sm text-red-700"
                    >Name is required</span
                  >
                </div>
                <div class="flex justify-evenly text-center pt-3 pb-3 mx-auto">
                  <button
                    type="button"
                    class="btn btn-primary shadow"
                    @click.prevent="showFileChooser"
                  >
                    Upload
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary shadow"
                    @click.prevent="(e) => onSave(e, user.userId)"
                  >
                    Save
                    <loader v-if="loading" color="white" />
                  </button>
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
import { mapState } from 'vuex'

export default {
  // components: { VueCropper, Cropper },
  data: () => ({
    // isLogin: true,
    loading: false,
    imgSrc: '',
    cropImg: '',
    newImageData: null,
    editProfileFormError: [],
  }),

  computed: {
    ...mapState({
      showEditImage: (state) => state.app.editImageModal,
      user: (state) => state.auth.user,
      profileImage: (state) => state.auth.profileImage,
    }),
  },

  watch: {
    // showLogin: {
    //   handler(value) {
    //     // console.log('showLogin', value)
    //     // console.log('secret: ', process.env.secret)
    //     if (value) this.isLogin = value.type !== 'register'
    //   },
    //   immediate: true,
    // },
  },
  methods: {
    change({ coordinates, canvas }) {
      canvas.toBlob((blob) => {
        console.log('blob data', blob)
        this.newImageData = blob
      })

      // let newImg = canvas.toDataURL()
      // console.log(newImg)
      // console.log(coordinates, canvas)
    },
    setImage(e) {
      console.log('Uploading__')
      const file = e.target.files[0]
      if (file.type.indexOf('image/') === -1) {
        alert('Please select an image file')
        return
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader()
        reader.onload = (event) => {
          this.imgSrc = event.target.result
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result)
        }
        reader.readAsDataURL(file)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    showFileChooser() {
      // console.log(this.profileImage)
      this.$refs.input.click()
    },
    onSave(e, userId) {
      // console.log('Hello >>', this.editProfileForm)
      if (e) e.preventDefault()
      this.loading = true
      let imageData = this.newImageData

      this.$store
        .dispatch('auth/changeProfileImage', imageData)
        .then((res) => {
          this.loading = false
          console.log(res)
          if (res) {
            this.showSuccess({
              message: 'You have successfully updated your profie image',
            })
          }
        })
        .catch((e) => console.log('e: ', e))
    },
    showSuccess(res) {
      this.$store.commit('app/NOTICE_MODAL', {
        title: 'All done!',
        text: res.message
          ? res.message
          : `You have successfully updated your profile`,
      })
      this.close()
    },
    close() {
      this.$store.commit('app/EDIT_IMAGE_MODAL', null)
    },
  },
}
</script>

<style scope>
.modal {
  left: 0;
  right: 0;
  margin-top: calc(100vh / 20);
  margin-bottom: calc(100vh / 20);
}
.cropper {
  max-height: 300px !important;
  max-width: 100% !important;
}
input[type='file'] {
  display: none;
}
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  background: #f5f5f3;
  border: none;
  font-size: 0.875rem;
  color: #8a8a8a;
}

.style-chooser .vs__dropdown-menu {
  overflow: auto;
  height: 150px;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #8a8a8a;
}
</style>
