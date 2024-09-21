import { useQuery } from '@tanstack/react-query'

type CountryRaw = {
  name: { common: string }
  cca2: string
}

export const getAllCountryNames = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all')

    const countriesData = (await response.json()) as CountryRaw[]

    const countries = countriesData
      .filter(country => country?.name?.common)
      .map(country => {
        return {
          value: country.name.common,
          label: country.name.common,
        }
      })
      .sort((a, b) => a.label.localeCompare(b.label))

    return countries
  } catch (error) {
    console.error('Failed to fetch countries data:', error)

    throw error
  }
}

export const useAllCountries = () => {
  // TODO: Consider caching the data
  return useQuery({
    queryKey: ['countries'],
    queryFn: getAllCountryNames,
  })
}
