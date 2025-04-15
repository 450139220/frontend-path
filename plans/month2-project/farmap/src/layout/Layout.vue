<script setup lang="ts">
	import { baseUrl } from '@/constants';
	import { routes } from '@/router/routes';
	import type { RouteRecordRaw } from 'vue-router';

	interface Link {
		title: string;
		name: string;
		icon: string;
	}
	const mainLink: RouteRecordRaw[] = routes.filter((route) => route.name === 'main');
	const links: Link[] = mainLink[0].children!.map((route) => ({
		title: route.meta?.title as string,
		icon: route.meta?.icon as string,
		name: route.name as string,
	}));
</script>

<template>
	<div class="container">
		<nav class="sidebar">
			<div class="title">
				<img :src="`${baseUrl}/icons/logo.png`" alt="logo" />
				<div>智慧农业farmap</div>
			</div>
			<div class="links">
				<RouterLink class="link" v-for="(link, idx) in links" :key="idx" :to="link.name">
					<i :class="`ri-${link.icon}-line`"></i>
					<span>{{ link.title }}</span>
				</RouterLink>
				<div class="link logout">
					<i class="ri-logout-box-line"></i>
					<span>退出</span>
				</div>
			</div>
		</nav>
		<RouterView />
	</div>
</template>

<style scoped>
	.container {
		display: flex;
	}

	.sidebar {
		height: 100vh;
		background-color: azure;
	}

	.title {
		display: flex;
		align-items: center;
	}

	.title > img {
		width: 40px;
	}

	.links {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		height: calc(100% - 50px);
	}

	.logout {
		margin-top: auto;
	}
</style>
