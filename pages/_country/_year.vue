<template>
  <v-main>
    <app-bar :country-name="countryName" />
    <v-container>
      <v-card
        v-for="(holiday, index) in holidays"
        :key="index"
        class="holiday"
        elevation="1"
      >
        <v-card-title>{{ holiday.name }}</v-card-title>
        <v-card-text>{{ holiday.date }}</v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import AppBar from '~/components/AppBar.vue'
export default {
  components: { AppBar },

  async fetch({ store, params }) {
    const { country, year } = params
    await store.dispatch('holidays/fetch', { country, year })
  },

  async asyncData({ params, $axios }) {
    const { country } = params

    const countryData = await $axios.$get('/api/CountryInfo', {
      params: {
        countryCode: country,
      },
    })

    const countryName = countryData?.commonName

    return { countryName }
  },

  computed: {
    holidays() {
      const { country, year } = this.$route.params
      return this.$store.getters['holidays/holidays'](country, year)
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

<style>
.holiday {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
