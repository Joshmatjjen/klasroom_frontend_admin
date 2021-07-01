<template>
  <div class="min-h-screen mb-24"  @click.self="showModal = false">
    <section class="container mx-auto mb-10 px-4 lg:px-0">
        <div class="form-group w-1/2 border rounded-xl p-5 bg-white">
        <label for="input-category">Category Name</label>
          <input
              id="input-category"
              type="text"
              class="form-input my-2"
              placeholder="Enter category name"
              v-model="categoryName.name"
          />
        <button @click="editCategory" class="btn btn-primary flex flex-row">Edit category</button>
        </div>
    </section>
    <section class="bg-white rounded-xl border border-gray-300 shadow-hover relative">
        <div>
          <category-table
            :columns="columns"
            :rows="courseCategory ? courseCategory.data : []"
            type="category"
            :deleteItem="deleteCategory"
          />
        </div>
    </section>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Swal from 'sweetalert2'
export default {
  middleware: ['check-auth', 'auth'],
  fetch({ store }) {
    store.commit('app/SET_TITLE', 'Edit course category')
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
    ...mapState({
      courseCategory: (state) => state.courses.courseCategory ? state.courses.courseCategory : null,
      courseCateg: (state) => state.courses.courseCateg ? state.courses.courseCateg : null,
    }),
    // ...mapState('courses', ['courseCategory', 'courseCateg']),
  },
  created() {
    this.$store
    .dispatch('courses/getCourseCategory')
    .then((res) => {
    console.log(res)
    this.loading = false
    })
    .catch((e) => console.log('e: ', e))

    this.$store
    .dispatch('courses/getAcourseCategory', this.$route.params.slug)
    .then((res) => {
    console.log('single',res)
    this.loading = false
    })
    .catch((e) => console.log('e: ', e))
  },
  methods: {
    async editCategory() {
        if(this.categoryName) {
            try {
             await this.$store.dispatch('courses/updateCourseCategory', {name: this.categoryName.name, id: this.$route.params.slug}).then((res) => {
                 if(res) {
                     Swal.fire({
                      position: 'top-end',
                      width: '350px',
                      text: res.message
                        ? res.message
                        : 'Course category updated succesfully.',
                      backdrop: false,
                      allowOutsideClick: false,
                      showConfirmButton: false,
                      showCloseButton: true,
                      timer: 10000,
                    })
                 }
             })
             console.log(res.message)
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
          await this.$store.dispatch('courses/deleteCourseCategory', {id, name: this.categoryName.name})
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