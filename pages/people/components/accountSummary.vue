<template>
  <div class="min-h-screen mb-12 mt-8">
    <section class="bg-orange-100">
      <div class="container mx-auto px-4 lg:px-0">
        <div class="grid grid-cols-12 gap-5">
          <div class="col-span-full lg:col-span-7 xl:col-span-8">
            <!-- Account Summary -->
            <div
              class="bg-white rounded-xl border border-gray-300 shadow-hover relative"
            >
              <div class="px-4 md:px-5 lg:px-6 py-4">
                <!-- Player -->
                <div class="mb-5 lg:mb-20">
                  <p class="text-sm font-bold text-gray-700 mb-3">
                    Account Details
                  </p>
                  <hr class="mt-4 mb-6" />
                  <div class="grid grid-cols-12 mb-5">
                    <div class="col-span-7">
                      <p class="text-sm font-bold text-gray-700 mb-3">Name</p>
                      <p class="text-sm text-gray-700">{{ data.name }}</p>
                    </div>
                    <!-- <div class="col-span-5 text-right">
                      <button
                        v-on:click.prevent="toggleEditProfile()"
                        class="btn btn-light btn-sm"
                      >
                        Edit
                      </button>
                    </div> -->
                  </div>
                  <div class="grid grid-cols-12 mb-5">
                    <div class="col-span-7">
                      <p class="text-sm font-bold text-gray-700 mb-3">Phone</p>
                      <p class="text-sm text-gray-700">{{ data.phone }}</p>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 mb-5">
                    <div class="col-span-7">
                      <p class="text-sm font-bold text-gray-700 mb-3">Email</p>
                      <p class="text-sm text-gray-700">{{ data.email }}</p>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 mb-5">
                    <div class="col-span-7">
                      <p class="text-sm font-bold text-gray-700 mb-3">Gender</p>
                      <p class="text-sm text-gray-700">{{ data.gender }}</p>
                    </div>
                  </div>
                  <hr class="mt-4 mb-6" />
                  <div class="grid grid-cols-12 mb-5">
                    <div class="col-span-7">
                      <p class="text-sm font-bold text-gray-700 mb-3">
                        Twitter
                      </p>
                      <p class="text-sm text-gray-700">{{ '@omotobi' }}</p>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 mb-5">
                    <div class="col-span-7">
                      <p class="text-sm font-bold text-gray-700 mb-3">
                        Website
                      </p>
                      <p class="text-sm text-gray-700">{{ '@omotobi' }}</p>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 mb-5">
                    <div class="col-span-7">
                      <p class="text-sm font-bold text-gray-700 mb-3">
                        Linkedin
                      </p>
                      <p class="text-sm text-gray-700">
                        {{ 'www.ilnkedin.com/aminabello' }}
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-12 mb-5">
                    <div class="col-span-7">
                      <p class="text-sm font-bold text-gray-700 mb-3">
                        Password
                      </p>
                      <p class="text-sm text-gray-700">*****************</p>
                    </div>
                    <div class="col-span-5 text-right">
                      <button
                        class="btn btn-light btn-sm"
                        v-on:click.prevent="toggleChangePassword()"
                      >
                        Initial password reset
                      </button>
                    </div>
                  </div>
                  <hr class="mt-4 mb-6" />
                  <div class="grid grid-cols-12 mb-5">
                    <div class="col-span-7">
                      <p class="text-sm font-bold text-gray-700 mb-3">
                        Payment
                      </p>
                      <p class="text-sm text-gray-700">
                        Your default payment method is ****1992
                      </p>
                    </div>
                    <!-- <div class="col-span-5 text-right">
                      <button class="btn btn-light btn-sm">Change</button>
                    </div> -->
                  </div>
                  <div class="mb-5" v-if="type === 'tutors'">
                    <div class="">
                      <p class="text-sm font-bold text-gray-700 mb-3">
                        Signature
                      </p>
                      <p class="text-sm text-gray-700">
                        Please upload an image of your signature to be attached
                        to student certificates. Please ensure the image has a
                        plain white background
                      </p>
                    </div>
                    <div
                      class="relative flex p-6 justify-center w-full align-middle items-center mt-10 rounded-xl border border-orange-500"
                    >
                      <img
                        class="absolute left-0 ml-6"
                        src="/mySignature.png"
                        alt=""
                      />
                      <p class="text-sm font-normal text-gray-700 text-center">
                        mySignature.png
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Permissions -->
            <div
              v-if="type === 'admins'"
              class="bg-white rounded-xl border border-gray-300 shadow-hover relative mt-8"
            >
              <div class="px-4 md:px-5 lg:px-6 py-4">
                <!-- Player -->
                <div class="mb-5 lg:mb-20">
                  <p class="text-sm font-bold text-gray-700 mb-3">
                    Permissions
                  </p>
                  <hr class="mt-4 mb-6" />
                  <div class="grid grid-cols-12 mb-5">
                    <div class="col-span-12">
                      <p class="text-sm font-bold text-gray-700 mb-3">
                        Account status
                      </p>
                      <div class="grid grid-cols-12 mb-3">
                        <div class="col-span-7">
                          <p class="text-sm text-gray-700">Account active</p>
                        </div>
                        <div class="col-span-5 text-right">
                          <input-toggle-switch v-model="autoplay" />
                        </div>
                      </div>
                      <hr class="mt-4 mb-6 w-full" />
                    </div>

                    <div class="col-span-12">
                      <p class="text-sm font-bold text-gray-700 mb-3">Role</p>
                      <div class="grid grid-cols-12 mb-3">
                        <div class="col-span-7">
                          <p class="text-sm text-gray-700">Assigned role</p>
                        </div>
                        <div class="col-span-5 flex flex-row justify-end">
                          <v-select
                            class="style-chooser cursor-pointer"
                            placeholder="Select role"
                            :options="[
                              'Level 1 admin',
                              'Level 2 admin',
                              'Level 3 admin',
                            ]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr class="mt-4 mb-6" />
                  <div class="grid grid-cols-12 mb-5">
                    <div class="col-span-7">
                      <p class="text-sm font-bold text-gray-700 mb-3">
                        Affordes permissions
                      </p>
                      <p
                        class="text-sm text-gray-700 hover:text-gray-900 cursor-pointer mb-4"
                      >
                        See accounts
                      </p>
                      <p
                        class="text-sm text-gray-700 hover:text-gray-900 cursor-pointer mb-4"
                      >
                        Update tutor accounts
                      </p>
                      <p
                        class="text-sm text-gray-700 hover:text-gray-900 cursor-pointer mb-4"
                      >
                        Update student accounts
                      </p>
                    </div>
                  </div>

                  <!-- <div class="mb-5" v-if="type === 'tutors'">
                    <div class="">
                      <p class="text-sm font-bold text-gray-700 mb-3">
                        Signature
                      </p>
                      <p class="text-sm text-gray-700">
                        Please upload an image of your signature to be attached
                        to student certificates. Please ensure the image has a
                        plain white background
                      </p>
                    </div>
                    <div
                      class="relative flex p-6 justify-center w-full align-middle items-center mt-10 rounded-xl border border-orange-500"
                    >
                      <img
                        class="absolute left-0 ml-6"
                        src="/mySignature.png"
                        alt=""
                      />
                      <p class="text-sm font-normal text-gray-700 text-center">
                        mySignature.png
                      </p>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-full lg:col-span-5 xl:col-span-4">
            <div
              class="bg-white rounded-xl border border-gray-300 shadow-hover relative min-h-full"
            >
              <div class="block mb-2">
                <div
                  class="big-avatar relative rounded-xl overflow-hidden"
                  v-bind:style="{
                    backgroundImage: 'url(' + data.image + ')',
                  }"
                >
                  <div
                    class="grid grid-cols-12 place-items-center py-32 md:py-32 lg:py-40 xl:py-48"
                  >
                    <div
                      class="change-picture col-span-12 text-white mx-auto my-auto"
                    >
                      <button class="focus:outline-none">Change Picture</button>
                    </div>
                  </div>
                  <div
                    class="w-full h-full bg-black opacity-50 absolute top-0"
                  ></div>
                </div>
              </div>
              <div class="px-4 md:px-5 lg:px-6 py-4">
                <ul class="text-gray-700">
                  <li class="text-center">
                    <h5 class="font-bold mb-2">Amina Bello</h5>
                    <p class="text-sm text-gray-700">
                      Registered 12th Oct. 2020
                    </p>
                  </li>
                  <li v-if="type === 'admins'">
                    <hr class="my-5" />
                    <label class="checkbox" @click="toggleChangePassword">
                      <span class="text-sm">Reset password</span>
                      <input type="checkbox" value="intermediate" disabled />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                  <li v-else>
                    <hr class="my-5" />
                    <label class="checkbox" @click="toggleChangePassword">
                      <span class="text-sm">Initiate password reset</span>
                      <input type="checkbox" value="intermediate" disabled />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                  <li class="lg:pb-0">
                    <label
                      class="checkbox"
                      @click="$router.push('/student/dashboard')"
                    >
                      <span class="text-sm">Suspend account</span>
                      <input type="checkbox" value="intermediate" disabled />
                      <span class="checkmark"></span>
                    </label>
                    <hr class="my-5" />
                  </li>
                  <li v-if="type === 'admins'" class="lg:pb-8">
                    <label
                      class="checkbox"
                      @click="$router.push('/student/dashboard')"
                    >
                      <span class="text-sm">Delete account</span>
                      <input type="checkbox" value="intermediate" disabled />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const webinars = require('@/static/json/webinars.json')

export default {
  middleware: ['check-auth', 'auth'],
  props: {
    type: { type: String, required: false },
    data: { type: Object, required: false },
  },
  fetch({ store }) {
    store.commit('app/SET_TITLE', 'Account')
  },
  data: () => ({
    webinars: _.take(webinars, 4),
    undoneTasks: _.take(webinars, 3),
  }),

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },

  methods: {
    toggleEditProfile() {
      this.$store.commit('app/EDIT_PROFILE_MODAL', {
        status: true,
      })
    },
    toggleChangePassword() {
      this.$store.commit('app/CHANGE_PASSWORD_MODAL', {
        status: true,
      })
    },
  },
}
</script>

<style scoped>
.big-avatar {
  width: 100%;
  background-image: url('/avatar-large.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  @apply bg-gray-200;
}
.change-picture {
  z-index: 1;
}
.change-picture > button {
  background-image: url('/icon/camera.svg');
  background-repeat: no-repeat;
  padding: 5px 5px 5px 32px;
  line-height: 20px;
}
</style>
