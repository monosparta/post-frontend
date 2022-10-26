import { acceptHMRUpdate, defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'
// const user = useUserStore()
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
    data: [],
  },
})

const emptyUserPosts = reactive({
  status: -1,
  value: {
    data: {
      user_id: '',
      name: '',
      posts: [],
    },
  },
})

const emptyReturnInfo = reactive({
  status: -1,
  data: {
    message: '',
    post_id: '',
  },
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
              }],
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
    // const logged = await user.checkToken()
    // if (!logged)
    //     return
    try {
      const res = await axios.get(
                `${import.meta.env.VITE_APP_API_URL}/api/posts`,
      )
      posts.value.data = res.data
      if (posts.value.data.length === 0)
        posts.value.status = 0

      else
        posts.value.status = res.status
    }
    catch (err: any | AxiosError) {
      if (err instanceof AxiosError) {
        if (err.response) {
          posts.value.status = err.response.status!
          console.error(err.response)
        }
      }
      else {
        console.error(err)
      }
    }
  }
  const getPost = async (postId: string) => {
    // const logged = await user.checkToken()
    // if (!logged)
    //     return
    try {
      const res = await axios.get(
                `${import.meta.env.VITE_APP_API_URL}/api/post/${postId}`,
      )
      post.status = res.status
      post.data = res.data
    }
    catch (err: any | AxiosError) {
      if (err instanceof AxiosError) {
        if (err.response) {
          post.status = err.response.status!
          console.error(err.response)
        }
      }
      else {
        console.error(err)
      }
    }
  }
  const getUserPosts = async (userId: string) => {
    // const logged = await user.checkToken()
    // if (!logged)
    //     return
    try {
      const res = await axios.get(
                `${import.meta.env.VITE_APP_API_URL}/api/author/${userId}/posts`,
      )
      userPosts.value.status = res.status
      userPosts.value.data = res.data

      if (userPosts.value.data.posts.length === 0)
        userPosts.value.status = 0

      else
        userPosts.value.status = res.status
    }
    catch (err: any | AxiosError) {
      if (err instanceof AxiosError) {
        if (err.response) {
          userPosts.value.status = err.response.status!
          console.error(err.response)
        }
      }
      else {
        console.error(err)
      }
    }
  }
  const createPost = async (data: {
    title: string
    content: string
    user_id: string
  }) => {
    // const logged = await user.checkToken()
    // if (!logged)
    //     return
    try {
      const res = await axios.post(
                `${import.meta.env.VITE_APP_API_URL}/api/post`, data,
      )
      returnInfo.status = res.status
      returnInfo.data = res.data
    }
    catch (err: any | AxiosError) {
      if (err instanceof AxiosError) {
        if (err.response) {
          returnInfo.status = err.response.status!
          returnInfo.data.message = err.response?.data.message
        }
      }
      else {
        console.error(err)
      }
    }
  }
  const updatePost = async (postId: string, data: {
    title: string
    content: string
  }) => {
    // const logged = await user.checkToken()
    // if (!logged)
    //     return
    try {
      const res = await axios.put(
                `${import.meta.env.VITE_APP_API_URL}/api/post/${postId}`, data,
      )
      returnInfo.status = res.status
      returnInfo.data = res.data
    }
    catch (err: any | AxiosError) {
      if (err instanceof AxiosError) {
        if (err.response) {
          returnInfo.status = err.response.status!
          returnInfo.data.message = err.response?.data.message
        }
      }
      else {
        console.error(err)
      }
    }
  }
  const deletePost = async (postId: string) => {
    // const logged = await user.checkToken()
    // if (!logged)
    //     return
    try {
      const res = await axios.delete(
                `${import.meta.env.VITE_APP_API_URL}/api/post/${postId}`,
      )
      returnInfo.status = res.status
      returnInfo.data.message = res.data.message
    }
    catch (err: any | AxiosError) {
      if (err instanceof AxiosError) {
        if (err.response) {
          returnInfo.status = err.response.status!
          returnInfo.data.message = err.response?.data.message
        }
      }
      else {
        console.error(err)
      }
    }
  }
  const clearPosts = () => {
    emptyPost.status = -1
    emptyPosts.status = -1
    emptyUserPosts.status = -1
    post.data = emptyPost.data
    post.status = emptyPost.status
    posts.value.data = emptyPosts.value.data
    posts.value.status = emptyPosts.status
    userPosts.value.data = emptyUserPosts.value.data
    userPosts.value.status = emptyUserPosts.status
  }
  const clearReturnInfo = () => {
    returnInfo.status = -1
    returnInfo.data = emptyReturnInfo.data
  }
  return {
    list,
    listCheckStatus,
    userPostList,
    userPostListCheckStatus,
    post,
    info,
    returnInfo,
    infoCheckStatus,
    emptyPosts,
    emptyUserPosts,
    clearReturnInfo,
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
