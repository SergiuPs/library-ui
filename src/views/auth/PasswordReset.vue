<template>
	<div>
		<base-card size="small-card" class="p-4">
			<h2 class="mb-5">Choose your new password</h2>
			<form @submit.prevent="resetPassword">
				<div class="input-group input-group-icon">
					<input type="password" placeholder="New Password" v-model.trim="newPassword">
					<font-awesome-icon class="input-icon" icon="key" />
				</div>
				<div class="input-group input-group-icon mb-0">
					<input type="password" placeholder="Confirm New Password" v-model.trim="newPasswordConfirmation">
					<font-awesome-icon class="input-icon" icon="key" />
				</div>
				<action-button 
				:error="error" 
				:isLoading="isLoading" 
				:animation="animation" 
				button-name="Save">
				</action-button>
			</form>
		</base-card>
	</div>
</template>

<script>
import { RestApiConstants } from '@/constants/api-constants';

export default {
	inject: ['showLoginModal'],
	data() {
		return {
			newPassword: '',
			newPasswordConfirmation: '',
			error: null,
			isLoading: false,
			animation: true,
		}
	},
	methods: {
		async resetPassword() {
			this.animation = false;
			this.error = null;
			this.isLoading = false;

			if (this.newPassword !== this.newPasswordConfirmation) {
				this.animation = true;
				this.error = "New passwords doesn't match";
				setTimeout(() => { 
					this.error = null;
				}, 4000);
				return;
			}

			const url = RestApiConstants.HOST_AND_API_VERSION + RestApiConstants.PASSWORD_RESET;

			try {
				const response = await fetch(url, {
					method: 'PATCH',
					body: JSON.stringify({
						"token": this.$route.query.token,
						"newPassword": this.newPassword
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});
				
				if (response.ok) {
					const redirectUrl = '/' + (this.$route.query.redirect || 'password-reset-complete');
					this.$router.replace(redirectUrl);
				} else {
					const responseData = await response.text();
					throw new Error(response.status + ": " + responseData);
				}
			} catch (error) {
				this.animation = true;
				this.error = error.message || 'Password could not be reseted';
				setTimeout(() => { 
					this.error = null;
				}, 4000);
			}
			this.isLoading = false;
		}
	},
}
</script>