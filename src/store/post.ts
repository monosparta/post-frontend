import { acceptHMRUpdate, defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'
const user = useUserStore()
const emptyPost = {
    status: -1,
    data: {
        post_id: '',
        title: '',
        content: '',
        created_at: '',
        updated_at: '',
        user: {
            user_id: '',
            name: '',
        },
    },
}

const emptyPosts = reactive({
    status: -1,
    value: {
        data: []
    }
})

const emptyUserPosts = reactive({
    status: -1,
    value: {
        data: {
            user_id: '',
            name: '',
            posts: [],
        }
    }
})
const emptyReturnInfo = reactive({
    status: -1,
    data: {
        message: '',
        post_id: '',
    }
})
export const usePostStore = defineStore('post', () => {
    const posts = reactive({
        value: {
            status: -1,
            data: [
                {
                    post_id: '',
                    title: '',
                    content: '',
                    created_at: '',
                    updated_at: '',
                    user: {
                        user_id: '',
                        name: '',
                    },
                },
            ],
        },
    })
    const userPosts = reactive({
        value: {
            status: -1,
            data:
            {
                user_id: '',
                name: '',
                posts: [{
                    post_id: '',
                    title: '',
                    content: '',
                    created_at: '',
                    updated_at: '',
                },],
            },
        },
    })
    const list = computed(() => { return posts.value.data })
    const listCheckStatus = computed(() => { return posts.value.status })
    const userPostList = computed(() => { return userPosts.value.data })
    const userPostListCheckStatus = computed(() => { return userPosts.value.status })
    const post = reactive({ ...emptyPost })
    const returnInfo = reactive({ ...emptyReturnInfo })
    const info = computed(() => { return post.data })
    const infoCheckStatus = computed(() => { return post.status })
    const getPosts = async () => {
        const logged = await user.checkToken()
        if (!logged)
            return
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_APP_API_URL}/api/posts`,
            )
            posts.value.status = res.status
            posts.value.data = res.data
        }
        catch (err: any | AxiosError) {
            if (axios.isAxiosError(err)) {
                console.log(err.response);
            } else {
                console.log(err);
            }
        }
    }
    const getPost = async (postId: string) => {
        const logged = await user.checkToken()
        if (!logged)
            return
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_APP_API_URL}/api/post/${postId}`,
            )
            post.status = res.status
            post.data = res.data
        }
        catch (err: any | AxiosError) {
            if (axios.isAxiosError(err)) {
                console.log(err.response);
            } else {
                console.log(err);
            }
        }
    }
    const getUserPosts = async (userId: string) => {
        const logged = await user.checkToken()
        if (!logged)
            return
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_APP_API_URL}/api/author/${userId}/posts`,
            )
            userPosts.value.status = res.status
            userPosts.value.data = res.data
        }
        catch (err: any | AxiosError) {
            if (axios.isAxiosError(err)) {
                console.log(err.response);
            } else {
                console.log(err);
            }
        }
    }
    const createPost = async (data: {
        title: string
        content: string
        user_id: string
    }) => {
        const logged = await user.checkToken()
        if (!logged)
            return
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_APP_API_URL}/api/post`, data,
            )
            returnInfo.status = res.status
            returnInfo.data = res.data
        }
        catch (err: any | AxiosError) {
            if (axios.isAxiosError(err)) {
                returnInfo.status = err.response?.status!
            } else {
                console.log(err);
            }
        }
    }
    const updatePost = async (postId: string, data: {
        title: string
        content: string
    }) => {
        const logged = await user.checkToken()
        if (!logged)
            return
        try {
            const res = await axios.put(
                `${import.meta.env.VITE_APP_API_URL}/api/post/${postId}`, data,
            )
            returnInfo.status = res.status
            returnInfo.data = res.data
        }
        catch (err: any | AxiosError) {
            if (axios.isAxiosError(err)) {
                returnInfo.status = err.response?.status!
            } else {
                console.log(err);
            }
        }
    }
    const deletePost = async (postId: string) => {
        const logged = await user.checkToken()
        if (!logged)
            return
        try {
            const res = await axios.delete(
                `${import.meta.env.VITE_APP_API_URL}/api/post/${postId}`,
            )
            returnInfo.status = res.status
            returnInfo.data.message = res.data.message
        }
        catch (err: any | AxiosError) {
            if (axios.isAxiosError(err)) {
                returnInfo.status = err.response?.status!
            } else {
                console.log(err);
            }
        }
    }
    const clearPosts = () => {
        post.data = emptyPost.data
        posts.value.data = emptyPosts.value.data
        userPosts.value.data = emptyUserPosts.value.data
    }
    return {
        list,
        listGetStatus: listCheckStatus,
        userPostList,
        userPostListCheckStatus,
        post,
        info,
        returnInfo,
        infoCheckStatus,
        getPosts,
        getPost,
        getUserPosts,
        createPost,
        updatePost,
        deletePost,
        clearPosts,
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot))
