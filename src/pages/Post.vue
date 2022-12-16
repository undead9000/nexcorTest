<template>
  <div v-if="post">
    <div v-if="!editing" class="post-editable">
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </div>
    <div v-if="editing" class="post-editable">
      <input v-model="postTitle" type="text" class="post-editable-input" />
      <textarea v-model="postBody" class="post-editable-textarea" rows="5">{{ post.body }}</textarea>
    </div>
    <i>Author: {{ (post.authorId === currentUserId) ? 'You' : post.authorName}}</i>
    <div v-if="post.authorId === currentUserId" class="buttons">
      <button v-if="!editing" @click="editPost(post!)">Edit</button>
      <button v-if="editing" @click="cancelEditingPost()">Cancel</button>
      <button v-if="editing" @click="savePost(post!)">Save</button>
    </div>
    <template v-if="post.comments">
      <Comments :comments="post.comments" :postId="post.id"/>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { onBeforeRouteLeave } from 'vue-router'
  import { useSinglePostStore } from '@/store/postStore'
  import Comments from '@/components/Comments.vue'
  import type { Post } from '@/store/postStore'

  const props = defineProps({
    id: {
      type: Number,
      required: true
    },
  })
  
  const singlePostStore = useSinglePostStore();
  singlePostStore.getSinlgePost(props.id);
  const post = computed<Post | null>(() => singlePostStore.state.post)

  const editing = ref(false);
  const currentUserId = ref(4);
  const postTitle = ref('')
  const postBody = ref('')

  function editPost(post: Post) {
    editing.value = !editing.value
    postTitle.value = post.title
    postBody.value = post.body
  }

  function cancelEditingPost() {
    editing.value = !editing.value
  }

  function savePost(post: Post) {
    post.title = postTitle.value
    post.body = postBody.value
    singlePostStore.saveSinlgePost(post)
    editing.value = !editing.value
  }

  onBeforeRouteLeave(() => {
    singlePostStore.clearPost()
  })
</script>

<style scoped lang="scss">
  h3 {
    font-weight: 600;
  }

  .post-editable-input {
    display: block;
    width: 100%;
    max-width: 640px;
    margin-bottom: 12px;
    padding: 5px 7px;
    border-radius: 8px;
    border: 1px solid #b0b0b0;
  }

  .post-editable-textarea {
    width: 100%;
    max-width: 640px;
    margin-bottom: 12px;
    padding: 5px 7px;
    border-radius: 8px;
    border: 1px solid #b0b0b0;
  }

  button {
    margin: 0 12px 0 0;

    &:last:child {
      margin: 0;
    }
  }
</style>