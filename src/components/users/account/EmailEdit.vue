<template>
	<div>
		<form v-if="!securityCodeValid" @submit.prevent="validateCode">
			<h5>Let's make sure it's really you, {{ securityCodeReceiverUsername }}</h5>
			<p class="mt-4 mb-4">Please enter the 6-digit security code sent to {{ securityCodeReceiverEmail }}</p>
			<div class="flex-center">
				<div> 
					<label class="input-group-label" for="security-code">Security Code</label>
				<div class="input-group input-group-icon mb-0 security-code-wrapper">
					<input class="security-code" type="text" id="security-code" placeholder="Security code" v-model.trim="securityCode">
					<font-awesome-icon class="input-icon" icon="lock" />
				</div>
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
			<div>
				<label class="input-group-label" for="new-email">New E-Mail</label>
				<div class="input-group input-group-icon">
					<input type="email" id="new-email" placeholder="New E-Mail" v-model.trim="newEmail">
					<font-awesome-icon class="input-icon" icon="at" />
				</div>
			</div>
			<div>
				<label class="input-group-label" for="new-email-confirm">New E-Mail confirmation</label>
				<div class="input-group input-group-icon">
					<input type="email" id="new-email-confirm" placeholder="Confirm new E-Mail" v-model.trim="newEmailConfirmation">
					<font-awesome-icon class="input-icon" icon="at" />
				</div>
			</div>
			<div>
				<label class="input-group-label" for="password">Password</label>
				<div class="input-group input-group-icon mb-0">
					<input type="password" id="password" placeholder="Password" v-model.trim="password">
					<font-awesome-icon class="input-icon" icon="key" />
				</div>
			</div>
			<action-button 
			:error="error" 
			:isLoading="isLoading" 
			:animation="animation"
			mode="medium-center"
			button-name="Save">
			</action-button>
			<p v-if="!formIsValid">To implement validation.</p>	
		</form>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getPersonalDetails, editEmail } from '@/services/web-services-user';
import { requestSecurityCode, validateCode } from '@/services/web-services';

export default {
	props: ['userId', 'username', 'email', 'selfEdit'],
	emits: ['close'],
	inject: ['updateEmail'],
	data() {
		return {
			securityCodeReceiverUsername: this.username,
			securityCodeReceiverEmail: this.email,
			editorId: this.userId,
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
			authenticatedUserId: 'auth/userId'
		}),
		buttonDisabled() {
			return this.securityCode.length != 6 || !/^\d+$/.test(this.securityCode);
		}
	},
	methods: {
		async loadPersonalDetails() {
			try {
				const personalDetails = await getPersonalDetails(this.authenticatedUserId);
				this.securityCodeReceiverUsername = personalDetails.username;
				this.securityCodeReceiverEmail = personalDetails.email;
				this.editorId = personalDetails.id;
				this.dataLoaded = true;
			} catch (error) {
				console.log(error)
			}
		},
		async requestCode() {
			this.reset();
			try {
				requestSecurityCode();
			} catch (error) {
				this.error = "Confirmation code could not be sent. Try again later.";
				this.animation = true;
				setTimeout(() => { 
					this.error = null;
				}, 4000);
			}
			this.isLoading = false;
		},
		async validateCode() {
			this.reset();
			try {
				this.securityCodeValid = await validateCode(this.securityCode);
			} catch (error) {
				this.error = "Confirmation code wrong or expired.";
				this.animation = true;
				setTimeout(() => { 
					this.error = null;
				}, 4000);
			}	
			this.isLoading = false;
		},
		async editEmail() {
			this.reset();
			try {
				await editEmail(this.userId, this.newEmail, this.editorId, this.password);
				this.$emit('close');
				this.updateEmail(this.newEmail);
			} catch (error) {
				this.error = "Email could not be changed.";
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
		if (!this.selfEdit) {
			this.loadPersonalDetails();
		}
		this.requestCode();
	}
};
</script>