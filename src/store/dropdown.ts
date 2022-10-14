import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from 'axios'
const user = useUserStore()
export const useDropdownStore = defineStore('dropdown', () => {
  const countryCallingCode = reactive({
    data: [
      {
        id: 4,
        title: '美國 (+1)',
        value: '+1',
        value_alt: 'US',
        value_alt_2: null,
        sequence: 1,
        is_enabled: true,
      },
    ],
  })
  const categories = reactive({
    data: [
      {
        id: 1,
        name: '網站會員',
        title: '網站會員',
        value: '網站會員',
        value_alt: '網站會員',
        value_alt_2: '網站會員',
        sequence: 1,
        is_enabled: true,
      },
    ],
  })
  const city = reactive({
    data: [
      {
        id: 98,
        name: '台北市',
        title: '台北市',
        value: '台北市',
        value_alt: '100',
        value_alt_2: '',
        sequence: 1,
        is_enabled: true,
      },
    ],
  })
  const countryCode = reactive({
    data: [
      {
        id: 1,
        name: 'TW 台灣',
        title: '台灣',
        value: 'TW',
        value_alt: 'TWN',
        value_alt_2: '158',
        sequence: 1,
        is_enabled: true,
      },
    ],
  })
  const region = reactive({
    data: [
      {
        id: 1,
        name: '',
        title: '',
        value: '',
        value_alt: '',
        value_alt_2: '',
        sequence: 1,
        is_enabled: true,
      },
    ],
  })
  const getCountryCallingCode = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/enumerate/country_calling_codes/items`,
      )
      countryCallingCode.data = res.data
    }
    catch (error) {
    }
  }

  const getCategories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/users/categories`, {
          headers: {
            Authorization: `Bearer ${user.userToken.access_token}`,
          },
        },
      )
      categories.data = res.data.map((data: {
        id: number
        name: string
      }) => {
        return {
          ...data,
          title: data.name,
          value: data.name,
          value_alt: data.name,
          value_alt_2: data.name,
          sequence: 1,
          is_enabled: true,
        }
      })
    }
    catch (error) {
    }
  }

  const getAddress = async () => {
    try {
      const countryCodeRes = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/enumerate/country_codes/items`, {
          headers: {
            Authorization: `Bearer ${user.userToken.access_token}`,
          },
        },
      )
      countryCode.data = countryCodeRes.data.map((data: {
        id: number
        title: string
        value: string
        value_alt: string
        value_alt_2: string
        sequence: number
        is_enabled: boolean
      }) => {
        return { ...data, name: `${data.value} ${data.title}` }
      })
      const citiesRes = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/enumerate/cities/items`, {
          headers: {
            Authorization: `Bearer ${user.userToken.access_token}`,
          },
        },
      )
      city.data = citiesRes.data.map((data: {
        id: number
        title: string
        value: string
        value_alt: string
        value_alt_2: string
        sequence: number
        is_enabled: boolean
      }) => {
        return { ...data, name: data.value }
      })
      const regionRes = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/enumerate/region/items`, {
          headers: {
            Authorization: `Bearer ${user.userToken.access_token}`,
          },
        },
      )
      region.data = regionRes.data.map((data: {
        id: number
        title: string
        value: string
        value_alt: string
        value_alt_2: string
        sequence: number
        is_enabled: boolean
      }) => {
        return { ...data, name: `${data.value_alt} ${data.value}` }
      })
    }
    catch (error) {
    }
  }
  const filterRegion = computed(() => { return (key: string) => { return region.data.filter(element => element.value_alt_2 === key) } })

  return {
    countryCallingCode,
    categories,
    countryCode,
    city,
    region,
    filterRegion,
    getCountryCallingCode,
    getCategories,
    getAddress,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDropdownStore, import.meta.hot))
