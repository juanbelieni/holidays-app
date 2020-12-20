import { GetterTree, MutationTree, ActionTree } from 'vuex'

interface Country {
  name: string
  code: string
}

export const state = () => ({
  list: [] as Country[],
})

type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  countries: (state) => state.list,
}

export const mutations: MutationTree<RootState> = {
  update: (state, countries: Country[]) => (state.list = countries),
}

export const actions: ActionTree<RootState, RootState> = {
  async fetch({ commit, state }) {
    if (state.list.length === 0) {
      const data = await this.$axios.$get('/api/AvailableCountries')

      const countries = data.map((row: any) => ({
        name: row.value,
        code: row.key,
      }))

      commit('update', countries)
    }
  },
}
