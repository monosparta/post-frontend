import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from 'axios'
const user = useUserStore()
const emptyMember = {
  id: '',
  info: {
    custom_id: '',
    username: '',
    email: '',
    mobile_country_code: '',
    mobile_country_calling_code: '',
    mobile: '',
    full_name: '',
    email_verify: false,
    phone_verify: false,
  },
  profile: {
    categories: {
      id: 0,
      name: '',
    },
    birth_date: '1980-01-01T00:00:00.000000Z',
    gender: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    job_title: '',
    phone_country_code: '',
    phone_country_calling_code: '',
    phone: '',
    nationality: '',
    identity_code: '',
    address: {
      address_line_1: '',
      address_line_2: '',
      city: '',
      region: '',
      zip_code: '',
    },
  },
  organization: {
    name: '',
    email: '',
    phone_country_code: '',
    phone_country_calling_code: '',
    phone: '',
    vat: '',
    address: {
      address_line_1: '',
      address_line_2: '',
      city: '',
      region: '',
      zip_code: '',
    },
  },
  emergency_contact: {
    name: '',
    mobile_country_code: '',
    mobile_country_calling_code: '',
    mobile: '',
  },
}

export const useMemberStore = defineStore('member', () => {
  const members = reactive({
    value: {
      meta: {
        total_pages: 1,
        total: 1,
        per_page: 10,
        current_page: 1,
        from: 1,
        to: 10,
      },
      data: [
        {
          id: '',
          custom_id: '',
          username: '',
          status: '',
          email: '',
          phone: '',
          categories: { id: 0, name: '' },
        },
      ],
    },
  })
  const member = reactive({ ...emptyMember })
  const list = computed(() => { return members.value.data })
  const meta = computed(() => { return members.value.meta })
  const info = computed(() => { return member.info })
  const profile = computed(() => { return member.profile })
  const organization = computed(() => { return member.organization })
  const emergency = computed(() => { return member.emergency_contact })
  const getMembers = async () => {
    const logged = await user.checkToken()
    if (!logged)
      return
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/users?page=${members.value.meta.current_page}&paginate=${members.value.meta.per_page}`,
        {
          headers: {
            Authorization: `Bearer ${user.userToken.access_token}`,
          },
        },
      )
      const meta = {
        total_pages: res.data.meta.last_page,
        total: res.data.meta.total,
        per_page: res.data.meta.per_page,
        current_page: res.data.meta.current_page,
        from: res.data.meta.from,
        to: res.data.meta.to,
      }
      members.value.data = res.data.data
      members.value.meta = meta
    }
    catch (error) {
    }
  }
  const clearMember = () => {
    member.info = emptyMember.info
    member.profile = emptyMember.profile
    member.organization = emptyMember.organization
    member.emergency_contact = emptyMember.emergency_contact
  }
  const getMember = async (id: any) => {
    const logged = await user.checkToken()
    if (!logged)
      return
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.userToken.access_token}`,
          },
        },
      )
      member.id = id
      member.info = res.data.info
      if (res.data.profile)
        member.profile = res.data.profile
      if (res.data.organization)
        member.organization = res.data.organization
      if (res.data.emergency_contact)
        member.emergency_contact = res.data.emergency_contact
    }
    catch (error) {
    }
  }
  const setPage = async (page: number) => {
    members.value.meta.current_page = page
    await getMembers()
  }
  const setPaginate = async (paginate: number) => {
    members.value.meta.current_page = 1
    members.value.meta.per_page = paginate
    await getMembers()
  }
  const createMember = async (member: {
    custom_id: string
    username: string
    full_name: string
    email: string
    mobile_country_code: string
    mobile_country_calling_code: string
    mobile: string
    password: string
    confirm_password: string
  }) => {
    const logged = await user.checkToken()
    if (!logged)
      return
    await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/users`, member,
        {
          headers: {
            Authorization: `Bearer ${user.userToken.access_token}`,
          },
        },
    )
    await getMembers()
  }
  const updateMemberInfo = async (id: string, data: {
    username: string
    full_name: string
    email: string
    mobile: string
    mobile_country_code: string
    mobile_calling_code: string
  }) => {
    const logged = await user.checkToken()
    if (!logged)
      return
    const result = await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/users/${id}`, data,
        {
          headers: {
            Authorization: `Bearer ${user.userToken.access_token}`,
          },
        },
    )
    await getMember(id)
    return result
  }
  const updateMemberProfile = async (id: string, data: {
    categories: { id: number; name: string }
    birth_date: string
    gender: string
    first_name: string
    last_name: string
    middle_name: string
    job_title: string
    phone_country_code: string
    phone_country_calling_code: string
    phone: string
    nationality: string
    identity_code: string
    address: {
      address_line_1: string
      address_line_2: string
      city: string
      region: string
      zip_code: string
    }
  }) => {
    const logged = await user.checkToken()
    if (!logged)
      return
    const result = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/users/${id}/profile`, data,
        {
          headers: {
            Authorization: `Bearer ${user.userToken.access_token}`,
          },
        },
    )
    await getMember(id)
    return result
  }
  const updateMemberOrganization = async (id: string, data: {
    name: string
    email: string
    phone_country_code: string
    phone_country_calling_code: string
    phone: string
    vat: string
    address: {
      address_line_1: string
      address_line_2: string
      city: string
      region: string
      zip_code: string
    }
  }) => {
    const logged = await user.checkToken()
    if (!logged)
      return
    const result = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/users/${id}/organization`, data,
        {
          headers: {
            Authorization: `Bearer ${user.userToken.access_token}`,
          },
        },
    )
    await getMember(id)
    return result
  }
  const updateMemberEmergency = async (id: string, data: {
    name: string
    mobile: string
    mobile_country_code: string
    mobile_country_calling_code: string
  }) => {
    const logged = await user.checkToken()
    if (!logged)
      return
    const result = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/users/${id}/emergency-contact`, data,
        {
          headers: {
            Authorization: `Bearer ${user.userToken.access_token}`,
          },
        },
    )
    await getMember(id)
    return result
  }
  return {
    list,
    meta,
    member,
    info,
    profile,
    organization,
    emergency,
    getMembers,
    setPage,
    setPaginate,
    createMember,
    clearMember,
    getMember,
    updateMemberInfo,
    updateMemberProfile,
    updateMemberOrganization,
    updateMemberEmergency,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useMemberStore, import.meta.hot))
