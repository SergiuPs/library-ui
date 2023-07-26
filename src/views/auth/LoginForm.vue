<template>
	<div>
		<form @submit.prevent="submitForm">
			<div class="input-group input-group-icon">
				<input type="text" placeholder="Username" v-model.trim="username">
				<font-awesome-icon class="input-icon" icon="user" />
			</div>
			<div class="input-group input-group-icon" style="margin-bottom: 0;">
				<input type="password" placeholder="Password" v-model.trim="password">
				<font-awesome-icon class="input-icon" icon="key" />
			</div>
			<action-button 
			:isLoading="isLoading" 
			:error="error" :animation="animation" 
			button-name="Login"></action-button>
		</form>
	</div>
</template>

<script>
export default {
    inject: ['closeLoginModal'],
	data() {
		return {
			username: '',
			password: '',
			isLoading: false,
			error: null,
			animation: true
		};
	},
	methods: {
		async submitForm() {
			this.animation = false;
			this.error = null;
			this.isLoading = false;

			if (this.username === '' || this.password.length < 8) {
				this.animation = true;
				this.error = 'Please enter a valid username/email and password (at least 8 characters long)';
				setTimeout(() => { 	
					this.error = null;
					this.isLoading = false;
				}, 4000);
				return;
			}

			this.isLoading = true;

			const actionPayload = {
				username: this.username,
				password: this.password,
			};

			try {
				await this.$store.dispatch('auth/login', actionPayload);
				const redirectTo = this.$store.getters['auth/authenticatedHasRoleHigherThanUser'] ? 'dashboard' : '';
				const redirectUrl = '/' + (this.$route.query.redirect || redirectTo);
				this.$router.replace(redirectUrl);
				this.closeLoginModal();
			} catch (err) {
				this.animation = true;
				this.error = err.message || 'Failed to authenticate, try later.';
				setTimeout(() => {	
					this.error = null;
					this.isLoading = false;
				}, 4000);
			}
			this.isLoading = false;
		}
	},
};
</script>