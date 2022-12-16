import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { fetchPost, updatePost, fetchUser, fetchComments, addComment } from '@/api/jsonplaceholder'
import type { User } from '@/store/userProfileStore'

export class Post {
  constructor(
    public id: number,
    public title: string,
    public body: string,
    public authorName: string,
    public authorId: number,
    public comments: Comment[] = []
  ) {}

  addComment(comment: Comment) {
    this.comments = [...this.comments, comment]
  }

  setPostTitle(title: string) {
    this.title = title
  }
  setPostBody(body: string) {
    this.body = body
  }
}

export interface Comment {
  id: number
  name: string
  body: string
  email: string
}

export const useSinglePostStore = defineStore('SinglePost', () => {
  const state = reactive({
    post: null as Post | null
  })
  
  async function getSinlgePost(id: number) {
    const Post = await fetchPost(id)
    const User = await fetchUser(Post.userId)
    const Comments = await fetchComments(id)
    updateStorePost(Post, User, Comments)
  }

  async function saveSinlgePost(post: Post) {
    const Post = await updatePost(post.id, post.title, post.body)
    state.post?.setPostTitle(post.title)
    state.post?.setPostBody(post.body)
  }

  async function addedPostComment(postId: number, name: string, body: string, email: string) {
    const newComment = await addComment(postId, name, body, email)
    state.post?.addComment(newComment)
  }

  function clearPost() {
    state.post = null;
  }

  function updateStorePost(post: Post, User: User, Comments: Comment[]) {
    state.post = new Post(post.id, post.title, post.body, User.name,  User.id, Comments)
  }

  return {
    state,
    getSinlgePost,
    saveSinlgePost,
    addedPostComment,
    clearPost
  }
})