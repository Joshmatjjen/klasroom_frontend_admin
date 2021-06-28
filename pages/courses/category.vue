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
              v-model="categoryName.name"
          />
          <p class="my-2 error">{{errorField}}</p>
        <button @click="addCourseCategory" class="btn btn-primary flex flex-row">Create category</button>
        </div>
    </section>
    <section class="bg-white rounded-xl border border-gray-300 shadow-hover relative">
        <div>
          <category-table
            :columns="columns"
            :rows="courseCategory ? courseCategory : []"
            type="category"
          />
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
    categoryName: {
      name: ''
    },
    opt: false,
    optId: null,
    errorField: '',
    columns: [
      {
        label: 'Category title',
        field: 'categoryTitle',
      },
      
    ],
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
      if(this.categoryName) {
        try {
            await this.$store.dispatch('courses/addCourseCategory', this.categoryName)
        } catch (error) {
            console.log(error)
        } 
      } else {
        this.errorField = 'Enter a category name'
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
.error {
  font-size: 14px;
  color: red;
}
</style>