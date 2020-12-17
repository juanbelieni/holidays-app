<template>
  <v-container class="title-container" fill-height>
    <h1 v-if="error.statusCode === 404" class="text-h4">
      {{ pageNotFound }}
    </h1>
    <h1 v-else class="text-h3">{{ error.statusCode }} {{ otherError }}</h1>
  </v-container>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError

    return {
      title,
    }
  },
}
</script>

<style lang="scss" scoped>
.title-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
