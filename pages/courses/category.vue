<template>
  <div class="min-h-screen mb-24"  @click.self="showModal = false">
    <section class="bg-orange-100">
      <div class="container mx-auto mb-10 px-4 lg:px-0">
        <button
            class="btn btn-primary flex flex-row"
            style="padding-left: 1rem; padding-right: 1rem"
            @click.prevent="showModal = !showModal"
        >
            Add Category
            <img class="pl-3" src="~/static/icon/plus-white.svg" />
        </button>
      </div>
    </section>
    <section class="container mx-auto mb-10 px-4 lg:px-0">
        <div v-if="showModal" class="form-group w-1/2 border rounded-xl p-5 bg-white">
        <label for="input-category">Category Name</label>
            <input
                id="input-category"
                type="text"
                class="form-input my-2"
                placeholder="Enter category name"
                v-model="categoryName"
            />
        <button @click="addCourseCategory" class="btn btn-primary flex flex-row">Create category</button>
        </div>
    </section>
    <section class="bg-white rounded-xl border border-gray-300 shadow-hover relative">
        <div class="flex flex-row justify-between px-5 my-5">
            <p class="text-sm font-semibold">
                12 categories
            </p>
        </div>
        <hr>
        <div class="px-4 py-4 text-gray-500 font-base">Category title</div>
        <hr>
        <div>
            <div class="container mx-auto px-4 lg:px-4" v-for="(categ, key) in courseCategory" :key="key + 1">
                <div class="flex items-center justify-between">
                    <p class="py-4 w-1/2">{{categ}}</p>
                    <span @click="toggle(key +1)" class="text-gray-600 cursor-pointer hover:text-gray-900 font-extrabold text-left text-lg">&#xFE19;</span>
                <div
                    :class="{
                    hidden: opt && key + 1 === optId ? false : true,
                  }" 
                  class="pop-up flex flex-col items-start p-3 justify-around absolute top-20 right-1/2 border  mt-5 border-gray-500 bg-white rounded-lg h-20 w-32 shadow-lg"
                  :style="{ zIndex: 100 }">
                  <div @click="editCategory(key + 1)"
                    class="cursor-pointer pop-up-item lg:mr-4 md:text-gray-700 text-sm font-normal hover:text-gray-900 md:bg-transparent block md:inline-block mb-5 md:mb-0"
                  >
                    <p>Edit</p>
                  </div>
                  <div
                    @click="deleteCategory(key + 1)"
                    class="cursor-pointer pop-up-item lg:mr-4 md:text-gray-700 text-sm font-normal hover:text-gray-900 md:bg-transparent block md:inline-block mb-5 md:mb-0"
                  >
                    <p>Delete</p>
                  </div>
                </div>
                </div>
            <hr/>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  middleware: ['check-auth', 'auth'],
  fetch({ store }) {
    store.commit('app/SET_TITLE', 'Course category')
  },
  data: () => ({
    showModal: false,
    categoryName: '',
    opt: false,
    optId: null,
  }),
  computed: {
    ...mapState('courses', ['courseCategory']),
  },
  created() {
    this.$store
      .dispatch('courses/getCourseCategory')
      .then((res) => {
        console.log(res)
        this.loading = false
      })
      .catch((e) => console.log('e: ', e))
  },
  methods: {
    async addCourseCategory() {
        try {
            await this.$store.dispatch('courses/addCourseCategory', this.categoryName)
        } catch (error) {
            console.log(error)
        } 
    },
    toggle(optId) {
      this.opt = !this.opt
      if (optId) this.optId = optId
    },
    async deleteCategory(id) {
      const response = confirm(`Are you sure you want to delete this category ${id}`)
      if (response) {
        try {
          await this.$store.dispatch('courses/deleteCourseCategory', id)
        } catch (error) {
          console.log(error)
        }
      }
    },
  }
}
</script>
<style scoped>
.pop-panel {
    position: absolute;
    top: 12%;
    right: 4%;
}
</style>