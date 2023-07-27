<template>
	<div>
		<div style="height: 90vh;">
			<div class="center-div"> 
				<h5>You have successfully reseted your password.
					Now you can <a href="#" @click.prevent="showLoginModal">Login</a> with your credentials.
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