<script setup lang="ts">
	import router from '@/router';
	import { useUserStore } from '@/store';
	import { onMounted, onUnmounted, ref } from 'vue';
	import type { Ref } from 'vue';

	// life span
	onMounted(async () => {
		backgroundUrl.value = await fetchBackground();

		registerLogin();
	});
	onUnmounted(() => {
		// uninstall background image url for avoiding memory leak
		if (backgroundUrl.value.length !== 0) {
			URL.revokeObjectURL(backgroundUrl.value);
		}
	});

	// async to fetch login views' background image
	const backgroundUrl: Ref<string> = ref('');
	async function fetchBackground() {
		const res = await fetch('/public/farmapp.png');
		const blob = await res.blob();

		return URL.createObjectURL(blob);
	}

	// login
	const userStore = useUserStore();
	function registerLogin() {
		const form = document.querySelector('.login-form') as HTMLFormElement;
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			// logged in?
			userStore.setLoginState({ token: 'asdl', username: 'name', role: 0 });
			// logged in?

			router.push('/');
		});
	}
</script>

<template>
	<div class="container">
		<img class="background" :src="backgroundUrl" alt="background" />

		<!-- Login -->
		<form class="login-form" action="/">
			<div class="login-form__username">
				<label for="username">用户名</label>
				<input type="text" name="username" id="username" />
			</div>
			<div class="login-form__password">
				<label for="password">密码</label>
				<input type="password" name="password" id="password" />
			</div>
			<div class="login-form__submit">
				<button type="submit">登录</button>
			</div>
		</form>
		<!-- End of login -->
	</div>
</template>

<style scoped>
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	.login-form {
	}

	.background {
		position: fixed;
		width: 100%;
		object-fit: cover;
		z-index: -1;
	}

	@media screen and (max-width: 1500px) {
		.background {
			height: 100%;
		}
	}
</style>
