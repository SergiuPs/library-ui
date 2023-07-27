<template>
	<div>
		<div style="height: 90vh;">
			<base-spinner v-if="loading" type="spinner big" class="spinner"></base-spinner>
			<div v-else class="center-div"> 
				<h5 v-if="!error">You have successfully confirmed your account.
					You can now <a href="#" @click.prevent="showLoginModal">Login</a> with your credentials.
				</h5>
				<h5 v-else class="error-text-color">
					{{ error }}
				</h5>
			</div>
		</div>
	</div>
</template>

<script>
import { RestApiConstants } from '@/constants/api-constants';
import BaseSpinner from '@/components/ui/BaseSpinner.vue';

export default {
	components: { BaseSpinner },
	inject: ['showLoginModal'],
	data() {
		return {
			error: null,
			loading: true
		}
	},
	methods: {
		async sendConfirmationTokenToServer(route) {
			const url = RestApiConstants.HOST_AND_API_VERSION + RestApiConstants.CONFIRM_REGISTRATION;
			this.loading = true;
			try {
				const response = await fetch(url, {
					method: 'POST',
					body: JSON.stringify({
						"token": route.query.token
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					const responseData = await response.text();
					throw new Error(response.status + ": " + responseData);
				} 
			} catch (error) {
				this.error = error.message || 'Something went wrong!';
			}
			this.loading = false;
		}
	},
	created() {
		this.sendConfirmationTokenToServer(this.$route);
	}
}
</script>

<style scoped>
.spinner {
	position: absolute;
	top: 43%;
	left: 46%;
}
.error-text-color {
	color: red;
}
</style>