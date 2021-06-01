<template>
  <div>
    <!-- Upcoming Webinar -->
    <section>
      <div class="container mx-auto my-10 px-2 lg:px-0">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <list-table-1
              :columns="upcomingWebinarsColumns"
              :rows="upcomingWebinarsRows"
              type="Students"
              :total="124322"
              route="/people/students/"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const upcomingWebinars = require('@/static/json/upcoming-webinars.json')

export default {
  // components: { tester },
  middleware: ['check-auth', 'auth'],
  props: {
    tabs: { type: Number, required: false },
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
    upcomingWebinarsColumns: [
      {
        label: 'Course title',
        field: 'courseTitle',
      },
      {
        label: 'Status',
        field: 'status',
      },
      {
        label: 'Price',
        field: 'price',
      },
      {
        label: 'Sales',
        field: 'sales',
      },
      {
        label: 'Attendance',
        field: 'attendance',
      },
      {
        label: 'Rating',
        field: 'rating',
      },
      {
        label: 'Date',
        field: 'date',
        type: 'date',
        dateInputFormat: 'yyyy-MM-dd',
        dateOutputFormat: 'MMM do yy',
      },
    ],
    upcomingWebinarsRows: _.take(upcomingWebinars, 10),

    columnsStudents: [
      {
        label: 'Name',
        field: 'name',
      },
      {
        label: 'Payment date',
        field: 'paymentDate',
      },
      {
        label: 'Last Active',
        field: 'lastActive',
      },
      {
        label: 'Course progress',
        field: 'progress',
      },
    ],
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
