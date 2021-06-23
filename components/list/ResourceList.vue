<template>
  <div
    :class="
      $device.isMobile || resource.resourceType === 'link'
        ? 'flex-col'
        : 'flex-row'
    "
    class="flex rounded-xl bg-white border border-gray-300 divide-x divide-y divide-gray-300"
  >
    <div
      v-if="resource.resourceType === 'file'"
      class="flex flex-col mr-auto my-auto text-gray-700 py-4 md:py-6 px-5"
    >
      <span
        class="block text-xs font-semibold overflow"
        :class="{ 'mb-2': resource.resourceType === 'link' }"
        :title="resource.resource.fileName"
      >
        {{ resource.resource.fileName }}
      </span>
      <!-- <span v-if="desc" class="block text-xs">{{ desc }}</span> -->
    </div>
    <div
      v-else
      class="flex flex-col mr-auto my-auto text-gray-700 py-4 md:py-6 px-5"
    >
      <link-prevue :url="resource.resource">
        <template slot-scope="props">
          <div class="card" style="width: 100%">
            <img class="card-img-top" :src="props.img" :alt="props.title" />
            <div class="card-block">
              <h4 class="card-title">{{ props.title }}</h4>
              <p class="card-text">{{ props.description }}</p>
              <p
                v-if="!props.img && !props.title && !props.description"
                class="card-text"
              >
                {{ props.url }}
              </p>
              <!-- <p class="card-text">{{ props }}</p> -->
              <!-- <a v-bind:href="props.url" class="btn btn-primary">More</a> -->
            </div>
          </div>
        </template>
        <template slot="loading">
          <!-- set your custom loading -->
          <h1>Loading...</h1>
        </template>
      </link-prevue>
    </div>
    <div class="flex content-between">
      <button
        class="text-sm py-4 px-5 text-gray-700 focus:outline-none mx-auto"
        :class="{ download: resource.resourceType === 'file' }"
      >
        <a
          :href="
            resource.resourceType === 'file'
              ? resource.resource.signedUrl
              : resource.resource
          "
          target="_blank"
        >
          {{ resource.resourceType === 'file' ? 'Download' : 'Open link' }}
        </a>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    resource: { type: Object, required: true },
  },
  methods: {
    onClick(prevue) {
      console.log(
        'click',
        prevue.images,
        prevue.title,
        prevue.url,
        prevue.description
      )
    },
  },
}
</script>

<style scoped>
button {
  min-width: 144px;
  max-width: 144px;
}
button.download {
  background-image: url('/icon/download.svg');
  background-repeat: no-repeat;
  background-position: top 50% left 15px;
  @apply pl-10;
}
.overflow {
  width: 10em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
