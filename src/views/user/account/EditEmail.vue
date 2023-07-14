<template>
    <div>
		<form v-if="!securityCodeValid" @submit.prevent="validateCode">
			<h5>Let's make sure it's really you, {{ userName }}</h5>
			<p class="mt-4 mb-4">Please enter the 6-digit security code sent to {{ email }}</p>
            <div class="flex-center"> 
				<div class="input-group input-group-icon mb-0 wrapper">
					<input class="security-code" type="text" placeholder="Security code" v-model.trim="securityCode">
					<font-awesome-icon class="input-icon" icon="lock" />
				</div>
			</div>
			<action-button 
			:error="error" 
			:isLoading="isLoading" 
			:animation="animation" 
			:button-disabled="buttonDisabled"
			button-name="Continue">
			</action-button>
			<p v-if="!formIsValid">To implement validation.</p>	
		</form>
		<form v-else @submit.prevent="editEmail">
			<h6>Current E-Mail:</h6>
			<p>{{ email }}</p>
            <div class="input-group input-group-icon">
				<input type="text" placeholder="New E-Mail" v-model.trim="newEmail">
				<font-awesome-icon class="input-icon" icon="at" />
			</div>
			<div class="input-group input-group-icon">
				<input type="text" placeholder="Confirm new E-Mail" v-model.trim="newEmailConfirmation">
				<font-awesome-icon class="input-icon" icon="at" />
			</div>
			<div class="input-group input-group-icon mb-0">
				<input type="password" placeholder="Password" v-model.trim="password">
				<font-awesome-icon class="input-icon" icon="key" />
			</div>
			<action-button 
			:error="error" 
			:isLoading="isLoading" 
			:animation="animation" 
			button-name="Save">
			</action-button>
			<p v-if="!formIsValid">To implement validation.</p>	
		</form>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { RestApiConstants } from '@/constants/api-constants';

export default {
	props: ['userName', 'email'],
	emits: ['close', 'saved'],
	data() {
		return {
			securityCode: '',
			securityCodeValid: false,
			newEmail: '',
			newEmailConfirmation: '',
			password: '',
			formIsValid: true,
			isLoading: true,
			error: null,
			animation: true
		};
	},
	computed: {
		...mapGetters({
			userId: 'auth/userId'
		}),

		buttonDisabled() {
			return this.securityCode.length != 6 || !/^\d+$/.test(this.securityCode);
		}
	},
	methods: {
		async requestCode() {
			this.reset();
			const url = RestApiConstants.HOST_AND_API_VERSION + RestApiConstants.REQUEST_SECURITY_CODE;
			try {
				const response = await fetch(url, {
					method: 'POST',
					body: JSON.stringify({
                        "email": this.email
                    }),
					headers: {
						"Content-Type": "application/json",
						"Authorization": localStorage.getItem('token')
					},
				});
			
				if (!response.ok) {
					throw new Error("Confirmation code could not be sent. Try again later.");
				} 

			} catch (error) {
				this.error = error.message || 'Failed to authenticate, try later.';
				setTimeout(() => { 
					this.error = null;
				}, 4000);
			}
			this.isLoading = false;
		},
		async validateCode() {
			this.reset();
			const url = RestApiConstants.HOST_AND_API_VERSION + RestApiConstants.VALIDATE_SECURITY_CODE;
			try {
				const response = await fetch(url, {
                method: 'POST',
					body: JSON.stringify({
                        "email": this.email,
						"code": this.securityCode
                    }),
					headers: {
						"Content-Type": "application/json",
						"Authorization": localStorage.getItem('token')
					},
				});
			
				if (response.ok) {
					this.securityCodeValid = true;
					this.isLoading = false;
				} else {
					throw new Error("Wrong or expired code.");
				}

			} catch (error) {
				this.error = error.message || '';
				setTimeout(() => { 
					this.error = null;
				}, 4000);
			}	
		},
		async editEmail() {
			this.reset();
			const url = RestApiConstants.HOST_AND_API_VERSION + RestApiConstants.EDIT_EMAIL;
			try {
				const response = await fetch(url, {
                method: 'POST',
					body: JSON.stringify({
                        "userId": this.userId,
						"newEmail": this.newEmail,
						"password": this.password
                    }),
				headers: {
					"Content-Type": "application/json",
					"Authorization": localStorage.getItem('token')
				},
			});
			
				if (response.ok) {
					this.$emit('saved', this.newEmail);
				} else {
					throw new Error("Request could not be processed");
				}

			} catch (error) {
				this.error = error.message || '';
				setTimeout(() => { 
					this.error = null;
				}, 4000);
			}
			this.isLoading = false;
			this.closeModal();
		},
		reset() {
			this.animation = false;
			this.error = null;
			this.isLoading = false;
		},
		closeModal() {
			this.$emit('close');
		}
	},
	mounted() {
		this.requestCode();
	}
};
</script>

<style scoped>
.security-code {
	width: 250px;
}
.wrapper {
	display: flex;
	justify-content: center;
	width: 240px;
}
</style>