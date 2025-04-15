<script setup lang="ts">
	import { useUserStore } from '@/store';
	import { ref } from 'vue';

	const loginError = ref<boolean>(false);
	async function submitLoginForm(e: Event) {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);

		let index = 0;
		for (const [key, val] of formData) {
			if (key === 'username' && val === 'admin') {
				index++;
			} else if (key === 'password' && val === '123') {
				index++;
			}
		}
		// try {
		// 	const res = await fetch(url, {
		// 		method: 'POST',
		// 		body: formData,
		// 	});
		// } catch (err) {
		// 	console.log(`[ERROR]: login failed with: ${err}`);
		// }
		if (index === 2) {
			const userStore = useUserStore();
			userStore.login({ name: 'mimi', token: '123123adf', role: 'admin' });
		} else {
			loginError.value = true;
		}
	}
</script>

<template>
	<div>login</div>
	<form @submit="submitLoginForm">
		<div>
			<label for="username">username</label>
			<input type="text" name="username" id="username" />
		</div>
		<div>
			<label for="password">password</label>
			<input type="text" name="password" id="password" />
		</div>
		<button>LOGIN</button>
	</form>
	<div v-if="loginError">username or password error</div>
</template>
