<template>
    <div :class="type"></div>
</template>

<script>
export default {
	props: ['type']
}
</script>
  
<style scoped>
.spinner {
	border-radius: 50%;
	-webkit-animation: spin 2s linear infinite;
	animation: spin 2s linear infinite;
	margin: 8px;
}
.small {
	width: 22px;
	height: 22px;
	border: 4px solid black;
	border-top: 4px solid #c1e1ec;
	border-bottom: 4px solid #c1e1ec;
}
.big {
	border: 16px solid black;
	border-top: 16px solid #c1e1ec;
	border-bottom: 16px solid #c1e1ec;
	width: 120px;
	height: 120px;
}
@keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
</style>