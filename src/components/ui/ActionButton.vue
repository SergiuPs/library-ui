<template>
    <div> 
        <div class="flex-center">
			<div class="text-center">
				<div class="spinner-transition"> 
					<transition v-show="error" :css="animation">
						<div class="message-box">{{ error }}</div>
					</transition>
					<div v-if="isLoading">
						<base-spinner type="spinner small" class="m-auto"></base-spinner>
					</div>
				</div>
				<base-button class="login-button">Login</base-button>
			</div>
		</div>
    </div>
</template>

<script>
export default {
    props: ['error', 'animation', 'isLoading']
}
</script>

<style scoped>
.login-button {
	padding: 5px 50px;
	margin: 0 auto;
}
.v-leave-active {
	transition: opacity 2s ease;
}
.v-enter-from, .v-leave-to {
	opacity: 0;
}
.message-box {
	background-color: #FFE1E1;
	border-radius: 10px;
	margin-top: 7px;
	height: 25px;
	text-align: center;
	min-width: 200px;
}
.spinner-transition {
	height: 35px;
	margin-top: 7px;
}
</style>