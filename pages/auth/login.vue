<template>
  <!--
    Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
    Read the documentation to get started: https://tailwindui.com/documentation
  -->
  <div
    class="fixed inset-0 overflow-y-auto flex items-center justify-center mx-5 text-center sm:block"
  >
    <!-- <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-4 lg:pb-20 text-center sm:block sm:p-0"
    > -->
    <!--
        Background overlay, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      -->

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
      class="inline-block align-top bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full sm:max-w-lg"
    >
      <div class="bg-white relative px-4 pt-5 pb-4 sm:p-8 sm:pb-5">
        <div class="block">
          <div class="mt-3 sm:mt-0 sm:ml-0">
            <h2
              id="modal-headline"
              class="text-xl sm:text-4xl leading-none font-bold text-center text-gray-800"
            >
              {{
                formState === 'login'
                  ? 'Sign into your account'
                  : formState === 'forgotPassword'
                  ? `Forgot password`
                  : `Reset password`
              }}
            </h2>
            <hr class="mt-8 mb-5" />
            <!-- Login form -->
            <form v-if="formState === 'login'" id="login-form">
              <div class="form-group mb-5">
                <label for="input-email">Email address</label>
                <div>
                  <input
                    id="input-email"
                    type="email"
                    class="form-input"
                    placeholder="Enter your email here"
                    v-model="loginForm.userIdentity"
                    @input="checkLoginFormError('userIdentity')"
                  />
                </div>
                <span
                  v-if="loginFormError.find((i) => i === 'userIdentity')"
                  class="text-sm text-red-700"
                  >Email address is required</span
                >
              </div>
              <div class="form-group">
                <label for="input-password">Password</label>
                <div>
                  <input
                    id="input-password"
                    type="password"
                    class="form-input"
                    placeholder="Enter your password here"
                    v-model="loginForm.password"
                    @input="checkLoginFormError('password')"
                  />
                </div>
                <span
                  v-if="loginFormError.find((i) => i === 'password')"
                  class="text-sm text-red-700"
                  >Password is required</span
                >
              </div>
              <div class="flex text-center pt-8 pb-4 sm:pb-4">
                <span class="flex mx-auto">
                  <button
                    type="button"
                    class="btn btn-primary shadow"
                    @click.prevent="onLogin"
                  >
                    Sign in
                    <loader v-if="loading" color="white" />
                  </button>
                </span>
              </div>
              <hr class="mt-4 mb-4" />
              <div class="text-center">
                <a
                  href="#"
                  class="text-sm leading-5 text-gray-700"
                  @click.prevent="(e) => switchForm(e, 'forgotPassword')"
                >
                  Forgot password?
                </a>
              </div>
            </form>

            <!-- Forget Password form -->
            <form v-if="formState === 'forgotPassword'" id="forgot-form">
              <div class="form-group">
                <label for="input-email">Email address</label>
                <div>
                  <input
                    id="input-email"
                    class="form-input"
                    type="email"
                    placeholder="Enter your email here"
                    v-model="forgotForm.email"
                    @input="checkForgotFormError"
                  />
                </div>
                <span v-if="forgotFormError" class="text-sm text-red-700"
                  >Email address is required</span
                >
              </div>
              <div class="flex text-center pt-8 pb-4 sm:pb-4">
                <span class="flex mx-auto">
                  <button
                    type="button"
                    class="btn btn-primary shadow"
                    @click.prevent="onForgot"
                  >
                    Request password reset
                    <loader v-if="loading" color="white" />
                  </button>
                </span>
              </div>
              <hr class="mt-4 mb-4" />
              <div class="text-center">
                <a
                  href="#"
                  class="text-sm leading-5 text-gray-700"
                  @click.prevent="(e) => switchForm(e, 'login')"
                >
                  Remembered password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- End login card -->
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  layout: 'auth',
  middleware: ['check-auth', 'isAuth'],
  data: () => ({
    formState: 'login',
    loading: false,
    isStudent: false,
    loginForm: {
      userIdentity: '',
      password: '',
    },
    forgotForm: {
      email: '',
    },
    forgotFormError: false,
    loginFormError: [],
  }),
  watch: {
    formState(value) {
      this.loginFormError = []
      this.isStudent = false
      this.clearInput()
    },
  },
  methods: {
    checkLoginFormError(value) {
      this.loginFormError = this.loginFormError.filter((i) => i !== value)
    },
    checkSignupFormError(value) {
      this.signupFormError = this.signupFormError.filter((i) => i !== value)
    },
    checkForgotFormError() {
      this.forgotFormError = false
    },
    switchForm(e, type) {
      if (e) e.preventDefault()
      this.formState = type
      this.clearInput()
    },
    onLogin(e) {
      if (e) e.preventDefault()
      return
      this.loading = true

      const data = {
        ...this.loginForm,
      }

      for (let i in data) {
        console.log(i)
        if (data[i].length === 0) {
          this.loginFormError.push(i)
        }
      }
      if (this.loginFormError.length) {
        this.loading = false
        return
      }

      this.$store
        .dispatch('auth/loginUser', {
          ...data,
          userType,
        })
        .then((res) => {
          this.loading = false
          if (res) {
            this.gotoDashboard()
          }
        })
        .catch((e) => console.log('e: ', e))
    },
    onForgot(e) {
      if (e) e.preventDefault()
      return
      this.loading = true
      if (!this.forgotForm.email) {
        this.forgotFormError = true
        this.loading = false
        return
      }
      this.$store
        .dispatch('auth/forgetPassword', {
          ...this.forgotForm,
        })
        .then((res) => {
          this.loading = false
          if (res) {
            this.$store.commit(
              'app/RESET_PASSWORD_MODAL',
              this.forgotForm.email
            )
            this.$store.commit('app/FORGOT_PASSWORD_MODAL', false)
            Swal.fire({
              position: 'top-end',
              width: '350px',
              text: res.message
                ? res.message
                : 'A message was sent to the email associated with your account.',
              backdrop: false,
              allowOutsideClick: false,
              showConfirmButton: false,
              showCloseButton: true,
              timer: 10000,
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
          : `You have successfully signed up to klasroom.com. 
          Please check your email and click the link in it to 
          complete your registration.`,
      })
      this.close()
    },
    gotoDashboard() {
      // console.log('callback: ', this.showLogin.callback)
      // if (this.showLogin.callback) {
      //   console.log('callback')
      //   this.showLogin.callback()
      // } else this.$router.push(`/${type}/dashboard`)
      this.$router.push(`/dashboard`)
    },
    clearInput() {
      this.loginForm = {
        userIdentity: '',
        password: '',
      }

      this.forgotForm = {
        email: '',
      }
    },
  },
}
</script>

<style>
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
