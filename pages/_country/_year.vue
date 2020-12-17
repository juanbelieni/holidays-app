<template>
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
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const { country, year } = params

    const data = await $axios.$get(`/api/PublicHolidays/${year}/${country}`)

    const holidays = data.map((row) => ({
      name: row.localName,
      date: row.date,
    }))

    return { holidays }
  },
}
</script>

<style>
.holiday {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
