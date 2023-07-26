<template>
	<div>
		<div style="height: 90vh;">
			<div class="center-div"> 
				<h5>You have successfully registered your account and received a confirmation link on your E-Mail.
					After clicking on confirmation, you can <a href="#" @click.prevent="showLoginModal">Login</a> with your credentials.
				</h5>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	inject: ['showLoginModal'],
}
</script>