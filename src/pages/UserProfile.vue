<template>
  <div v-if="user">
    <p>Name: {{ user.name }}</p>
    <p>Username: {{ user.username }}</p>
    <p>Email: {{ user.email }}</p>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useProfileStore } from "@/store/userProfileStore"
  import type { User } from '@/store/userProfileStore'

  const profileStore = useProfileStore();
  profileStore.getUser(4);
  const user = computed<User | null>(() => profileStore.state.user)

</script>