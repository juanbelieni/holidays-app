import { GetterTree, MutationTree, ActionTree } from 'vuex'

interface Holiday {
  name: string
  date: string
}

interface State {
  [country: string]: {
    [year: string]: Holiday[]
  }
}

export const state = () => ({} as State)

type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  holidays: (state) => (country: string, year: string) =>
    state[country]?.[year],
}

export const mutations: MutationTree<RootState> = {
  update(
    state,
    {
      country,
      year,
      holidays,
    }: { country: string; year: string; holidays: Holiday[] }
  ) {
    state[country] = { [year]: holidays }
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetch({ commit, state }, { country, year }: Record<string, string>) {
    if (!state[country]?.[year]) {
      const holidaysData = await this.$axios.$get(
        `/api/PublicHolidays/${year}/${country}`
      )

      const holidays = holidaysData.map((row: any) => ({
        name: row.localName,
        date: row.date,
      }))

      commit('update', { country, year, holidays })
    }
  },
}
