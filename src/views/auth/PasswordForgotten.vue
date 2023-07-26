<template>
	<div>
		<form v-if="!dataSubmited" @submit.prevent="submitForm">
            <p>Enter the email address linked to your Spring-Library account, and we'll send you a reset link.</p>
			<div class="input-group input-group-icon mb-0">
				<input type="text" placeholder="Your e-mail" v-model.trim="email">
				<font-awesome-icon class="input-icon" icon="at" />
			</div>
			<action-button 
			:isLoading="isLoading" 
			:error="error" :animation="animation" 
			button-name="Get reset link"></action-button>
		</form>
        <div v-else> 
            <div>
                <div class="flex-left mb-4"> 
                    <img src="../../assets/icons/check.png" />
                    <p class="p-text">Reset instructions have been sent to: {{ email }}</p>
                </div>
                <p>Didn't get a reset link?</p>
                <p>1. Check your spam folder</p>
                <p>2. Check your spelling</p>
                <p>3. Wait 15 minutes before trying again, as some requests are slow to process.</p>
            </div>
        </div>
	</div>
</template>

<script>
import { RestApiConstants } from '@/constants/api-constants';

export default {
    inject: ['closeLoginModal'],
	data() {
		return {
			email: '',
            dataSubmited: false,
			isLoading: false,
			error: null,
			animation: true
		};
	},
	methods: {
		async submitForm() {
			this.animation = false;
			this.error = null;
			this.isLoading = true;

			const url = RestApiConstants.HOST_AND_API_VERSION + RestApiConstants.PASSWORD_RESET_TOKEN;

			try {
				const response = await fetch(url, {
					method: 'POST',
					body: JSON.stringify({
                        "email": this.email
                    }),
					headers: {
						"Content-Type": "application/json",
					},
				});
				
				if (response.ok) {
					this.dataSubmited = true;
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
		handleError() {
			this.error = null;
		},
	},
};
</script>

<style scoped>
.p-text {
    margin: 0;
    padding-left: 20px;
}
</style>