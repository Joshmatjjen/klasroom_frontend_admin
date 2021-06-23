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
        </div>
    </section>
    <section>
      <div class="container mx-auto my-10 px-2 lg:px-0">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <category-table :columns="columns" :rows="rows" @click="Test" type="categories" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  middleware: ['check-auth', 'auth'],
  fetch({ store }) {
    store.commit('app/SET_TITLE', 'Course category')
  },
  data: () => ({
    showModal: false,
    categoryName: '',
    columns: [
      {
        label: 'Category title',
        field: 'categoryTitle',
      },
      {
        label: 'Created On',
        field: 'createdAt',
        type: 'date',
        dateInputFormat: 'yyyy-MM-dd',
        dateOutputFormat: 'MMM do yy',
      },
    ],
    rows: [
        { id: 1, title: "Technolgy" },
        { id: 2, title: "Business" },
        { id: 3, title: "Education" },
    ],
  }),
  methods: {
    Test(id) {
        alert('testing', id)
    }
  }
}
</script>
