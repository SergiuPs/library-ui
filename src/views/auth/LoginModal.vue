<template>
	<div>
		<component :is="selectedComponent"></component>
		<a @click.prevent="toggleComponent" href="" style="font-size: 13px;">{{ urlText }}</a>
	</div>
</template>

<script>
import PasswordForgotten from './PasswordForgotten.vue';
import LoginForm from './LoginForm.vue';

export default {
	components: { LoginForm, PasswordForgotten },
	inject: ['changeModalTitle'],
	data() {
		return {
			selectedComponent: 'login-form',
			urlText: 'Forgotten your password?'
		}
	},
	methods: {
		toggleComponent() {
			if (this.selectedComponent === 'login-form') {
				this.changeModalTitle('Reset your password');
				this.urlText = 'Back to Login';
				this.selectedComponent = 'password-forgotten';
			} else {
				this.changeModalTitle('Welcome');
				this.urlText = 'Forgotten your password?';
				this.selectedComponent = 'login-form';
			}
		}
	}	
};
</script>
