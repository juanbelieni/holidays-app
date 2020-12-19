<script>
export default {
  props: {
    countryName: {
      type: String,
      default: null,
    },
  },

  data() {
    const { year, country } = this.$route.params

    return { year, country }
  },

  methods: {
    navigateToPreviousYear() {
      this.$router.push(`/${this.country}/${Number(this.year) - 1}`)
    },
    navigateToNextYear() {
      this.$router.push(`/${this.country}/${Number(this.year) + 1}`)
    },
    navigateToSearch() {
      this.$router.push(`/`)
    },
  },
}
</script>

<template>
  <v-app-bar color="deep-purple accent-4" dark elevate-on-scroll>
    <v-toolbar-title v-if="countryName">
      Holidays from {{ countryName }}
    </v-toolbar-title>
    <v-toolbar-title v-else>Holidays</v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="$route.params.year" id="year-display">
      <v-btn icon @click="navigateToPreviousYear()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <p class="text-body-1">
        {{ $route.params.year }}
      </p>
      <v-btn icon @click="navigateToNextYear()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
    <v-btn v-if="$route.params.year" icon @click="navigateToSearch()">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<style lang="scss" scoped>
#year-display {
  display: flex;
  align-items: center;

  p {
    margin-bottom: 0;
  }
}
</style>
