<template>
	<div> 
		<div class="text-center">
			<div class="spinner-transition"> 
				<transition v-show="error" :css="animation">
					<div class="message-box">{{ error }}</div>
				</transition>
				<div v-if="isLoading">
					<base-spinner type="spinner small" class="m-auto"></base-spinner>
				</div>
			</div>
			<base-button :mode="mode" :disabled="disabled">{{ buttonName }}</base-button>
		</div>
	</div>
</template>

<script>
export default {
	props: ['error', 'animation', 'isLoading', 'buttonName', 'disabled', 'mode']
}
</script>

<style scoped>
.v-leave-active {
	transition: opacity 2s ease;
}
.v-enter-from, .v-leave-to {
	opacity: 0;
}
.message-box {
	background-color: #FFE1E1;
	border-radius: 10px;
	height: 21px;
	font-size: 13px;
	text-align: center;
	min-width: 200px;
}
.spinner-transition {
	height: 25px;
	margin-top: 5px;
}
</style>