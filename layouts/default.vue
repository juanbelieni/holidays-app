<template>
  <v-app>
    <v-main>
      <v-app-bar color="deep-purple accent-4" dark elevate-on-scroll>
        <v-toolbar-title v-if="countryName">
          Holidays from {{ countryName }}
        </v-toolbar-title>
        <v-toolbar-title v-else>Holidays</v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-if="year" id="year-display">
          <v-btn icon @click="navigateToPreviousYear()">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <p class="text-body-1">
            {{ year }}
          </p>
          <v-btn icon @click="navigateToNextYear()">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
        <v-btn icon @click="navigateToSearch()">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-app-bar>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      countryName: undefined,
    }
  },
  computed: {
    country() {
      const country = this.$route.params.country
      return country
    },
    year() {
      const year = this.$route.params.year
      return year
    },
  },

  watch: {
    country: {
      async handler() {
        if (this.country) {
          const data = await this.$axios.$get('/api/CountryInfo', {
            params: {
              countryCode: this.country,
            },
          })

          this.countryName = data?.commonName
        }
      },
      immediate: true,
    },
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

  head() {
    if (this.countryName) {
      return {
        title: this.countryName,
      }
    }
  },
}
</script>

<style lang="scss" scoped>
#year-display {
  display: flex;
  align-items: center;

  p {
    margin-bottom: 0;
  }
}
</style>
