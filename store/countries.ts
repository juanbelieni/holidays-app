interface Country {
  name: string
  code: string
}

type Countries = Country[]

export const state = () => ({
  list: [] as Countries,
})

export const mutations = {
  update(state: { list: Countries }, countries: Countries) {
    state.list = countries
  },
}
