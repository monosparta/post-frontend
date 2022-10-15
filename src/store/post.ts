import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from 'axios'
const user = useUserStore()
export const usePostStore = defineStore('post', () => {
    const posts = reactive({
        value: {
            data: [
                {
                    id: '',
                    title: '',
                    content: '',
                    created_at: '',
                    updated_at: '',
                    user: {
                        id: '',
                        name: '',
                    },
                },
            ],
        },
    })

    const list = computed(() => { return posts.value.data })
    const getPosts = async () => {
        const logged = await user.checkToken()
        if (!logged)
            return
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_APP_API_URL}/api/posts`,
            )
            posts.value.data = res.data
        }
        catch (error) {
            console.log(error)
        }
    }

    return {
        list,
        getPosts,
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot))
