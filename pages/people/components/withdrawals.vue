<template>
  <div>
    <!-- Withdrawals -->
    <section>
      <div class="container mx-auto my-10 px-2 lg:px-0">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <list-table-1
              :columns="withdrawalsColumns"
              :rows="data ? data.data : []"
              type="Students"
              :total="data && data.data ? data.data.length : 0"
              route="/people/students/"
            />
          </div>
        </div>
      </div>
    </section>
    <section v-if="data && data.pagination">
      <t-pagination
        :total-items="data.pagination.count"
        :per-page="data.pagination.limit"
        :limit="4"
        :variant="'roundedSmall'"
        :value="data.pagination.currentPage"
        @change="changePage"
      />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const withdrawals = require('@/static/json/withdrawals.json')

export default {
  // components: { tester },
  middleware: ['check-auth', 'auth'],
  props: {
    tabs: { type: Number, required: false },
    data: { type: Array, required: false },
  },
  name: 'completed-courses',
  fetch({ store }) {
    store.commit('app/SET_DARK_MENU', true)
    store.commit('app/SET_TITLE', 'Students')
  },
  data: () => ({
    home: 'home',
    actionOpt: false,
    isCourses: {
      preview: true,
      students: false,
      draft: false,
    },
    withdrawalsColumns: [
      {
        label: 'Name',
        field: 'name',
      },
      {
        label: 'Date',
        field: 'date',
        type: 'date',
        dateInputFormat: 'yyyy-MM-dd',
        dateOutputFormat: 'MMM do yy',
      },
      {
        label: 'Time',
        field: 'time',
      },
      {
        label: 'Amount',
        field: 'amount',
      },
      {
        label: 'Status',
        field: 'status',
      },
      {
        label: 'New balance',
        field: 'newBalance',
      },
    ],
    withdrawalsRows: _.take(withdrawals, 10),
  }),
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      profileImage: (state) => state.auth.profileImage,
    }),
  },
  mounted() {
    if (this.$device.isMobile) {
      this.tabs.unshift('Home')
    }
  },
  methods: {
    toggleActionOpt() {
      this.actionOpt = !this.actionOpt
    },
    changePage(pagination) {
      this.$store
        .dispatch('people/getTutorWithdrawals', pagination)
        .then((res) => {
          console.log(res)
          this.loading = false
          // this.settings = res
          if (res) {
            // this.showSuccess(res)
          }
        })
        .catch((e) => console.log('e: ', e))
    },
  },
}
</script>
<style scoped>
.pop-up {
  min-width: 9rem;
  top: 12.5rem;
  right: 2rem;
}
.profile-img {
  height: 70px;
  width: 70px;
  object-fit: cover;
}
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
.big-avatar {
  background-image: url(https://www.pngkey.com/png/full/115-1150420_avatar-png-pic-male-avatar-icon-png.png);
}
</style>
