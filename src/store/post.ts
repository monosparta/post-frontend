import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from 'axios'
const user = useUserStore()
const emptyPost = {
    data: {
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
}

const emptyPosts = reactive({
    value: {
        data: []
    }
})
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
    const post = reactive({ ...emptyPost })
    const info = computed(() => { return post.data })
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
    const getPost = async (id: string) => {
        const logged = await user.checkToken()
        if (!logged)
            return
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_APP_API_URL}/api/post/${id}`,
            )
            post.data = res.data
        }
        catch (error) {
            console.log(error)
        }
    }
    const getUserPosts = async (id: string) => {
        const logged = await user.checkToken()
        if (!logged)
            return
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_APP_API_URL}/api/author/posts?authorId=${id}`,
            )
            posts.value.data = res.data
        }
        catch (error) {
            console.log(error)
        }
    }
    const clearPost = () => {
        post.data = emptyPost.data
        posts.value = emptyPosts.value
    }
    return {
        list,
        post,
        info,
        getPosts,
        getPost,
        getUserPosts,
        clearPost,
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot))
