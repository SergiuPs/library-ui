<template>
    <form class="ms-3 me-3" @submit.prevent="submitForm">
		<div class="input-group input-group-icon">
			<input type="password" placeholder="Old Password" v-model.trim="oldPassword">
			<font-awesome-icon class="input-icon" icon="key" />
		</div>
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
		mode="medium-center"
		button-name="Save">
		</action-button>
    </form>
</template>

<script>
import { mapGetters } from 'vuex';
import { RestApiConstants } from '@/constants/api-constants';

export default {
	data() {
		return {
            oldPassword: '',
            newPassword: '',
            newPasswordConfirmation: '',
			error: null,
			isLoading: false,
			animation: true,
		}
	},
	computed: {
		...mapGetters({
			userId: 'auth/userId'
		}),
	},
	methods: {
		async submitForm() {
			this.isLoading = true;
			this.error = false;
			this.animation = false;

			if (this.newPassword !== this.newPasswordConfirmation) {
				this.isLoading = false;
				this.animation = true;
				this.error = "New passwords doesn't match";
				setTimeout(() => { 
					this.error = null;
				}, 4000);
				return;
			}

			const url = RestApiConstants.HOST_AND_API_VERSION + RestApiConstants.USERS + '/' + this.userId + RestApiConstants.EDIT_PASSWORD;

			try {
				const response = await fetch(url, {
					method: 'PATCH',
					body: JSON.stringify({
						"oldPassword": this.oldPassword,
						"newPassword": this.newPassword
					}),
					headers: {
						"Content-Type": "application/json",
						"Authorization": localStorage.getItem('token')
					},
				});
				
				if (response.ok) {
					console.log(response);
				} else {
					const responseData = await response.text();
					throw new Error(response.status + ": " + responseData);
				}
			} catch (error) {
				this.isLoading = false;
				this.error = error.message || '';
				this.animation = true;
				setTimeout(() => { 
					this.error = null;
				}, 4000);
			}
			this.isLoading = false;
		},
		close() {
			this.$emit('close-modal', this);
		}
	}
}
</script>