import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { fetchAllPosts, fetchMyPosts } from '@/api/jsonplaceholder'

export interface Post {
  id: number,
  title: string
  body: string
  authorName: string
  comments: Array<Comment>
}

export const usePostsListStore = defineStore('PostsList', () => {
  const state = reactive({posts: []})

  async function getAllPosts() {
    const Posts = await fetchAllPosts();
    state.posts = Posts;
  }

  async function getMyPosts(id: number) {
    const Posts = await fetchMyPosts(id);
    state.posts = Posts;
  }

  //TODO: fix sort in case when we changed all post and then changed asc/desc
  function sortPosts (ascending: string) {
    const sortedPosts = (ascending === 'asc') ? state.posts.sort((a: Post, b: Post) => a.id - b.id) : state.posts.sort((a: Post, b: Post) => b.id - a.id)
    state.posts = sortedPosts
  }

  return {
    state,
    getAllPosts,
    getMyPosts,
    sortPosts
  }
})