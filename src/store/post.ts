import { acceptHMRUpdate, defineStore } from 'pinia'
import axios, { AxiosError } from 'axios'
import _ from 'lodash'
// const user = useUserStore()
const emptyPost = {
  statusCode: -1,
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
  previous: {
    post_id: '',
    title: '',
    created_at: '',
  },
  next: {
    post_id: '',
    title: '',
    created_at: '',
  },
}

const emptyPosts = reactive({
  statusCode: -1,
  data: [],
})

const emptyUserPosts = reactive({
  statusCode: -1,
  data: {
    user_id: '',
    name: '',
    posts: [],
  },
})

const emptyReturnInfo = reactive({
  success: true,
  statusCode: -1,
  errorCode: -1,
  message: '',
  data: {
    post_id: '',
  },
  error: {
    title: [],
    content: [],
  },
})

export const usePostStore = defineStore('post', () => {
  const posts = reactive({
    statusCode: -1,
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
  })
  const userPosts = reactive({
    statusCode: -1,
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
  })
  const meta = reactive({
    totalPages: 1,
    total: 1,
    perPage: 5,
    currentPage: 1,
  })
  const list = computed(() => { return posts.data })
  const listPages = computed(() => { return _.chunk(posts.data, 5) })
  const listCheckStatus = computed(() => { return posts.statusCode })
  const userPostList = computed(() => { return userPosts.data })
  const userPostListPages = computed(() => { return _.chunk(userPosts.data.posts, 5) })
  const userPostListCheckStatus = computed(() => { return userPosts.statusCode })
  const post = reactive({ ...emptyPost })
  const returnInfo = reactive({ ...emptyReturnInfo })
  const info = computed(() => { return post.data })
  const infoCheckStatus = computed(() => { return post.statusCode })
  const getPosts = async () => {
    // const logged = await user.checkToken()
    // if (!logged)
    //     return
    try {
      const res = await axios.get(
                `${import.meta.env.VITE_APP_API_URL}/api/posts`,
      )
      posts.data = res.data.data
      if (posts.data.length === 0)
        posts.statusCode = 0
      else
        posts.statusCode = res.status
      meta.totalPages = listPages.value.length
      meta.total = res.data.data.length
    }
    catch (err: any | AxiosError) {
      if (err instanceof AxiosError) {
        if (err.response) {
          posts.statusCode = err.response.data.statusCode
          console.error(err.response.data)
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
      post.statusCode = res.data.statusCode
      post.data = res.data.data
      if (res.data.previous !== null)
        post.previous = res.data.previous
      else
        post.previous = { ...emptyPost.previous }

      if (res.data.next !== null)
        post.next = res.data.next
      else
        post.next = { ...emptyPost.next }
    }
    catch (err: any | AxiosError) {
      if (err instanceof AxiosError) {
        if (err.response) {
          post.statusCode = err.response.data.statusCode
          console.error(err.response.data)
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
      userPosts.statusCode = res.data.statusCode
      userPosts.data = res.data.data

      if (userPosts.data.posts.length === 0)
        userPosts.statusCode = 0
      else
        userPosts.statusCode = res.data.statusCode
      meta.totalPages = userPostListPages.value.length
      meta.total = res.data.data.length
    }
    catch (err: any | AxiosError) {
      if (err instanceof AxiosError) {
        if (err.response) {
          userPosts.statusCode = err.response.data.statusCode
          console.error(err.response.data)
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
      returnInfo.statusCode = res.data.statusCode
      returnInfo.data = res.data.data
      returnInfo.message = res.data.message
    }
    catch (err: any | AxiosError) {
      if (err instanceof AxiosError) {
        if (err.response) {
          returnInfo.statusCode = err.response.data.statusCode
          returnInfo.message = err.response.data.message
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
      returnInfo.statusCode = res.status
      returnInfo.data = res.data.data
      returnInfo.message = res.data.message
    }
    catch (err: any | AxiosError) {
      if (err instanceof AxiosError) {
        if (err.response) {
          returnInfo.statusCode = err.response.data.statusCode
          returnInfo.message = err.response.data.message
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
      returnInfo.statusCode = res.data.statusCode
      returnInfo.message = res.data.message
    }
    catch (err: any | AxiosError) {
      if (err instanceof AxiosError) {
        if (err.response) {
          returnInfo.statusCode = err.response.data.statusCode
          returnInfo.message = err.response.data.message
        }
      }
      else {
        console.error(err)
      }
    }
  }
  const clearPosts = () => {
    emptyPost.statusCode = -1
    emptyPosts.statusCode = -1
    emptyUserPosts.statusCode = -1
    post.data = { ...emptyPost.data }
    post.statusCode = -1
    posts.data = { ...emptyPosts.data }
    posts.statusCode = -1
    userPosts.data = { ...emptyUserPosts.data }
    userPosts.statusCode = -1
    meta.currentPage = 1
    meta.totalPages = 1
    meta.total = 1
  }
  const clearReturnInfo = () => {
    returnInfo.statusCode = -1
    returnInfo.data = { ...emptyReturnInfo.data }
  }
  return {
    list,
    listPages,
    listCheckStatus,
    userPostList,
    userPostListPages,
    userPostListCheckStatus,
    meta,
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
