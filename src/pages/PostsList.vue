<template>
  <div class="filters">
    Sorting
    <select @change="filterByAuthor($event)">
      <option value="all">All posts</option>
      <option value="my">My posts</option>
    </select>
    <select @change="filterByDate($event)">
      <option value="asc">Ascending by date (id)</option>
      <option value="desc">Descending by date (id)</option>
    </select>
  </div>
  <div class="post-wrapper">
    <ul class="all-posts">
      <li v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <router-link :to="{ name: 'Post', params: {id: post.id}}">
          View post
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { usePostsListStore } from "@/store/postsListStore"

  const allPostsStore = usePostsListStore()
  allPostsStore.getAllPosts()
  let posts = computed(() => allPostsStore.state.posts)

  function filterByAuthor($event) {
    if($event.target.value === 'all') allPostsStore.getAllPosts()
    if($event.target.value === 'my') allPostsStore.getMyPosts(4)
  }

  function filterByDate($event) {
    allPostsStore.sortPosts($event.target.value)
  }
</script>

<style scoped lang="scss">
  .filters {
    margin-bottom: 12px;

    select {
      margin: 0 0 0 12px;
    }
  }
  .all-posts {
    li {
      padding: 12px;
      margin: 0 0 10px;
      border-radius: 5px;
      border: 1px solid #b0b0b0;

      &:last-child {
        margin: 0;
      }
    }
  }
</style>