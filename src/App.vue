<template>
  <div class="container">
    <Header />
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script lang="ts">
  import Header from "@/components/Header.vue"

  export default {
    components: {
      Header
    },
  };
</script>

<style scoped lang="scss">
  .container {
    height: 100vh;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 16px;
  }

  main {
    display: block;
  }
</style>
