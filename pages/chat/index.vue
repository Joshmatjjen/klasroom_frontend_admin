<template>
  <div class="mb-20">
    <section class="bg-orange-100">
      <div class="container mx-auto mb-10 px-4 lg:px-0">
        <section>
          <div
            class="flex flex-row gap-10 mb-10 place-items-start px-10 border-b-2 border-gray-200"
          >
            <button
              v-on:click="switcher('class')"
              v-bind:class="{ active: chat.class }"
              class="menu-btn"
            >
              <p class="text-xs text-gray-700">Chats</p>
            </button>
            <button
              v-on:click="switcher('messages')"
              v-bind:class="{ active: chat.messages }"
              class="menu-btn"
            >
              <p class="text-xs text-gray-700">Klasroom messages</p>
            </button>
          </div>
        </section>
        <section>
        <div v-if="chat.class" class="md:grid grid-cols-12 gap-5">
          <div class="col-span-3 max-h-content-screen mb-8 lg:mb-0">
            <chat-contacts />
          </div>
          <div class="col-span-6 max-h-content-screen mb-8 lg:mb-0">
            <chat-messages>
              <div
                slot="header"
                class="flex flex-col pt-4 px-4 md:pt-5 md:px-5"
              >
                <div class="flex flex-row gap-6">
                  <p class="text-sm font-bold text-gray-700">
                    Logo Design Masterclass Chat
                  </p>
                  <p class="text-xs text-gray-600 text-right ml-auto">
                    36 members
                  </p>
                </div>
                <hr class="mt-4 border-gray-300" />
              </div>
            </chat-messages>
          </div>
          <div class="col-span-3 max-h-content-screen">
            <chat-members />
          </div>
        </div>
        <div v-if="chat.messages" class="md:grid grid-cols-12 gap-5">
          <div class="col-span-3 max-h-content-screen mb-8 lg:mb-0">
            <chat-contacts />
          </div>
          <div class="col-span-6 max-h-content-screen mb-8 lg:mb-0">
            <klasroom-message>
              <div
                slot="header"
                class="flex flex-col pt-4 px-4 md:pt-5 md:px-5"
              >
                <div class="flex flex-row gap-6">
                  <p class="text-sm font-bold text-gray-700">
                    Klasroom Messages
                  </p>
                  <p class="text-xs flex space-x-3 text-gray-600 text-right ml-auto">
                    36 messages 
                    <span class="ml-4"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.2784 13.2784C16.0872 10.4695 16.0872 5.91549 13.2784 3.10664C10.4695 0.297787 5.91549 0.297787 3.10664 3.10664C0.297787 5.91549 0.297787 10.4695 3.10664 13.2784C5.91549 16.0872 10.4695 16.0872 13.2784 13.2784ZM13.2784 13.2784L19 19" stroke="#8A8A8A" stroke-width="1.5"/>
                    </svg>
                  </span>
                  </p>
                </div>
                <hr class="mt-4 border-gray-300" />
                <div class="grid gap-4 py-4">
                  <div
                    class="flex cursor-pointer"
                  >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="10" fill="#F99E42"/>
                    </svg>
                    <div class="pl-3 flex-grow my-auto">
                      <p class="text-xs text-gray-700 font-bold">
                        New webinar release
                      </p>
                      <p
                        class="text-xs leading-tight"
                      >
                        We are pleased to announce that our free webinar that t...
                      </p>
                    </div>
                  </div>
                </div>
                <div class="grid gap-4 py-4">
                  <div
                    class="flex cursor-pointer"
                  >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="10" fill="#F99E42"/>
                    </svg>
                    <div class="pl-3 flex-grow my-auto">
                      <p class="text-xs text-gray-700 font-bold">
                        New webinar release
                      </p>
                      <p
                        class="text-xs leading-tight"
                      >
                        We are pleased to announce that our free webinar that t...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </klasroom-message>
          </div>
          <div class="col-span-3 max-h-content-screen">
            <chat-release />
          </div>
        </div>
      </section>
      </div>
    </section>
  </div>
</template>

<script>
const webinars = require('@/static/json/webinars.json')
const members = require('@/static/json/members.json')

export default {
  middleware: ['check-auth', 'auth'],
  fetch({ store }) {
    store.commit('app/SET_TITLE', 'Chat')
  },
  data: () => ({
    webinars: _.take(webinars, 4),
    undoneTasks: _.take(webinars, 3),
    // members: _.take(members, 5),
    chat: {
      class: true,
      messages: false,
    },
  }),
  methods: {
    switcher: function (value) {
      switch (value) {
        case 'class':
          this.chat.class = true
          this.chat.messages = false
          break
        case 'messages':
          this.chat.class = false
          this.chat.messages = true
          break
        default:
          this.chat.class = true
          this.chat.messages = false
      }
      // some code to filter users
    },
  },
}
</script>
<style scoped>
.menu-btn {
  border-top: 5px solid;
  border-bottom: 5px solid;
  padding: 0.938rem 0;
  display: inline-block;
  border-color: transparent;
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.menu-btn.active {
  border-bottom-color: #f99e42;
  font-weight: 700;
}
</style>
