<template>
	<header>
    <router-link :to="{ name: 'Home' }">
      Logo
    </router-link>
    <router-link :to="{ name: 'Profile', params: { userId: 4 }}">
      User
    </router-link>
	</header>
</template>

<script lang="ts">
	export default {
		setup() {
				
		},
	}
</script>

<style scoped lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		padding: 10px 0;
    border-bottom: 1px solid #b0b0b0;
    margin-bottom: 12px;
	}
</style>