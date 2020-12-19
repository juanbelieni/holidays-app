interface Holiday {
  name: string
  date: string
}

export const state = () => ({})

export const mutations = {
  update(
    state: { [country: string]: Holiday[] },
    {
      country,
      year,
      holidays,
    }: { country: string; year: string; holidays: Holiday[] }
  ) {
    state[`${country}${year}`] = holidays
  },
}
