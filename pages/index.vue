<template>
  <v-main>
    <app-bar />
    <v-form ref="form" v-model="form.valid" @submit.prevent="submit">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-select
              v-model="form.fields.country"
              label="Select a country"
              :rules="form.rules.country"
              :items="countries"
              item-text="name"
              item-value="code"
            ></v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.fields.year"
              :rules="form.rules.year"
              label="Year"
              type="number"
              min="1900"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn type="submit" color="primary" :disabled="!form.valid" depressed>
          Search holidays
        </v-btn>
      </v-container>
    </v-form>
  </v-main>
</template>

<script>
import AppBar from '~/components/AppBar.vue'

export default {
  components: { AppBar },

  async fetch({ store }) {
    await store.dispatch('countries/fetch')
  },

  data() {
    return {
      form: {
        valid: false,
        fields: {
          country: '',
          year: '',
        },
        rules: {
          country: [(value) => !!value || 'Required'],
          year: [
            (value) => !!value || 'Required',
            (value) => value >= 1900 || 'The year must be greater than 1900',
          ],
        },
      },
    }
  },

  computed: {
    countries() {
      return this.$store.getters['countries/countries']
    },
  },

  methods: {
    submit() {
      const { country, year } = this.form.fields
      this.$router.push(`/${country}/${year}`)
    },
  },

  head() {
    return {
      title: 'Home',
    }
  },
}
</script>
