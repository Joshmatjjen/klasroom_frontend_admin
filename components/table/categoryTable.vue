<template>
  <div class="bg-white rounded-xl border border-gray-300 shadow-hover relative">
    <div
      class="fixed"
      :class="{ hidden: !opt }"
      :style="{
        width: '100%',
        height: '100vh',
        zIndex: 2,
        marginTop: '-22rem',
        marginLeft: '-130px',
      }"
      @click="toggleMenu"
    ></div>
    <div class="flex flex-row justify-between px-5 my-5">
      <p class="text-sm font-semibold">
        {{ rows ? rows.length : 0 }} {{ type }}
      </p>
    </div>
    <hr />
    <div class="pb-1 md:pb-2 lg:pb-2 overflow-x-auto">
      <vue-good-table
        :columns="columns"
        :rows="rows"
        row-style-class="vgt-checkbox-col table-row"
        :select-options="{
          enabled: true,
          selectOnCheckboxOnly: true,
        }"
        :search-options="{ enabled: false }"
        styleClass="vgt-table vgt-wrap vgt-right-align striped"
      >
        <template slot="table-row" slot-scope="props">
          <div  class="relative">
            <span
              v-if="props.column.field == 'categoryTitle'"
              class="flex flex-row justify-between"
            >
              <div class="flex flex-row max-w-md">
                <div class="flex flex-col">
                  <span class="text-gray-700 font-semibold text-left text-md">{{
                    props.row.categoryName
                  }}</span>
                </div>
              </div>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
            <span>
              <div class="absolute right-0">
                <span
                  v-on:click.prevent="toggleMenu(props.row.categoryId)"
                  class="absolute z-50 bottom-0 -mb-1 right-0 -mr-2 text-gray-600 cursor-pointer hover:text-gray-900 font-extrabold text-left text-lg"
                  >&#xFE19;</span
                >
                <div
                  :class="{
                    hidden: opt && props.row.categoryId === optId ? false : true,
                  }"
                  class="pop-up flex flex-col items-start p-3 justify-around pop-up absolute top-0 right-1/2 mt-2 border-gray-500 bg-white rounded-lg h-20 w-32 shadow-lg"
                  :style="{ zIndex: 100 }"
                >
                  <nuxt-link :to="`/courses/category/edit/` + props.row.categoryId"
                    class="cursor-pointer pop-up-item lg:mr-4 md:text-gray-700 text-sm font-normal hover:text-gray-900 md:bg-transparent block md:inline-block mb-5 md:mb-0"
                  >
                    <p>Edit</p>
                  </nuxt-link>
                  <div
                    @click="deleteItem(props.row.categoryId)"
                    class="cursor-pointer pop-up-item lg:mr-4 md:text-gray-700 text-sm font-normal hover:text-gray-900 md:bg-transparent block md:inline-block mb-5 md:mb-0"
                  >
                    <p>Delete</p>
                  </div>
                </div>
              </div>
            </span>
          </div>
        </template>
      </vue-good-table>
    </div>
 
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: false },
    columns: { type: Array, required: false },
    rows: { type: Array, required: false },
    type: { type: String, required: false },
    deleteItem: { type: Function, required: false },
    // more: { type: String, default: null },
  },
  name: 'category-table',
  data: () => ({
    opt: false,
    optId: null,
  }),
  methods: {
    toggleMenu(optId) {
      this.opt = !this.opt
      if (optId) this.optId = optId
    },
  },
}
</script>

<style scoped>
.course-image {
  display: inline-block;
  width: 91px;
  height: 60px;
  @apply bg-gray-300;

  /* border: 1px solid rgba(0, 0, 0, 0.1); */
}

.pop-up {
  border-width: 0.1rem;
}
.vgt-wrap {
  min-width: 58rem;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 0.5rem;
}
.vgt-right-align > a > span {
  /* pr-10 */
  @apply text-gray-700 font-normal text-left text-xs pr-5;
}

@media (max-width: 640px) {
  h4 {
    @apply text-base;
  }
}
</style>
