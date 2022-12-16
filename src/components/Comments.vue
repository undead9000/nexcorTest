<template>
  <div class="comments-wrap">
    <h4>Comments section</h4>
    <ul class="comments">
      <li v-for="comment in comments">
        <b>{{ comment.name }}</b>
        <p>{{ comment.body }}</p>
        <i>Author: {{ comment.email }}</i>
      </li>
    </ul>
    <div class="coment-area-wrapper">
      <h4>Left comment</h4>
      <input v-model="commentTitle" type="text" placeholder="Add comment title"/>
      <textarea v-model="commentArea" rows="5" placeholder="Add comment"></textarea>
      <input id="staticUserEmail" type="hidden" :value="user?.email">
      <div>
        <button @click="submitComment()">Left comment</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useProfileStore } from "@/store/userProfileStore"
  import { useSinglePostStore } from '@/store/postStore'
  import type { User } from '@/store/userProfileStore'

  const props = defineProps({
    comments: {
      type: Array,
      required: true
    },
    postId: {
      type: Number,
      required: true
    }
  })

  const currentUserId = ref(4);
  const profileStore = useProfileStore();
  profileStore.getUser(currentUserId.value);
  const user = computed<User | null>(() => profileStore.state.user)
  const singlePostStore = useSinglePostStore();

  const commentTitle = ref('')
  const commentArea = ref('')

  function submitComment() {
    singlePostStore.addedPostComment(props.postId, commentTitle.value, commentArea.value, document.getElementById("staticUserEmail")?.value)
    commentTitle.value = ''
    commentArea.value = ''
  }
</script>

<style scoped lang="scss">
  .comments-wrap {
    margin: 24px 0 0 36px;
    padding: 0 0 36px;

    h4 {
      font-weight: 600;
    }
  }
  ul.comments {
    li {
      padding: 12px 0;
      border-bottom: 1px solid #b0b0b0;
    }

    b {
      font-weight: 600;
    }
  }
  .coment-area-wrapper {
    margin: 24px 0 0 0;

    input {
      display: block;
      width: 100%;
      max-width: 640px;
      margin-bottom: 12px;
      padding: 5px 7px;
      border-radius: 8px;
      border: 1px solid #b0b0b0;
    }

    textarea {
      width: 100%;
      max-width: 640px;
      margin-bottom: 12px;
      padding: 5px 7px;
      border-radius: 8px;
      margin: 12px 0;
      border: 1px solid #b0b0b0;
    }
  }
</style>